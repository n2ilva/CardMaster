import { Firestore } from "@google-cloud/firestore";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

/**
 * Upload do catálogo de Quick Response / Suporte Técnico para o Firestore.
 *
 * Lê `data/gestaodeincidentes/suportetecnico.json` e grava em:
 *   collection: `quick_response_catalog`
 *   document : `main`
 *
 * O catálogo inteiro cabe num único documento (< 1 MB), simplificando o
 * consumo em runtime (uma única leitura).
 */

const COLLECTION_NAME =
  process.env.QUICK_RESPONSE_COLLECTION ?? "quick_response_catalog";
const DOC_ID = process.env.QUICK_RESPONSE_DOC_ID ?? "main";
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "cardmaster-934d5";
const JSON_PATH =
  process.env.QUICK_RESPONSE_JSON_PATH ??
  "data/gestaodeincidentes/suportetecnico.json";

async function loadServiceAccount() {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountPath) return null;
  const absolutePath = resolve(process.cwd(), serviceAccountPath);
  const file = await readFile(absolutePath, "utf-8");
  return JSON.parse(file);
}

async function createFirestoreClient(): Promise<Firestore> {
  const serviceAccount = await loadServiceAccount();
  if (serviceAccount) {
    console.log("Credenciais de Service Account encontradas.");
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

async function loadCatalog(): Promise<Record<string, unknown>> {
  const filePath = resolve(process.cwd(), JSON_PATH);
  const json = await readFile(filePath, "utf-8");
  const data = JSON.parse(json) as Record<string, unknown>;

  const categories = Array.isArray(
    (data as { categories?: unknown[] }).categories,
  )
    ? ((data as { categories: unknown[] }).categories as unknown[])
    : [];
  let totalExercises = 0;
  for (const cat of categories) {
    const exs = (cat as { exercises?: unknown[] }).exercises;
    if (Array.isArray(exs)) totalExercises += exs.length;
  }
  console.log(
    `Carregado ${JSON_PATH} — ${categories.length} categorias, ${totalExercises} exercícios`,
  );
  return data;
}

async function uploadCatalog(data: Record<string, unknown>, db: Firestore) {
  const docRef = db.collection(COLLECTION_NAME).doc(DOC_ID);
  await docRef.set(
    {
      ...data,
      updatedAt: new Date().toISOString(),
    },
    { merge: false },
  );
}

async function main() {
  const data = await loadCatalog();
  const db = await createFirestoreClient();

  console.log(
    `Iniciando upload para ${COLLECTION_NAME}/${DOC_ID} no projeto ${PROJECT_ID}...`,
  );
  await uploadCatalog(data, db);
  console.log("Upload concluído!");
}

main().catch((error) => {
  console.error("Erro no upload para Firestore:", error);
  process.exit(1);
});
