import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import path from "path";
import { fileURLToPath } from "url";

import { Firestore } from "@google-cloud/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLLECTION_NAME = process.env.BANKS_COLLECTION ?? "cards";
const BATCH_LIMIT = 500;
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const DRY_RUN = process.argv.includes("--dry-run");

async function createFirestoreClient(): Promise<Firestore> {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (serviceAccountPath) {
    const absolutePath = resolve(process.cwd(), serviceAccountPath);
    const file = await readFile(absolutePath, "utf-8");
    const serviceAccount = JSON.parse(file);
    return new Firestore({
      projectId: PROJECT_ID ?? serviceAccount.project_id,
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
    });
  }

  return new Firestore({ projectId: PROJECT_ID });
}

async function main() {
  // Carrega apenas os cards de HTML e CSS do arquivo de linguagens
  const filePath = resolve(
    __dirname,
    "../data/cards/linguagens-de-programacao.json",
  );
  const all = JSON.parse(await readFile(filePath, "utf-8"));
  const cards = all.filter(
    (c: { category: string }) => c.category === "HTML" || c.category === "CSS",
  );

  console.log(
    `Cards HTML: ${cards.filter((c: { category: string }) => c.category === "HTML").length}`,
  );
  console.log(
    `Cards CSS:  ${cards.filter((c: { category: string }) => c.category === "CSS").length}`,
  );
  console.log(`Total a enviar: ${cards.length}`);

  if (DRY_RUN) {
    console.log("DRY RUN — nenhum dado enviado ao Firebase.");
    console.log(
      "Exemplo de IDs:",
      cards.slice(0, 3).map((c: { id: string }) => c.id),
    );
    return;
  }

  const db = await createFirestoreClient();
  let batch = db.batch();
  let opCount = 0;
  let totalWritten = 0;

  for (const card of cards) {
    const safeId = card.id.replace(/\//g, "-");
    const docRef = db.collection(COLLECTION_NAME).doc(safeId);
    batch.set(docRef, { ...card, id: safeId }, { merge: true });
    opCount++;

    if (opCount === BATCH_LIMIT) {
      await batch.commit();
      totalWritten += opCount;
      batch = db.batch();
      opCount = 0;
      console.log(`Progresso: ${totalWritten}/${cards.length}`);
    }
  }

  if (opCount > 0) {
    await batch.commit();
    totalWritten += opCount;
  }

  // Atualiza versão dos dados para invalidar caches dos clientes
  const dataVersion = new Date().toISOString();
  await db.collection("app_meta").doc("data_version").set(
    {
      version: dataVersion,
      totalCards: totalWritten,
      updatedAt: dataVersion,
    },
    { merge: true },
  );

  console.log(`\n✅ Upload concluído: ${totalWritten} cards enviados.`);
  console.log(`Coleção: ${COLLECTION_NAME}`);
  console.log(`Versão atualizada: ${dataVersion}`);
}

main().catch((error) => {
  console.error("Erro no upload:", error);
  process.exit(1);
});
