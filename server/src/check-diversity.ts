import { prisma } from "./prisma.js";

async function check() {
  const samples = [
    { track: "DESENVOLVIMENTO", category: "JavaScript", level: "INICIANTE" },
    { track: "DESENVOLVIMENTO", category: "C#", level: "SENIOR" },
  ];

  for (const { track, category, level } of samples) {
    const cards = await prisma.readyFlashcard.findMany({
      where: { track, category, level },
      select: { question: true, answer: true },
      take: 5,
    });

    console.log(`\n=== ${category} ${level} (primeiros 5) ===`);
    for (const c of cards) {
      const hasFoco =
        /Foco\s*:/i.test(c.question) || /Foco\s*:/i.test(c.answer);
      const hasCenario = /Cenário\s*:/i.test(c.question);
      const hasContexto = /Contexto\s*:/i.test(c.answer);
      const flag =
        hasFoco || hasCenario || hasContexto ? " ❌ METADADO!" : " ✅";
      console.log(`${flag} Q: ${c.question.substring(0, 90)}`);
      console.log(`     A: ${c.answer.substring(0, 90)}`);
    }
  }

  await prisma.$disconnect();
}

check();
