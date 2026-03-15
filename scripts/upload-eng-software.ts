/**
 * Upload do track engenharia-de-software para o Firestore.
 * Remove categorias ausentes no JSON local e faz upsert das demais.
 * Uso: FIREBASE_SERVICE_ACCOUNT="..." npx tsx scripts/upload-eng-software.ts
 */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import path from "path";
import { fileURLToPath } from "url";

import { Firestore } from "@google-cloud/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLLECTION_NAME = process.env.BANKS_COLLECTION ?? "cards";
const BATCH_LIMIT = 499;
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const TRACK = "engenharia-de-software";

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
  const filePath = resolve(
    __dirname,
    "../data/cards/engenharia-de-software.json",
  );
  const localCards: any[] = JSON.parse(await readFile(filePath, "utf-8"));
  const localCategories = new Set(localCards.map((c) => c.category));

  console.log(`Cards locais: ${localCards.length}`);
  console.log(`Categorias: ${[...localCategories].join(", ")}\n`);

  const db = await createFirestoreClient();
  const col = db.collection(COLLECTION_NAME);

  // 1. Buscar todos os docs do track no Firestore
  console.log("Buscando documentos remotos...");
  const snapshot = await col.where("track", "==", TRACK).get();
  console.log(`Documentos no Firebase: ${snapshot.size}`);

  // 2. Deletar categorias removidas localmente
  const toDelete = snapshot.docs.filter((doc) => {
    const data = doc.data();
    return !localCategories.has(data.category);
  });

  const remoteCategories = new Set(snapshot.docs.map((d) => d.data().category));
  const removedCategories = [...remoteCategories].filter(
    (c) => !localCategories.has(c),
  );
  if (removedCategories.length > 0) {
    console.log(
      `\nCategorias a deletar (${removedCategories.join(", ")}): ${toDelete.length} docs`,
    );
    let batch = db.batch();
    let opCount = 0;
    let totalDeleted = 0;
    for (const doc of toDelete) {
      batch.delete(doc.ref);
      opCount++;
      if (opCount === BATCH_LIMIT) {
        await batch.commit();
        totalDeleted += opCount;
        batch = db.batch();
        opCount = 0;
      }
    }
    if (opCount > 0) {
      await batch.commit();
      totalDeleted += opCount;
    }
    console.log(`Deletados: ${totalDeleted}`);
  } else {
    console.log("Nenhum documento a deletar.");
  }

  // 3. Upsert de todos os cards locais
  console.log(`\nEnviando ${localCards.length} cards...`);
  let batch = db.batch();
  let opCount = 0;
  let totalWritten = 0;

  for (const card of localCards) {
    const safeId = card.id.replace(/\//g, "-");
    const docRef = col.doc(safeId);
    batch.set(docRef, { ...card, id: safeId }, { merge: true });
    opCount++;
    if (opCount === BATCH_LIMIT) {
      await batch.commit();
      totalWritten += opCount;
      batch = db.batch();
      opCount = 0;
      console.log(`Progresso: ${totalWritten}/${localCards.length}`);
    }
  }
  if (opCount > 0) {
    await batch.commit();
    totalWritten += opCount;
  }

  // 4. Atualizar data_version
  const dataVersion = new Date().toISOString();
  await db
    .collection("app_meta")
    .doc("data_version")
    .set({ version: dataVersion, updatedAt: dataVersion }, { merge: true });

  console.log(`\n✅ Upload concluído: ${totalWritten} cards enviados.`);
  console.log(`Versão: ${dataVersion}`);
}

main().catch((error) => {
  console.error("Erro:", error);
  process.exit(1);
});
