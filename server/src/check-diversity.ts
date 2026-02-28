import { prisma } from "./prisma.js";

async function check() {
  // Check C# INICIANTE cards
  const cards = await prisma.readyFlashcard.findMany({
    where: { track: "DESENVOLVIMENTO", category: "C#", level: "INICIANTE" },
    select: { question: true },
  });

  console.log(`=== C# INICIANTE (${cards.length} cards) ===`);
  const baseQuestions = cards.map((c) =>
    c.question.split(" Foco:")[0].split(" Cenário:")[0].trim(),
  );
  const unique = new Set(baseQuestions);
  console.log(`Perguntas base únicas: ${unique.size}`);
  unique.forEach((q) => console.log(`  - ${q.substring(0, 80)}`));

  // Check JavaScript SENIOR
  const jsCards = await prisma.readyFlashcard.findMany({
    where: {
      track: "DESENVOLVIMENTO",
      category: "JavaScript",
      level: "SENIOR",
    },
    select: { question: true },
  });

  console.log(`\n=== JavaScript SENIOR (${jsCards.length} cards) ===`);
  const jsBase = jsCards.map((c) =>
    c.question.split(" Foco:")[0].split(" Cenário:")[0].trim(),
  );
  const jsUnique = new Set(jsBase);
  console.log(`Perguntas base únicas: ${jsUnique.size}`);
  jsUnique.forEach((q) => console.log(`  - ${q.substring(0, 80)}`));

  await prisma.$disconnect();
}

check();
