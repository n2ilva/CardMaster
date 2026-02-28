import { Prisma } from "@prisma/client";

import { prisma } from "./prisma.js";

type MathCard = {
  category: string;
  level: "INICIANTE" | "JUNIOR" | "PLENO";
  question: string;
  answer: string;
  wrongOptions: string[];
  answerDescription: string;
};

// ────────────────────────────────────────────
// CATEGORIA 1 — Matemática Básica e Aritmética
// ────────────────────────────────────────────

const basicCards: MathCard[] = [
  // ── INICIANTE (20 questões) ──
  // Porcentagem
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Quanto é 10% de 200?",
    answer: "20",
    wrongOptions: ["10", "30", "25"],
    answerDescription:
      "Para calcular 10% de 200, basta multiplicar 200 × 0,10 = 20. Porcentagem significa 'por cem', então 10% = 10/100 = 0,10.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Um produto de R$ 80 teve desconto de 25%. Qual o valor final?",
    answer: "R$ 60",
    wrongOptions: ["R$ 55", "R$ 65", "R$ 70"],
    answerDescription:
      "25% de 80 = 80 × 0,25 = 20. Valor final = 80 − 20 = R$ 60. Para descontos, calcula-se a porcentagem e subtrai do valor original.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question:
      "Se 40 de 200 alunos foram aprovados, qual a porcentagem de aprovação?",
    answer: "20%",
    wrongOptions: ["25%", "15%", "40%"],
    answerDescription:
      "Porcentagem = (parte / total) × 100 = (40 / 200) × 100 = 20%. Divide-se o valor parcial pelo total e multiplica por 100.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question:
      "Um salário de R$ 2.000 teve aumento de 15%. Qual o novo salário?",
    answer: "R$ 2.300",
    wrongOptions: ["R$ 2.150", "R$ 2.500", "R$ 2.200"],
    answerDescription:
      "15% de 2.000 = 2.000 × 0,15 = 300. Novo salário = 2.000 + 300 = R$ 2.300. Para aumentos, soma-se a porcentagem ao valor original.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Quanto é 50% de 120?",
    answer: "60",
    wrongOptions: ["50", "70", "55"],
    answerDescription:
      "50% equivale à metade. 120 ÷ 2 = 60. Também pode calcular: 120 × 0,50 = 60.",
  },
  // Razão e Proporção
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question:
      "Se 3 programadores fazem um módulo em 12 dias, em quantos dias 6 programadores fariam o mesmo módulo?",
    answer: "6 dias",
    wrongOptions: ["4 dias", "8 dias", "9 dias"],
    answerDescription:
      "Grandezas inversamente proporcionais: mais programadores → menos dias. 3 × 12 = 6 × x → x = 36/6 = 6 dias.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Se 2 kg de arroz custam R$ 10, quanto custam 5 kg?",
    answer: "R$ 25",
    wrongOptions: ["R$ 20", "R$ 30", "R$ 15"],
    answerDescription:
      "Regra de três direta: 2 kg → R$ 10, 5 kg → x. x = (5 × 10) / 2 = R$ 25. Proporção direta: mais quantidade, mais custo.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question:
      "Um carro percorre 180 km com 15 litros de gasolina. Quantos litros gasta para percorrer 300 km?",
    answer: "25 litros",
    wrongOptions: ["20 litros", "30 litros", "22 litros"],
    answerDescription:
      "Regra de três direta: 180 km → 15 L, 300 km → x. x = (300 × 15) / 180 = 4500/180 = 25 litros.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Qual a razão entre 15 e 45?",
    answer: "1/3",
    wrongOptions: ["1/2", "3/1", "2/3"],
    answerDescription:
      "Razão = 15/45. Simplificando por 15: 15÷15 / 45÷15 = 1/3. Razão expressa a relação entre duas grandezas.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question:
      "Se a razão entre aprovados e reprovados é 3:2 e há 50 alunos, quantos foram aprovados?",
    answer: "30",
    wrongOptions: ["20", "25", "35"],
    answerDescription:
      "Total de partes = 3 + 2 = 5. Cada parte = 50/5 = 10. Aprovados = 3 × 10 = 30.",
  },
  // Juros Simples
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question:
      "Qual o juro simples de um capital de R$ 1.000 a 5% ao mês durante 4 meses?",
    answer: "R$ 200",
    wrongOptions: ["R$ 150", "R$ 250", "R$ 100"],
    answerDescription:
      "Juros simples: J = C × i × t = 1.000 × 0,05 × 4 = R$ 200. A fórmula é linear: capital × taxa × tempo.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question:
      "Um empréstimo de R$ 500 a juros simples de 2% ao mês rende quanto de juros em 6 meses?",
    answer: "R$ 60",
    wrongOptions: ["R$ 50", "R$ 70", "R$ 80"],
    answerDescription:
      "J = C × i × t = 500 × 0,02 × 6 = R$ 60. Juros simples crescem linearmente com o tempo.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question:
      "Se apliquei R$ 2.000 a juros simples de 1% ao mês por 12 meses, qual o montante final?",
    answer: "R$ 2.240",
    wrongOptions: ["R$ 2.200", "R$ 2.120", "R$ 2.300"],
    answerDescription:
      "J = 2.000 × 0,01 × 12 = R$ 240. Montante = Capital + Juros = 2.000 + 240 = R$ 2.240.",
  },
  // Conversão de Unidades
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Quantos bytes tem 1 kilobyte (KB)?",
    answer: "1.024 bytes",
    wrongOptions: ["1.000 bytes", "512 bytes", "2.048 bytes"],
    answerDescription:
      "Em computação, 1 KB = 2¹⁰ = 1.024 bytes. Usa-se base 2 (binária) em vez de base 10.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Quantos bits tem 1 byte?",
    answer: "8 bits",
    wrongOptions: ["4 bits", "16 bits", "10 bits"],
    answerDescription:
      "1 byte = 8 bits. Cada bit é um dígito binário (0 ou 1). O byte é a unidade básica de armazenamento.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Quantos megabytes (MB) tem 1 gigabyte (GB)?",
    answer: "1.024 MB",
    wrongOptions: ["1.000 MB", "512 MB", "2.048 MB"],
    answerDescription:
      "1 GB = 1.024 MB. Na hierarquia: 1 GB = 1.024 MB = 1.048.576 KB = 1.073.741.824 bytes.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Quantos kilobytes (KB) tem 5 megabytes (MB)?",
    answer: "5.120 KB",
    wrongOptions: ["5.000 KB", "4.096 KB", "5.200 KB"],
    answerDescription: "1 MB = 1.024 KB. Logo, 5 MB = 5 × 1.024 = 5.120 KB.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Se um arquivo tem 2.048 KB, quantos MB ele tem?",
    answer: "2 MB",
    wrongOptions: ["1 MB", "4 MB", "0,5 MB"],
    answerDescription:
      "2.048 KB ÷ 1.024 = 2 MB. Para converter KB em MB, divide-se por 1.024.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question: "Quanto é 30% de 500?",
    answer: "150",
    wrongOptions: ["130", "160", "175"],
    answerDescription:
      "30% de 500 = 500 × 0,30 = 150. Pode-se também calcular 10% (50) e multiplicar por 3.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "INICIANTE",
    question:
      "Se uma velocidade de download é 100 Mbps, quantos megabytes por segundo isso equivale aproximadamente?",
    answer: "12,5 MB/s",
    wrongOptions: ["100 MB/s", "10 MB/s", "25 MB/s"],
    answerDescription:
      "100 Megabits ÷ 8 = 12,5 Megabytes. 1 byte = 8 bits, então divide-se a taxa em bits por 8 para obter bytes.",
  },

  // ── JUNIOR (Médio — 20 questões) ──
  // Porcentagem e Variações
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Um produto subiu 20% e depois caiu 20%. O preço final é igual ao original?",
    answer: "Não, ficou 4% menor",
    wrongOptions: [
      "Sim, voltou ao original",
      "Não, ficou 4% maior",
      "Não, ficou 2% menor",
    ],
    answerDescription:
      "Aumento de 20%: fator 1,20. Queda de 20%: fator 0,80. Total: 1,20 × 0,80 = 0,96 = 96% do original, ou seja, 4% menor.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Uma métrica de sistema caiu de 250 para 200 requisições/s. Qual a variação percentual?",
    answer: "Queda de 20%",
    wrongOptions: ["Queda de 25%", "Queda de 15%", "Queda de 50%"],
    answerDescription:
      "Variação = (200 − 250) / 250 × 100 = −50/250 × 100 = −20%. Variação percentual usa o valor original como base.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Se um preço aumentou 50% e depois 50% novamente, qual o aumento total?",
    answer: "125%",
    wrongOptions: ["100%", "150%", "110%"],
    answerDescription:
      "Fator total = 1,50 × 1,50 = 2,25. Aumento = 2,25 − 1 = 1,25 = 125%. Aumentos percentuais sucessivos são multiplicativos, não aditivos.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Um servidor tinha 80% de uptime. Após melhorias, passou para 95%. Qual o aumento em pontos percentuais?",
    answer: "15 pontos percentuais",
    wrongOptions: ["15%", "18,75%", "75 pontos percentuais"],
    answerDescription:
      "Pontos percentuais = diferença absoluta: 95% − 80% = 15 p.p. Diferente de variação percentual relativa (que seria 18,75%).",
  },
  // Razão e Proporção
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Se 4 servidores processam 12.000 requisições/hora, quantos servidores procesam 30.000 requisições/hora na mesma proporção?",
    answer: "10 servidores",
    wrongOptions: ["8 servidores", "12 servidores", "6 servidores"],
    answerDescription:
      "Proporção direta: 4/12.000 = x/30.000. x = (4 × 30.000)/12.000 = 120.000/12.000 = 10 servidores.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Um backup de 60 GB leva 30 minutos. Quanto tempo leva para 150 GB na mesma velocidade?",
    answer: "75 minutos",
    wrongOptions: ["60 minutos", "90 minutos", "50 minutos"],
    answerDescription:
      "Regra de três direta: 60 GB → 30 min, 150 GB → x. x = (150 × 30)/60 = 75 minutos.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Se a escala de um mapa é 1:50.000, quantos km reais representam 4 cm no mapa?",
    answer: "2 km",
    wrongOptions: ["0,2 km", "20 km", "4 km"],
    answerDescription:
      "4 cm × 50.000 = 200.000 cm = 2.000 m = 2 km. Cada cm no mapa equivale a 50.000 cm (500 m) na realidade.",
  },
  // Juros Simples e Compostos
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Qual o montante de R$ 5.000 a juros compostos de 10% ao ano por 2 anos?",
    answer: "R$ 6.050",
    wrongOptions: ["R$ 6.000", "R$ 6.100", "R$ 5.500"],
    answerDescription:
      "M = C × (1 + i)^t = 5.000 × 1,10² = 5.000 × 1,21 = R$ 6.050. Em juros compostos, juros incidem sobre juros acumulados.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Qual a diferença entre juros simples e compostos de R$ 1.000 a 10% ao ano em 3 anos?",
    answer: "R$ 31",
    wrongOptions: ["R$ 10", "R$ 50", "R$ 100"],
    answerDescription:
      "Simples: J = 1.000 × 0,10 × 3 = R$ 300 → M = R$ 1.300. Compostos: M = 1.000 × 1,10³ = R$ 1.331. Diferença = 1.331 − 1.300 = R$ 31.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Investimento de R$ 2.000 a juros compostos de 5% ao mês por 3 meses. Qual o montante?",
    answer: "R$ 2.315,25",
    wrongOptions: ["R$ 2.300", "R$ 2.250", "R$ 2.400"],
    answerDescription:
      "M = 2.000 × (1,05)³ = 2.000 × 1,157625 = R$ 2.315,25. Cada mês o juro incide sobre o montante do mês anterior.",
  },
  // Conversão de unidades
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question: "Um disco rígido tem 2 TB. Quantos GB isso equivale?",
    answer: "2.048 GB",
    wrongOptions: ["2.000 GB", "1.024 GB", "4.096 GB"],
    answerDescription: "1 TB = 1.024 GB. Logo, 2 TB = 2 × 1.024 = 2.048 GB.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Uma conexão transfere 800 Kbps. Quantos KB por segundo isso equivale?",
    answer: "100 KB/s",
    wrongOptions: ["800 KB/s", "80 KB/s", "200 KB/s"],
    answerDescription:
      "800 Kilobits ÷ 8 = 100 Kilobytes. Divide-se por 8 pois 1 byte = 8 bits.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question: "Se um arquivo tem 3.145.728 bytes, quantos MB ele ocupa?",
    answer: "3 MB",
    wrongOptions: ["2 MB", "3,14 MB", "4 MB"],
    answerDescription:
      "3.145.728 ÷ 1.024 = 3.072 KB. 3.072 ÷ 1.024 = 3 MB. Divide-se por 1.024 duas vezes (bytes → KB → MB).",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question: "Qual a velocidade em MB/s de um link de 1 Gbps?",
    answer: "125 MB/s",
    wrongOptions: ["1.000 MB/s", "128 MB/s", "100 MB/s"],
    answerDescription:
      "1 Gbps = 1.000 Mbps. 1.000 Mbps ÷ 8 = 125 MB/s. Converte-se de bits para bytes dividindo por 8.",
  },
  // Mistos
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Se um time resolve 24 tickets em 6 horas, qual a taxa de resolução por hora?",
    answer: "4 tickets/hora",
    wrongOptions: ["3 tickets/hora", "6 tickets/hora", "5 tickets/hora"],
    answerDescription:
      "Taxa = total / tempo = 24/6 = 4 tickets por hora. Razão simples entre quantidade e tempo.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "O custo anual de um software é R$ 12.000. Se dividido igualmente em 12 meses, quanto é o custo trimestral?",
    answer: "R$ 3.000",
    wrongOptions: ["R$ 1.000", "R$ 4.000", "R$ 2.500"],
    answerDescription:
      "Custo mensal = 12.000/12 = R$ 1.000. Custo trimestral = 1.000 × 3 = R$ 3.000.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Se a latência média de uma API era 200ms e caiu para 150ms, qual a redução percentual?",
    answer: "25%",
    wrongOptions: ["20%", "33%", "50%"],
    answerDescription:
      "Redução = (200 − 150)/200 × 100 = 50/200 × 100 = 25%. A base de cálculo é sempre o valor original.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Se 1 dólar = R$ 5,20, quanto custa uma licença de software de US$ 150?",
    answer: "R$ 780",
    wrongOptions: ["R$ 750", "R$ 800", "R$ 720"],
    answerDescription:
      "150 × 5,20 = R$ 780. Conversão direta: multiplica o valor em dólar pela cotação.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Um projeto precisa de 480 horas de trabalho. Se 8 desenvolvedores trabalham 6h por dia, em quantos dias terminam?",
    answer: "10 dias",
    wrongOptions: ["8 dias", "12 dias", "15 dias"],
    answerDescription:
      "Horas/dia total = 8 × 6 = 48h/dia. Dias = 480/48 = 10 dias.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "JUNIOR",
    question:
      "Se uma aplicação consome 3,5 GB de RAM e o servidor tem 16 GB, qual a porcentagem de uso?",
    answer: "21,875%",
    wrongOptions: ["25%", "20%", "35%"],
    answerDescription:
      "Uso = (3,5 / 16) × 100 = 21,875%. Divide-se o consumo pela capacidade total e multiplica por 100.",
  },

  // ── PLENO (Difícil — 20 questões) ──
  // Porcentagem avançada
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Um servidor teve crescimento de tráfego de 30% no 1º trimestre e 20% no 2º. Qual o crescimento total?",
    answer: "56%",
    wrongOptions: ["50%", "60%", "52%"],
    answerDescription:
      "Fatores: 1,30 × 1,20 = 1,56. Crescimento total = 56%. Variações percentuais consecutivas são multiplicativas.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se um produto teve desconto de 40% e o preço final é R$ 180, qual o preço original?",
    answer: "R$ 300",
    wrongOptions: ["R$ 252", "R$ 320", "R$ 280"],
    answerDescription:
      "Preço final = original × (1 − 0,40) → 180 = original × 0,60 → original = 180/0,60 = R$ 300.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "O uptime de um sistema é 99,9%. Quantos minutos de downtime isso representa em 30 dias?",
    answer: "≈ 43 minutos",
    wrongOptions: ["≈ 30 minutos", "≈ 72 minutos", "≈ 15 minutos"],
    answerDescription:
      "30 dias = 43.200 minutos. Downtime = 43.200 × 0,001 = 43,2 ≈ 43 minutos. Os 'noves' de uptime são métrica crucial em SLA.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se a taxa de erro de uma API era 5% com 10.000 requisições e caiu para 2% com 25.000 requisições, qual a variação absoluta no número de erros?",
    answer: "Nenhuma, ambos dão 500 erros",
    wrongOptions: [
      "Aumento de 200 erros",
      "Redução de 300 erros",
      "Redução de 500 erros",
    ],
    answerDescription:
      "Antes: 10.000 × 5% = 500 erros. Depois: 25.000 × 2% = 500 erros. Apesar da taxa cair, o volume maior manteve o número absoluto igual.",
  },
  // Juros compostos avançados
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Em quanto tempo um capital dobra a juros compostos de 10% ao ano? (use regra de 72)",
    answer: "≈ 7,2 anos",
    wrongOptions: ["≈ 10 anos", "≈ 5 anos", "≈ 12 anos"],
    answerDescription:
      "Regra de 72: tempo ≈ 72/taxa = 72/10 = 7,2 anos. É uma aproximação prática para estimar tempo de duplicação em juros compostos.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Qual o montante de R$ 10.000 a juros compostos de 8% ao ano por 5 anos?",
    answer: "R$ 14.693,28",
    wrongOptions: ["R$ 14.000", "R$ 15.000", "R$ 13.500"],
    answerDescription:
      "M = 10.000 × (1,08)⁵ = 10.000 × 1,469328 = R$ 14.693,28. Cada ano o juro incide sobre o montante acumulado.",
  },
  // Proporção avançada
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se 5 máquinas em 8 horas produzem 2.000 peças, quantas máquinas fazem 6.000 peças em 6 horas?",
    answer: "20 máquinas",
    wrongOptions: ["15 máquinas", "12 máquinas", "18 máquinas"],
    answerDescription:
      "Regra de três composta: 5 máq × 8h → 2.000. x máq × 6h → 6.000. x = 5 × (8/6) × (6.000/2.000) = 5 × 1,333 × 3 = 20.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "A razão áurea vale aproximadamente 1,618. Se um lado de um retângulo áureo mede 10 cm, qual o outro lado?",
    answer: "≈ 16,18 cm",
    wrongOptions: ["≈ 6,18 cm", "≈ 20 cm", "≈ 12 cm"],
    answerDescription:
      "Lado maior = lado menor × razão áurea = 10 × 1,618 = 16,18 cm. A razão áurea (φ) aparece em design de interfaces e proporções visuais.",
  },
  // Conversão avançada
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Um data center consome 2,5 MW de energia. Quantos kW isso equivale?",
    answer: "2.500 kW",
    wrongOptions: ["250 kW", "25.000 kW", "25 kW"],
    answerDescription:
      "1 MW = 1.000 kW. Logo, 2,5 MW = 2,5 × 1.000 = 2.500 kW.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se um processador opera a 3,6 GHz, quantos ciclos por segundo ele executa?",
    answer: "3,6 bilhões de ciclos/s",
    wrongOptions: [
      "3,6 milhões de ciclos/s",
      "360 milhões de ciclos/s",
      "36 bilhões de ciclos/s",
    ],
    answerDescription:
      "1 GHz = 10⁹ Hz = 1 bilhão de ciclos/s. Logo, 3,6 GHz = 3,6 × 10⁹ = 3,6 bilhões de ciclos/s.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question: "Quantos endereços IP são possíveis em uma sub-rede /24?",
    answer: "256 endereços (254 utilizáveis)",
    wrongOptions: ["512 endereços", "128 endereços", "1.024 endereços"],
    answerDescription:
      "32 − 24 = 8 bits para hosts. 2⁸ = 256 endereços totais. Subtraem-se 2 (rede e broadcast) = 254 utilizáveis.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se uma API responde em média 250ms e precisa atender 10.000 requisições/s, qual o mínimo de instâncias paralelas necessárias (cada uma processa 1 req por vez)?",
    answer: "2.500 instâncias",
    wrongOptions: ["250 instâncias", "1.000 instâncias", "10.000 instâncias"],
    answerDescription:
      "Cada instância leva 0,25s por requisição → processa 4 req/s. Para 10.000 req/s: 10.000/4 = 2.500 instâncias.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se os dados crescem 15% ao mês e hoje são 100 GB, qual o tamanho estimado em 6 meses?",
    answer: "≈ 230 GB",
    wrongOptions: ["≈ 190 GB", "≈ 300 GB", "≈ 160 GB"],
    answerDescription:
      "Crescimento composto: 100 × (1,15)⁶ = 100 × 2,313 ≈ 231 GB ≈ 230 GB. Crescimento exponencial em dados é comum em capacity planning.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se um SSD tem IOPS de 100.000 e cada operação leva 10 μs, qual a latência total para 1 milhão de operações sequenciais?",
    answer: "10 segundos",
    wrongOptions: ["1 segundo", "100 segundos", "0,1 segundo"],
    answerDescription:
      "1.000.000 ops × 10 μs = 10.000.000 μs = 10 s. Ou: 1.000.000 / 100.000 IOPS = 10 s.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se um algoritmo tem complexidade O(n²) e leva 1 segundo para n=1.000, quanto levaria para n=10.000?",
    answer: "100 segundos",
    wrongOptions: ["10 segundos", "1.000 segundos", "50 segundos"],
    answerDescription:
      "O(n²): se n multiplica por 10, o tempo multiplica por 10² = 100. Logo, 1s × 100 = 100 segundos.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se o custo de um serviço cloud é $0,023 por GB-mês e usa-se 500 TB, qual o custo mensal?",
    answer: "$11.776",
    wrongOptions: ["$11.500", "$23.000", "$1.177"],
    answerDescription:
      "500 TB = 500 × 1.024 GB = 512.000 GB. Custo = 512.000 × 0,023 = $11.776.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se uma rede tem throughput de 10 Gbps e a eficiência do protocolo é 60%, qual o throughput efetivo?",
    answer: "6 Gbps",
    wrongOptions: ["4 Gbps", "8 Gbps", "10 Gbps"],
    answerDescription:
      "Throughput efetivo = 10 × 0,60 = 6 Gbps. Overhead de protocolos (headers, ACKs) reduz a capacidade útil.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se a disponibilidade de dois componentes em série é 99% cada, qual a disponibilidade total do sistema?",
    answer: "98,01%",
    wrongOptions: ["99%", "99,5%", "97%"],
    answerDescription:
      "Componentes em série: disponibilidade total = 0,99 × 0,99 = 0,9801 = 98,01%. Em série, a disponibilidade diminui.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se a disponibilidade de dois componentes redundantes (paralelo) é 99% cada, qual a disponibilidade total?",
    answer: "99,99%",
    wrongOptions: ["99%", "99,5%", "98%"],
    answerDescription:
      "Em paralelo: 1 − (1 − 0,99) × (1 − 0,99) = 1 − 0,01 × 0,01 = 1 − 0,0001 = 0,9999 = 99,99%.",
  },
  {
    category: "Matemática Básica e Aritmética",
    level: "PLENO",
    question:
      "Se um investimento rende 1% ao mês em juros compostos, qual o rendimento real em 12 meses?",
    answer: "≈ 12,68%",
    wrongOptions: ["12%", "12,5%", "13%"],
    answerDescription:
      "(1,01)¹² = 1,12682... ≈ 12,68%. Juros compostos rendem mais que simples. 12 × 1% = 12% seria apenas juros simples.",
  },
];

// ──────────────────────────────────────────────────
// CATEGORIA 2 — Raciocínio Lógico e Matemática Discreta
// ──────────────────────────────────────────────────

const logicCards: MathCard[] = [
  // ── INICIANTE (20 questões) ──
  // Lógica Proposicional
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Qual o resultado de VERDADEIRO AND FALSO?",
    answer: "FALSO",
    wrongOptions: ["VERDADEIRO", "Depende do contexto", "Erro lógico"],
    answerDescription:
      "O operador AND só retorna VERDADEIRO quando ambos os operandos são VERDADEIROS. Se um é FALSO, o resultado é FALSO.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Qual o resultado de FALSO OR VERDADEIRO?",
    answer: "VERDADEIRO",
    wrongOptions: ["FALSO", "Indefinido", "Nulo"],
    answerDescription:
      "O operador OR retorna VERDADEIRO se pelo menos um operando for VERDADEIRO.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Qual o resultado de NOT VERDADEIRO?",
    answer: "FALSO",
    wrongOptions: ["VERDADEIRO", "Nulo", "Indefinido"],
    answerDescription:
      "O operador NOT inverte o valor lógico. NOT VERDADEIRO = FALSO, NOT FALSO = VERDADEIRO.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Qual o resultado de VERDADEIRO OR VERDADEIRO?",
    answer: "VERDADEIRO",
    wrongOptions: ["FALSO", "Erro", "Depende do operador"],
    answerDescription:
      "OR retorna VERDADEIRO se pelo menos um operando for VERDADEIRO. Com ambos verdadeiros, o resultado é VERDADEIRO.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question:
      "Qual operador lógico retorna VERDADEIRO somente quando os dois operandos são iguais?",
    answer: "XNOR (equivalência)",
    wrongOptions: ["XOR", "AND", "OR"],
    answerDescription:
      "XNOR (ou equivalência lógica) retorna V quando ambos são iguais (V-V ou F-F). XOR é o oposto: retorna V quando são diferentes.",
  },
  // Conjuntos
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Se A = {1, 2, 3} e B = {2, 3, 4}, qual é A ∩ B (interseção)?",
    answer: "{2, 3}",
    wrongOptions: ["{1, 2, 3, 4}", "{1, 4}", "{1}"],
    answerDescription:
      "Interseção (∩) são os elementos comuns a ambos os conjuntos. 2 e 3 estão em A e em B.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Se A = {1, 2, 3} e B = {2, 3, 4}, qual é A ∪ B (união)?",
    answer: "{1, 2, 3, 4}",
    wrongOptions: ["{2, 3}", "{1, 4}", "{1, 2, 3}"],
    answerDescription:
      "União (∪) junta todos os elementos de ambos os conjuntos, sem repetições.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Se A = {1, 2, 3, 4} e B = {3, 4, 5}, qual é A − B (diferença)?",
    answer: "{1, 2}",
    wrongOptions: ["{3, 4}", "{5}", "{1, 2, 5}"],
    answerDescription:
      "Diferença (A − B) são os elementos que estão em A mas não em B. Apenas 1 e 2 são exclusivos de A.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "O que é o conjunto vazio?",
    answer: "Conjunto sem nenhum elemento, representado por {} ou ∅",
    wrongOptions: [
      "Conjunto com o número zero",
      "Conjunto com infinitos elementos",
      "Um conjunto que não existe",
    ],
    answerDescription:
      "O conjunto vazio (∅ ou {}) não possui elementos. É diferente de {0}, que contém o elemento zero.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question:
      "Se o conjunto universal U = {1,2,3,4,5} e A = {1,3,5}, qual o complementar de A?",
    answer: "{2, 4}",
    wrongOptions: ["{1, 3, 5}", "{1, 2, 3, 4, 5}", "{}"],
    answerDescription:
      "O complementar de A (A') são os elementos do universo que não estão em A: {2, 4}.",
  },
  // Bases numéricas
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Qual o valor de 1010 em binário convertido para decimal?",
    answer: "10",
    wrongOptions: ["8", "12", "5"],
    answerDescription:
      "1010₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Qual o valor decimal do número binário 1111?",
    answer: "15",
    wrongOptions: ["16", "14", "8"],
    answerDescription:
      "1111₂ = 8 + 4 + 2 + 1 = 15. Cada posição é uma potência de 2.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Como se escreve o número decimal 8 em binário?",
    answer: "1000",
    wrongOptions: ["1001", "0111", "1100"],
    answerDescription:
      "8 = 2³. Em binário, só o bit da posição 3 está ligado: 1000₂.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "O que é o sistema hexadecimal?",
    answer: "Sistema de numeração na base 16 (0-9, A-F)",
    wrongOptions: [
      "Sistema na base 8",
      "Sistema na base 2",
      "Sistema na base 12",
    ],
    answerDescription:
      "Hexadecimal usa 16 dígitos: 0-9 e A(10), B(11), C(12), D(13), E(14), F(15). Muito usado em computação para representar bytes.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Qual o valor hexadecimal de FF em decimal?",
    answer: "255",
    wrongOptions: ["256", "128", "16"],
    answerDescription:
      "FF₁₆ = 15×16¹ + 15×16⁰ = 240 + 15 = 255. É o valor máximo de 1 byte (8 bits, todos ligados = 11111111₂).",
  },
  // Combinatória básica
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Quantas senhas de 2 dígitos são possíveis (0-9)?",
    answer: "100",
    wrongOptions: ["20", "90", "50"],
    answerDescription:
      "10 opções para o 1º dígito × 10 para o 2º = 10² = 100 senhas possíveis.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question:
      "Se tenho 3 camisetas e 4 calças, de quantas formas posso me vestir?",
    answer: "12 formas",
    wrongOptions: ["7 formas", "24 formas", "10 formas"],
    answerDescription:
      "Princípio multiplicativo: 3 × 4 = 12 combinações possíveis.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Qual o valor de 5! (fatorial de 5)?",
    answer: "120",
    wrongOptions: ["60", "24", "720"],
    answerDescription:
      "5! = 5 × 4 × 3 × 2 × 1 = 120. Fatorial é o produto de todos os inteiros positivos até n.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question: "Se jogo uma moeda, qual a probabilidade de sair cara?",
    answer: "50% ou 1/2",
    wrongOptions: ["25%", "33%", "100%"],
    answerDescription:
      "Moeda justa tem 2 resultados equiprováveis. P(cara) = 1/2 = 50%.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "INICIANTE",
    question:
      "Se tenho 4 cores de caneta diferentes, de quantas formas posso ordená-las em fila?",
    answer: "24 formas",
    wrongOptions: ["4 formas", "16 formas", "12 formas"],
    answerDescription:
      "Permutação de 4 elementos: 4! = 4 × 3 × 2 × 1 = 24 formas.",
  },

  // ── JUNIOR (Médio — 20 questões) ──
  // Lógica Proposicional
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "Qual o resultado de VERDADEIRO XOR VERDADEIRO?",
    answer: "FALSO",
    wrongOptions: ["VERDADEIRO", "Indefinido", "Depende do contexto"],
    answerDescription:
      "XOR (OU exclusivo) retorna VERDADEIRO apenas quando os operandos são diferentes. V XOR V = F.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "Se P é VERDADEIRO e Q é FALSO, qual o resultado da implicação P → Q?",
    answer: "FALSO",
    wrongOptions: ["VERDADEIRO", "Indefinido", "Depende de P"],
    answerDescription:
      "A implicação P → Q só é FALSA quando P é VERDADEIRO e Q é FALSO. É o único caso de falsidade da condicional.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "Qual a negação da proposição 'Se chove, então a rua fica molhada'?",
    answer: "Chove E a rua NÃO fica molhada",
    wrongOptions: [
      "Se não chove, então a rua não fica molhada",
      "Não chove OU a rua fica molhada",
      "Chove OU a rua fica molhada",
    ],
    answerDescription:
      "A negação de P → Q é P ∧ ¬Q. Negar uma implicação = manter o antecedente E negar o consequente.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "A proposição 'FALSO → VERDADEIRO' é verdadeira ou falsa?",
    answer: "Verdadeira",
    wrongOptions: ["Falsa", "Indefinida", "Depende do consequente"],
    answerDescription:
      "Quando o antecedente é falso, a implicação é sempre verdadeira (vacuously true). F → V = V e F → F = V.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "Qual o valor de (A OR B) AND (NOT A) quando A=V e B=V?",
    answer: "FALSO",
    wrongOptions: ["VERDADEIRO", "Não definido", "VERDADEIRO quando B=V"],
    answerDescription: "A OR B = V OR V = V. NOT A = NOT V = F. V AND F = F.",
  },
  // Conjuntos
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "Em uma pesquisa, 60 pessoas gostam de Java, 45 de Python e 20 gostam de ambos. Quantas gostam de pelo menos uma?",
    answer: "85 pessoas",
    wrongOptions: ["105 pessoas", "80 pessoas", "65 pessoas"],
    answerDescription:
      "Princípio da inclusão-exclusão: |A ∪ B| = |A| + |B| − |A ∩ B| = 60 + 45 − 20 = 85.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "Se A tem 10 elementos, B tem 8 elementos e A ∩ B tem 3 elementos, quantos elementos tem A ∪ B?",
    answer: "15 elementos",
    wrongOptions: ["18 elementos", "21 elementos", "13 elementos"],
    answerDescription:
      "|A ∪ B| = |A| + |B| − |A ∩ B| = 10 + 8 − 3 = 15. Subtrai-se a interseção para não contar duas vezes.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "O que representa o produto cartesiano A × B?",
    answer: "Todos os pares ordenados (a, b) onde a ∈ A e b ∈ B",
    wrongOptions: [
      "A interseção de A e B",
      "A multiplicação dos elementos de A e B",
      "Os elementos que estão em A ou B",
    ],
    answerDescription:
      "A × B = {(a,b) | a ∈ A, b ∈ B}. Se |A|=3 e |B|=4, então |A × B| = 12 pares.",
  },
  // Combinatória
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "De quantas formas posso escolher 3 pessoas em um grupo de 10? (combinação)",
    answer: "120 formas",
    wrongOptions: ["30 formas", "720 formas", "60 formas"],
    answerDescription:
      "C(10,3) = 10! / (3! × 7!) = (10 × 9 × 8) / (3 × 2 × 1) = 720/6 = 120. Ordem não importa em combinações.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "Quantos arranjos de 2 letras são possíveis com A, B, C, D? (ordem importa)",
    answer: "12 arranjos",
    wrongOptions: ["6 arranjos", "8 arranjos", "16 arranjos"],
    answerDescription:
      "A(4,2) = 4! / (4-2)! = 4! / 2! = 24/2 = 12. Em arranjos, a ordem importa (AB ≠ BA).",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "Qual a probabilidade de tirar um número par em um dado de 6 faces?",
    answer: "1/2 ou 50%",
    wrongOptions: ["1/3", "1/6", "2/3"],
    answerDescription:
      "Números pares: {2, 4, 6} = 3 resultados favoráveis. P = 3/6 = 1/2 = 50%.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "De quantas formas posso sentar 5 pessoas em 5 cadeiras numeradas?",
    answer: "120 formas",
    wrongOptions: ["25 formas", "60 formas", "24 formas"],
    answerDescription: "Permutação: 5! = 5 × 4 × 3 × 2 × 1 = 120.",
  },
  // Bases numéricas
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "Converta o decimal 42 para binário.",
    answer: "101010",
    wrongOptions: ["110010", "100110", "101100"],
    answerDescription:
      "42 ÷ 2 = 21 r0, 21 ÷ 2 = 10 r1, 10 ÷ 2 = 5 r0, 5 ÷ 2 = 2 r1, 2 ÷ 2 = 1 r0, 1 ÷ 2 = 0 r1. Leitura de baixo para cima: 101010.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "Converta o hexadecimal 2A para decimal.",
    answer: "42",
    wrongOptions: ["32", "52", "38"],
    answerDescription:
      "2A₁₆ = 2×16¹ + 10×16⁰ = 32 + 10 = 42. A = 10 em hexadecimal.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "Converta o binário 11001100 para hexadecimal.",
    answer: "CC",
    wrongOptions: ["CB", "DC", "C4"],
    answerDescription:
      "Agrupa-se em 4 bits: 1100 1100. 1100₂ = C₁₆. Logo, CC₁₆. Cada 4 bits = 1 dígito hexadecimal.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "Qual o valor de 17 em octal?",
    answer: "21",
    wrongOptions: ["17", "11", "15"],
    answerDescription:
      "17 ÷ 8 = 2 r1. Leitura de baixo para cima: 21₈. Octal usa base 8 (dígitos 0-7).",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "Qual a probabilidade de acertar um item em um chute de 4 alternativas?",
    answer: "25%",
    wrongOptions: ["50%", "20%", "33%"],
    answerDescription:
      "P = 1/4 = 0,25 = 25%. Com 4 alternativas igualmente prováveis, a chance é 1 em 4.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "If A = {a, b} e B = {1, 2, 3}, quantos elementos tem A × B?",
    answer: "6 elementos",
    wrongOptions: ["5 elementos", "8 elementos", "3 elementos"],
    answerDescription:
      "|A × B| = |A| × |B| = 2 × 3 = 6. Os pares são: (a,1),(a,2),(a,3),(b,1),(b,2),(b,3).",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question: "Quantas senhas de 4 dígitos (0-9) são possíveis sem repetição?",
    answer: "5.040",
    wrongOptions: ["10.000", "3.024", "6.561"],
    answerDescription:
      "Arranjo: 10 × 9 × 8 × 7 = 5.040. Sem repetição, cada dígito usado está indisponível para as próximas posições.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "JUNIOR",
    question:
      "Qual a probabilidade de obter dois resultados iguais ao lançar 2 dados?",
    answer: "1/6 ≈ 16,67%",
    wrongOptions: ["1/36", "1/12", "1/3"],
    answerDescription:
      "Pares iguais: (1,1),(2,2),(3,3),(4,4),(5,5),(6,6) = 6 resultados. Total = 36. P = 6/36 = 1/6.",
  },

  // ── PLENO (Difícil — 20 questões) ──
  // Lógica Proposicional avançada
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Qual expressão é logicamente equivalente a ¬(P ∧ Q)?",
    answer: "¬P ∨ ¬Q (Lei de De Morgan)",
    wrongOptions: ["¬P ∧ ¬Q", "P ∨ Q", "P → ¬Q"],
    answerDescription:
      "Lei de De Morgan: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q. A negação de AND vira OR com operandos negados.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Qual a contrapositiva da proposição 'Se estudo, então passo'?",
    answer: "Se não passo, então não estudo",
    wrongOptions: [
      "Se passo, então estudo",
      "Se não estudo, então não passo",
      "Estudo ou não passo",
    ],
    answerDescription:
      "Contrapositiva de P → Q é ¬Q → ¬P. É logicamente equivalente à proposição original.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question:
      "Quantas linhas tem a tabela verdade de uma proposição com 4 variáveis?",
    answer: "16 linhas",
    wrongOptions: ["8 linhas", "32 linhas", "12 linhas"],
    answerDescription:
      "Nº de linhas = 2ⁿ onde n é o número de variáveis. 2⁴ = 16 linhas.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question:
      "Se P → Q é verdadeiro e Q é falso, o que podemos concluir sobre P? (Modus Tollens)",
    answer: "P é falso",
    wrongOptions: [
      "P é verdadeiro",
      "Não se pode concluir nada",
      "P é indefinido",
    ],
    answerDescription:
      "Modus Tollens: se P → Q é V e Q é F, então P deve ser F. Pois V → F seria F, contradizendo a premissa.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Qual a forma normal disjuntiva (DNF) de ¬(A → B)?",
    answer: "A ∧ ¬B",
    wrongOptions: ["¬A ∨ B", "¬A ∧ ¬B", "A ∨ ¬B"],
    answerDescription:
      "A → B ≡ ¬A ∨ B. Logo, ¬(A → B) ≡ ¬(¬A ∨ B) ≡ A ∧ ¬B (De Morgan).",
  },
  // Conjuntos avançados
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question:
      "Se |A| = 15, |B| = 12, |C| = 10, |A∩B| = 5, |A∩C| = 4, |B∩C| = 3, |A∩B∩C| = 2, qual é |A∪B∪C|?",
    answer: "27",
    wrongOptions: ["37", "25", "31"],
    answerDescription:
      "Inclusão-exclusão: |A∪B∪C| = 15 + 12 + 10 − 5 − 4 − 3 + 2 = 27.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Quantos subconjuntos tem um conjunto de 6 elementos?",
    answer: "64 subconjuntos",
    wrongOptions: ["32 subconjuntos", "36 subconjuntos", "128 subconjuntos"],
    answerDescription:
      "Nº de subconjuntos = 2ⁿ = 2⁶ = 64. Cada elemento pode estar ou não no subconjunto (2 opções por elemento).",
  },
  // Combinatória e Probabilidade
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question:
      "Qual a probabilidade de tirar 2 cartas de copas seguidas de um baralho de 52 cartas (sem reposição)?",
    answer: "≈ 5,88% (12/204)",
    wrongOptions: ["6,25%", "25%", "≈ 5%"],
    answerDescription:
      "P = (13/52) × (12/51) = 156/2652 = 12/204 ≈ 0,0588 = 5,88%. Sem reposição, o espaço amostral muda na 2ª carta.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question:
      "De quantas formas posso formar uma comissão de 3 homens e 2 mulheres, de um grupo de 7 homens e 5 mulheres?",
    answer: "350 formas",
    wrongOptions: ["210 formas", "420 formas", "500 formas"],
    answerDescription:
      "C(7,3) × C(5,2) = 35 × 10 = 350. Eventos independentes: multiplica-se as combinações.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Se lançarmos 2 dados, qual a probabilidade da soma ser 7?",
    answer: "1/6 ≈ 16,67%",
    wrongOptions: ["1/12", "1/36", "7/36"],
    answerDescription:
      "Combinações que somam 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 resultados. Total = 36. P = 6/36 = 1/6.",
  },
  // Bases numéricas avançadas
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Qual o resultado de 1011₂ + 1101₂ em binário?",
    answer: "11000",
    wrongOptions: ["10110", "10100", "11010"],
    answerDescription:
      "1011 (11) + 1101 (13) = 24. 24 em binário = 11000₂. Soma binária com carry: 1+1 = 10 (carry 1).",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Converta o decimal 255 para binário.",
    answer: "11111111",
    wrongOptions: ["10000000", "11111110", "11111101"],
    answerDescription:
      "255 = 2⁸ − 1 = 11111111₂. É o maior valor que 8 bits podem representar (todos os bits ligados).",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "O que representa a operação bitwise AND entre 10110 e 11010?",
    answer: "10010",
    wrongOptions: ["11110", "10000", "11010"],
    answerDescription:
      "AND bit a bit: 1&1=1, 0&1=0, 1&0=0, 1&1=1, 0&0=0 → 10010. Resultado 1 apenas onde ambos são 1.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Quantos endereços IPv4 são possíveis no total (32 bits)?",
    answer: "≈ 4,3 bilhões (2³²)",
    wrongOptions: ["≈ 16 milhões", "≈ 2 bilhões", "≈ 256 milhões"],
    answerDescription:
      "2³² = 4.294.967.296 ≈ 4,3 bilhões. Cada bit pode ser 0 ou 1, 32 bits = 2³² combinações.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question:
      "Quantos caracteres podem ser representados com 7 bits (padrão ASCII)?",
    answer: "128 caracteres",
    wrongOptions: ["256 caracteres", "64 caracteres", "512 caracteres"],
    answerDescription:
      "2⁷ = 128 caracteres. O ASCII padrão usa 7 bits. O ASCII estendido usa 8 bits = 256 caracteres.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Quantas permutações distintas tem a palavra BANANA?",
    answer: "60",
    wrongOptions: ["720", "120", "180"],
    answerDescription:
      "BANANA tem 6 letras: A(3×), N(2×), B(1×). P = 6!/(3!×2!×1!) = 720/(6×2×1) = 60.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question: "Qual a probabilidade de acertar na Mega-Sena (6 de 60)?",
    answer: "1 em 50.063.860",
    wrongOptions: ["1 em 1.000.000", "1 em 10.000.000", "1 em 100.000.000"],
    answerDescription:
      "C(60,6) = 60!/(6!×54!) = 50.063.860. É o total de combinações possíveis de 6 números entre 60.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question:
      "Se P(A) = 0,4 e P(B) = 0,3, e A e B são independentes, qual P(A ∩ B)?",
    answer: "0,12",
    wrongOptions: ["0,7", "0,1", "0,3"],
    answerDescription:
      "Eventos independentes: P(A ∩ B) = P(A) × P(B) = 0,4 × 0,3 = 0,12.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question:
      "Um sistema de senhas usa 8 caracteres com letras maiúsculas (26), minúsculas (26) e dígitos (10). Quantas senhas são possíveis?",
    answer: "≈ 218 trilhões (62⁸)",
    wrongOptions: ["≈ 62 bilhões", "≈ 2 bilhões", "≈ 1 trilhão"],
    answerDescription:
      "62 opções por posição, 8 posições: 62⁸ = 218.340.105.584.896 ≈ 218 trilhões.",
  },
  {
    category: "Raciocínio Lógico e Matemática Discreta",
    level: "PLENO",
    question:
      "Se P(A|B) = 0,6 e P(B) = 0,5, qual é P(A ∩ B)? (Teorema de Bayes)",
    answer: "0,3",
    wrongOptions: ["0,1", "0,5", "1,1"],
    answerDescription:
      "P(A|B) = P(A ∩ B)/P(B) → P(A ∩ B) = P(A|B) × P(B) = 0,6 × 0,5 = 0,3. É a definição de probabilidade condicional.",
  },
];

// ──────────────────────────────────────────
// CATEGORIA 3 — Matemática para TI
// ──────────────────────────────────────────

const itMathCards: MathCard[] = [
  // ── INICIANTE (20 questões) ──
  // Álgebra Linear básica
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é uma matriz em matemática?",
    answer: "Uma tabela retangular de números organizados em linhas e colunas",
    wrongOptions: [
      "Um vetor de uma dimensão",
      "Um gráfico de barras",
      "Uma equação de segundo grau",
    ],
    answerDescription:
      "Matriz é um arranjo retangular de números em m linhas e n colunas. Exemplo: uma matriz 2×3 tem 2 linhas e 3 colunas.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é um vetor?",
    answer:
      "Uma grandeza com magnitude e direção, representável como lista de números",
    wrongOptions: [
      "Um número inteiro qualquer",
      "Um tipo de matriz quadrada",
      "Uma equação linear",
    ],
    answerDescription:
      "Vetor é uma quantidade com magnitude e direção. Em computação, é uma lista ordenada de valores, como [3, 5, 2].",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "Qual a dimensão de uma matriz com 3 linhas e 2 colunas?",
    answer: "3 × 2",
    wrongOptions: ["2 × 3", "6 × 1", "3 + 2 = 5"],
    answerDescription:
      "A dimensão é expressa como linhas × colunas. Logo, 3 linhas e 2 colunas = 3×2.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é a matriz identidade?",
    answer:
      "Matriz quadrada com 1 na diagonal principal e 0 nas demais posições",
    wrongOptions: [
      "Matriz com todos os elementos iguais a 1",
      "Matriz com todos os elementos iguais a 0",
      "Matriz com elementos aleatórios",
    ],
    answerDescription:
      "A matriz identidade I tem 1 na diagonal principal e 0 nas outras posições. Multiplicar por I não altera a matriz original: A × I = A.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question:
      "Se A = [[1,2],[3,4]] e B = [[5,6],[7,8]], como se calcula A + B?",
    answer: "Soma-se elemento por elemento: [[6,8],[10,12]]",
    wrongOptions: [
      "Multiplica-se linha por coluna",
      "Concatena-se as matrizes",
      "Soma-se apenas a diagonal",
    ],
    answerDescription:
      "Soma de matrizes: cada elemento (i,j) do resultado é a(i,j) + b(i,j). 1+5=6, 2+6=8, 3+7=10, 4+8=12.",
  },
  // Complexidade básica
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que significa O(1) em complexidade de algoritmos?",
    answer: "Tempo constante, independente do tamanho da entrada",
    wrongOptions: [
      "Tempo linear",
      "O algoritmo executa exatamente 1 vez",
      "O algoritmo é o mais lento possível",
    ],
    answerDescription:
      "O(1) = tempo constante. O tempo de execução não muda independente do tamanho da entrada. Exemplo: acessar um elemento por índice.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que significa O(n) em complexidade de algoritmos?",
    answer: "Tempo linear — cresce proporcionalmente ao tamanho da entrada",
    wrongOptions: ["Tempo constante", "Tempo quadrático", "Tempo logarítmico"],
    answerDescription:
      "O(n) = tempo linear. Se a entrada dobra, o tempo dobra. Exemplo: percorrer todos os elementos de uma lista.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question:
      "Qual complexidade é mais rápida para entradas grandes: O(n) ou O(n²)?",
    answer: "O(n)",
    wrongOptions: ["O(n²)", "São iguais", "Depende do hardware"],
    answerDescription:
      "O(n) cresce linearmente, O(n²) quadraticamente. Para n=1.000: O(n)=1.000, O(n²)=1.000.000. Linear é sempre mais rápido para n grande.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é uma progressão aritmética (PA)?",
    answer: "Sequência onde a diferença entre termos consecutivos é constante",
    wrongOptions: [
      "Sequência onde cada termo é o dobro do anterior",
      "Sequência de números aleatórios",
      "Sequência de números primos",
    ],
    answerDescription:
      "PA: cada termo = anterior + razão constante (r). Exemplo: 2, 5, 8, 11... (r=3). Fórmula: aₙ = a₁ + (n-1)×r.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é uma progressão geométrica (PG)?",
    answer: "Sequência onde a razão entre termos consecutivos é constante",
    wrongOptions: [
      "Sequência onde a diferença entre termos é constante",
      "Sequência de números primos",
      "Sequência crescente qualquer",
    ],
    answerDescription:
      "PG: cada termo = anterior × razão (q). Exemplo: 2, 6, 18, 54... (q=3). Fórmula: aₙ = a₁ × q^(n-1).",
  },
  // Grafos básicos
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é um grafo?",
    answer:
      "Estrutura formada por vértices (nós) conectados por arestas (ligações)",
    wrongOptions: [
      "Um tipo de gráfico de barras",
      "Uma tabela de dados",
      "Uma lista de números",
    ],
    answerDescription:
      "Grafo = conjunto de vértices (nós) e arestas (conexões entre nós). Modelam redes, relacionamentos e rotas.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "Qual a diferença entre grafo direcionado e não direcionado?",
    answer:
      "No direcionado as arestas têm sentido (A→B), no não direcionado são bidirecionais",
    wrongOptions: [
      "São a mesma coisa",
      "Direcionado só tem um vértice",
      "Não direcionado não tem arestas",
    ],
    answerDescription:
      "Direcionado (dígrafo): arestas com direção (A→B ≠ B→A). Não direcionado: a conexão A-B é bidirecional.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é o grau de um vértice em um grafo?",
    answer: "Número de arestas que se conectam a ele",
    wrongOptions: [
      "O valor numérico do vértice",
      "A distância até o centro do grafo",
      "O número total de vértices do grafo",
    ],
    answerDescription:
      "O grau de um vértice é a quantidade de arestas incidentes. Se um nó tem 3 conexões, seu grau é 3.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "Quantas arestas tem um grafo completo com 4 vértices (K₄)?",
    answer: "6 arestas",
    wrongOptions: ["4 arestas", "8 arestas", "12 arestas"],
    answerDescription:
      "Grafo completo Kₙ tem n(n-1)/2 arestas. K₄ = 4×3/2 = 6. Cada vértice se conecta a todos os outros.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é um caminho em um grafo?",
    answer:
      "Sequência de vértices onde cada par consecutivo está conectado por aresta",
    wrongOptions: [
      "Qualquer conjunto de vértices",
      "Uma aresta isolada",
      "O vértice com maior grau",
    ],
    answerDescription:
      "Caminho é uma sequência v₁, v₂, ..., vₖ onde cada (vᵢ, vᵢ₊₁) é aresta. Exemplo: A → B → C é um caminho de A a C.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é um ciclo em um grafo?",
    answer: "Um caminho que começa e termina no mesmo vértice",
    wrongOptions: [
      "Um grafo sem arestas",
      "Uma aresta que liga dois grafos",
      "Um vértice sem conexões",
    ],
    answerDescription:
      "Ciclo é um caminho fechado: v₁ → v₂ → ... → v₁. Exemplo: A → B → C → A forma um ciclo de tamanho 3.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "Qual o 10º termo da PA: 3, 7, 11, 15, ...?",
    answer: "39",
    wrongOptions: ["35", "43", "37"],
    answerDescription:
      "PA com a₁=3 e r=4. aₙ = a₁ + (n-1)×r = 3 + 9×4 = 3 + 36 = 39.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "Qual o 5º termo da PG: 2, 6, 18, ...?",
    answer: "162",
    wrongOptions: ["54", "108", "324"],
    answerDescription: "PG com a₁=2 e q=3. a₅ = 2 × 3⁴ = 2 × 81 = 162.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question: "O que é a notação Big O?",
    answer:
      "Forma de descrever o crescimento do tempo de execução de um algoritmo no pior caso",
    wrongOptions: [
      "Nota do algoritmo em uma prova",
      "O número exato de operações",
      "A quantidade de memória usada",
    ],
    answerDescription:
      "Big O descreve o limite superior de crescimento do tempo. O(n) = no máximo linear, O(n²) = no máximo quadrático.",
  },
  {
    category: "Matemática para TI",
    level: "INICIANTE",
    question:
      "Se uma pesquisa binária reduz a busca pela metade a cada passo, qual sua complexidade?",
    answer: "O(log n)",
    wrongOptions: ["O(n)", "O(n²)", "O(1)"],
    answerDescription:
      "Busca binária divide o espaço por 2 a cada passo. Em log₂(n) passos encontra o resultado. Para n=1.000.000: ~20 passos.",
  },

  // ── JUNIOR (Médio — 20 questões) ──
  // Álgebra Linear
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "Qual o determinante da matriz [[2,3],[1,4]]?",
    answer: "5",
    wrongOptions: ["7", "11", "-1"],
    answerDescription:
      "Det 2×2: ad − bc = (2×4) − (3×1) = 8 − 3 = 5. Determinante indica se a matriz é inversível (det ≠ 0).",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question:
      "Se multiplicamos uma matriz 2×3 por uma 3×4, qual a dimensão do resultado?",
    answer: "2 × 4",
    wrongOptions: ["3 × 3", "2 × 3", "3 × 4"],
    answerDescription:
      "Multiplicação A(m×n) × B(n×p) = C(m×p). Logo 2×3 × 3×4 = 2×4. O nº de colunas de A deve igualar o de linhas de B.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "O que é a transposta de uma matriz?",
    answer: "Matriz obtida trocando linhas por colunas",
    wrongOptions: [
      "Matriz com elementos invertidos",
      "Matriz com sinal oposto em todos elementos",
      "A divisão da matriz por ela mesma",
    ],
    answerDescription:
      "Transposta (Aᵀ): elemento (i,j) vira (j,i). Se A é 2×3, Aᵀ é 3×2. Exemplo: [[1,2],[3,4]]ᵀ = [[1,3],[2,4]].",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "Qual o produto escalar dos vetores [1,2,3] e [4,5,6]?",
    answer: "32",
    wrongOptions: ["21", "30", "36"],
    answerDescription:
      "Produto escalar = 1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32. Soma dos produtos dos componentes correspondentes.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "O que significa dizer que uma matriz é singular?",
    answer: "Seu determinante é zero e ela não possui inversa",
    wrongOptions: [
      "Possui apenas um elemento",
      "É uma matriz identidade",
      "Seus elementos são todos iguais",
    ],
    answerDescription:
      "Matriz singular: det = 0 → não inversível. Sistemas lineares com matriz singular podem ser impossíveis ou indeterminados.",
  },
  // Complexidade
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question:
      "Qual a complexidade de dois loops aninhados, cada um iterando n vezes?",
    answer: "O(n²)",
    wrongOptions: ["O(n)", "O(2n)", "O(n log n)"],
    answerDescription:
      "Loop externo: n vezes. Loop interno: n vezes para cada iteração do externo. Total: n × n = O(n²).",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "Qual a complexidade do Merge Sort?",
    answer: "O(n log n)",
    wrongOptions: ["O(n²)", "O(n)", "O(log n)"],
    answerDescription:
      "Merge Sort divide a lista em 2 (log n divisões) e faz merge linear (n) em cada nível. Total: O(n log n) em todos os casos.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question:
      "Se um algoritmo O(n log n) leva 10ms para n=1.000, quanto levaria para n=1.000.000 (estimativa)?",
    answer: "≈ 20 segundos",
    wrongOptions: ["≈ 10 segundos", "≈ 100 segundos", "≈ 2 segundos"],
    answerDescription:
      "Razão: (10⁶ × log 10⁶) / (10³ × log 10³) ≈ (10⁶ × 20) / (10³ × 10) = 2×10⁷ / 10⁴ = 2.000. Tempo ≈ 10ms × 2.000 = 20s.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "Qual a soma dos 100 primeiros termos da PA: 1, 2, 3, ..., 100?",
    answer: "5.050",
    wrongOptions: ["5.000", "5.100", "10.000"],
    answerDescription:
      "Fórmula de Gauss: S = n(a₁ + aₙ)/2 = 100(1 + 100)/2 = 100 × 101/2 = 5.050.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "Qual a soma dos 6 primeiros termos da PG: 1, 2, 4, 8, ...?",
    answer: "63",
    wrongOptions: ["32", "64", "31"],
    answerDescription:
      "Sₙ = a₁ × (qⁿ − 1)/(q − 1) = 1 × (2⁶ − 1)/(2 − 1) = (64 − 1)/1 = 63. Ou: 1+2+4+8+16+32 = 63.",
  },
  // Grafos
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "Quantas arestas tem um grafo completo com 10 vértices (K₁₀)?",
    answer: "45 arestas",
    wrongOptions: ["100 arestas", "50 arestas", "90 arestas"],
    answerDescription:
      "K₁₀ = 10 × 9/2 = 45 arestas. Fórmula do grafo completo: n(n-1)/2.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "O que é uma árvore em teoria dos grafos?",
    answer: "Grafo conexo sem ciclos",
    wrongOptions: [
      "Grafo completo",
      "Grafo com exatamente um ciclo",
      "Grafo direcionado",
    ],
    answerDescription:
      "Árvore = grafo conexo acíclico. Com n vértices, tem exatamente n-1 arestas. Base de estruturas como árvores binárias.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "Quantas arestas tem uma árvore com 8 vértices?",
    answer: "7 arestas",
    wrongOptions: ["8 arestas", "6 arestas", "16 arestas"],
    answerDescription:
      "Árvore com n vértices sempre tem n-1 arestas. 8 vértices → 7 arestas.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "O que é o algoritmo de Dijkstra?",
    answer:
      "Algoritmo que encontra o caminho mais curto entre dois vértices em grafos com pesos não negativos",
    wrongOptions: [
      "Algoritmo de ordenação",
      "Algoritmo de busca em largura",
      "Algoritmo que detecta ciclos",
    ],
    answerDescription:
      "Dijkstra calcula a menor distância de um vértice de origem para todos os outros. Complexidade: O(V² ou (V+E)log V com heap).",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "O que é BFS (Busca em Largura)?",
    answer: "Explora o grafo nível por nível a partir de um vértice inicial",
    wrongOptions: [
      "Explora o mais profundo primeiro",
      "Encontra o caminho mais longo",
      "Ordena os vértices por grau",
    ],
    answerDescription:
      "BFS visita todos os vizinhos antes de ir para o próximo nível. Usa fila (FIFO). Encontra menor caminho em grafos sem peso.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "O que é DFS (Busca em Profundidade)?",
    answer: "Explora o grafo indo o mais fundo possível antes de retroceder",
    wrongOptions: [
      "Explora nível por nível",
      "Visita apenas vértices sem arestas",
      "Encontra sempre o menor caminho",
    ],
    answerDescription:
      "DFS segue um caminho até não poder mais avançar, depois retrocede (backtracking). Usa pilha (LIFO) ou recursão.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question:
      "Qual a complexidade de busca em uma tabela hash com boa distribuição?",
    answer: "O(1) em média",
    wrongOptions: ["O(n)", "O(log n)", "O(n²)"],
    answerDescription:
      "Tabelas hash com boa função hash têm O(1) amortizado para busca, inserção e remoção. No pior caso (colisões extremas): O(n).",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question:
      "Se um algoritmo resolve n=100 em 1s e n=200 em 8s, qual a provável complexidade?",
    answer: "O(n³)",
    wrongOptions: ["O(n²)", "O(n)", "O(2ⁿ)"],
    answerDescription:
      "Quando n dobra (×2), tempo multiplica por 8 (=2³). Isso indica O(n³).",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question:
      "Em uma árvore binária completa de altura h=4, quantos nós folha (último nível) existem?",
    answer: "16 nós",
    wrongOptions: ["8 nós", "15 nós", "32 nós"],
    answerDescription:
      "Nós folha em árvore binária completa = 2ʰ = 2⁴ = 16. Total de nós = 2^(h+1) − 1 = 31.",
  },
  {
    category: "Matemática para TI",
    level: "JUNIOR",
    question: "Qual a complexidade do Bubble Sort no pior caso?",
    answer: "O(n²)",
    wrongOptions: ["O(n log n)", "O(n)", "O(log n)"],
    answerDescription:
      "Bubble Sort no pior caso faz n(n-1)/2 comparações ≈ O(n²). É ineficiente para listas grandes.",
  },

  // ── PLENO (Difícil — 20 questões) ──
  // Álgebra Linear avançada
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "O que são autovalores e autovetores de uma matriz?",
    answer:
      "Escalar λ e vetor v tal que Av = λv — a transformação só escala, não muda direção",
    wrongOptions: [
      "Valores na diagonal principal",
      "Os menores elementos da matriz",
      "Vetores linha da matriz transposta",
    ],
    answerDescription:
      "Av = λv: ao multiplicar a matriz pelo autovetor, o resultado é o mesmo vetor escalado por λ. Fundamentais em PCA, grafos espectrais e estabilidade.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "Qual a complexidade padrão da multiplicação de matrizes n×n?",
    answer: "O(n³)",
    wrongOptions: ["O(n²)", "O(n² log n)", "O(n)"],
    answerDescription:
      "Método ingênuo: 3 loops aninhados (linha × coluna × soma). n³ multiplicações. Algoritmo de Strassen: O(n^2.807).",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "O que é decomposição em valores singulares (SVD)?",
    answer:
      "Fatoração A = UΣVᵀ, decompondo a matriz em rotação, escala e rotação",
    wrongOptions: [
      "Transformar a matriz em diagonal",
      "Calcular a inversa pela transposta",
      "Dividir a matriz em blocos iguais",
    ],
    answerDescription:
      "SVD: A = UΣVᵀ. U e V são matrizes ortogonais (rotação), Σ é diagonal (escala). Usado em compressão, recomendação e PCA.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question:
      "Se uma transformação linear tem determinante 0, o que isso implica geometricamente?",
    answer:
      "A transformação colapsa o espaço em dimensão menor (perde informação)",
    wrongOptions: [
      "Mantém o espaço inalterado",
      "Dobra o volume do espaço",
      "Inverte a orientação do espaço",
    ],
    answerDescription:
      "Det = 0 → transformação não inversível. Geometricamente, 'achata' o espaço (ex: 3D vira 2D). O volume resultante é zero.",
  },
  // Complexidade avançada
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "Qual a relação entre as classes P, NP e NP-completo?",
    answer:
      "P ⊆ NP. NP-completo são os problemas mais difíceis de NP. Se um NP-completo estiver em P, então P = NP",
    wrongOptions: [
      "P = NP já foi provado",
      "NP são problemas impossíveis de resolver",
      "NP-completo são problemas que não estão em NP",
    ],
    answerDescription:
      "P: resolvíveis em tempo polinomial. NP: verificáveis em tempo polinomial. NP-completo: os mais difíceis de NP (todo NP se reduz a eles). P = NP? é um problema aberto do milênio.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "Qual a complexidade do quicksort no caso médio e no pior caso?",
    answer: "Médio: O(n log n), Pior: O(n²)",
    wrongOptions: [
      "Médio: O(n²), Pior: O(n log n)",
      "Ambos: O(n log n)",
      "Médio: O(n), Pior: O(n log n)",
    ],
    answerDescription:
      "Quicksort: caso médio O(n log n) com bom pivô. Pior caso O(n²) quando pivô é sempre o menor/maior. Randomização mitiga.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "Se T(n) = 2T(n/2) + n, qual a complexidade pelo Teorema Mestre?",
    answer: "O(n log n)",
    wrongOptions: ["O(n)", "O(n²)", "O(log n)"],
    answerDescription:
      "Teorema Mestre: a=2, b=2, f(n)=n. log_b(a) = log₂2 = 1. f(n) = Θ(n¹) → Caso 2: O(n^1 × log n) = O(n log n). É a recorrência do merge sort.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question:
      "Qual a diferença entre complexidade de tempo e complexidade de espaço?",
    answer:
      "Tempo mede operações executadas, espaço mede memória auxiliar usada",
    wrongOptions: [
      "São a mesma coisa",
      "Espaço sempre é menor que tempo",
      "Tempo mede memória, espaço mede operações",
    ],
    answerDescription:
      "Complexidade de tempo: número de operações em função de n. Espaço: memória adicional usada. Merge sort: O(n log n) tempo, O(n) espaço.",
  },
  // Grafos avançados
  {
    category: "Matemática para TI",
    level: "PLENO",
    question:
      "Qual algoritmo encontra a árvore geradora mínima em um grafo ponderado?",
    answer: "Kruskal ou Prim",
    wrongOptions: ["Dijkstra", "Floyd-Warshall", "Bellman-Ford"],
    answerDescription:
      "Kruskal: ordena arestas por peso e adiciona sem formar ciclo (usa union-find). Prim: cresce a árvore a partir de um vértice. Ambos garantem custo mínimo.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question:
      "Qual a complexidade do algoritmo de Floyd-Warshall para caminhos mínimos entre todos os pares?",
    answer: "O(V³)",
    wrongOptions: ["O(V²)", "O(V² log V)", "O(VE)"],
    answerDescription:
      "Floyd-Warshall usa 3 loops aninhados sobre V vértices: O(V³). Funciona com pesos negativos (sem ciclos negativos).",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "O que é uma ordenação topológica?",
    answer:
      "Ordenação linear de vértices de um DAG onde cada aresta (u,v) tem u antes de v",
    wrongOptions: [
      "Ordenação por grau de cada vértice",
      "Ordenação por peso das arestas",
      "Ordenação dos vértices em ordem alfabética",
    ],
    answerDescription:
      "Ordenação topológica só existe em DAGs (grafos direcionados acíclicos). Usada em gerenciamento de dependências (build systems, npm, etc.).",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "Como detectar se um grafo não direcionado é bipartido?",
    answer:
      "BFS ou DFS tentando colorir com 2 cores — se não houver conflito, é bipartido",
    wrongOptions: [
      "Verificar se tem ciclo par",
      "Contar o número de arestas",
      "Calcular o determinante da matriz de adjacência",
    ],
    answerDescription:
      "Grafo bipartido: pode-se dividir vértices em 2 grupos sem arestas internas. Equivale a 2-coloração. BFS: se vizinho já tem mesma cor → não é bipartido.",
  },
  // Mistos avançados
  {
    category: "Matemática para TI",
    level: "PLENO",
    question:
      "Qual o número mínimo de comparações para encontrar o máximo em um array de n elementos?",
    answer: "n − 1 comparações",
    wrongOptions: ["n comparações", "log n comparações", "n/2 comparações"],
    answerDescription:
      "Cada comparação elimina 1 candidato. Para encontrar 1 vencedor entre n, precisa de n-1 eliminações. É ótimo (limite inferior provado).",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question:
      "Qual a complexidade de busca em uma árvore binária de busca balanceada?",
    answer: "O(log n)",
    wrongOptions: ["O(n)", "O(n log n)", "O(1)"],
    answerDescription:
      "BST balanceada (AVL, Red-Black): altura ≈ log₂(n). Cada comparação elimina metade dos nós. O(log n) para busca, inserção e remoção.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "O que é programação dinâmica?",
    answer:
      "Técnica que resolve problemas dividindo em subproblemas sobrepostos e armazenando resultados para evitar recálculo",
    wrongOptions: [
      "Um paradigma de linguagem de programação",
      "Programação orientada a objetos dinâmica",
      "Alocação dinâmica de memória",
    ],
    answerDescription:
      "Programação dinâmica = optimal substructure + overlapping subproblems. Memoriza resultados (memoization ou tabulação) para evitar recalcular. Ex: Fibonacci, knapsack.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question:
      "Se um grafo tem V vértices e E arestas, qual a complexidade espacial de uma lista de adjacência?",
    answer: "O(V + E)",
    wrongOptions: ["O(V²)", "O(E²)", "O(V × E)"],
    answerDescription:
      "Lista de adjacência: V listas + E entradas de arestas = O(V+E). Mais eficiente que matriz de adjacência (O(V²)) para grafos esparsos.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question:
      "Qual a complexidade amortizada de push em um array dinâmico (ArrayList/Vector)?",
    answer: "O(1) amortizado",
    wrongOptions: ["O(n)", "O(log n)", "O(n²)"],
    answerDescription:
      "Quando realloc dobra o tamanho, copia n elementos (O(n)), mas isso acontece raramente. Em média: O(1) amortizado por análise agregada.",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "O que é o problema do caminho hamiltoniano?",
    answer:
      "Encontrar um caminho que visita cada vértice exatamente uma vez — é NP-completo",
    wrongOptions: [
      "Encontrar o caminho mais curto",
      "Encontrar um caminho que usa cada aresta uma vez",
      "Verificar se o grafo é conexo",
    ],
    answerDescription:
      "Hamiltoniano: visita todos os vértices 1 vez. NP-completo: não se conhece algoritmo polinomial. Diferente do Euleriano (usa cada aresta 1 vez).",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question: "Qual a profundidade máxima de uma árvore AVL com 15 nós?",
    answer: "4 (altura ≤ 1.44 log₂(n+2))",
    wrongOptions: ["7", "15", "3"],
    answerDescription:
      "AVL: árvore binária auto-balanceada. Altura máxima ≈ 1.44 × log₂(17) ≈ 1.44 × 4.09 ≈ 5.9 → 4 na prática com 15 nós (pois 2⁴−1=15 formam uma árvore completa de altura 3, e AVL permite desbalancear levemente: altura 4).",
  },
  {
    category: "Matemática para TI",
    level: "PLENO",
    question:
      "Qual a complexidade de espaço do BFS em um grafo com V vértices e E arestas?",
    answer: "O(V)",
    wrongOptions: ["O(E)", "O(V + E)", "O(V²)"],
    answerDescription:
      "BFS armazena vértices na fila e no conjunto de visitados, ambos limitados a O(V). A complexidade de tempo é O(V + E), mas o espaço da fila é O(V).",
  },
];

// ─────────────────────────────
// Construção e inserção no banco
// ─────────────────────────────

const allMathCards: MathCard[] = [...basicCards, ...logicCards, ...itMathCards];

async function main() {
  const cards: Prisma.ReadyFlashcardCreateManyInput[] = allMathCards.map(
    (card) => ({
      track: "MATEMATICA" as const,
      category: card.category,
      level: card.level,
      question: card.question,
      answer: card.answer,
      wrongOptions: card.wrongOptions,
      answerDescription: card.answerDescription,
    }),
  );

  await prisma.readyFlashcard.deleteMany({
    where: { track: "MATEMATICA" },
  });

  await prisma.readyFlashcard.createMany({ data: cards });

  const countByLevel = {
    INICIANTE: cards.filter((c) => c.level === "INICIANTE").length,
    JUNIOR: cards.filter((c) => c.level === "JUNIOR").length,
    PLENO: cards.filter((c) => c.level === "PLENO").length,
  };

  console.log(
    `Seed concluído: ${cards.length} cards de Matemática salvos no MongoDB.`,
  );
  console.log(`  Fácil (INICIANTE): ${countByLevel.INICIANTE}`);
  console.log(`  Médio (JUNIOR): ${countByLevel.JUNIOR}`);
  console.log(`  Difícil (PLENO): ${countByLevel.PLENO}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
