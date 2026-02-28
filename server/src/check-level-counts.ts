import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({
  path: process.cwd().endsWith("server") ? ".env" : "server/.env",
});

const prisma = new PrismaClient();
const expectedCardsPerLevel = 60;

async function main() {
  const rows = await prisma.readyFlashcard.groupBy({
    by: ["track", "category", "level"],
    _count: { _all: true },
  });

  const byCategory = new Map<string, { level: string; count: number }[]>();
  for (const row of rows) {
    const key = `${row.track}||${row.category}`;
    if (!byCategory.has(key)) {
      byCategory.set(key, []);
    }
    byCategory.get(key)?.push({ level: row.level, count: row._count._all });
  }

  const expectedLevels = ["INICIANTE", "JUNIOR", "PLENO", "SENIOR"];
  const issues: { key: string; level: string; count: number }[] = [];

  for (const [key, entries] of byCategory.entries()) {
    const levelMap = new Map(
      entries.map((entry) => [entry.level, entry.count]),
    );

    for (const level of expectedLevels) {
      const count = levelMap.get(level);
      if (count !== expectedCardsPerLevel) {
        issues.push({ key, level, count: count ?? 0 });
      }
    }
  }

  console.log("=== RESUMO POR CATEGORIA ===");
  console.log(`Categorias únicas: ${byCategory.size}`);
  console.log(`Combinações track/category/level: ${rows.length}`);
  console.log("");

  if (issues.length === 0) {
    console.log(
      `✅ Todas as categorias possuem INICIANTE/JUNIOR/PLENO/SENIOR com ${expectedCardsPerLevel} cards cada.`,
    );
  } else {
    console.log(`❌ Inconsistências encontradas: ${issues.length}`);
    for (const issue of issues) {
      console.log(`- ${issue.key} | ${issue.level}: ${issue.count}`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
