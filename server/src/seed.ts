import { Prisma } from "@prisma/client";

import { prisma } from "./prisma.js";

async function main() {
  const cards: Prisma.ReadyFlashcardCreateManyInput[] = [
    {
      track: "DESENVOLVIMENTO",
      category: "JavaScript",
      level: "JUNIOR",
      question: "Qual a diferença entre let e const?",
      answer: "Ambos têm escopo de bloco, mas const não permite reatribuição.",
    },
    {
      track: "DESENVOLVIMENTO",
      category: "React",
      level: "PLENO",
      question: "Qual objetivo do useEffect?",
      answer:
        "Executar efeitos colaterais em resposta ao ciclo de vida e dependências.",
    },
    {
      track: "DESENVOLVIMENTO",
      category: "Tailwind CSS",
      level: "JUNIOR",
      question: "Como aplicar padding horizontal de 16px?",
      answer: "Com a classe px-4.",
    },
    {
      track: "INFRAESTRUTURA",
      category: "Cabeamento Estruturado",
      level: "JUNIOR",
      question: "Qual categoria comum para rede gigabit?",
      answer: "Cat5e ou superior.",
    },
    {
      track: "INFRAESTRUTURA",
      category: "Rede de Computadores",
      level: "PLENO",
      question: "O que é subnet mask?",
      answer:
        "Define qual parte do IP representa rede e qual parte representa host.",
    },
    {
      track: "INFRAESTRUTURA",
      category: "Arquitetura de Computadores",
      level: "SENIOR",
      question: "Como prefetching afeta performance?",
      answer:
        "Pode reduzir latência percebida ao antecipar dados, com risco de poluir cache.",
    },
    {
      track: "CLOUD",
      category: "AWS",
      level: "PLENO",
      question: "Quando usar SQS em vez de SNS?",
      answer:
        "Quando precisa de fila desacoplada com consumo assíncrono controlado.",
    },
    {
      track: "CLOUD",
      category: "Azure",
      level: "JUNIOR",
      question: "Para que serve Azure App Service?",
      answer:
        "Hospedar aplicações web e APIs sem gerenciar infraestrutura base.",
    },
    {
      track: "CLOUD",
      category: "Google Cloud",
      level: "SENIOR",
      question: "Vantagem do Cloud Run para microsserviços?",
      answer:
        "Escalonamento automático baseado em requisição com modelo serverless.",
    },
  ];

  await prisma.readyFlashcard.deleteMany();
  await prisma.readyFlashcard.createMany({ data: cards });

  console.log("Seed concluído com cards prontos.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
