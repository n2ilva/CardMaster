import type { SeedCard } from "../generator";

type UserLevel = "Fácil" | "Médio" | "Difícil";

// ─── Machine Learning e IA · 10 categorias × 3 níveis × 7 questões (rodada 4/30) ───) ───

const machineLearningBankBase: Record<string, Record<UserLevel, SeedCard[]>> = {
  // ── Algoritmos de Classificação ──
  "Algoritmos de Classificação": {
    Fácil: [
      {
        q: "Qual algoritmo de classificação calcula a distância entre um novo ponto e seus K vizinhos mais próximos para prever a classe?",
        o: ["K-Nearest Neighbors (KNN)", "Regressão Linear", "K-Means", "PCA"],
        c: 0,
        e: "O KNN classifica um novo dado encontrando os K pontos mais próximos no conjunto de treino e atribuindo a classe mais frequente entre eles. É um algoritmo 'lazy learning' — não constrói modelo, apenas memoriza os dados de treino.",
        x: "Para classificar um e-mail: KNN com K=5 encontra os 5 e-mails mais semelhantes no treino. Se 4 são spam e 1 é legítimo, classifica como spam (votação majoritária).",
      },
      {
        q: "Qual algoritmo de classificação cria regras de decisão em formato de árvore para dividir os dados?",
        o: [
          "Árvore de Decisão (Decision Tree)",
          "Regressão Linear",
          "K-Means",
          "PCA",
        ],
        c: 0,
        e: "Árvores de Decisão classificam dados fazendo perguntas sequenciais sobre as features. Cada nó interno testa uma condição (ex: idade > 30?), cada ramo é um resultado, e cada folha é uma classe. São interpretáveis mas propensas a overfitting.",
        x: "Aprovar empréstimo: Renda > 5k? Sim → Histórico bom? Sim → Aprovar. Não → Dívidas < 30%? Sim → Aprovar. Não → Negar. Cada folha é uma decisão.",
      },
      {
        q: "O que é classificação binária vs multi-classe em Machine Learning?",
        o: [
          "Binária: 2 classes (sim/não); multi-classe: 3+ classes (gato/cão/pássaro)",
          "Binária usa números e multi-classe usa texto",
          "São idênticas",
          "Multi-classe só funciona com redes neurais",
        ],
        c: 0,
        e: "Classificação binária tem exatamente 2 classes (spam/não-spam, fraude/legítimo). Multi-classe tem 3 ou mais classes (dígitos 0-9, espécies de flores). Algoritmos como Logistic Regression são naturalmente binários; para multi-classe, usam-se estratégias como One-vs-All ou Softmax.",
        x: "Binária: e-mail é spam ou não-spam (sigmoid, threshold 0.5). Multi-classe: reconhecer dígitos 0-9 em fotos (softmax com 10 saídas, cada uma a probabilidade de ser 0,1,...,9).",
      },
      {
        q: "O que é o algoritmo Naive Bayes e por que ele é considerado 'ingênuo'?",
        o: [
          "Assume que todas as features são independentes entre si dada a classe, simplificando o cálculo de probabilidades",
          "É ingênuo porque usa poucas features",
          "Porque só funciona com dados pequenos",
          "Porque ignora as probabilidades",
        ],
        c: 0,
        e: "Naive Bayes aplica o teorema de Bayes assumindo independência condicional entre features: P(classe|features) ∝ P(classe) × ∏P(featureᵢ|classe). A suposição 'ingênua' raramente é verdadeira, mas funciona surpreendentemente bem para texto, spam e classificação de documentos.",
        x: "Classificar e-mail: P(spam|'ganhe','dinheiro','agora') ∝ P(spam) × P('ganhe'|spam) × P('dinheiro'|spam) × P('agora'|spam). Assume que as palavras são independentes — 'ganhe' não influencia 'dinheiro' — ingênuo mas eficaz.",
      },
      {
        q: "Qual é a diferença entre dados de treino e dados de teste em classificação?",
        o: [
          "Dados de treino servem para o modelo aprender padrões; dados de teste avaliam o desempenho em dados nunca vistos",
          "São os mesmos dados usados duas vezes",
          "Dados de teste são usados para treinar",
          "Não há diferença prática",
        ],
        c: 0,
        e: "O dataset é dividido em treino (~70-80%) e teste (~20-30%). O modelo aprende padrões nos dados de treino. Depois, é avaliado nos dados de teste (nunca vistos) para medir generalização. Usar os mesmos dados para treinar e avaliar leva a métricas falsamente altas (data leakage).",
        x: "1000 e-mails: 800 para treino (modelo aprende o que é spam), 200 para teste (avalia sem viés). Accuracy no treino: 99%. Accuracy no teste: 92%. A diferença de 7% indica leve overfitting.",
      },
      {
        q: "O que é a Regressão Logística quando usada para classificação, apesar do nome sugerir 'regressão'?",
        o: [
          "Estima a probabilidade de pertencer a uma classe usando a função sigmoid, prevendo a classe mais provável",
          "É um modelo de regressão que prevê valores contínuos",
          "É idêntica à Regressão Linear",
          "Só funciona com variáveis categóricas",
        ],
        c: 0,
        e: "A Regressão Logística aplica a função sigmoid σ(z) = 1/(1+e^-z) sobre uma combinação linear das features, produzindo um valor entre 0 e 1 interpretado como probabilidade. Se P ≥ 0.5, prediz classe 1. O nome 'regressão' vem do fato de que estima uma probabilidade contínua, mas a decisão final é de classificação.",
        x: "Prever se aluno passa: z = 0.3×horas + 0.2×frequência − 4.0. Aluno com 10h e 80%: z = 3+16−4 = 15 → σ(15) ≈ 1.0 → classe 'Aprovado'. Aluno com 2h e 30%: z = 0.6+6−4 = 2.6 → σ(2.6) ≈ 0.93 → 'Aprovado'. Aluno com 0h e 10%: z = 0+2−4 = −2 → σ(−2) ≈ 0.12 → 'Reprovado'.",
      },
      {
        q: "Por que é importante normalizar ou padronizar os dados antes de usar algoritmos baseados em distância como o KNN?",
        o: [
          "Porque features com escalas maiores dominam o cálculo de distância, ignorando features menores mas relevantes",
          "Porque o KNN só aceita dados entre 0 e 1",
          "Normalizar melhora a acurácia em todos os algoritmos sem exceção",
          "Não faz diferença para o KNN",
        ],
        c: 0,
        e: "Se 'salário' varia de 1000 a 100000 e 'idade' de 18 a 80, a distância euclidiana será dominada por salário. Normalização (min-max para [0,1]) ou padronização (z-score, média=0, desvio=1) equipara as escalas, garantindo que todas as features contribuam proporcionalmente.",
        x: "Sem normalização: distância entre João (25 anos, R$5000) e Maria (30 anos, R$80000) ≈ 75000 (dominada por salário). Com normalização: idade_norm = [0.11, 0.19], salário_norm = [0.04, 0.80] → distância = 0.76, ambas features pesam igualmente.",
      },
    ],
    Médio: [
      {
        q: "Na Regressão Logística, qual função transforma a saída linear em uma probabilidade entre 0 e 1?",
        o: [
          "Função Sigmoid (logística)",
          "Função ReLU",
          "Função Softmax",
          "Função Tangente Hiperbólica",
        ],
        c: 0,
        e: "A função sigmoid σ(z) = 1/(1 + e^(-z)) mapeia qualquer valor real para o intervalo (0, 1), interpretado como probabilidade. Para classificação binária, se σ(z) ≥ 0.5, prediz classe 1; caso contrário, classe 0. O limiar pode ser ajustado.",
        x: "z = w₁x₁ + w₂x₂ + b = 2.5 → σ(2.5) = 1/(1+e^(-2.5)) ≈ 0.924 → probabilidade de 92.4% para classe positiva → prediz classe 1.",
      },
      {
        q: "O que é a matriz de confusão e quais métricas ela permite calcular?",
        o: [
          "Tabela que mostra TP, FP, TN, FN; permite calcular acurácia, precisão, recall e F1-Score",
          "Gráfico de dispersão",
          "Tabela de correlações entre features",
          "Histograma de distribuição",
        ],
        c: 0,
        e: "A matriz de confusão mostra: TP (verdadeiro positivo), FP (falso positivo), FN (falso negativo), TN (verdadeiro negativo). Precision = TP/(TP+FP), Recall = TP/(TP+FN), F1 = 2×(P×R)/(P+R), Accuracy = (TP+TN)/total.",
        x: "Detector de fraude: 90 transações legítimas corretas (TN), 5 fraudes detectadas (TP), 3 fraudes não detectadas (FN), 2 falsos alarmes (FP). Precision = 5/7 = 71%, Recall = 5/8 = 62.5%.",
      },
      {
        q: "O que é a curva ROC e como o AUC ajuda a avaliar classificadores?",
        o: [
          "Curva que plota TPR vs FPR em diferentes thresholds; AUC = área sob a curva, 1.0 = perfeito, 0.5 = aleatório",
          "Gráfico de loss vs epochs",
          "Curva de aprendizado",
          "Gráfico de resíduos",
        ],
        c: 0,
        e: "A curva ROC (Receiver Operating Characteristic) plota True Positive Rate (Recall) vs False Positive Rate para cada threshold de decisão. AUC (Area Under Curve) resume a performance: 1.0 = classificação perfeita, 0.5 = aleatório. Permite comparar modelos independente do threshold.",
        x: "Modelo A: AUC = 0.95 (excelente). Modelo B: AUC = 0.72 (razoável). Modelo random: AUC = 0.50 (diagonal). Escolhemos o modelo A. O threshold ótimo é onde a curva ROC está mais distante da diagonal.",
      },
      {
        q: "O que é o F1-Score e quando ele é preferível à accuracy como métrica de classificação?",
        o: [
          "É a média harmônica de Precision e Recall; preferível quando as classes são desbalanceadas",
          "É a média aritmética de Precision e Recall",
          "É usado apenas para regressão",
          "É sempre igual à accuracy",
        ],
        c: 0,
        e: "F1 = 2×(Precision×Recall)/(Precision+Recall). Em datasets desbalanceados (ex: 95% não-fraude, 5% fraude), accuracy alta (95%) pode ser enganosa — o modelo pode simplesmente prever 'não-fraude' sempre. F1 penaliza modelos que ignoram a classe minoritária, forçando bom Precision E Recall.",
        x: "Detecção de câncer: 1000 pacientes, 50 positivos. Modelo A: prediz tudo negativo → accuracy 95%, F1=0. Modelo B: acerta 40 positivos, 10 falsos alarmes → accuracy 94%, F1=0.80. F1 revela que B é muito melhor.",
      },
      {
        q: "O que são hiperparâmetros em algoritmos de classificação e como diferem dos parâmetros do modelo?",
        o: [
          "Hiperparâmetros são definidos antes do treino (ex: K no KNN); parâmetros são aprendidos durante o treino (ex: pesos)",
          "São a mesma coisa",
          "Parâmetros são definidos manualmente",
          "Hiperparâmetros só existem em redes neurais",
        ],
        c: 0,
        e: "Parâmetros do modelo (pesos, bias) são aprendidos automaticamente durante o treino via otimização. Hiperparâmetros (learning rate, K, profundidade da árvore) são definidos ANTES do treino pelo cientista de dados. Grid Search e Random Search testam combinações de hiperparâmetros sistematicamente.",
        x: "KNN: K=3 (hiperparâmetro, você escolhe). Os 3 vizinhos mais próximos (parâmetro implícito, determinado pelos dados). Testando K=[1,3,5,7,9] via Grid Search: K=5 deu melhor accuracy no validation set.",
      },
      {
        q: "O que é overfitting em classificação e como o conjunto de validação (validation set) ajuda a detectá-lo?",
        o: [
          "Overfitting é quando o modelo decora o treino; o validation set mede performance em dados não usados no treino para detectar esse problema",
          "Overfitting melhora a generalização",
          "O validation set é usado para treinar o modelo",
          "Overfitting só ocorre em redes neurais",
        ],
        c: 0,
        e: "Dividir dados em treino/validação/teste: treino para aprender, validação para tunar hiperparâmetros e detectar overfitting, teste para avaliação final. Se accuracy no treino é 99% mas na validação é 75%, há overfitting. Soluções: mais dados, regularização, simplificar modelo, dropout, early stopping.",
        x: "Árvore de Decisão sem limite de profundidade: treino 100%, validação 70% → overfitting severo. Com max_depth=5: treino 88%, validação 85% → generaliza melhor. O gap treino-validação caiu de 30% para 3%.",
      },
      {
        q: "Qual a diferença entre as técnicas de Bagging e Boosting em ensembles de classificação?",
        o: [
          "Bagging treina modelos em paralelo com subsets aleatórios; Boosting treina sequencialmente corrigindo erros anteriores",
          "São a mesma técnica",
          "Bagging é sempre superior ao Boosting",
          "Boosting treina modelos em paralelo",
        ],
        c: 0,
        e: "Bagging (Bootstrap AGGregatING): gera N subsets via amostragem com reposição, treina N modelos independentemente, combina por votação. Reduz variância. Ex: Random Forest. Boosting: treina modelos sequencialmente, cada um focando nos erros do anterior. Reduz bias e variância. Ex: AdaBoost, XGBoost.",
        x: "Bagging: 100 árvores independentes, cada uma vê 63% dos dados (bootstrap). Votação: 70 dizem 'gato', 30 dizem 'cão' → 'gato'. Boosting: árvore 1 erra 20 exemplos → árvore 2 dá mais peso a esses 20 → árvore 3 foca nos que ainda erram → ensemble final muito preciso.",
      },
    ],
    Difícil: [
      {
        q: "No algoritmo SVM (Support Vector Machine), o que representa o 'kernel trick' e por que ele é fundamental para classificação não-linear?",
        o: [
          "Mapeia dados para dimensão superior implicitamente usando produto interno, sem computar coordenadas no espaço transformado",
          "Reduz a dimensionalidade dos dados",
          "É uma técnica de regularização para evitar overfitting",
          "Substitui o hiperplano por uma rede neural",
        ],
        c: 0,
        e: "O kernel trick permite ao SVM operar em espaços de alta dimensão sem computar explicitamente as coordenadas nesse espaço. Kernels (RBF, polinomial) calculam o produto interno entre pontos no espaço transformado usando apenas os dados originais, tornando viável separar classes não-linearmente separáveis.",
        x: "Dados em 2D formam um círculo (classe A) dentro de um anel (classe B) — impossível separar linearmente. Kernel RBF K(x,y) = exp(-γ||x-y||²) mapeia para dimensão infinita onde um hiperplano linear separa as classes.",
      },
      {
        q: "O que é Random Forest e por que geralmente supera uma árvore de decisão individual?",
        o: [
          "Ensemble de múltiplas árvores treinadas com subsets aleatórios; a agregação reduz variância e overfitting",
          "Uma árvore muito grande",
          "Florestas reais modeladas",
          "Árvore com random features apenas",
        ],
        c: 0,
        e: "Random Forest cria N árvores de decisão, cada uma treinada com bootstrap (amostra com reposição) e subset aleatório de features em cada split. A predição final é votação majoritária (classificação) ou média (regressão). A diversidade entre árvores reduz variância sem aumentar bias.",
        x: "1 árvore: accuracy 78%, alta variância. Random Forest com 100 árvores: accuracy 91%, baixa variância. Cada árvore erra diferente, mas a maioria acerta — a 'sabedoria da multidão' corrige erros individuais.",
      },
      {
        q: "O que é Gradient Boosting e como difere de Random Forest na construção do ensemble?",
        o: [
          "Treina árvores sequencialmente, cada nova corrigindo os erros da anterior; Random Forest treina em paralelo",
          "São idênticos",
          "Boosting usa árvores maiores",
          "Random Forest é sequencial",
        ],
        c: 0,
        e: "Random Forest treina árvores INDEPENDENTEMENTE em paralelo (bagging). Gradient Boosting treina SEQUENCIALMENTE: cada nova árvore aprende os resíduos (erros) da anterior. XGBoost, LightGBM e CatBoost são implementações otimizadas. Boosting geralmente tem melhor accuracy, mas é mais propenso a overfitting.",
        x: " Árvore 1: prediz 50 (real 70, resíduo +20). Árvore 2: prediz +18 do resíduo. Árvore 3: prediz +1.8 do resíduo restante. Final: 50+18+1.8 = 69.8 ≈ 70. Cada árvore corrige o erro acumulado.",
      },
      {
        q: "O que é o XGBoost e por que se tornou um dos algoritmos mais usados em competições de ML?",
        o: [
          "Implementação otimizada de Gradient Boosting com regularização, tratamento de missing values e paralelismo",
          "É uma rede neural profunda",
          "É um ensemble de KNN",
          "É idêntico ao Random Forest",
        ],
        c: 0,
        e: "XGBoost (eXtreme Gradient Boosting) adiciona regularização L1/L2 aos pesos das folhas, poda inteligente de árvores, tratamento nativo de valores faltantes, e paralelização na construção de árvores. Dominou competições no Kaggle e é amplamente utilizado em produção por sua combinação de precisão e velocidade.",
        x: "Competição Kaggle de previsão de preço: Random Forest accuracy 85%. XGBoost com tuning: accuracy 91%. Features: regularização (evita overfitting), histogram-based splits (10x mais rápido), early stopping (para quando não melhora).",
      },
      {
        q: "Como funciona a técnica de Stratified K-Fold Cross-Validation e quando é essencial usá-la?",
        o: [
          "Mantém a proporção das classes em cada fold, essencial quando há desbalanceamento de classes",
          "Divide dados em K partes aleatoriamente sem considerar classes",
          "Treina apenas na classe majoritária",
          "É o mesmo que Leave-One-Out",
        ],
        c: 0,
        e: "K-Fold padrão pode ter folds sem exemplos da classe minoritária. Stratified K-Fold garante que cada fold tem a mesma proporção de classes que o dataset original. Essencial em datasets desbalanceados como detecção de fraude (1% fraude, 99% legítimo) para avaliação confiável.",
        x: "Dataset: 950 legítimos, 50 fraudes (5%). K-Fold K=5 normal: fold pode ter 0 fraudes → métricas inúteis. Stratified K=5: cada fold tem ~190 legítimos + 10 fraudes (5% mantido). Recall por fold: [0.80, 0.85, 0.90, 0.75, 0.80].",
      },
      {
        q: "O que é a técnica SMOTE e como ela aborda o problema de classes desbalanceadas em classificação?",
        o: [
          "Gera exemplos sintéticos da classe minoritária interpolando entre vizinhos próximos no espaço de features",
          "Remove exemplos da classe majoritária aleatoriamente",
          "Duplica exemplos da classe minoritária idênticos",
          "Altera os pesos da função de perda",
        ],
        c: 0,
        e: "SMOTE (Synthetic Minority Over-sampling Technique) seleciona um exemplo da classe minoritária, encontra seus K vizinhos mais próximos (da mesma classe) e cria um novo exemplo sintético em um ponto aleatório no segmento de linha entre eles. Gera diversidade real, ao contrário de oversampling ingênuo (duplicação).",
        x: "Classe fraude: 50 exemplos. SMOTE com K=5: para cada fraude, encontra 5 vizinhos. Exemplo x=[0.3, 0.8], vizinho=[0.5, 0.9]. Sintético = x + rand×(vizinho−x) = [0.3+0.4×0.2, 0.8+0.4×0.1] = [0.38, 0.84]. Repete até ter ~500 fraudes sintéticas. Classe balanceada sem duplicação.",
      },
      {
        q: "O que é soft voting vs hard voting em ensembles de classificação e quando cada abordagem é preferível?",
        o: [
          "Hard voting usa a classe mais votada; soft voting usa a média das probabilidades, sendo preferível quando modelos calibram bem suas probabilidades",
          "São a mesma coisa",
          "Soft voting é sempre inferior",
          "Hard voting usa probabilidades",
        ],
        c: 0,
        e: "Hard voting: cada modelo vota em uma classe, vence a maioria (2 de 3 dizem 'gato' → 'gato'). Soft voting: média as probabilidades de cada classe e escolhe a de maior probabilidade média. Soft voting aproveita a confiança de cada modelo e geralmente supera hard voting quando os modelos emitem probabilidades bem calibradas.",
        x: "3 modelos classificando 'gato' vs 'cão'. Hard: [gato, cão, gato] → gato (2×1). Soft: probabilidades gato = [0.51, 0.40, 0.52], média = 0.477 → cão vence (0.523)! O modelo que disse 'cão' tinha alta confiança (0.60), enquanto os que disseram 'gato' tinham baixa (0.51, 0.52).",
      },
    ],
  },

  // ── Algoritmos de Regressão ──
  "Algoritmos de Regressão": {
    Fácil: [
      {
        q: "Na Regressão Linear Simples, qual é o objetivo do algoritmo ao traçar uma reta nos dados?",
        o: [
          "Minimizar a soma dos erros quadráticos entre os valores previstos e reais",
          "Encontrar a mediana dos dados",
          "Classificar dados em duas categorias",
          "Maximizar a distância entre os pontos",
        ],
        c: 0,
        e: "A Regressão Linear Simples encontra a reta y = ax + b que minimiza a soma dos quadrados dos resíduos (diferença entre valor real e previsto). Essa minimização é feita pelo método dos mínimos quadrados ordinários (OLS).",
        x: "Dados de estudo (horas) vs nota: ajustar a reta nota = 5.2 × horas + 30. Para 4 horas de estudo, previsão: 5.2×4 + 30 = 50.8.",
      },
      {
        q: "O que é Regressão Linear Múltipla e como difere da Simples?",
        o: [
          "Múltipla usa duas ou mais variáveis independentes; Simples usa apenas uma",
          "São idênticas",
          "Múltipla é não-linear",
          "Simples usa múltiplas variáveis",
        ],
        c: 0,
        e: "Regressão Linear Simples: y = ax + b (1 feature). Múltipla: y = a₁x₁ + a₂x₂ + ... + aₙxₙ + b (n features). Múltipla permite modelar relações mais complexas considerando múltiplos fatores. Os coeficientes indicam o impacto de cada feature mantendo as outras constantes.",
        x: "Preço do imóvel = 2500 × área + 15000 × quartos + 50000 × piscina - 10000 × distância_centro + 80000. Cada coeficiente mede o impacto isolado daquela feature no preço.",
      },
      {
        q: "O que significa overfitting e underfitting em modelos de regressão?",
        o: [
          "Overfitting: modelo decora o treino e falha em dados novos; underfitting: modelo é simples demais e falha em ambos",
          "São a mesma coisa",
          "Overfitting é bom",
          "Underfitting só ocorre com redes neurais",
        ],
        c: 0,
        e: "Overfitting: modelo muito complexo que captura ruído do treino (alta accuracy no treino, baixa no teste). Underfitting: modelo muito simples que não captura o padrão (baixa accuracy em ambos). O ideal é o equilíbrio que generaliza bem para dados novos.",
        x: "Prever salário por experiência: underfitting = reta horizontal (ignora a relação). Bom fit = curva suave crescente. Overfitting = curva que passa por TODOS os pontos (inclusive outliers) mas erra previsões novas.",
      },
      {
        q: "O que são as features (variáveis independentes) e o target (variável dependente) em um modelo de regressão?",
        o: [
          "Features são os dados de entrada usados para prever; target é o valor que se deseja prever",
          "Features são os resultados e target é a entrada",
          "São a mesma coisa",
          "Features são apenas números e target é texto",
        ],
        c: 0,
        e: "Em regressão, features (X) são as variáveis de entrada usadas para fazer previsões: área, localização, idade do imóvel. O target (y) é o valor que queremos prever: preço do imóvel. Mais features relevantes geralmente melhoram o modelo, mas features irrelevantes adicionam ruído.",
        x: "Prever preço de casa: features = [área=120m², quartos=3, bairro='Centro', idade=5anos]. Target = preço=R$500k. O modelo aprende: preço ≈ 3000×área + 20000×quartos − 5000×idade.",
      },
      {
        q: "O que é o Gradient Descent e qual seu papel no treinamento de modelos de regressão?",
        o: [
          "Algoritmo de otimização que ajusta os parâmetros iterativamente na direção que minimiza a função de custo",
          "É um tipo de modelo de classificação",
          "Método para visualizar dados",
          "Técnica para coletar mais dados",
        ],
        c: 0,
        e: "Gradient Descent calcula o gradiente (derivada parcial) da função de custo em relação a cada parâmetro, indicando a direção de maior crescimento. Os parâmetros são atualizados na direção OPOSTA: w = w − lr × ∂J/∂w. O learning rate (lr) controla o tamanho do passo. Convergência ocorre quando os gradientes se aproximam de zero.",
        x: "Reta y = wx + b com w=0, b=0. Erro alto. Gradiente diz: 'aumente w em 2.5, aumente b em 1.3'. Novo: w=2.5, b=1.3. Erro diminui. Após 100 iterações: w=5.2, b=30.0 — reta convergiu.",
      },
      {
        q: "O que é o coeficiente angular (slope) em uma regressão linear simples e como interpretá-lo?",
        o: [
          "Indica quanto y muda para cada unidade de aumento em x; é a inclinação da reta",
          "É o valor de y quando x é zero",
          "É a média de todos os valores de y",
          "É sempre um valor entre 0 e 1",
        ],
        c: 0,
        e: "Na equação y = ax + b, o coeficiente angular 'a' (slope) mede a taxa de variação: para cada aumento de 1 unidade em x, y muda em 'a' unidades. Se a > 0, relação positiva; se a < 0, relação negativa. O valor absoluto indica a força da relação.",
        x: "salário = 2000 × experiência + 25000. Slope = 2000: cada ano a mais de experiência aumenta o salário previsto em R$2000. 5 anos → R$35000, 10 anos → R$45000. Se fosse -500: cada ano a mais DIMINUIRIA o salário (relação negativa, improvável aqui).",
      },
      {
        q: "O que é o intercepto (bias/b) na equação de regressão linear e qual seu significado prático?",
        o: [
          "É o valor previsto de y quando todas as features são zero; é onde a reta cruza o eixo y",
          "É a inclinação da reta de regressão",
          "É o erro do modelo",
          "Não tem significado prático",
        ],
        c: 0,
        e: "Na equação y = ax + b, o intercepto 'b' é o valor base quando x=0. Nem sempre tem interpretação prática (ex: preço de uma casa com 0m² não faz sentido), mas é matematicamente necessário para posicionar a reta corretamente. Sem ele, a reta seria forçada a passar pela origem.",
        x: "preço = 3000 × área + 50000. Intercepto = R$50000: é o 'preço base' teórico para área = 0m². Na prática, não existe imóvel de 0m², mas o intercepto ajusta a posição da reta. Se forçássemos b=0: reta passaria pela origem, previsões ruins para áreas pequenas.",
      },
    ],
    Médio: [
      {
        q: "Qual métrica de avaliação de regressão indica a proporção da variância da variável dependente explicada pelo modelo?",
        o: [
          "R² (coeficiente de determinação)",
          "Acurácia",
          "F1-Score",
          "AUC-ROC",
        ],
        c: 0,
        e: "O R² varia de 0 a 1 (podendo ser negativo para modelos ruins). R²=1 indica que o modelo explica 100% da variância. R²=0.85 indica que 85% da variação nos dados é explicada pelo modelo, e 15% é variação residual não capturada.",
        x: "Modelo de previsão de preço de imóvel com R² = 0.90: 90% da variação de preços é explicada pelas features (área, quartos, localização). 10% resta como ruído/fatores não modelados.",
      },
      {
        q: "O que é cross-validation (validação cruzada) e por que é melhor que uma única divisão treino/teste?",
        o: [
          "Divide os dados em K folds, treina em K-1 e testa em 1, repetindo K vezes; dá estimativa mais robusta",
          "Treina no dataset inteiro",
          "Usa apenas metade dos dados",
          "Só funciona com regressão",
        ],
        c: 0,
        e: "K-Fold Cross-Validation divide o dataset em K partes iguais. Em cada iteração, K-1 folds treinam e 1 fold testa. A métrica final é a média das K iterações. Evita dependência de uma única divisão aleatória e usa todos os dados para treino e teste.",
        x: "K=5 com 1000 dados: Fold 1 testa 200, treina 800. Fold 2 testa outros 200, treina 800... Métricas: [0.85, 0.87, 0.83, 0.86, 0.84]. Média: 0.85 ± 0.015. Mais confiável que um único split 80/20.",
      },
      {
        q: "Quais são as métricas MAE, MSE e RMSE e quando usar cada uma em regressão?",
        o: [
          "MAE é média do erro absoluto; MSE é média do erro quadrado; RMSE é raiz do MSE, na mesma unidade dos dados",
          "São todas iguais",
          "Só MAE importa",
          "RMSE é para classificação",
        ],
        c: 0,
        e: "MAE (Mean Absolute Error): média de |real - previsto|, interpretável e robusto a outliers. MSE (Mean Squared Error): média de (real-previsto)², penaliza erros grandes. RMSE (Root MSE): √MSE, mesma unidade dos dados. RMSE > MAE sempre; grande diferença indica outliers.",
        x: "Previsão de temperatura: erros [1, -2, 1, -1, 10]°C. MAE = 3.0°C. MSE = 21.4°C². RMSE = 4.63°C. RMSE >> MAE porque o erro 10°C é penalizado quadraticamente pelo MSE.",
      },
      {
        q: "O que é multicolinearidade em Regressão Múltipla e como ela afeta os coeficientes?",
        o: [
          "Correlação alta entre features que torna os coeficientes instáveis e difíceis de interpretar",
          "Quando o target tem múltiplos valores",
          "Quando há muitas features categóricas",
          "Quando o modelo tem R² muito alto",
        ],
        c: 0,
        e: "Multicolinearidade: features fortemente correlacionadas (ex: área em m² e área em pés²). O modelo não consegue separar o efeito individual de cada uma — coeficientes oscilam muito entre amostras. VIF > 10 indica multicolinearidade. Soluções: remover uma das features correlacionadas, usar PCA ou regularização Ridge.",
        x: "Prever salário: features experiência e anos_na_empresa (correlação 0.95). Modelo 1: coef_experiência=5000, coef_anos=-200. Modelo 2 (outra amostra): coef_experiência=2000, coef_anos=2800. Instável! Remover uma resolve: coef_experiência=4500 (estável).",
      },
      {
        q: "Como o R² ajustado difere do R² e por que é mais confiável em Regressão Múltipla?",
        o: [
          "R² ajustado penaliza a adição de features que não melhoram o modelo, evitando inflação artificial do R²",
          "R² ajustado é sempre maior que R²",
          "São sempre iguais",
          "R² ajustado só se aplica a regressão simples",
        ],
        c: 0,
        e: "R² SEMPRE aumenta ao adicionar features, mesmo irrelevantes (como signo do zodíaco). R² ajustado penaliza features inúteis: R²ₐ = 1 − (1−R²)(n−1)/(n−p−1), onde p = nº de features. Se uma nova feature não melhora o modelo o suficiente, R² ajustado CAI, indicando que ela é desnecessária.",
        x: "Prever nota: [horas_estudo] → R²=0.80, R²ₐ=0.79. Adiciona [cor_favorita] → R²=0.801 (subiu trivialmente), R²ₐ=0.78 (caiu!). Adiciona [frequência_aula] → R²=0.88, R²ₐ=0.87 (ambos subiram → feature útil).",
      },
      {
        q: "O que é feature scaling e por que é essencial antes de aplicar regularização em regressão?",
        o: [
          "Colocar features na mesma escala para que a regularização penalize coeficientes de forma justa, sem favorecer features de escala menor",
          "Feature scaling melhora o R² diretamente",
          "Só é necessário para redes neurais",
          "Regularização funciona igualmente sem scaling",
        ],
        c: 0,
        e: "Regularização penaliza coeficientes grandes. Se 'área' (0-500) tem coeficiente 200 e 'quartos' (0-10) tem coeficiente 50000, a penalidade recai mais sobre 'quartos' (coeficiente maior), mesmo que ambos sejam igualmente importantes. Padronizando (z-score), os coeficientes ficam comparáveis e a penalidade é justa.",
        x: "Sem scaling: coef_área=200, coef_quartos=50000. Ridge penaliza quartos 62500× mais (50000²/200²). Com StandardScaler: coef_área=0.45, coef_quartos=0.52 → penalidades proporcionais. Modelo regularizado corretamente mantém ambas as features.",
      },
      {
        q: "O que é Stochastic Gradient Descent (SGD) e como difere do Batch Gradient Descent?",
        o: [
          "SGD atualiza pesos usando um exemplo por vez; Batch usa todos os exemplos, tornando SGD mais rápido mas com mais ruído",
          "SGD é mais lento que Batch",
          "SGD usa todos os dados de uma vez",
          "São idênticos em resultado e velocidade",
        ],
        c: 0,
        e: "Batch GD: calcula gradiente sobre TODOS os N exemplos, atualiza uma vez → convergência suave mas lenta para datasets grandes. SGD: calcula gradiente sobre 1 exemplo aleatório, atualiza imediatamente → rápido, mas oscila. Mini-batch GD (compromisso): usa B exemplos (ex: 32, 64) por atualização.",
        x: "Dataset com 1M de exemplos. Batch: 1 atualização por época (processa 1M antes de ajustar). SGD: 1M atualizações por época (ajusta a cada exemplo). Mini-batch (B=64): ~15600 atualizações por época. SGD oscila mais, mas chega perto do mínimo muito mais rápido.",
      },
    ],
    Difícil: [
      {
        q: "Na Regressão Ridge (L2), como o term de regularização λ||w||² afeta os coeficientes do modelo e quando é preferível sobre Lasso (L1)?",
        o: [
          "Ridge encolhe todos os coeficientes proporcionalmente sem zerar nenhum; preferível quando muitas features contribuem com pequeno efeito",
          "Ridge elimina features irrelevantes zerando coeficientes",
          "Ridge aumenta os coeficientes para melhorar performance",
          "Ridge e Lasso são matematicamente equivalentes",
        ],
        c: 0,
        e: "Ridge adiciona λΣwᵢ² à loss function, penalizando coeficientes grandes. Isso encolhe todos os coeficientes em direção a zero mas nunca os zera completamente (ao contrário de Lasso/L1 que pode zerar). Ridge é preferível quando muitas features são relevantes com efeitos moderados, enquanto Lasso é melhor para seleção de features.",
        x: "Dataset com 100 genes influenciando uma doença: Ridge mantém todos os 100 coeficientes pequenos. Lasso zeraria ~80 genes, mantendo apenas ~20. Se todos forem relevantes, Ridge tem melhor poder preditivo.",
      },
      {
        q: "O que é Elastic Net e como combina Ridge e Lasso?",
        o: [
          "Combina penalizações L1 (Lasso) e L2 (Ridge) em uma única função de loss com parâmetro de mistura",
          "É um tipo de rede neural",
          "Substitui ambos completamente",
          "Apenas para classificação",
        ],
        c: 0,
        e: "Elastic Net adiciona αλ∑|wᵢ| + (1-α)λ∑wᵢ² à loss. α=1 é Lasso puro, α=0 é Ridge puro. Elastic Net combina seleção de features do Lasso com estabilidade do Ridge. Ideal quando features são correlacionadas (onde Lasso seleciona arbitrariamente entre correlacionadas).",
        x: "100 genes, 20 pares altamente correlacionados. Lasso: seleciona 1 de cada par aleatoriamente. Elastic Net (α=0.5): mantém ambos do par com coeficientes menores, resultado mais estável e robusto.",
      },
      {
        q: "O que é Regressão Polinomial e quando usá-la em vez de Regressão Linear?",
        o: [
          "Adiciona termos polinomiais (x², x³) às features para modelar relações não-lineares; usar quando a relação não é linear",
          "É sempre melhor que linear",
          "Só funciona com 2 variáveis",
          "Não existe",
        ],
        c: 0,
        e: "Regressão Polinomial expande as features: x → [x, x², x³, ...]. Ainda é 'linear' nos parâmetros (y = a + bx + cx²), então usa OLS. Grau alto = overfitting, grau baixo = underfitting. Usar quando gráfico dos dados mostra curvatura que reta não captura.",
        x: "Velocidade vs consumo de combustível: relação parabólica (consome mais em baixa e alta velocidade). Linear: R²=0.40. Polinomial grau 2: y = ax² + bx + c, R²=0.92. Grau 10: R² treino=0.99, R² teste=0.60 (overfitting).",
      },
      {
        q: "O que é regularização em modelos de regressão e por que é necessária?",
        o: [
          "Técnica que adiciona penalidade à magnitude dos coeficientes para evitar overfitting e melhorar a generalização",
          "Técnica para aumentar o número de features",
          "Método de coleta de dados",
          "Forma de aumentar a complexidade do modelo",
        ],
        c: 0,
        e: "Regularização adiciona um termo de penalidade à função de custo: J(w) + λ×penalty. L1 (Lasso): penalty = Σ|wᵢ| (pode zerar coeficientes). L2 (Ridge): penalty = Σwᵢ² (encolhe coeficientes). λ controla a força: λ=0 → sem regularização, λ=∞ → todos os coeficientes vão a zero.",
        x: "Modelo com 50 features: sem regularização, coeficientes: [500, -300, 200, ...] → overfitting. Ridge (λ=1): coeficientes: [5, -3, 2, ...] → generalizou. Lasso (λ=1): coeficientes: [5, 0, 2, 0, 0, ...] → eliminou 30 features irrelevantes.",
      },
      {
        q: "Como a Bayesian Linear Regression difere da abordagem frequentista tradicional?",
        o: [
          "Trata os parâmetros como distribuições de probabilidade em vez de pontos fixos, incorporando incerteza nas previsões",
          "Usa mais dados para treinar",
          "É idêntica à regressão linear padrão",
          "Não usa probabilidades",
        ],
        c: 0,
        e: "Regressão frequentista estima um único valor para cada coeficiente. Bayesiana trata cada coeficiente como uma distribuição: prior (crença inicial) × likelihood (dados) = posterior (crença atualizada). Resultado: não apenas a predição, mas também intervalos de confiança. Útil quando dados são escassos ou incerteza é importante.",
        x: "Prever preço com 10 dados: Frequentista: preço = 5000×área + 80000, ponto único. Bayesiana: preço = N(5000,±800)×área + N(80000,±15000). Previsão para 100m²: R$580k com intervalo [R$520k, R$640k]. A incerteza está explícita.",
      },
      {
        q: "O que é Quantile Regression e como difere da regressão linear padrão que estima a média?",
        o: [
          "Estima quantis condicionais (mediana, percentil 90) em vez da média, capturando a distribuição completa da resposta",
          "É idêntica à regressão linear",
          "Só funciona com dados normalmente distribuídos",
          "Estima a moda em vez da média",
        ],
        c: 0,
        e: "Regressão linear padrão estima E[Y|X] (média condicional). Quantile Regression estima Q_τ[Y|X] para qualquer quantil τ ∈ (0,1). Minimiza a função de perda assimétrica: ρ_τ(u) = u(τ − I(u<0)). Captura como diferentes partes da distribuição de Y respondem a X, sendo robusta a outliers.",
        x: "Prever salário por experiência: Regressão Linear → salário médio = 5000×exp + 30000. Quantile τ=0.5 (mediana) → 4800×exp + 28000 (robusto a CEOs). τ=0.9 (topo) → 8000×exp + 50000 (como os maiores salários crescem). τ=0.1 → 3000×exp + 22000 (pisos salariais).",
      },
      {
        q: "O que é heteroscedasticidade em regressão e como ela viola premissas do modelo linear?",
        o: [
          "Variância dos resíduos não é constante ao longo dos valores previstos, violando a premissa de homocedasticidade",
          "Os resíduos não seguem distribuição normal",
          "As features são correlacionadas entre si",
          "O modelo tem muitas variáveis",
        ],
        c: 0,
        e: "Homocedasticidade: Var(ε|X) = σ² constante. Heteroscedasticidade: Var(ε|X) varia com X. Consequência: estimadores OLS continuam não-viesados mas não são mais eficientes (BLUE). Erros padrão são incorretos → testes de hipótese e intervalos de confiança inválidos. Soluções: WLS, erros robustos de White, transformação log.",
        x: "Prever gastos por renda: baixa renda → gastos variam pouco (R$1k-3k). Alta renda → gastos variam muito (R$5k-50k). Gráfico resíduos vs preditos: forma de 'funil'. Teste de Breusch-Pagan: p < 0.05 → heteroscedasticidade. Solução: log(gastos) ~ renda, ou erros robustos HC3 de White.",
      },
    ],
  },

  // ── Aprendizado Não Supervisionado ──
  "Aprendizado Não Supervisionado": {
    Fácil: [
      {
        q: "Qual algoritmo de clustering agrupa dados em K clusters baseando-se na distância até centróides iterativamente recalculados?",
        o: ["K-Means", "DBSCAN", "KNN", "Regressão Linear"],
        c: 0,
        e: "K-Means particiona n dados em K clusters. Inicializa K centróides, atribui cada ponto ao centróide mais próximo, recalcula os centróides como média dos pontos do cluster, e repete até convergir. É necessário definir K previamente.",
        x: "Para segmentar clientes em 3 grupos: K-Means com K=3 itera até estabilizar. Resultado: Cluster 1 (alto valor), Cluster 2 (frequentes, baixo valor), Cluster 3 (inativos).",
      },
      {
        q: "O que é redução de dimensionalidade e por que PCA é importante?",
        o: [
          "PCA reduz o número de features projetando dados nos eixos de maior variância, preservando informação",
          "PCA aumenta as dimensões",
          "PCA é um algoritmo de classificação",
          "Só funciona com 2 features",
        ],
        c: 0,
        e: "PCA (Principal Component Analysis) encontra as direções (componentes principais) de maior variância nos dados e projeta os dados nessas direções. Reduz dimensionalidade eliminando componentes de baixa variância. Útil para visualização (reduzir para 2D/3D) e remover ruído.",
        x: "Dataset com 100 features. PCA: 2 primeiros componentes explicam 85% da variância. Reduz de 100 para 2 features para visualização em scatter plot, mantendo 85% da informação.",
      },
      {
        q: "Qual a diferença entre aprendizado supervisionado e não supervisionado?",
        o: [
          "Supervisionado usa dados rotulados (features + target); não supervisionado encontra padrões sem rótulos",
          "São iguais",
          "Não supervisionado é sempre melhor",
          "Supervisionado não precisa de dados",
        ],
        c: 0,
        e: "Supervisionado: dados têm features (X) e target (y). O modelo aprende a relação X→y (classificação, regressão). Não supervisionado: dados têm apenas features, sem rótulos. O modelo descobre estruturas ocultas (clusters, anomalias, dimensões). Semi-supervisionado: mistura dos dois.",
        x: "Supervisionado: fotos rotuladas 'gato'/'cachorro' → modelo aprende a classificar. Não supervisionado: fotos sem rótulos → modelo agrupa fotos semelhantes sem saber as categorias.",
      },
      {
        q: "O que é o algoritmo de Associação (Association Rules) e onde é aplicado?",
        o: [
          "Descobre relações frequentes entre itens em transações, como análise de cesta de compras",
          "É um algoritmo de classificação supervisionada",
          "Agrupa dados por distância",
          "Reduz dimensionalidade",
        ],
        c: 0,
        e: "Association Rules (ex: Apriori, FP-Growth) encontram padrões como 'quem compra pão também compra manteiga'. Métricas: Support (frequência da combinação), Confidence (probabilidade condicional), Lift (quanto um item influencia o outro). É não supervisionado pois aprende padrões sem target.",
        x: "Supermercado, 10000 transações. Regra: {fraldas} → {cerveja}: support=5%, confidence=70%, lift=2.3. Significa: quem compra fraldas tem 70% de chance de comprar cerveja (2.3x mais que aleatório). Colocar juntos no corredor.",
      },
      {
        q: "O que é o algoritmo de clustering GMM (Gaussian Mixture Model) e como difere do K-Means?",
        o: [
          "GMM modela clusters como distribuições gaussianas, permitindo sobreposição e clusters elípticos vs K-Means que usa distância e forma circular",
          "São idênticos",
          "GMM é supervisionado",
          "K-Means é mais flexível",
        ],
        c: 0,
        e: "K-Means atribui cada ponto a exatamente 1 cluster (hard assignment) com clusters esféricos. GMM usa distribuições gaussianas e atribui probabilidades de pertencimento (soft assignment): o ponto pode ter 60% de chance de pertencer ao cluster A e 40% ao B. Clusters podem ser elípticos.",
        x: "Dados de altura e peso: K-Means faz 2 círculos. GMM com 2 gaussianas encontra uma elipse para mulheres e outra para homens, com sobreposição na fronteira. Ponto 170cm/65kg: 55% grupo A, 45% grupo B.",
      },
      {
        q: "O que é a 'inércia' (WCSS) no K-Means e como interpretar seu valor?",
        o: [
          "É a soma das distâncias quadráticas de cada ponto ao centróide do seu cluster; quanto menor, clusters mais compactos",
          "É a velocidade de convergência do algoritmo",
          "É o número de clusters ideal",
          "É a distância entre centróides",
        ],
        c: 0,
        e: "Inércia (WCSS — Within-Cluster Sum of Squares) = Σ Σ ||xᵢ − μₖ||², onde μₖ é o centróide do cluster k. Inércia alta = pontos distantes dos centróides (clusters diluídos). Inércia baixa = clusters compactos. Mas inércia SEMPRE diminui ao aumentar K (com K=N, inércia=0), então não serve sozinha.",
        x: "K=2: inércia=500 (clusters grandes). K=3: inércia=200 (mais compactos). K=10: inércia=50 (cada cluster ~3 pontos). K=N: inércia=0 (trivial). O Elbow Method acha onde a queda de inércia desacelera — o ponto 'ótimo' balanceia compactação vs simplicidade.",
      },
      {
        q: "O que é aprendizado semi-supervisionado e quando ele é útil?",
        o: [
          "Combina poucos dados rotulados com muitos não rotulados para melhorar o modelo, útil quando rotular é caro",
          "É idêntico ao supervisionado",
          "Usa apenas dados sem rótulos",
          "Requer todos os dados rotulados",
        ],
        c: 0,
        e: "Aprendizado semi-supervisionado utiliza um pequeno conjunto de dados rotulados junto com um grande volume de dados não rotulados. Técnicas: self-training (modelo rotula dados, retreina), label propagation (propaga rótulos por similaridade), pseudo-labels. Ideal quando rotular é caro (exames médicos, anotação de imagens).",
        x: "Diagnosticar raio-X: 100 imagens rotuladas por médicos (caro!) + 10000 sem rótulo disponíveis. Supervisionado com 100: accuracy 70%. Semi-supervisionado: modelo treina com 100, rotula as 10000 com alta confiança, retreina → accuracy 85%. Quase o mesmo que ter 5000 rótulos.",
      },
    ],
    Médio: [
      {
        q: "Qual método é usado para determinar o número ideal de clusters K no algoritmo K-Means?",
        o: [
          "Método do Cotovelo (Elbow Method) com inércia (WCSS)",
          "Dividir o dataset ao meio",
          "Usar sempre K = número de features",
          "Testar K = 1 e parar",
        ],
        c: 0,
        e: "O Elbow Method plota o valor de inércia (soma das distâncias quadráticas de cada ponto ao seu centróide — WCSS) para diferentes valores de K. O ponto de 'cotovelo' onde a redução da inércia desacelera significativamente indica o K ideal. Complementa-se com Silhouette Score.",
        x: "K=1: inércia=1000, K=2: 500, K=3: 300, K=4: 280, K=5: 270. O cotovelo está em K=3: após 3, a inércia cai muito pouco. K ideal = 3.",
      },
      {
        q: "O que é o Silhouette Score e como complementa o Elbow Method?",
        o: [
          "Mede quão similar um ponto é ao seu cluster vs clusters vizinhos; varia de -1 a 1, quanto maior melhor",
          "Mede a velocidade do algoritmo",
          "Conta número de clusters",
          "Mede a distância ao centróide",
        ],
        c: 0,
        e: "Silhouette Score s(i) = (b(i)-a(i))/max(a(i),b(i)). a(i) = distância média intra-cluster, b(i) = distância média ao cluster vizinho mais próximo. s=1: ponto bem agrupado. s=0: na fronteira. s=-1: provavelmente no cluster errado. Média global avalia a qualidade geral.",
        x: "K=2: silhouette=0.71 (bom). K=3: silhouette=0.65. K=4: silhouette=0.45. K=5: silhouette=0.30. Melhor K=2 pelo silhouette, mesmo que elbow sugira K=3. Usar ambos para decisão.",
      },
      {
        q: "O que é clustering hierárquico e como o dendrograma ajuda a escolher K?",
        o: [
          "Monta hierarquia de clusters por merge (aglomerativo) ou split (divisivo); dendrograma mostra a estrutura e onde cortar",
          "Tipo de árvore de decisão",
          "Regressão hierárquica",
          "K-Means com múltiplos níveis",
        ],
        c: 0,
        e: "Clustering Hierárquico Aglomerativo: começa com N clusters (1 por ponto) e itera fundindo os 2 mais próximos até restar 1. O dendrograma é uma árvore que mostra a ordem das fusões. 'Cortar' o dendrograma em determinada altura define o número de clusters. Não requer K prévio.",
        x: "5 pontos: A,B,C,D,E. Merge 1: {A,B}. Merge 2: {D,E}. Merge 3: {A,B,C}. Merge 4: {A,B,C,D,E}. Cortando na altura do Merge 3, temos 2 clusters: {A,B,C} e {D,E}.",
      },
      {
        q: "O que é a métrica Adjusted Rand Index (ARI) e para que serve em clustering?",
        o: [
          "Mede a concordância entre clusters previstos e rótulos reais, ajustado para chance; varia de -1 a 1",
          "Mede a distância entre centróides",
          "Conta o número ideal de clusters",
          "É uma métrica de regressão",
        ],
        c: 0,
        e: "ARI (Adjusted Rand Index) compara a atribuição de clusters com rótulos verdadeiros (quando disponíveis para validação). ARI=1: concordância perfeita. ARI=0: resultado esperado aleatoriamente. ARI<0: pior que aleatório. É ajustado para chance, diferente do Rand Index puro.",
        x: "K-Means com K=3 nos dados Iris (3 espécies reais). ARI=0.73: boa concordância. Com K=5: ARI=0.55 (clusters desnecessários). Comparando K-Means (ARI=0.73) vs GMM (ARI=0.89) → GMM captura melhor a estrutura natural das espécies.",
      },
      {
        q: "Como funciona a técnica de Clustering Espectral e quando é preferível ao K-Means?",
        o: [
          "Usa autovalores da matriz de similaridade para reduzir dimensões antes do clustering; ideal para clusters não-convexos",
          "É uma versão mais rápida do K-Means",
          "Funciona apenas com dados textuais",
          "Não precisa de K",
        ],
        c: 0,
        e: "Spectral Clustering: 1) Constrói grafo de similaridade entre pontos. 2) Calcula Laplaciana do grafo. 3) Extrai os K menores autovalores/autovetores. 4) Aplica K-Means nos autovetores. Captura estrutura por conectividade, não por forma ou distância, funcionando para clusters com formas arbitrárias.",
        x: "Dados em formato de duas meias-luas entrelaçadas: K-Means falha (assume clusters circulares). Spectral Clustering: constrói grafo → autovetores separam perfeitamente as duas luas. Computational cost: O(n³), então inviável para n>10000.",
      },
      {
        q: "O que é HDBSCAN e quais vantagens oferece sobre o DBSCAN padrão?",
        o: [
          "Versão hierárquica do DBSCAN que não requer o parâmetro eps e detecta clusters de densidades variadas",
          "É uma versão mais rápida do K-Means",
          "Requer mais parâmetros que DBSCAN",
          "Funciona apenas com dados 2D",
        ],
        c: 0,
        e: "HDBSCAN (Hierarchical DBSCAN) constrói uma hierarquia de clusterings para diferentes valores de eps, extraindo os clusters mais estáveis. Vantagens: não precisa definir eps (apenas min_cluster_size), detecta clusters com densidades diferentes (DBSCAN usa eps global), e é mais robusto a ruído.",
        x: "Dados com cluster denso (100 pontos em 1cm²) e cluster esparso (50 pontos em 10cm²). DBSCAN com eps=0.5: encontra o denso, classifica o esparso como ruído. HDBSCAN: encontra ambos os clusters, adaptando a 'escala' automaticamente. min_cluster_size=10 é o único parâmetro essencial.",
      },
      {
        q: "O que é a Maldição da Dimensionalidade e como afeta algoritmos de clustering?",
        o: [
          "Em alta dimensionalidade, distâncias entre pontos convergem e clusters se tornam indistinguíveis",
          "Mais dimensões sempre melhoram o clustering",
          "Só afeta redes neurais",
          "É um problema de falta de memória RAM",
        ],
        c: 0,
        e: "Com muitas dimensões, a distância entre qualquer par de pontos se torna quase igual (todas as distâncias convergem para um valor similar). Isso quebra algoritmos baseados em distância (KNN, K-Means, DBSCAN). Soluções: redução de dimensionalidade (PCA, UMAP) antes do clustering, seleção de features, ou métricas de distância adaptadas.",
        x: "100 pontos em 2D: distâncias variam de 0.1 a 10.0 (100×). Em 1000D: distâncias variam de 28.5 a 32.0 (1.12×). Tudo fica 'igualmente distante'. K-Means em 2D: clusters claros. K-Means em 1000D: clusters aleatórios sem significado. Solução: PCA para 50D → K-Means funciona.",
      },
    ],
    Difícil: [
      {
        q: "Como o algoritmo DBSCAN (Density-Based Spatial Clustering) identifica clusters de forma arbitrária e detecta outliers sem definir K?",
        o: [
          "Usa dois parâmetros (eps e minPts) para encontrar regiões densas conectadas, classificando pontos isolados como ruído",
          "Usa K centróides como K-Means",
          "Calcula a média global e separa por desvio padrão",
          "Usa árvores de decisão para agrupar",
        ],
        c: 0,
        e: "DBSCAN define: 'core point' = ponto com ≥ minPts vizinhos dentro do raio eps. 'Border point' = está na vizinhança de um core point mas tem < minPts vizinhos. 'Noise' = nem core nem border. Clusters são formados conectando core points que estão a ≤ eps de distância. Descobre clusters de forma arbitrária e identifica outliers naturalmente.",
        x: "eps=0.5, minPts=5. Ponto A tem 7 vizinhos a ≤ 0.5 → core point. Ponto B tem 3 vizinhos → se um é A, B é border. Ponto C tem 0 vizinhos → noise (outlier). Clusters formam-se pela cadeia de core points conectados.",
      },
      {
        q: "O que é t-SNE e como difere de PCA para visualização de dados de alta dimensionalidade?",
        o: [
          "t-SNE preserva vizinhanças locais (não-linear); PCA preserva variância global (linear). t-SNE é melhor para visualizar clusters",
          "São idênticos",
          "PCA é não-linear",
          "t-SNE é linear",
        ],
        c: 0,
        e: "PCA: projeção linear que preserva variância global (direções de maior dispersão). t-SNE: técnica não-linear que preserva similaridades locais (pontos próximos em alta dimensão ficam próximos em 2D). t-SNE é melhor para revelar clusters mas não preserva distâncias globais e é estocástico.",
        x: "MNIST (dígitos 0-9): PCA 2D mostra blocos sobrepostos. t-SNE 2D mostra 10 clusters claramente separados, cada um correspondendo a um dígito. t-SNE revela a estrutura local que PCA perde.",
      },
      {
        q: "O que é Isolation Forest e como ele detecta anomalias de forma diferente de métodos baseados em distância?",
        o: [
          "Isola anomalias usando árvores aleatórias: outliers precisam de menos splits para serem isolados",
          "Usa distância euclidiana",
          "K-Means adaptado",
          "Regressão para detectar outliers",
        ],
        c: 0,
        e: "Isolation Forest constrói árvores com splits aleatórios em features e valores aleatórios. Anomalias são pontos 'fáceis de isolar' (requerem poucos splits). Pontos normais em regiões densas requerem muitos splits. O 'anomaly score' é baseado no path length médio. Eficiente: O(n log n), funciona em alta dimensionalidade.",
        x: "100 transações normais (~R$50-200) + 1 fraude (R$50.000). Isolation Forest: ponto R$50.000 é isolado em 2 splits (valor>10000, valor>40000). Pontos normais precisam de 8+ splits. Score de anomalia alto = provável fraude.",
      },
      {
        q: "O que são Autoencoders e como são usados para detecção de anomalias?",
        o: [
          "Redes que comprimem dados em representação menor e reconstroem; anomalias têm erro de reconstrução alto",
          "São algoritmos de classificação",
          "Geram dados novos como GANs",
          "Só funcionam com imagens",
        ],
        c: 0,
        e: "Autoencoder: Encoder comprime input → representação latente (bottleneck) → Decoder reconstrói output. Treinado apenas com dados normais. Quando recebe uma anomalia, a reconstrução é ruim (alto erro). Limiar de erro define anomalia. Variante: Variational Autoencoder (VAE) para geração de dados.",
        x: "Autoencoder treinado com ECGs normais. ECG normal: reconstrução quase perfeita, erro=0.02. ECG com arritmia: reconstrução distorcida, erro=0.35. Limiar=0.15 → alerta de anomalia cardíaca. Usado em monitoramento hospitalar 24/7.",
      },
      {
        q: "O que é UMAP e como se compara ao t-SNE para visualização de dados em alta dimensão?",
        o: [
          "UMAP é mais rápido que t-SNE, preserva melhor a estrutura global e permite transformar novos pontos",
          "São algoritmos idênticos",
          "t-SNE é sempre superior",
          "UMAP é um algoritmo de clustering",
        ],
        c: 0,
        e: "t-SNE: O(n²), preserva estrutura local, não permite transform de novos pontos, stochastic (resultados variam). UMAP: O(n log n), preserva estruturas local E global, permite transform (fit_transform + transform), determinístico com seed. Ambos reduzem para 2D/3D para visualização.",
        x: "Dataset MNIST (70k dígitos): t-SNE em 50 min, clusters claros mas layout instável. UMAP em 3 min, clusters claros E distâncias entre clusters preservadas (1 e 7 próximos, 1 e 8 distantes). Para novos dados, UMAP.transform() é instantâneo.",
      },
      {
        q: "O que é Non-negative Matrix Factorization (NMF) e onde é aplicada em aprendizado não supervisionado?",
        o: [
          "Decompõe uma matriz não-negativa em dois fatores não-negativos, encontrando partes interpretáveis; usada em topic modeling e decomposição de sinais",
          "É idêntica ao PCA",
          "Só funciona com dados negativos",
          "É um algoritmo de classificação supervisionada",
        ],
        c: 0,
        e: "NMF fatora V ≈ W × H onde V, W, H ≥ 0. A restrição de não-negatividade gera partes aditivas interpretáveis (ao contrário de PCA que permite subtração). Em texto: W = documentos × tópicos, H = tópicos × palavras. Em imagens: partes de rostos (olhos, nariz) detectadas individualmente.",
        x: "Corpus de 1000 artigos: NMF com 5 tópicos. Tópico 1: [esporte, gol, campeonato]. Tópico 2: [economia, inflação, juros]. Artigo X = 0.7×Tópico1 + 0.3×Tópico3 (soma de partes, não subtração). PCA daria: 0.5×PC1 − 0.3×PC2, difícil de interpretar.",
      },
      {
        q: "O que é Contrastive Learning e como funciona no contexto de aprendizado auto-supervisionado?",
        o: [
          "Aprende representações aproximando exemplos similares (positivos) e afastando dissimilares (negativos) no espaço latente",
          "É uma forma de classificação supervisionada",
          "Usa apenas exemplos positivos",
          "Requer dados rotulados",
        ],
        c: 0,
        e: "Contrastive Learning cria pares: positivos (duas augmentações da mesma imagem) e negativos (imagens diferentes). A loss (ex: InfoNCE, NT-Xent) maximiza similaridade entre positivos e minimiza entre negativos. Produz representações universais SEM rótulos. SimCLR, MoCo e BYOL são frameworks populares.",
        x: "SimCLR: foto de gato → crop aleatório A e flip B (par positivo). Foto de carro C (negativo). Encoder mapeia: sim(A,B) = 0.95 (puxar juntos), sim(A,C) = 0.10 (empurrar). Após pré-treino auto-supervisionado, fine-tune com 1% dos rótulos atinge 85% da accuracy (vs 90% com 100% dos rótulos).",
      },
    ],
  },

  // ── Deep Learning e Redes Neurais ──
  "Deep Learning e Redes Neurais": {
    Fácil: [
      {
        q: "Em uma rede neural artificial, qual é a função de uma 'camada oculta' (hidden layer)?",
        o: [
          "Aprender representações intermediárias dos dados transformando features via pesos e funções de ativação",
          "Receber os dados de entrada",
          "Produzir a saída final do modelo",
          "Armazenar os dados de treinamento",
        ],
        c: 0,
        e: "Camadas ocultas aplicam transformações lineares (multiplicação por pesos + bias) seguidas de funções de ativação não-lineares. Cada camada aprende representações de nível crescente de abstração — as primeiras capturam features simples, as mais profundas capturam padrões complexos.",
        x: "Reconhecimento facial: camada 1 detecta bordas, camada 2 combina em formas (olhos, nariz), camada 3 combina em faces. Entrada (pixels) → representações cada vez mais abstratas → classificação.",
      },
      {
        q: "Qual função de ativação é mais usada em camadas ocultas de redes neurais modernas e por quê?",
        o: [
          "ReLU (Rectified Linear Unit): f(x) = max(0, x); é rápida e evita o problema de vanishing gradient",
          "Sigmoid",
          "Tangente Hiperbólica",
          "Linear",
        ],
        c: 0,
        e: "ReLU retorna 0 para inputs negativos e o próprio valor para positivos. Vantagens sobre sigmoid/tanh: não satura para valores positivos (evita vanishing gradient), computação simples (apenas comparação), induz esparsidade (neurônios com input negativo ficam inativos).",
        x: "ReLU(5) = 5, ReLU(-3) = 0, ReLU(0.1) = 0.1. Sigmoid(5) = 0.993 (quase satura, gradiente ~0). ReLU não satura para positivos, mantendo gradientes saudáveis durante backpropagation.",
      },
      {
        q: "O que é um perceptron e como ele se relaciona com redes neurais?",
        o: [
          "Neurônio artificial mais simples: soma ponderada de inputs + bias, passada por função de ativação; é a unidade básica de redes neurais",
          "Tipo de kernel",
          "Algoritmo de clustering",
          "Otimizador",
        ],
        c: 0,
        e: "O perceptron calcula z = Σ(wᵢxᵢ) + b e aplica uma função de ativação. Um único perceptron resolve apenas problemas linearmente separáveis. Empilhando perceptrons em camadas (Multi-Layer Perceptron/MLP) cria-se uma rede neural que resolve problemas não-lineares.",
        x: "Perceptron: z = 0.3×renda + 0.5×score - 0.2×dívidas + 0.1 (bias). Se z > 0 → aprovar. A rede neural é composta por centenas desses perceptrons interconectados em camadas.",
      },
      {
        q: "O que é uma CNN (Convolutional Neural Network) e para que tipo de dados é mais indicada?",
        o: [
          "Rede neural com camadas de convolução que extraem features espaciais; ideal para imagens e dados com estrutura espacial",
          "É uma rede neural genérica para qualquer tipo de dados",
          "É usada apenas para texto",
          "Não usa camadas ocultas",
        ],
        c: 0,
        e: "CNNs usam filtros (kernels) que deslizam pela imagem detectando padrões locais. Camadas iniciais detectam bordas simples, camadas profundas detectam objetos complexos. Pooling reduz dimensão. Compartilhamento de pesos torna eficiente. Aplicações: visão computacional, processamento de áudio (espectrogramas).",
        x: "Classificar dígitos MNIST (28×28 pixels): Camada Conv1 (32 filtros 3×3) → Pool → Conv2 (64 filtros 3×3) → Pool → Flatten → Dense(128) → Dense(10, softmax). Accuracy: 99.2% com apenas ~100k parâmetros.",
      },
      {
        q: "O que são epochs, batch size e iterações no treinamento de redes neurais?",
        o: [
          "Epoch = 1 passada completa pelo dataset; batch = subconjunto processado de cada vez; iterações = nº de batches por epoch",
          "São a mesma coisa",
          "Epochs são medidas de accuracy",
          "Batch size é o tamanho total dos dados",
        ],
        c: 0,
        e: "1 Epoch = todos os dados passam pela rede uma vez. Batch size = quantas amostras são processadas antes de atualizar pesos. Iterações = nº de batches por epoch = N/batch_size. Batch grande = treino estável mas lento e usa muita RAM. Batch pequeno = ruidoso mas regulariza e generaliza melhor.",
        x: "Dataset com 10000 imagens, batch_size=100: cada epoch tem 100 iterações (10000/100). Treino por 50 epochs = 5000 updates de pesos. Batch_size=32: mais ruidoso, 312 iterações/epoch, mas geralmente converge melhor.",
      },
      {
        q: "O que é uma RNN (Recurrent Neural Network) e para que tipo de dados é indicada?",
        o: [
          "Rede com conexões recorrentes que processam dados sequenciais, mantendo memória de passos anteriores",
          "Rede para processar imagens estáticas",
          "Rede sem camadas ocultas",
          "Rede que não tem parâmetros treináveis",
        ],
        c: 0,
        e: "RNNs processam sequências (texto, áudio, séries temporais) mantendo um estado oculto (hidden state) atualizado a cada passo: h_t = f(W_h × h_{t-1} + W_x × x_t + b). O estado oculto carrega 'memória' dos passos anteriores. Limitação: dificuldade em reter informação de longo prazo (vanishing gradient).",
        x: "Prever próxima palavra: 'O gato sentou no ___'. RNN processa token a token: h1 = f('O'), h2 = f('gato', h1), h3 = f('sentou', h2), h4 = f('no', h3) → output: 'tapete'. O estado h4 carrega o contexto de toda a frase anterior.",
      },
      {
        q: "O que é a função de loss (função de custo) em redes neurais e quais são as mais comuns?",
        o: [
          "Mede o erro entre previsão e valor real; Cross-Entropy para classificação e MSE para regressão são as mais comuns",
          "É a função de ativação da última camada",
          "É o learning rate do modelo",
          "É o número de parâmetros da rede",
        ],
        c: 0,
        e: "A função de loss quantifica quão longe as previsões estão dos valores reais. O otimizador minimiza essa função. Classificação binária: Binary Cross-Entropy = −[y log(ŷ) + (1−y) log(1−ŷ)]. Multi-classe: Categorical Cross-Entropy. Regressão: MSE = mean((y−ŷ)²). A escolha errada de loss leva a convergência ruim.",
        x: "Classificar gato/cachorro: label=[1,0], predição=[0.9,0.1]. BCE = −[1×log(0.9) + 0×log(0.1)] = 0.105 (baixo, boa predição). Se predição=[0.1,0.9]: BCE = −[1×log(0.1)] = 2.302 (alto, erro grande). O otimizador ajusta pesos para minimizar esse valor.",
      },
    ],
    Médio: [
      {
        q: "Na retropropagação (backpropagation), qual técnica matemática é usada para calcular o gradiente da loss em relação a cada peso da rede?",
        o: [
          "Regra da cadeia (chain rule) de derivadas parciais",
          "Inversão de matrizes",
          "Integração numérica",
          "Transformada de Fourier",
        ],
        c: 0,
        e: "A retropropagação usa a regra da cadeia para computar ∂Loss/∂wᵢ camada por camada, da saída para a entrada. Como a loss é composição de funções (ativações, lineares), a regra da cadeia decompõe o gradiente completo em gradientes locais multiplicados sequencialmente.",
        x: "Loss = (y - σ(wx+b))². ∂Loss/∂w = ∂Loss/∂σ × ∂σ/∂z × ∂z/∂w. Cada fator é um gradiente local simples de calcular. O resultado atualiza w: w = w - lr × ∂Loss/∂w.",
      },
      {
        q: "O que é learning rate e como afeta o treinamento de redes neurais?",
        o: [
          "Hiperparâmetro que controla o tamanho do passo na atualização dos pesos; muito alto diverge, muito baixo é lento",
          "Número de camadas",
          "Tamanho do dataset",
          "Número de epochs",
        ],
        c: 0,
        e: "Learning rate (lr) multiplica o gradiente na atualização: w = w - lr × ∇L. lr alto: passos grandes, pode ultrapassar o mínimo (divergir). lr baixo: passos pequenos, convergência lenta, pode ficar preso em mínimos locais. Schedulers (step decay, cosine annealing) reduzem lr durante o treino.",
        x: "lr=1.0: loss oscila e diverge (passos grandes demais). lr=0.001: convergência suave em 100 epochs. lr=0.0000001: converge muito lentamente, 10000 epochs. Cosine annealing: começa 0.01, diminui gradualmente até 0.0001.",
      },
      {
        q: "O que é Dropout e como ele previne overfitting em redes neurais?",
        o: [
          "Desativa neurônios aleatoriamente durante o treino (com probabilidade p), forçando redundância",
          "Remove camadas inteiras",
          "Reduz learning rate",
          "Aumenta o dataset",
        ],
        c: 0,
        e: "Dropout 'desliga' cada neurônio com probabilidade p (ex: 0.5) a cada mini-batch durante o treino. Isso força a rede a não depender de neurônios específicos (redundância), funcionando como ensemble implícito. Na inferência, todos os neurônios são ativados com pesos escalados.",
        x: "Sem dropout: accuracy treino 99%, teste 80% (overfitting). Com Dropout(0.5): accuracy treino 92%, teste 88% (generaliza melhor). Cada forward pass treina um sub-modelo diferente.",
      },
      {
        q: "O que é Batch Normalization e como ela acelera o treinamento de redes profundas?",
        o: [
          "Normaliza as ativações de cada camada para média 0 e variância 1, estabilizando e acelerando o treino",
          "Aumenta o tamanho do batch",
          "Reduz o número de camadas",
          "É um tipo de ativação como ReLU",
        ],
        c: 0,
        e: "Batch Norm normaliza as entradas de cada camada: x̂ = (x-μ_batch)/σ_batch, depois escala e desloca: y = γx̂ + β (parâmetros aprendidos). Benefícios: permite learning rates maiores, reduz dependência da inicialização, atua como regularização leve. Aplicado após camada linear/conv, antes da ativação.",
        x: "Rede 20 camadas sem BatchNorm: treino diverge com lr=0.01. Com BatchNorm: treino converge com lr=0.1 (10x maior) e em metade das epochs. Accuracy final: sem BN 85%, com BN 91%. Cada camada recebe entrada estável.",
      },
      {
        q: "O que são as arquiteturas LSTM e GRU e por que foram criadas para substituir RNNs simples?",
        o: [
          "Possuem gates que controlam o fluxo de informação, resolvendo o problema de vanishing gradient em sequências longas",
          "São mais simples que RNNs",
          "Foram criadas para imagens",
          "Não processam sequências",
        ],
        c: 0,
        e: "RNNs simples perdem informação de longo prazo (vanishing gradient). LSTM adiciona 3 gates: forget (o que descartar), input (o que armazenar), output (o que emitir). Cell state carrega informação por longos períodos. GRU simplifica para 2 gates (reset, update), sendo mais rápida com performance similar. Ambas são base para NLP e séries temporais.",
        x: "Traduzir frase de 30 palavras: RNN simples 'esquece' as primeiras palavras (accuracy 60%). LSTM mantém contexto longo (accuracy 85%). GRU: accuracy 84%, mas treina 20% mais rápido que LSTM. Hoje, Transformers superaram ambas.",
      },
      {
        q: "O que são skip connections (residual connections) e como a ResNet as utiliza?",
        o: [
          "Conexões que pulam camadas somando a entrada diretamente à saída, permitindo treinar redes muito profundas sem degradação",
          "Conexões que removem camadas desnecessárias",
          "Técnica de regularização como Dropout",
          "Conexões entre redes neurais diferentes",
        ],
        c: 0,
        e: "Skip connections adicionam a entrada x de um bloco à sua saída: y = F(x) + x. Assim, se F(x) = 0 (camada inútil), o bloco passa x intacto (identidade). Isso resolve degradation problem: redes mais profundas sem skip connections performam PIOR. ResNet-152 (152 camadas) supera redes de 20 camadas graças a isso.",
        x: "Rede 20 camadas sem skip: accuracy 90%. 56 camadas sem skip: accuracy 87% (pior!). ResNet-56 com skip connections: accuracy 93%. ResNet-152: accuracy 95%. Skip connections permitem gradiente fluir direto: ∂Loss/∂x = ∂Loss/∂y × (∂F/∂x + 1) — o '+1' garante gradiente mínimo.",
      },
      {
        q: "O que é data augmentation e como ajuda a prevenir overfitting em deep learning?",
        o: [
          "Técnica que cria variações dos dados de treino (rotação, flip, zoom) para aumentar o dataset efetivamente sem coletar novos dados",
          "Coleta mais dados reais",
          "Remove dados duplicados",
          "Aumenta o tamanho do batch",
        ],
        c: 0,
        e: "Data augmentation aplica transformações aleatórias preservando o rótulo: flip horizontal, rotação ±15°, zoom, crop, ajuste de brilho/contraste, Cutout, Mixup. Cada epoch vê versões ligeiramente diferentes, impedindo memorização. Funciona como regularização e é essencial quando o dataset é pequeno.",
        x: "Dataset de raio-X: 500 imagens originais. Com augmentation (flip, rotation, zoom, brightness): cada imagem gera ~10 variações = 5000 imagens efetivas. Sem augmentation: accuracy 75%, overfitting. Com augmentation: accuracy 88%. CutMix/MixUp avançadas: accuracy 91%.",
      },
    ],
    Difícil: [
      {
        q: "No mecanismo de Self-Attention (Transformers), como os vetores Query (Q), Key (K) e Value (V) geram a saída de atenção?",
        o: [
          "Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V — similaridade Q·K pondera os valores V",
          "Soma simples de Q + K + V",
          "Convolução entre Q e V",
          "Concatenação de Q, K e V com pooling",
        ],
        c: 0,
        e: "Self-Attention calcula: 1) Score = QKᵀ (similaridade entre cada par de tokens), 2) Scale por √dₖ (estabiliza gradientes), 3) Softmax (normaliza para pesos de atenção entre 0 e 1), 4) Multiplica por V (média ponderada dos valores). Cada token 'atende' a todos os outros com pesos aprendidos.",
        x: "Frase: 'O gato sentou no tapete dele'. Ao processar 'dele', Q de 'dele' é similar ao K de 'gato' (alto score) → softmax concentra peso em 'gato' → V de 'gato' contribui mais para a representação de 'dele'. O modelo aprende que 'dele' refere-se a 'gato'.",
      },
      {
        q: "O que é o problema de vanishing gradient e como afeta redes neurais profundas?",
        o: [
          "Gradientes diminuem exponencialmente em camadas profundas, impedindo o aprendizado das primeiras camadas",
          "Gradientes explodem",
          "Problema de memória",
          "Excesso de dados",
        ],
        c: 0,
        e: "Na backpropagation, gradientes são multiplicados camada por camada (regra da cadeia). Se cada gradiente local < 1, o produto de muitas frações → ~0 nas primeiras camadas (vanishing). Soluções: ReLU (vs sigmoid), skip connections (ResNet), batch normalization, inicialização He/Xavier.",
        x: "Rede 50 camadas com sigmoid: gradiente na camada 1 = 0.25⁵⁰ ≈ 0 (vanishing). Com ReLU + skip connections (ResNet-50): gradiente flui diretamente via atalhos, camada 1 aprende normalmente.",
      },
      {
        q: "O que são GANs (Generative Adversarial Networks) e como o treinamento adversário funciona?",
        o: [
          "Duas redes competem: Generator cria dados falsos, Discriminator distingue real vs falso; ambas melhoram mutuamente",
          "Rede única que gera dados",
          "Ensemble de classificadores",
          "Auto-encoder com regularização",
        ],
        c: 0,
        e: "GAN tem Generator (G) que gera dados a partir de ruído, e Discriminator (D) que classifica real vs falso. G é treinado para enganar D, D é treinado para detectar G. No equilíbrio (Nash equilibrium), G gera dados indistinguíveis dos reais. Min_G Max_D V(D,G) = E[log D(x)] + E[log(1-D(G(z)))].",
        x: "GAN para gerar rostos: G começa gerando ruído, D detecta fácil (100%). Após 1000 epochs, G gera rostos quase reais, D acerta ~55% (quase aleatório). Resultado: StyleGAN gera rostos fotorrealistas de pessoas que não existem.",
      },
      {
        q: "O que é Transfer Learning em Deep Learning e por que revolucionou a prática?",
        o: [
          "Usar pesos pré-treinados de um modelo grande como base para tarefas específicas com poucos dados",
          "Transferir dados entre datasets",
          "Copiar a arquitetura sem os pesos",
          "Treinar dois modelos simultaneamente",
        ],
        c: 0,
        e: "Transfer Learning: modelo pré-treinado em grande dataset (ImageNet 14M imagens, GPT em trilhões de tokens) já aprendeu representações universais. Para nova tarefa: congelar camadas base + treinar camadas finais (fine-tuning). Reduz dados necessários de milhões para centenas. ResNet, BERT, GPT são bases comuns.",
        x: "Detectar raças de cachorro (120 classes, 200 fotos cada): treino do zero → accuracy 35% (pouco dado). ResNet50 pré-treinado no ImageNet: congelar 48 camadas, substituir última por Dense(120) → accuracy 92% com 30 min de treino.",
      },
      {
        q: "O que é o problema de Exploding Gradients e como técnicas como Gradient Clipping resolvem?",
        o: [
          "Gradientes crescem exponencialmente durante backpropagation; gradient clipping limita a norma máxima do gradiente",
          "Os gradientes ficam muito pequenos",
          "É resolvido adicionando mais camadas",
          "Gradient clipping aumenta os gradientes",
        ],
        c: 0,
        e: "Em redes profundas, gradientes multiplicados repetidamente podem explodir (valores > 10⁶). Gradient clipping: se ||∇|| > max_norm, escala ∇ = ∇ × max_norm/||∇||. Mantém a direção mas limita a magnitude. Combinado com inicialização Xavier/He e BatchNorm, previne instabilidade no treinamento.",
        x: "RNN treinando texto: gradiente na camada 1 = 1.5⁵⁰ ≈ 6.4×10⁸ (explodindo). Loss salta de 2.5 para NaN. Com gradient clipping max_norm=1.0: gradiente limitado, loss decresce suavemente 2.5→1.8→1.2→0.8.",
      },
      {
        q: "O que é Knowledge Distillation e como permite comprimir modelos grandes em modelos menores?",
        o: [
          "Treina um modelo menor (student) para imitar as probabilidades suavizadas (soft targets) de um modelo grande (teacher)",
          "Copia os pesos diretamente do modelo grande",
          "Remove camadas aleatórias do modelo grande",
          "É o mesmo que pruning de pesos",
        ],
        c: 0,
        e: "Knowledge Distillation: o teacher gera soft labels (probabilidades com temperature T alta, ex: [gato:0.6, tigre:0.3, cachorro:0.1]). O student aprende dessas distribuições suaves, que contêm mais informação que hard labels [1,0,0]. Loss: α×CE(soft_teacher, soft_student) + (1−α)×CE(hard_label, student). Student menor atinge ~95% da performance do teacher.",
        x: "Teacher BERT-Large (340M params): accuracy 92%. Hard labels: gato=[1,0,0]. Soft labels (T=3): gato=[0.6,0.3,0.1] — 'gato se parece com tigre' é informação extra. Student BERT-Tiny (14M params, 24× menor): com hard labels 82%, com distillation 89%. Quase a performance do teacher com 4% dos parâmetros.",
      },
      {
        q: "O que é Multi-Head Attention e por que é superior a usar uma única cabeça de atenção?",
        o: [
          "Executa múltiplas atenções em paralelo com projeções diferentes, capturando diferentes tipos de relações simultaneamente",
          "É uma única atenção aplicada múltiplas vezes",
          "Cada head processa um token diferente",
          "É apenas uma otimização de velocidade sem ganho de qualidade",
        ],
        c: 0,
        e: "Multi-Head Attention divide Q, K, V em h cabeças com projeções lineares diferentes: head_i = Attention(QWᵢQ, KWᵢK, VWᵢV). As saídas são concatenadas e projetadas: MultiHead = Concat(head₁,...,head_h)Wᴼ. Cada cabeça pode aprender padrões diferentes: uma para adjacência, outra para correferência, outra para sintaxe.",
        x: "GPT com 12 heads analisando 'O programador que escreveu o código testou ele': Head 3 conecta 'ele' → 'programador' (correferência). Head 7 conecta 'testou' → 'código' (relação verbo-objeto). Head 11 conecta 'escreveu' → 'programador' (sujeito-verbo). Uma única head não capturaria todos esses padrões.",
      },
    ],
  },

  // ── Estatística para ML ──
  "Estatística para ML": {
    Fácil: [
      {
        q: "Qual medida estatística representa o valor que divide um conjunto de dados ordenados exatamente ao meio?",
        o: ["Mediana", "Média", "Moda", "Variância"],
        c: 0,
        e: "A mediana é o valor central de um dataset ordenado. Para n ímpar, é o elemento do meio. Para n par, é a média dos dois centrais. Ao contrário da média, a mediana é robusta a outliers, sendo mais representativa em distribuições assimétricas.",
        x: "Salários: [2k, 3k, 3k, 4k, 100k]. Média = 22.4k (distorcida pelo outlier 100k). Mediana = 3k (valor central real, mais representativo).",
      },
      {
        q: "O que é desvio padrão e como ele mede a dispersão dos dados?",
        o: [
          "Mede o quanto os valores se afastam da média; quanto maior, mais dispersos os dados",
          "Média dos dados",
          "Valor mais frequente",
          "Diferença entre máximo e mínimo",
        ],
        c: 0,
        e: "Desvio padrão (σ) é a raiz quadrada da variância. Mede a dispersão dos dados em torno da média. σ baixo: dados concentrados perto da média. σ alto: dados espalhados. Em distribuição normal, ~68% dos dados estão dentro de ±1σ da média, ~95% dentro de ±2σ.",
        x: "Notas turma A: [7, 7, 8, 7, 8], média=7.4, σ=0.49 (concentrados). Notas turma B: [2, 5, 7, 9, 10], média=6.6, σ=2.87 (dispersos).",
      },
      {
        q: "Qual é a diferença entre correlação e causalidade?",
        o: [
          "Correlação indica associação estatística entre variáveis; causalidade indica que uma causa a outra",
          "São a mesma coisa",
          "Causalidade é mais fraca",
          "Correlação implica causalidade",
        ],
        c: 0,
        e: "Correlação mede a força da relação linear entre duas variáveis (-1 a 1). Causalidade exige que uma variável CAUSE mudança na outra. Variáveis podem ser correlacionadas por confounders (terceira variável). Correlação ≠ causalidade: vendas de sorvete correlacionam com afogamentos (ambos causados pelo calor).",
        x: "Correlação: consumo de sorvete ↑ e afogamentos ↑ (r=0.85). Causalidade? Não! Ambos são causados pelo calor (confounder). Comer sorvete não causa afogamento.",
      },
      {
        q: "O que significam os percentis e quartis em uma distribuição de dados?",
        o: [
          "Percentis dividem dados em 100 partes iguais; quartis dividem em 4 (Q1=25%, Q2=50%/mediana, Q3=75%)",
          "São médias de subconjuntos",
          "Medem a correlação entre variáveis",
          "Só se aplicam a distribuições normais",
        ],
        c: 0,
        e: "Percentil k: valor abaixo do qual k% dos dados caem. Quartis são percentis especiais: Q1 (25º percentil), Q2 (50º = mediana), Q3 (75º). IQR = Q3-Q1 mede dispersão central. Outliers: pontos fora de [Q1-1.5×IQR, Q3+1.5×IQR]. Boxplot visualiza quartis e outliers.",
        x: "Notas de 100 alunos: Q1=6.0, Q2=7.5(mediana), Q3=8.5, IQR=2.5. Limites: [6.0-3.75=2.25, 8.5+3.75=12.25]. Nota 2.0 é outlier inferior. Nota 10.0 está dentro dos limites.",
      },
      {
        q: "O que é a covariância e como se relaciona com a correlação de Pearson?",
        o: [
          "Covariância mede a direção da relação entre variáveis; correlação de Pearson a normaliza para [-1,1]",
          "São conceitos independentes",
          "Covariância só mede relações positivas",
          "Correlação não usa covariância no cálculo",
        ],
        c: 0,
        e: "Covariância: cov(X,Y) = E[(X-μx)(Y-μy)]. Positiva = crescem juntas, negativa = sentidos opostos. Problema: depende da escala. Correlação de Pearson: r = cov(X,Y)/(σx×σy). Normalizada em [-1,1], independente de escala. r=0 não implica independência (pode haver relação não-linear).",
        x: "Altura (cm) e peso (kg): cov=350 (difícil interpretar). r=0.82 (forte relação positiva, claro!). Idade e temperatura corporal: cov=0.5, r=0.03 (relação desprezível).",
      },
      {
        q: "O que é a moda de um conjunto de dados e em quais situações ela é mais útil que a média?",
        o: [
          "É o valor mais frequente no dataset; útil para dados categóricos e distribuições multimodais",
          "É o valor central do dataset",
          "É a média dos extremos",
          "Só existe em distribuições normais",
        ],
        c: 0,
        e: "A moda é o valor que aparece com maior frequência. Pode haver uma moda (unimodal), duas (bimodal) ou mais (multimodal). É a única medida de tendência central aplicável a dados categóricos (ex: cor favorita). Em dados numéricos, é útil quando a distribuição tem picos múltiplos.",
        x: "Tamanhos de camisetas vendidos: [P, M, M, G, M, G, P, M]. Moda = M (mais vendido → guia produção). Média não faz sentido para categorias. Notas: [5, 7, 7, 8, 8, 8, 9]. Moda = 8 (nota mais comum), média = 7.4, mediana = 8.",
      },
      {
        q: "O que é um outlier e como pode distorcer estatísticas descritivas como média e desvio padrão?",
        o: [
          "É um valor atipicamente distante dos demais que inflaciona a média e o desvio padrão",
          "É o valor mais comum do dataset",
          "Só outliers acima da média existem",
          "Outliers não afetam nenhuma métrica",
        ],
        c: 0,
        e: "Outlier: valor extremo que se desvia significativamente do padrão. Média é sensível: um outlier puxa a média na sua direção. Mediana é robusta. Detecção: IQR (fora de Q1−1.5×IQR ou Q3+1.5×IQR), z-score > 3, ou Isolation Forest. Outliers podem ser erros ou dados legítimos raros.",
        x: "Salários: [3k, 4k, 4k, 5k, 5k, 200k]. Média = 36.8k (distorcida pelo CEO 200k). Mediana = 4.5k (representativa). Desvio padrão: com outlier = 79k, sem outlier = 0.8k. O outlier inflou o σ em 100×. Decisão: manter (dado legítimo) ou tratar (winsorização, log transform).",
      },
    ],
    Médio: [
      {
        q: "Em estatística, o que é o 'p-value' em um teste de hipóteses e como ele é interpretado?",
        o: [
          "Probabilidade de observar o resultado obtido (ou mais extremo) assumindo que a hipótese nula é verdadeira",
          "Probabilidade de a hipótese alternativa ser verdadeira",
          "Porcentagem de dados acima da média",
          "Chance de erro no dataset",
        ],
        c: 0,
        e: "O p-value mede a probabilidade de obter um resultado tão extremo quanto o observado, assumindo que H₀ (hipótese nula) é verdadeira. Se p-value < α (nível de significância, geralmente 0.05), rejeitamos H₀. Um p-value pequeno indica evidência contra H₀, não prova que H₁ é verdadeira.",
        x: "Teste se medicamento reduz pressão: H₀ = 'sem efeito'. p-value = 0.003 < 0.05 → rejeitamos H₀, há evidência estatística significativa de que o medicamento tem efeito.",
      },
      {
        q: "O que é distribuição normal (gaussiana) e por que é tão importante em estatística?",
        o: [
          "Distribuição em forma de sino definida por média e desvio padrão; muitos fenômenos naturais seguem esta distribuição",
          "Distribuição uniforme",
          "Apenas para dados discretos",
          "Só existe em teoria",
        ],
        c: 0,
        e: "A distribuição normal é simétrica, com formato de sino, parametrizada por μ (média) e σ (desvio padrão). Pelo Teorema Central do Limite, a média de amostras grandes tende à normalidade. Muitos testes estatísticos assumem normalidade. Regra 68-95-99.7: ±1σ=68%, ±2σ=95%, ±3σ=99.7%.",
        x: "Alturas de adultos: média=170cm, σ=10cm. 68% entre 160-180cm, 95% entre 150-190cm, 99.7% entre 140-200cm. Uma pessoa de 210cm está a 4σ — extremamente rara.",
      },
      {
        q: "O que é um teste A/B e como a estatística garante que o resultado não é por acaso?",
        o: [
          "Experimento controlado que compara duas versões; significância estatística (p-value < 0.05) confirma que a diferença não é aleatória",
          "Testar versões A e B simultaneamente sem análise",
          "Escolher a versão preferida pelo chefe",
          "Rodar por 1 dia e comparar",
        ],
        c: 0,
        e: "Teste A/B divide usuários aleatoriamente em grupo controle (A) e tratamento (B). Métricas são comparadas usando testes estatísticos (t-test, chi-quadrado). Requer: tamanho amostral suficiente (poder estatístico), randomização, e p-value < α para concluir significância.",
        x: "Botão verde (A): 5% conversão (500/10000). Botão vermelho (B): 5.5% (550/10000). p-value = 0.03 < 0.05 → diferença significativa. Se p-value = 0.15 → pode ser acaso, manter A.",
      },
      {
        q: "O que é um intervalo de confiança e como interpretá-lo corretamente?",
        o: [
          "Faixa de valores que contém o parâmetro real com certa probabilidade (ex: 95% de confiança)",
          "A probabilidade do resultado ser exato",
          "A margem de erro do computador",
          "O range dos dados coletados",
        ],
        c: 0,
        e: "IC 95%: se repetíssemos o experimento 100 vezes, ~95 dos intervalos conteriam o valor verdadeiro. IC = x̄ ± z×(s/√n). IC mais estreito = mais precisão. Fatores: nível de confiança (95% vs 99%), tamanho amostral (mais dados = IC menor), variabilidade dos dados.",
        x: "Pesquisa eleitoral: candidato A = 45% ± 3% (IC 95%: [42%, 48%]). Candidato B = 47% ± 3% (IC 95%: [44%, 50%]). ICs se sobrepõem → empate técnico (não se pode afirmar quem está à frente).",
      },
      {
        q: "O que são os erros Tipo I e Tipo II em testes de hipóteses?",
        o: [
          "Tipo I: rejeitar H₀ quando veradadeira (falso positivo); Tipo II: não rejeitar H₀ quando falsa (falso negativo)",
          "São erros de cálculo matemático",
          "Tipo I é pior que Tipo II sempre",
          "São a mesma coisa",
        ],
        c: 0,
        e: "Erro Tipo I (α): rejeitar hipótese nula verdadeira (alarme falso). Controlado pelo nível de significância (α=0.05 = 5% de chance). Erro Tipo II (β): não rejeitar hipótese nula falsa (perder efeito real). Poder = 1−β. Para reduzir ambos: aumentar tamanho amostral.",
        x: "Teste COVID: Tipo I = pessoa saudável testada positiva (falso positivo, quarentena desnecessária). Tipo II = pessoa infectada testada negativa (falso negativo, espalha o vírus). Em pandemias, Tipo II é mais perigoso.",
      },
      {
        q: "O que é o Teorema Central do Limite (TCL) e por que é fundamental em estatística inferencial?",
        o: [
          "A distribuição das médias amostrais tende à Normal conforme n aumenta, independentemente da distribuição original",
          "Todos os dados seguem distribuição normal",
          "Só funciona para dados normais",
          "A média amostral é sempre igual à populacional",
        ],
        c: 0,
        e: "TCL: se tirarmos muitas amostras de tamanho n de QUALQUER distribuição (com média μ e variância σ² finitos), a distribuição das médias amostrais será aproximadamente Normal(μ, σ²/n) para n ≥ 30. Isso permite usar testes baseados na Normal mesmo com dados não-normais, fundamentando testes de hipótese e ICs.",
        x: "Lançamento de dado (distribuição uniforme, não normal): média=3.5, σ=1.71. Tire 1000 amostras de n=30 e calcule a média de cada: distribuição das médias → Normal(3.5, 0.31). Podemos fazer t-test nas médias, mesmo o dado não sendo normal!",
      },
      {
        q: "O que é poder estatístico (statistical power) e quais fatores o influenciam?",
        o: [
          "Probabilidade de detectar um efeito real quando ele existe (1−β); influenciado por tamanho amostral, tamanho do efeito e nível de significância",
          "É a probabilidade de commit erro Tipo I",
          "É o valor do p-value",
          "É sempre fixo em 80%",
        ],
        c: 0,
        e: "Power = P(rejeitar H₀ | H₀ é falsa) = 1−β. Poder ≥ 80% é convencional. Aumentar poder: ↑ tamanho amostral (n), ↑ tamanho do efeito (effect size), ↑ α (nível de significância), ou ↓ variância. Análise de poder a priori determina o n mínimo antes do estudo.",
        x: "Testar se novo remédio baixa pressão em 5mmHg (σ=10): Power analysis: α=0.05, power=0.80, effect_size=0.5 → preciso n=64 por grupo. Com n=20: power=0.40 (40% chance de detectar o efeito mesmo que exista). Com n=200: power=0.99 (quase certeza).",
      },
    ],
    Difícil: [
      {
        q: "O que é o 'bias-variance tradeoff' em ML e como ele se relaciona com overfitting e underfitting?",
        o: [
          "Alto bias = underfitting (modelo simples demais); alta variância = overfitting (modelo complexo demais); o ideal é equilibrar ambos",
          "Bias e variância sempre diminuem juntos",
          "Bias causa overfitting e variância causa underfitting",
          "Só é relevante para redes neurais",
        ],
        c: 0,
        e: "Bias é o erro por suposições simplificadoras do modelo (un performance no treino). Variância é a sensibilidade a flutuações no dataset de treino (gap entre treino e teste). Modelos simples: alto bias, baixa variância (underfitting). Modelos complexos: baixo bias, alta variância (overfitting). O objetivo é minimizar o erro total = bias² + variância.",
        x: "Prever salários: regressão linear (alto bias: reta não captura curva) vs polinômio grau 20 (alta variância: se ajusta ao ruído). Polinômio grau 3: equilibra bias e variância, generaliza melhor para dados novos.",
      },
      {
        q: "O que é a maldição da dimensionalidade e como afeta modelos de ML?",
        o: [
          "Em alta dimensionalidade, dados tornam-se esparsos e distâncias perdem significado; modelos precisam exponencialmente mais dados",
          "Mais features sempre melhora",
          "Só afeta regressão",
          "Resolvido com mais camadas",
        ],
        c: 0,
        e: "Conforme dimensões aumentam: volume do espaço cresce exponencialmente, dados ficam esparsos, distâncias euclidianas convergem (todos os pontos ficam 'igualmente distantes'), e o número de amostras necessárias cresce exponencialmente. Algoritmos como KNN e DBSCAN sofrem muito. Solução: redução de dimensionalidade.",
        x: "KNN com 5 features e 1000 pontos: funciona bem. Com 500 features e 1000 pontos: todos os vizinhos têm distância similar, KNN falha. Precisa de ~10⁵⁰⁰ pontos para cobrir o espaço 500D — impossível. PCA para 10 features resolve.",
      },
      {
        q: "O que é análise Bayesiana e como o teorema de Bayes é aplicado em ML?",
        o: [
          "Atualiza crenças (prior) com evidências (likelihood) para obter probabilidade posterior; base do Naive Bayes e inferência Bayesiana",
          "Apenas para classificação binária",
          "Técnica de clustering",
          "Método de otimização",
        ],
        c: 0,
        e: "Teorema de Bayes: P(A|B) = P(B|A)×P(A)/P(B). Prior P(A): crença inicial. Likelihood P(B|A): probabilidade dos dados dado o modelo. Posterior P(A|B): crença atualizada. Naive Bayes assume independência entre features (ingenuamente), mas funciona surpreendentemente bem para NLP.",
        x: "Spam filter: P(spam|palavra='viagra') = P('viagra'|spam)×P(spam) / P('viagra'). Prior P(spam)=0.3. P('viagra'|spam)=0.8. P('viagra')=0.25. Posterior = 0.8×0.3/0.25 = 0.96 → 96% chance de spam.",
      },
      {
        q: "O que é o Bootstrap em estatística e como é usado para estimar incerteza?",
        o: [
          "Reamostragem com reposição do dataset original para gerar distribuição empírica de uma estatística e estimar intervalos de confiança",
          "É um tipo de regressão",
          "Método de normalização de dados",
          "É o mesmo que cross-validation",
        ],
        c: 0,
        e: "Bootstrap: reamostrar N dados com reposição, calcula a estatística (média, mediana, R²), repetir B vezes (ex: 1000). Resultado: distribuição da estatística sem supor normalidade. IC Bootstrap: percentis 2.5% e 97.5% das B amostras. Não-paramétrico — funciona para qualquer estatística.",
        x: "Dataset com 50 observações, média=75. Bootstrap 1000x: médias amostradas = [72.1, 76.3, 74.8, ...]. Ordena e pega percentis: IC 95% = [71.5, 78.2]. Sem supor normalidade nem fórmulas analíticas.",
      },
      {
        q: "O que é a distribuição t de Student e quando usá-la em vez da Normal?",
        o: [
          "Usada quando a amostra é pequena e/ou o desvio padrão populacional é desconhecido; tem caudas mais pesadas que a Normal",
          "É sempre preferível à Normal",
          "Só se aplica a dados categóricos",
          "É a mesma distribuição Normal com outro nome",
        ],
        c: 0,
        e: "Distribuição t: similar à Normal mas com caudas mais pesadas, parametrizada por graus de liberdade (df=n-1). Com n pequeno, mais incerteza → caudas mais largas. Conforme n→∞, t→Normal. Usar t-test em vez de z-test quando: n<30 ou σ populacional desconhecido (quase sempre na prática).",
        x: "Testar se novo remédio reduz pressão com n=15 pacientes: z-test exigiria σ populacional (desconhecido). t-test com df=14: t=2.8, p=0.014 < 0.05 → efeito significativo. Com n=500, t-test e z-test dariam resultado idêntico.",
      },
      {
        q: "O que é o teste de Kolmogorov-Smirnov (KS) e quando utilizá-lo?",
        o: [
          "Teste não-paramétrico que compara a distribuição acumulada dos dados com uma distribuição de referência ou entre duas amostras",
          "Testa apenas normalidade",
          "É um teste para médias",
          "Só funciona com dados categóricos",
        ],
        c: 0,
        e: "O teste KS mede a distância máxima (D) entre a função de distribuição acumulada (CDF) empírica e uma CDF teórica (1-amostra) ou entre dois CDFs empíricos (2-amostras). H₀: as distribuições são iguais. Vantagem: não-paramétrico, sensível a diferenças em localização, escala e forma. Limitação: menos poderoso que testes específicos.",
        x: "Verificar se dados seguem Normal: KS 1-amostra, D=0.08, p=0.42 > 0.05 → não rejeitamos H₀, dados compatíveis com Normal. Comparar vendas Jan vs Fev: KS 2-amostras, D=0.25, p=0.001 → distribuições significativamente diferentes.",
      },
      {
        q: "O que é a correção de Bonferroni e por que é necessária em múltiplas comparações?",
        o: [
          "Ajusta o nível de significância dividindo α pelo número de testes para controlar a taxa de erro global",
          "Aumenta o p-value de cada teste",
          "Remove testes não significativos",
          "É apenas para testes de normalidade",
        ],
        c: 0,
        e: "Ao realizar m testes simultâneos com α=0.05, a probabilidade de pelo menos 1 falso positivo sobe: P = 1−(1−0.05)^m. Com m=20: P=64%! Bonferroni: usa α/m como limiar (0.05/20 = 0.0025). Conservador mas simples. Alternativas menos conservadoras: Holm-Bonferroni, Benjamini-Hochberg (FDR).",
        x: "Comparar 10 grupos em pares: C(10,2)=45 testes. α=0.05: ~2.3 falsos positivos esperados! Bonferroni: α_adj = 0.05/45 = 0.0011. Só resultados com p < 0.0011 são significativos. FDR (Benjamini-Hochberg): menos conservador, aceita proporcão controlada de falsos positivos.",
      },
    ],
  },

  // ── IA Generativa e LLMs ──
  "IA Generativa e LLMs": {
    Fácil: [
      {
        q: "O que significa a sigla LLM no contexto de Inteligência Artificial?",
        o: [
          "Large Language Model (Modelo de Linguagem Grande)",
          "Linear Learning Machine",
          "Low Latency Memory",
          "Logical Language Module",
        ],
        c: 0,
        e: "LLM (Large Language Model) é um modelo de deep learning treinado em grandes volumes de texto para compreender e gerar linguagem natural. Exemplos incluem GPT-4, Claude, Gemini e LLaMA. São baseados na arquitetura Transformer e possuem bilhões de parâmetros.",
        x: "O GPT-4 foi treinado em trilhões de tokens de texto e possui centenas de bilhões de parâmetros, permitindo gerar texto, traduzir, programar, analisar e raciocinar sobre informações complexas.",
      },
      {
        q: "O que é um chatbot baseado em LLM e como ele difere de chatbots tradicionais baseados em regras?",
        o: [
          "LLM gera respostas contextuais com compreensão semântica; chatbot de regras segue scripts predefinidos (if/else)",
          "São idênticos",
          "Chatbot de regras é mais inteligente",
          "LLM só funciona em inglês",
        ],
        c: 0,
        e: "Chatbots de regras usam padrões fixos (regex, intent matching, árvores de decisão). LLMs entendem contexto, nuance e geram respostas criativas. LLMs: flexíveis mas podem alucinar. Regras: previsíveis mas limitados. Abordagem híbrida: LLM para compreensão + regras para ações críticas.",
        x: "Regras: 'cancelar pedido' → script fixo pedindo número do pedido. LLM: 'quero devolver aquele negócio que comprei terça' → entende contexto, identifica o pedido, sugere opções, tudo em linguagem natural.",
      },
      {
        q: "O que é tokenização em LLMs e por que modelos usam subword tokens?",
        o: [
          "Dividir texto em unidades processáveis; subwords equilibram vocabulário finito com cobertura de palavras desconhecidas",
          "Dividir por espaços apenas",
          "Cada letra é um token",
          "Tokenização não é necessária",
        ],
        c: 0,
        e: "Tokenização converte texto em IDs numéricos. Character-level: vocabulário pequeno, sequências longas. Word-level: vocabulário enorme, não lida com palavras novas. Subword (BPE, WordPiece): equilibra ambos. 'unhappiness' → ['un', 'happiness'] ou ['un', 'happi', 'ness']. GPT-4 usa ~100k tokens via BPE.",
        x: "'Processamento' → tokens ['Process', 'amento'] (2 tokens). 'ML' → ['ML'] (1 token). 'Pneumoultramicroscopicossilicovulcanoconiótico' → múltiplos subword tokens porque é rara, mas composta de partes conhecidas.",
      },
      {
        q: "O que é o conceito de 'temperatura' na geração de texto por LLMs?",
        o: [
          "Parâmetro que controla a aleatoriedade: temperatura baixa = respostas mais determinísticas, alta = mais criativas",
          "A temperatura do hardware durante a geração",
          "Mede a qualidade da resposta",
          "Controla o tamanho da resposta",
        ],
        c: 0,
        e: "Temperatura escala os logits antes do softmax: pᵢ = exp(zᵢ/T) / Σexp(zⱼ/T). T=0: determinístico (sempre o token mais provável). T=1: distribuição original. T>1: mais uniforme (mais criativa/arriscada). Top-p (nucleus sampling) complementa, limitando o pool de tokens candidatos.",
        x: "Prompt: 'O céu é...' T=0.1: 'azul' (99% das vezes). T=0.7: 'azul'(60%), 'lindo'(20%), 'infinito'(15%). T=1.5: 'um oceano invertido'(10%), 'misterioso'(8%). Para código, T=0.2. Para poesia, T=0.9.",
      },
      {
        q: "O que é o conceito de 'context window' (janela de contexto) em LLMs?",
        o: [
          "Número máximo de tokens que o modelo pode processar de uma vez (input + output)",
          "É o tamanho do dataset de treino",
          "É o número de camadas do modelo",
          "É a memória RAM necessária",
        ],
        c: 0,
        e: "Context window define a quantidade total de texto (input + output) que o modelo 'vê' de uma vez. GPT-3.5: 4k tokens. GPT-4: 8k/32k/128k tokens. Claude: 200k tokens. Texto fora da janela é 'esquecido'. Estratégias para textos longos: chunking, summarization, RAG.",
        x: "Modelo com 4k tokens (~3000 palavras): resume um artigo de 2 páginas perfeitamente. Mas um livro de 300 páginas? Não cabe. Solução: dividir em chunks de 3k tokens, resumir cada, combinar resumos. Modelo 128k: livro inteiro cabe.",
      },
      {
        q: "O que são embeddings (vetores) no contexto de LLMs e como representam significado?",
        o: [
          "Vetores numéricos de alta dimensão que capturam o significado semântico de palavras/frases; palavras similares têm vetores próximos",
          "São os parâmetros do modelo",
          "São os tokens do vocabulário",
          "São as camadas ocultas da rede",
        ],
        c: 0,
        e: "Embeddings mapeiam texto para vetores densos (ex: 768 ou 1536 dimensões) onde a distância geométrica reflete similaridade semântica. Usados para busca semântica, clustering, RAG e similaridade textual. Modelos: Word2Vec, BERT embeddings, OpenAI text-embedding-3. Propriedade famosa: rei − homem + mulher ≈ rainha.",
        x: "embed('gato') e embed('felino') têm cosseno ~0.92 (muito próximos). embed('gato') e embed('avião') têm cosseno ~0.15 (distantes). RAG usa embeddings: query 'como cuidar de gatos' → busca vetorial encontra documentos similares mesmo sem as palavras exatas.",
      },
      {
        q: "Qual a diferença entre zero-shot, one-shot e few-shot prompting em LLMs?",
        o: [
          "Zero-shot: sem exemplos; one-shot: 1 exemplo; few-shot: vários exemplos no prompt para guiar o modelo",
          "São técnicas de treinamento do modelo",
          "Referem-se ao número de camadas da rede",
          "São métricas de avaliação",
        ],
        c: 0,
        e: "Zero-shot: apenas a instrução, o modelo generaliza sem exemplos. One-shot: 1 exemplo de entrada/saída esperada. Few-shot: 3-5 exemplos que demonstram o padrão desejado. Mais exemplos geralmente melhoram a consistência do formato e qualidade, mas consomem tokens da context window.",
        x: "Classificar sentimento: Zero-shot: 'Classifique: O filme foi ótimo'. Few-shot: 'Adorei o livro → positivo. Péssimo serviço → negativo. Comida razoável → neutro. O filme foi ótimo →'. Few-shot accuracy: 95% vs zero-shot 82% na maioria dos benchmarks.",
      },
    ],
    Médio: [
      {
        q: "O que é 'prompt engineering' e por que é importante para obter bons resultados de LLMs?",
        o: [
          "A arte de formular instruções precisas para guiar o modelo a produzir respostas mais relevantes e acuradas",
          "Treinar o modelo do zero com novos dados",
          "Otimizar os hiperparâmetros de treinamento",
          "Comprimir o modelo para executar mais rápido",
        ],
        c: 0,
        e: "Prompt engineering é a técnica de estruturar inputs (prompts) para maximizar a qualidade das respostas de LLMs. Inclui técnicas como few-shot (exemplos no prompt), chain-of-thought (raciocínio passo a passo), role-playing (definir persona) e constraint specification (definir formato/limites).",
        x: "Prompt ruim: 'resuma o texto'. Prompt bom: 'Você é um analista financeiro sênior. Resuma o relatório abaixo em 3 bullet points focando em: receita, margem e riscos. Formato: - [tema]: [insight]'.",
      },
      {
        q: "O que é RAG (Retrieval-Augmented Generation) e como reduz alucinações em LLMs?",
        o: [
          "Busca documentos relevantes em base de conhecimento antes de gerar resposta; fundamenta a resposta em fatos reais",
          "Treina o modelo com mais dados",
          "Aumenta a temperatura",
          "Remove camadas do modelo",
        ],
        c: 0,
        e: "RAG combina retrieval (busca em base de dados/documentos) com generation (LLM). Fluxo: query → busca semântica em documentos → contexto relevante + query → LLM gera resposta fundamentada. Reduz alucinações porque o LLM tem acesso a fatos verificados. Mais barato que fine-tuning.",
        x: "Pergunta: 'Qual a política de férias da empresa?' Sem RAG: LLM alucina uma resposta genérica. Com RAG: busca no manual da empresa → encontra 'Funcionários têm 30 dias/ano' → LLM responde com base no documento real.",
      },
      {
        q: "O que é fine-tuning de LLMs e quando é preferível ao prompt engineering?",
        o: [
          "Retreinar o modelo em dados específicos do domínio; preferível quando prompt engineering não alcança a qualidade necessária",
          "São a mesma coisa",
          "Fine-tuning é sempre melhor",
          "Prompt engineering é sempre melhor",
        ],
        c: 0,
        e: "Fine-tuning ajusta os pesos do modelo em dados específicos (ex: textos médicos, jurídicos). Vantagens: melhor performance no domínio, pode aprender formato/estilo específico. Desvantagens: custo computacional, risco de overfitting, dados de qualidade necessários. Usar quando: prompt engineering insuficiente, domínio muito especializado.",
        x: "Chatbot jurídico: prompt engineering → 70% de respostas corretas. Fine-tuning com 10k decisões judiciais → 92% de respostas corretas. O modelo aprendeu terminologia e padrões jurídicos específicos.",
      },
      {
        q: "O que são AI Agents e como diferem de um simples chatbot baseado em LLM?",
        o: [
          "Agents podem planejar, usar ferramentas externas e executar ações autônomas além de gerar texto",
          "São a mesma coisa",
          "Agents não usam LLMs",
          "Chatbots são mais avançados",
        ],
        c: 0,
        e: "Chatbot simples: recebe prompt, gera texto, fim. AI Agent: recebe objetivo → planeja passos → usa tools (APIs, código, buscas) → avalia resultado → itera até completar. Frameworks: LangChain, AutoGPT, CrewAI. Exemplos: pesquisar web + analisar dados + gerar relatório automaticamente.",
        x: "Chatbot: 'Qual o clima?' → 'Não posso acessar dados em tempo real.' Agent: 'Qual o clima?' → chama API do OpenWeather → 'São Paulo: 22°C, nublado.' Agent pode encadear: buscar → analisar → enviar email → confirmar.",
      },
      {
        q: "O que é o fenômeno de 'emergent abilities' em LLMs e por que é relevante?",
        o: [
          "Capacidades que surgem apenas em modelos acima de certo tamanho, não previsíveis por modelos menores",
          "É quando o modelo é treinado com mais dados",
          "É sinônimo de fine-tuning",
          "Ocorre em qualquer tamanho de modelo",
        ],
        c: 0,
        e: "Emergent abilities: modelos pequenos têm accuracy ~0% em certas tarefas (aritmética, lógica), mas ao cruzar um limiar de parâmetros (~100B+), accuracy salta para 60-90%. Exemplos: raciocínio em cadeia (chain-of-thought), tradução zero-shot, resolução de analogias complexas. Implicação: modelos maiores podem ter capacidades imprevisíveis.",
        x: "Aritmética de 3 dígitos: GPT-2 (1.5B) → accuracy 5%. GPT-3 (175B) → accuracy 80%. O modelo não foi treinado para matemática explicitamente, mas a habilidade 'emergiu' com escala. Chain-of-thought prompting melhora ainda mais.",
      },
      {
        q: "O que é chain-of-thought (CoT) prompting e como melhora o raciocínio de LLMs?",
        o: [
          "Solicitar que o modelo raciocine passo a passo antes de dar a resposta final, melhorando precisão em tarefas complexas",
          "Encadear múltiplos modelos",
          "Treinar o modelo com exemplos sequenciais",
          "Reduzir a temperatura para zero",
        ],
        c: 0,
        e: "Chain-of-thought: adicionar 'pense passo a passo' ou mostrar exemplos com raciocínio explícito. O modelo gera etapas intermediárias antes da resposta final, reduzindo erros em matemática, lógica e problemas multi-step. Variantes: zero-shot CoT ('pense passo a passo'), few-shot CoT (exemplos com raciocínio), Tree-of-Thought.",
        x: "Sem CoT: '23×17=?' → '381' (errado). Com CoT: '23×17: 23×10=230, 23×7=161, 230+161=391' → correto! GSM8K benchmark (matemática): sem CoT 18%, com CoT 57%. CoT força o modelo a 'mostrar o trabalho'.",
      },
      {
        q: "O que é function calling em LLMs e como permite interação com sistemas externos?",
        o: [
          "Capacidade do LLM de gerar chamadas estruturadas a funções/APIs externas com parâmetros corretos em JSON",
          "O LLM executa código diretamente no servidor",
          "É o mesmo que gerar texto",
          "Só funciona com Python",
        ],
        c: 0,
        e: "Function calling: o modelo recebe descrições de funções disponíveis (nome, parâmetros, tipos). Ao responder, pode gerar uma chamada JSON estruturada em vez de texto. O sistema executa a função e retorna o resultado ao modelo, que incorpora na resposta. Permite: buscar dados, enviar emails, acessar APIs.",
        x: "User: 'Qual o clima em SP?' → LLM gera: {function: 'get_weather', params: {city: 'São Paulo'}}. Sistema executa API → retorna {temp: 22, cond: 'nublado'}. LLM: 'Em São Paulo está 22°C e nublado.' Tudo automático, sem alucinação sobre o clima.",
      },
    ],
    Difícil: [
      {
        q: "No fine-tuning de LLMs, qual é a diferença entre Full Fine-Tuning e LoRA (Low-Rank Adaptation) em termos de eficiência de parâmetros?",
        o: [
          "LoRA congela os pesos originais e treina matrizes de baixo rank inseridas em cada camada, usando <1% dos parâmetros",
          "LoRA treina todos os parâmetros como Full Fine-Tuning",
          "Full Fine-Tuning é mais eficiente que LoRA",
          "LoRA só funciona para modelos pequenos (<1B parâmetros)",
        ],
        c: 0,
        e: "Full Fine-Tuning atualiza todos os bilhões de parâmetros do modelo, exigindo GPUs enormes e arriscando catastrophic forgetting. LoRA insere matrizes de decomposição de baixo rank (A×B, onde rank r << d) em camadas de atenção, treinando apenas essas matrizes (~0.1-1% dos parâmetros). Resultado comparável com fração do custo computacional.",
        x: "LLaMA 7B: Full FT = 7 bilhões de parâmetros treináveis (requer 4×A100 80GB). LoRA rank 16: ~4 milhões de parâmetros treináveis (roda em 1×A100 24GB). Performance: ~95-99% do Full FT.",
      },
      {
        q: "O que é alucinação em LLMs e quais técnicas ajudam a mitigá-la?",
        o: [
          "Modelo gera informações falsas com alta confiança; mitigar com RAG, grounding, temperature baixa e verificação factual",
          "Erro de digitação do modelo",
          "Problema de hardware",
          "Bug no código do modelo",
        ],
        c: 0,
        e: "Alucinação: LLM gera texto que parece correto mas é factualmente falso ou inventado. Causas: modelo é treinado para gerar texto plausível, não necessariamente verdadeiro. Mitigações: RAG (fundamentar em documentos), low temperature (menos criatividade), chain-of-thought (raciocínio passo a passo), citação de fontes.",
        x: "Pergunta: 'Quem escreveu Dom Casmurro?' Correto: 'Machado de Assis, 1899'. Alucinação: 'José de Alencar, 1875' (confiante mas errado). Com RAG + citação: 'Machado de Assis (fonte: Wikipedia, Biblioteca Nacional)'.",
      },
      {
        q: "O que é RLHF (Reinforcement Learning from Human Feedback) e como é usado para alinhar LLMs?",
        o: [
          "Humanos classificam respostas do LLM; um modelo de recompensa é treinado e usado para otimizar o LLM via RL",
          "Treinamento supervisionado normal",
          "Clustering de respostas",
          "Apenas filtros de conteúdo",
        ],
        c: 0,
        e: "RLHF: 1) Pré-treinar LLM. 2) SFT (Supervised Fine-Tuning) com exemplos curados. 3) Humanos comparam pares de respostas (qual é melhor?). 4) Treinar Reward Model com essas preferências. 5) Otimizar o LLM com PPO maximizando o Reward Model. Resultado: modelo mais útil, honesto e inofensivo.",
        x: "Prompt: 'Como fazer um bolo'. Resposta A: receita detalhada. Resposta B: 'compre um pronto'. Humano: A > B. Reward Model aprende preferência. PPO otimiza LLM para gerar respostas como A. ChatGPT usa RLHF extensivamente.",
      },
      {
        q: "O que é Quantização de modelos LLM (GPTQ, AWQ, GGUF) e por que é importante?",
        o: [
          "Reduzir a precisão numérica dos pesos (ex: 32-bit → 4-bit) para diminuir tamanho e acelerar inferência com perda mínima",
          "Aumentar o número de parâmetros",
          "Treinar o modelo com mais dados",
          "Converter o modelo para outro formato",
        ],
        c: 0,
        e: "LLaMA 70B em FP16: 140GB de VRAM (2×A100 80GB). Quantizado 4-bit: ~35GB (1×A100). Perda de qualidade: <3% em benchmarks. Técnicas: GPTQ (calibração com dados), AWQ (pesos ativados), GGUF (CPU-friendly, llama.cpp). Democratiza LLMs: roda em GPUs consumer.",
        x: "LLaMA-2 70B: FP16=140GB (US$30k em GPUs). GPTQ 4-bit=35GB (US$2k GPU). GGUF Q4_K_M=40GB+RAM (roda em MacBook M2 Max). Benchmark MMLU: FP16=68.9%, 4-bit=67.2%. Perda de 1.7% → aceita para produção local.",
      },
      {
        q: "O que é Constitutional AI (CAI) e como difere do RLHF?",
        o: [
          "Usa um conjunto de princípios escritos ('constituição') para o modelo se auto-avaliar, reduzindo dependência de feedback humano",
          "É a mesma coisa que RLHF",
          "Não usa nenhum tipo de treinamento",
          "Treina o modelo sem nenhuma regra",
        ],
        c: 0,
        e: "RLHF: humanos comparam respostas manualmente (caro, lento, subjetivo). CAI (Anthropic): define princípios (‘seja honesto’, ‘não ajude em atividades ilegais’). O modelo gera respostas → revisa com base nos princípios → gera versão melhorada. RLAIF: usa IA como avaliador em vez de humanos. Escalável e consistênte.",
        x: "Pergunta tóxica: RLHF precisa de humano avaliando cada resposta (US$50/hora). CAI: modelo gera resposta → revisa contra princípio 'seja respeitoso' → corrige automaticamente. 1000 avaliações/minuto vs 10/hora com humanos.",
      },
      {
        q: "O que é Mixture of Experts (MoE) em LLMs e como essa arquitetura permite modelos maiores e mais eficientes?",
        o: [
          "Divide o modelo em 'experts' especializados e um router que ativa apenas alguns por token, reduzindo custo computacional",
          "Treina múltiplos modelos completos em paralelo",
          "Combina as saídas de todos os experts para cada token",
          "É o mesmo que ensemble de modelos independentes",
        ],
        c: 0,
        e: "MoE substitui cada camada feed-forward por N experts especializados + um router (gating network). Para cada token, o router seleciona os Top-K experts (ex: 2 de 8). Resultado: parâmetros totais altos (capacidade), mas FLOPs por token baixos (eficiência). Mixtral 8x7B: 47B params total, mas ativa ~13B por token (como um modelo de 13B em custo).",
        x: "Mixtral 8x7B: 8 experts de 7B cada, router ativa 2 por token. Token 'funcção matemática': router → experts 3 e 7 (especializados em lógica). Token 'poema romântico': router → experts 1 e 5 (especializados em criatividade). Custo: ~2×7B = 14B FLOPs vs 47B se ativasse todos.",
      },
      {
        q: "O que é DPO (Direct Preference Optimization) e como simplifica o processo de alinhamento comparado ao RLHF?",
        o: [
          "Otimiza diretamente o modelo com dados de preferência sem treinar um reward model separado, eliminando a etapa de RL",
          "É idêntico ao RLHF",
          "Requer mais etapas que RLHF",
          "Não usa dados de preferência humana",
        ],
        c: 0,
        e: "RLHF: 3 etapas (SFT → treinar reward model → PPO). DPO simplifica para 1: dadas preferências (resposta A > resposta B), otimiza diretamente o policy model com uma loss de classificação binária. Matemática: a loss do DPO é equivalente à do RLHF sob certas condições, mas sem instabilidade do RL.",
        x: "RLHF: (1) SFT no base model, (2) treinar reward model com 50k comparações, (3) PPO com reward model (instável, hiperparâmetros sensíveis). DPO: (1) SFT no base model, (2) treinar diretamente com 50k comparações via binary cross-entropy. Mesmo resultado, metade da complexidade, sem reward model.",
      },
    ],
  },

  // ── MLOps e Deploy de Modelos ──
  "MLOps e Deploy de Modelos": {
    Fácil: [
      {
        q: "O que é MLOps e qual problema ele resolve no ciclo de vida de modelos de Machine Learning?",
        o: [
          "Conjunto de práticas que automatiza e monitora o ciclo de ML: treinar, validar, deployar e monitorar modelos em produção",
          "É uma linguagem de programação para ML",
          "É um tipo de modelo de machine learning",
          "É uma ferramenta de visualização de dados",
        ],
        c: 0,
        e: "MLOps combina Machine Learning + DevOps para automatizar todo o ciclo de vida de modelos: versionamento de dados/modelos, pipelines de treinamento reproduzíveis, deploy automatizado, monitoramento de drift e retreinamento. Resolve o problema de 'funciona no notebook mas não em produção'.",
        x: "Sem MLOps: cientista treina em Jupyter, envia .pkl por email, engenheiro deploya manualmente. Com MLOps: push no Git → pipeline treina, avalia métricas, deploiaa automaticamente se accuracy > threshold, monitora drift em produção.",
      },
      {
        q: "O que é versionamento de modelos e por que é importante em MLOps?",
        o: [
          "Rastrear versões de modelos, dados e código para reprodutibilidade e rollback; ferramentas como MLflow e DVC",
          "Apenas versionar o código",
          "Salvar o modelo uma vez",
          "Usar Git apenas",
        ],
        c: 0,
        e: "Versionamento em ML envolve: código (Git), dados (DVC, Delta Lake), modelos (MLflow Model Registry), experimentos (MLflow, W&B). Permite: reproduzir resultados, comparar versões, rollback se novo modelo falhar, auditoria. Sem versionamento: 'qual modelo está em produção?' → impossível responder.",
        x: "MLflow: Experimento #42: model_v3.pkl + dataset_v2.csv + hiperparâmetros {lr:0.01, epochs:50} → accuracy 92%. Se v4 cair para 85%, rollback instantâneo para v3.",
      },
      {
        q: "O que é Feature Store e como ele padroniza features em ML?",
        o: [
          "Repositório centralizado de features pré-computadas reutilizáveis entre projetos, garantindo consistência treino/produção",
          "Banco de dados comum",
          "Loja de modelos",
          "Cache de predições",
        ],
        c: 0,
        e: "Feature Store centraliza o cálculo e armazenamento de features. Resolve: 1) Reutilização (mesma feature em múltiplos modelos). 2) Consistência treino-produção (training-serving skew). 3) Point-in-time correctness (evitar data leakage temporal). Exemplos: Feast, Tecton, Hopsworks.",
        x: "Feature 'média_gastos_últimos_30_dias': calculada uma vez no Feature Store, reutilizada em modelos de fraude, crédito e recomendação. Sem Feature Store: cada time calcula diferente, causando inconsistência.",
      },
      {
        q: "O que é o conceito de 'reproducibilidade' em experimentos de ML e por que é difícil de alcançar?",
        o: [
          "Capacidade de obter os mesmos resultados ao repetir um experimento; difícil devido a randomness, versões e ambiente",
          "É reproduzir o dataset",
          "É sempre automático com Git",
          "Só se aplica a produção",
        ],
        c: 0,
        e: "Reproducibilidade requer fixar: random seeds, versões de bibliotecas (requirements.txt), dados (DVC), código (Git), hiperparâmetros, hardware (GPU, CUDA). Python 3.10 + scikit-learn 1.3 + seed=42 pode dar resultado diferente de Python 3.11 + scikit-learn 1.4. Containers Docker ajudam a isolar o ambiente.",
        x: "Resultado paper: accuracy 92.3%. Reprodução: instalar mesmas libs → accuracy 92.1% (ok). Lib atualizada → 91.5% (divergiu). Sem seed → 90.8-93.1% (varia). Docker + DVC + MLflow → 92.3% toda vez.",
      },
      {
        q: "O que é CI/CD para Machine Learning e como difere do CI/CD de software tradicional?",
        o: [
          "Além de testar código, precisa validar dados, treinar modelos e verificar métricas antes do deploy",
          "É idêntico ao CI/CD de software",
          "ML não usa CI/CD",
          "Apenas testa o código Python",
        ],
        c: 0,
        e: "CI/CD tradicional: push → testes unitários → build → deploy. ML CI/CD adiciona: validação de dados (schema, drift), treino do modelo, avaliação de métricas (accuracy > threshold), teste de integração com API, deploy automatizado (canary/shadow). Se métrica cai → pipeline falha → alerta. Ferramentas: GitHub Actions + MLflow + Seldon.",
        x: "Push no Git → CI: lint + testes unitários (5min) → valida schema dos dados → treina modelo (30min) → accuracy 91% > threshold 88% ✓ → CD: deploy canary 5% → métricas ok → 100%. Se accuracy=85% → pipeline falha → alerta.",
      },
      {
        q: "O que é o MLflow e quais problemas ele resolve no ciclo de vida de modelos?",
        o: [
          "Plataforma open-source para tracking de experimentos, empacotamento de modelos, model registry e deploy",
          "É uma linguagem de programação para ML",
          "É um tipo de banco de dados",
          "Só serve para treinar modelos",
        ],
        c: 0,
        e: "MLflow tem 4 componentes: (1) Tracking — registra parâmetros, métricas e artefatos de cada experimento. (2) Projects — empacota código de treino de forma reproduzível. (3) Models — formato padrão para salvar modelos (sklearn, PyTorch, etc). (4) Model Registry — versionamento com stages (Staging → Production → Archived).",
        x: "Experimento #42: mlflow.log_param('lr', 0.01), mlflow.log_metric('accuracy', 0.92), mlflow.sklearn.log_model(model). UI mostra todos os runs comparados. Model Registry: promover modelo v3 de Staging para Production com 1 clique.",
      },
      {
        q: "O que é um endpoint de API para servir modelos de ML e como funciona?",
        o: [
          "URL que recebe dados via HTTP e retorna predições do modelo em formato JSON, permitindo integração com aplicações",
          "É o arquivo do modelo salvo em disco",
          "É o código de treinamento",
          "Só funciona com modelos de imagem",
        ],
        c: 0,
        e: "O modelo é carregado em memória e exposto via API REST (Flask, FastAPI) ou gRPC. O cliente envia dados de entrada em JSON, o servidor executa a inferência e retorna a predição. Requisitos: latência baixa, autoscaling, health checks, autenticação. Plataformas: SageMaker, Vertex AI, Seldon Core.",
        x: "POST /predict {features: [25, 50000, 3]} → modelo executa inferência → resposta {prediction: 'approved', confidence: 0.87}. FastAPI + uvicorn: 500 requests/seg com latência < 50ms. Em produção: load balancer + autoscaling de 2 a 20 réplicas.",
      },
    ],
    Médio: [
      {
        q: "O que é 'model drift' (deriva de modelo) e como detectá-lo em produção?",
        o: [
          "Degradação da performance do modelo ao longo do tempo porque a distribuição dos dados de produção muda; detecta-se monitorando métricas e distribuições",
          "O modelo fica mais lento com o tempo",
          "O modelo cresce em tamanho de arquivo",
          "Os logs do modelo param de ser gerados",
        ],
        c: 0,
        e: "Model drift ocorre quando a relação entre features e target muda ao longo do tempo (concept drift) ou quando a distribuição dos dados de entrada muda (data drift). Detecta-se comparando métricas de produção com baseline, monitorando distribuições estatísticas das features e outputs com testes como KS, PSI ou Page-Hinkley.",
        x: "Modelo de fraude treinado em 2024. Em 2025, novo tipo de fraude com Pix surge. Accuracy cai de 95% para 82%. Alerta de drift: distribuição de 'metodo_pagamento' mudou (PSI > 0.2). Ação: retreinar com dados recentes.",
      },
      {
        q: "O que é um pipeline de ML e quais são suas etapas principais?",
        o: [
          "Sequência automatizada: ingestão → pré-processamento → treino → avaliação → deploy → monitoramento",
          "Apenas o treino do modelo",
          "Pipeline de dados apenas",
          "Só o deploy",
        ],
        c: 0,
        e: "Pipeline de ML automatiza o fluxo end-to-end: 1) Ingestão de dados. 2) Validação de qualidade. 3) Feature engineering. 4) Treino com hiperparâmetros. 5) Avaliação de métricas. 6) Registro do modelo. 7) Deploy (canary/blue-green). 8) Monitoramento. Ferramentas: Kubeflow, Airflow, Vertex AI Pipelines.",
        x: "Pipeline automatizado: dados chegam diariamente → validação (schema check) → pré-processamento → treino XGBoost → se accuracy > 90% → deploy automático em API → monitorar drift. Falha em qualquer etapa → alerta.",
      },
      {
        q: "O que é A/B testing para modelos de ML em produção?",
        o: [
          "Dividir tráfego entre modelo atual e novo para comparar métricas de negócio em tempo real antes de migrar",
          "Treinar dois modelos e comparar offline",
          "Testar em dados de validação",
          "Comparar logs depois",
        ],
        c: 0,
        e: "A/B testing em ML: modelo A (atual/controle) recebe X% do tráfego, modelo B (novo/tratamento) recebe Y%. Métricas de negócio (conversão, receita, engajamento) são comparadas com significância estatística. Se B > A → migrar 100% para B. Diferente de avaliação offline: captura efeitos reais do usuário.",
        x: "Recomendação de produtos: modelo atual (A) → 3.2% conversão em 50% do tráfego. Novo modelo (B) → 3.8% conversão em 50%. Após 2 semanas, p-value < 0.01 → B é melhor. Migrar 100% para B.",
      },
      {
        q: "O que é 'model monitoring' e quais sinais de degradação devem ser monitorados?",
        o: [
          "Acompanhar performance, data drift, concept drift e métricas de sistema do modelo em produção continuamente",
          "Monitorar apenas o tempo de resposta da API",
          "Verificar o modelo uma vez por mês manualmente",
          "Apenas monitorar erros de código",
        ],
        c: 0,
        e: "Monitorar em produção: 1) Data drift: distribuição dos inputs muda (PSI, KS test). 2) Concept drift: relação input→output muda. 3) Performance: accuracy, latência, throughput. 4) Infraestrutura: CPU, memória, GPU usage. Ferramentas: Evidently AI, WhyLabs, Arize. Sem monitoramento: modelo degradado leva a decisões ruins silenciosamente.",
        x: "Modelo de crédito: Janeiro accuracy=93%. Março: PSI da feature 'renda' = 0.35 (drift alto!). Abril: accuracy caiu para 84%. Causa: inflação mudou a distribuição de renda. Ação automática: retreinar com dados recentes → accuracy volta a 91%.",
      },
      {
        q: "O que é o conceito de 'model governance' e por que é importante em ML empresarial?",
        o: [
          "Framework de controle, documentação e auditoria sobre quem treina, aprova e deploya modelos",
          "É apenas versionamento de código",
          "Só importa para modelos grandes",
          "É controle de acesso ao servidor",
        ],
        c: 0,
        e: "Model governance define: quem pode treinar e deployar modelos (RBAC), documentação obrigatória (model cards), aprovação antes de produção (review board), auditoria de bias/fairness, conformidade regulatória (LGPD, GDPR). Essencial em setores regulados (finanças, saúde). Ferramentas: MLflow Model Registry com stages (Staging → Production).",
        x: "Banco: cientista treina modelo de crédito → submete model card (dados, métricas, bias analysis) → comitê de risco revisa → aprovado com condições ('retreinar a cada 3 meses') → deploy para produção → audit log registra tudo.",
      },
      {
        q: "O que é DVC (Data Version Control) e como complementa o Git para projetos de ML?",
        o: [
          "Ferramenta que versiona datasets e modelos grandes usando ponteiros no Git enquanto armazena os arquivos em storage externo",
          "Substitui o Git completamente",
          "Só funciona com dados de texto",
          "É um banco de dados relacional",
        ],
        c: 0,
        e: "Git não suporta arquivos grandes (datasets de GB, modelos de GB). DVC armazena hash pointers no Git (.dvc files) e os dados reais em remote storage (S3, GCS, Azure Blob). Permite: git checkout v1.0 + dvc checkout → restaura exatamente o dataset e modelo daquela versão. Reprodutibilidade total.",
        x: "dvc add data/train.csv → cria train.csv.dvc (hash do arquivo). git add train.csv.dvc && git commit. Arquivo real (2GB) vai para S3. Colega faz git pull + dvc pull → baixa exatamente o mesmo dataset. dvc diff v1.0..v2.0 mostra o que mudou.",
      },
      {
        q: "O que é blue-green deployment para modelos de ML e como reduz downtime?",
        o: [
          "Mantém dois ambientes idênticos (blue=atual, green=novo); switch instantâneo de tráfego para o green após validação",
          "Deploy gradual por percentual",
          "É o mesmo que shadow deploy",
          "Requer parar o serviço para atualizar",
        ],
        c: 0,
        e: "Blue-green: ambiente Blue (modelo v1 servindo 100% do tráfego). Deploy modelo v2 no ambiente Green (sem tráfego). Testar Green isoladamente. Switch: load balancer aponta para Green (0 downtime). Se falhar: switch instantâneo de volta para Blue. Custo: precisa do dobro de infraestrutura temporariamente.",
        x: "Blue (v1): API /predict servindo 1000 req/s. Green (v2): deploy + smoke tests + health checks (5 min). Switch DNS/load balancer: Green assume 100% em < 1s. Problema em v2? Rollback para Blue em < 1s. Zero downtime para usuários.",
      },
    ],
    Difícil: [
      {
        q: "Em um pipeline ML de produção, qual é a diferença entre 'online serving' (real-time inference) e 'batch serving' e quando usar cada um?",
        o: [
          "Online serve predições individuais em ms via API; batch processa grandes volumes periodicamente; escolha depende de latência requerida",
          "Online é sempre melhor que batch",
          "Batch é em tempo real e online é periódico",
          "São sinônimos para o mesmo tipo de deploy",
        ],
        c: 0,
        e: "Online serving: modelo carregado em memória responde requisições individuais via API REST/gRPC com latência em milissegundos (ex.: recomendações, detecção de fraude). Batch serving: modelo processa grandes lotes de dados periodicamente (ex.: prever churn mensal de todos os clientes). Online exige mais infra (GPU, autoscaling), batch pode usar Spark/EMR.",
        x: "Fraude bancária: online serving — cada transação é avaliada em <100ms antes de autorizar. Previsão de demanda mensal: batch — roda modelo sobre 1M de SKUs toda segunda-feira às 3h, resultado salvo em tabela para dashboard.",
      },
      {
        q: "O que é containerização de modelos ML e por que Docker é essencial em MLOps?",
        o: [
          "Empacotar modelo + dependências + código em container Docker para deploy reproduzível em qualquer ambiente",
          "Apenas salvar o modelo em arquivo",
          "Virtualização completa de OS",
          "Compressão do modelo",
        ],
        c: 0,
        e: "Docker encapsula modelo, runtime (Python, libs), código de inferência e configuração em uma imagem. Garante que o modelo funcione identicamente em dev, staging e produção. Resolve 'funciona na minha máquina'. Integra com Kubernetes para escalabilidade, auto-scaling e health checks.",
        x: "Dockerfile: FROM python:3.11 → COPY model.pkl → pip install scikit-learn==1.3.0 flask → CMD serve.py. Imagem de 500MB rodará idêntica em qualquer máquina com Docker, de laptop a cluster Kubernetes.",
      },
      {
        q: "O que é shadow deployment e canary release para modelos de ML?",
        o: [
          "Shadow: novo modelo recebe tráfego real mas respostas são descartadas (só monitora). Canary: envia % pequena do tráfego real para o novo modelo",
          "São a mesma coisa",
          "Shadow substitui o modelo antigo",
          "Canary usa dados de teste",
        ],
        c: 0,
        e: "Shadow deploy: novo modelo processa requests reais em paralelo com o atual, mas respostas do novo não são retornadas ao usuário. Compara predições sem risco. Canary release: envia 1-5% do tráfego real para o novo modelo, monitora métricas, aumenta gradualmente (5→10→50→100%). Ambos reduzem risco de deploy.",
        x: "Shadow: modelo v2 processa 100% do tráfego em paralelo com v1. Logs mostram que v2 acerta 95% vs 90% do v1. Canary: migra 5% → monitora 1h → ok → 25% → ok → 100%. Se falhar em qualquer ponto → rollback automático.",
      },
      {
        q: "O que é 'model compression' e quais técnicas permitem rodar modelos em edge devices?",
        o: [
          "Reduzir tamanho/complexidade via pruning, quantização, destilação de conhecimento e otimização de arquitetura",
          "Apenas reduzir o dataset de treino",
          "Usar GPUs mais potentes",
          "Não é possível rodar modelos em edge",
        ],
        c: 0,
        e: "Pruning: remove conexões/neurônios com peso próximo de zero (90% pruning → modelo 10× menor, ~1% perda). Quantização: FP32→INT8 (4× menor, 2× mais rápido). Knowledge Distillation: modelo grande (teacher) treina modelo pequeno (student). ONNX Runtime + TensorRT otimizam para hardware específico.",
        x: "BERT-base (110M parâmetros, 440MB): latência 50ms em A100. DistilBERT (66M, 260MB): latência 25ms, 97% da performance. Quantizado INT8 (66MB): latência 8ms em CPU. TinyBERT (14.5M, 58MB): roda em smartphone com 15ms.",
      },
      {
        q: "O que são Feature Flags para modelos de ML e como habilitam experimentação segura?",
        o: [
          "Switches que permitem ativar/desativar modelos ou versões em produção sem redeploy",
          "Flags no código de treino",
          "Parâmetros do modelo",
          "Tags no dataset",
        ],
        c: 0,
        e: "Feature flags para ML: ativar modelo v2 para 10% dos usuários, ou apenas para região X, ou apenas internamente. Se problemas → desativar a flag instantaneamente (sem redeploy). Combina com A/B testing: flag controla qual modelo cada segmento recebe. Ferramentas: LaunchDarkly, Split.io, Unleash.",
        x: "Flag 'ml-recomendacao-v2': ativo para equipe interna (100%) → funcionários testam 1 semana → ativo para 5% users Brasil → métricas ok → 50% → 100%. Bug detectado? Desativa a flag em 1 clique, volta ao v1 em segundos.",
      },
      {
        q: "O que são data contracts em MLOps e como previnem quebras em pipelines de ML?",
        o: [
          "Acordos formais sobre schema, tipos e semântica dos dados entre produtores e consumidores, validados automaticamente",
          "São contratos legais entre empresas",
          "São validações de modelo",
          "Só existem para dados de texto",
        ],
        c: 0,
        e: "Data contracts definem: schema (colunas, tipos), constraints (not null, ranges, enums), SLAs (fresqueness, completeness), ownership (quem produz/consome). Validados automaticamente no pipeline. Se o produtor mudar o schema sem atualizar o contrato → pipeline falha com erro claro em vez de modelo silenciosamente degradado.",
        x: "Contrato: feature 'renda' → tipo float, range [0, 1000000], not null, updated daily. Time de data eng muda 'renda' para string → validação falha no pipeline → alerta: 'contract violation: renda expected float, got string'. Sem contrato: modelo receberia strings, faria predições lixo silenciosamente.",
      },
      {
        q: "O que é observabilidade de modelos (model observability) e como vai além do monitoramento tradicional?",
        o: [
          "Além de métricas, captura logs, traces e explicações das predições para diagnóstico de causa raiz",
          "É o mesmo que monitoramento",
          "Só monitora latência",
          "Não se aplica a ML",
        ],
        c: 0,
        e: "Monitoramento diz 'algo está errado' (accuracy caiu). Observabilidade diz 'POR QUE está errado': (1) Métricas: accuracy, latência, drift scores. (2) Logs: cada predição com input/output/confiança. (3) Traces: caminho da requisição (feature store → modelo → resposta). (4) Explainability: SHAP values por predição. Ferramentas: Arize, WhyLabs, Fiddler.",
        x: "Accuracy caiu 5%. Monitoramento: alerta 'accuracy baixa'. Observabilidade: traces mostram que Feature Store está retornando dados stale (2h de atraso). Logs: 30% das predições têm feature 'saldo' = null. SHAP: 'saldo' é a feature mais importante. Causa raiz: ETL do banco de dados atrasou.",
      },
    ],
  },

  // ── Pré-processamento de Dados ──
  "Pré-processamento de Dados": {
    Fácil: [
      {
        q: "Qual técnica de pré-processamento transforma valores numéricos para o intervalo [0, 1]?",
        o: [
          "Normalização Min-Max",
          "Padronização Z-Score",
          "One-Hot Encoding",
          "Label Encoding",
        ],
        c: 0,
        e: "A normalização Min-Max transforma cada valor usando a fórmula: X_norm = (X - X_min) / (X_max - X_min). Resultado sempre entre 0 (mínimo) e 1 (máximo). Preserva a distribuição original mas é sensível a outliers que distorcem X_min e X_max.",
        x: "Idades [20, 30, 50, 80]. Min=20, Max=80. Normalizado: [(20-20)/60, (30-20)/60, (50-20)/60, (80-20)/60] = [0.0, 0.167, 0.5, 1.0].",
      },
      {
        q: "O que é feature engineering e por que é tão importante para modelos de ML?",
        o: [
          "Criar, transformar e selecionar variáveis a partir dos dados brutos para melhorar a performance do modelo",
          "Apenas coletar mais dados",
          "Treinar por mais epochs",
          "Escolher outro algoritmo",
        ],
        c: 0,
        e: "Feature engineering transforma dados brutos em features informativas. Inclui: criação (idade_ao_quadrado, dia_da_semana), transformação (log, normalização), combinação (preço/m², ratio), extração (texto→TF-IDF, imagem→embeddings). 'Better features beat better algorithms' — Andrew Ng.",
        x: "Dataset imobiliário: features brutas [área, quartos, banheiros, preço]. Feature engineering: preço_por_m² = preço/área, proporção_quartos_banheiros = quartos/banheiros. Modelo com features criadas: R²=0.92 vs R²=0.78 sem.",
      },
      {
        q: "Por que dividir dados em treino, validação e teste? Qual a diferença de cada conjunto?",
        o: [
          "Treino: aprender padrões. Validação: ajustar hiperparâmetros. Teste: avaliação final não enviesada",
          "Dois conjuntos bastam",
          "Usar todos os dados para treino",
          "Teste e validação são iguais",
        ],
        c: 0,
        e: "Treino (~70%): modelo aprende os padrões (ajusta pesos). Validação (~15%): ajustar hiperparâmetros (learning rate, regularização) e escolher o melhor modelo sem viesar o teste. Teste (~15%): avaliação final única, simula dados nunca vistos. Se usar teste para ajustar modelo → data leakage.",
        x: "10000 amostras: 7000 treino, 1500 validação, 1500 teste. Treinar 5 modelos → comparar no validação → melhor modelo → avaliar UMA VEZ no teste → accuracy final 88%. Se fizer ajustes baseados no teste, o 88% não é confiável.",
      },
      {
        q: "O que são dados faltantes (missing values) e quais são as estratégias básicas para tratá-los?",
        o: [
          "Valores ausentes no dataset; estratégias incluem remoção, imputação pela média/mediana/moda ou preenchimento por modelo",
          "Dados faltantes devem ser ignorados",
          "Sempre substituir por zero",
          "Dados faltantes não existem em datasets reais",
        ],
        c: 0,
        e: "Missing values: MCAR (aleatório), MAR (depende de outras features), MNAR (depende do próprio valor faltante). Estratégias: 1) Remoção (>60% faltantes ou MCAR). 2) Média/mediana para numéricos, moda para categóricos. 3) Forward/backward fill para séries temporais. 4) Modelos (KNN Imputer, MICE).",
        x: "Feature 'renda' com 8% missing: média=R$5000, mediana=R$4200 (há outliers). Mediana é melhor aqui. Feature 'CEP' com 70% missing → remover feature. Feature 'temperatura' em série temporal → forward fill (usar último valor).",
      },
      {
        q: "O que é Feature Engineering e por que pode ter mais impacto que trocar o algoritmo?",
        o: [
          "Criar ou transformar features a partir dos dados brutos para melhorar a qualidade das entradas do modelo",
          "É apenas renomear colunas",
          "É trocar o algoritmo de ML",
          "Só funciona com redes neurais",
        ],
        c: 0,
        e: "Feature Engineering: transformar dados brutos em representações mais informativas. Técnicas: combinações (preço/área → preço_por_m²), extração temporal (data → dia_semana, mês, é_feriado), encoding, binning (idade → faixa_etária), log transforms (normalizar distribuições). Um bom feature engineering pode melhorar accuracy de 80% para 92% com o mesmo modelo.",
        x: "Dataset de e-commerce: features brutas [data, valor, produto]. Feature engineering: hora_do_dia, dia_da_semana, valor_médio_últimas_5_compras, dias_desde_última_compra. Modelo com features brutas: 78%. Com features engineered: 91%. Mesmo XGBoost.",
      },
      {
        q: "O que é One-Hot Encoding e para que tipo de variável categórica ele é indicado?",
        o: [
          "Cria uma coluna binária (0/1) para cada categoria, indicado para variáveis nominais sem ordem natural",
          "É usado para variáveis numéricas",
          "Atribui números sequenciais às categorias",
          "Remove variáveis categóricas do dataset",
        ],
        c: 0,
        e: "One-Hot Encoding converte cada valor categórico em uma coluna binária independente. Evita que modelos interpretem ordem inexistente entre categorias. Indicado para: cor, país, tipo de produto. Problema: alta cardinalidade (1000 cidades = 1000 colunas). Solução: Target Encoding ou embeddings.",
        x: "Feature 'animal': [gato, cão, peixe]. One-Hot: animal_gato=[1,0,0], animal_cão=[0,1,0], animal_peixe=[0,0,1]. Se Label Encoding (gato=0, cão=1, peixe=2), modelo poderia interpretar peixe > cão > gato, o que não faz sentido.",
      },
      {
        q: "Qual a diferença entre variáveis numéricas e categóricas e como cada tipo é tratado em ML?",
        o: [
          "Numéricas representam quantidades contínuas/discretas; categóricas representam classes/grupos e precisam de encoding para uso em modelos",
          "São a mesma coisa",
          "Categóricas sempre são números",
          "Numéricas não precisam de pré-processamento",
        ],
        c: 0,
        e: "Numéricas: valores quantitativos (idade: 25, salário: R$5000). Contínuas (temperatura) ou discretas (quartos). Tratamento: normalização, padronização, log transform. Categóricas: classes sem valor numérico intrínseco. Nominais (cor, país) ou ordinais (escolaridade: fundamental < médio < superior). Tratamento: encoding (One-Hot, Label, Target).",
        x: "Dataset: idade (numérica contínua → StandardScaler), quartos (numérica discreta → manter), cor (categórica nominal → One-Hot), escolaridade (categórica ordinal → Label Encoding: fundamental=0, médio=1, superior=2 preserva a ordem).",
      },
    ],
    Médio: [
      {
        q: "Para variáveis categóricas nominais como 'cor' (vermelho, azul, verde), qual técnica de encoding é mais adequada e por quê?",
        o: [
          "One-Hot Encoding — cria uma coluna binária para cada categoria, evitando ordem implícita",
          "Label Encoding — atribui números sequenciais",
          "Ordinal Encoding — atribui números ordenados",
          "Frequency Encoding — usa a frequência como valor",
        ],
        c: 0,
        e: "One-Hot Encoding cria uma coluna binária (0 ou 1) para cada valor categórico. Evita que o modelo interprete uma ordem inexistente entre categorias (vermelho=1 < azul=2 < verde=3 não faz sentido). Label Encoding é adequado apenas para variáveis ordinais onde há ordem natural.",
        x: "cor: [vermelho, azul, verde] → cor_vermelho: [1,0,0], cor_azul: [0,1,0], cor_verde: [0,0,1]. Se usasse Label Encoding (0,1,2), o modelo poderia interpretar verde > azul > vermelho erroneamente.",
      },
      {
        q: "O que é data leakage e como ele compromete a avaliação do modelo?",
        o: [
          "Quando informação do teste/futuro vaza para o treino, inflando métricas artificialmente; modelo falha em produção",
          "Excesso de dados",
          "Dados duplicados",
          "Features faltantes",
        ],
        c: 0,
        e: "Data leakage: modelo usa informação que não estaria disponível em produção. Tipos: 1) Target leakage: feature deriva do target (ex: variável 'tratamento_iniciado' para prever 'doença'). 2) Train-test leakage: normalizar antes de dividir. 3) Temporal: usar dados futuros para prever o passado. Resultado: accuracy irreal.",
        x: "Prever inadimplência: feature 'dias_em_atraso' = target leakage (só existe DEPOIS da inadimplência). No treino: accuracy 99%. Em produção: accuracy 55%. Remover a feature e retreinar dá accuracy real de 82%.",
      },
      {
        q: "O que é StandardScaler (Z-score normalization) e quando usá-lo em vez de Min-Max?",
        o: [
          "Transforma dados para média=0 e desvio padrão=1; melhor quando há outliers ou quando o algoritmo assume normalidade",
          "Remove outliers",
          "Categoriza variáveis",
          "Reduz dimensionalidade",
        ],
        c: 0,
        e: "StandardScaler: z = (x - μ) / σ. Centra os dados na média e escala pelo desvio padrão. Preferir sobre Min-Max quando: há outliers (Min-Max comprime tudo para perto de 0), algoritmo assume normalidade (Gaussian Naive Bayes, LDA), dados com distribuições variadas.",
        x: "Salários: [30k, 35k, 40k, 500k]. Min-Max: [0, 0.01, 0.02, 1.0] — outlier comprime os demais. StandardScaler: [-0.54, -0.48, -0.43, 2.78] — melhor distribuição, outlier sinalizado mas não distorce.",
      },
      {
        q: "O que é Target Encoding para variáveis categóricas de alta cardinalidade?",
        o: [
          "Substitui cada categoria pela média do target naquela categoria, útil para features com muitos valores únicos",
          "É o mesmo que One-Hot Encoding",
          "Remove categorias raras",
          "Converte para números sequenciais",
        ],
        c: 0,
        e: "Target Encoding: para a feature 'cidade' (1000 valores únicos), One-Hot cria 1000 colunas. Target Encoding: cidade='SP' → média do target para SP = 0.35. Problema: data leakage se calcular no treino completo. Solução: calcular via K-Fold ou smoothing com prior global μ_global.",
        x: "Feature 'bairro' com 500 bairros. One-Hot: 500 colunas (esparsas, overfitting). Target Encoding: 'Moema'→R$850k (média preço), 'Capão'→R$280k. Modelo com One-Hot: R²=0.75. Target Encoding com smoothing: R²=0.88.",
      },
      {
        q: "Qual a diferença entre normalização e padronização e quando usar cada uma?",
        o: [
          "Normalização escala para [0,1] (Min-Max); padronização centeriza em média=0, σ=1 (StandardScaler)",
          "São a mesma coisa",
          "Normalização só funciona com dados positivos",
          "Padronização sempre é melhor",
        ],
        c: 0,
        e: "Min-Max (normalização): x' = (x-min)/(max-min), escala para [0,1]. Sensível a outliers. Bom para: redes neurais (inputs bounded), algoritmos baseados em distância (KNN, SVM). StandardScaler (padronização): z = (x-μ)/σ, média=0, σ=1. Robusto a outliers. Bom para: regressão linear, PCA, algoritmos que assumem normalidade.",
        x: "Features: idade [0-100] e renda [0-1000000]. Sem escalar: KNN dominado por renda. Min-Max: ambas [0,1] mas renda 1M distorce. StandardScaler: ambas com σ=1 → KNN trata igualmente. Com outlier renda=1M: StandardScaler é mais robusto.",
      },
      {
        q: "O que é Label Encoding e quando usá-lo em vez de One-Hot Encoding?",
        o: [
          "Atribui números inteiros sequenciais a categorias; usar quando há ordinalidade natural entre as categorias",
          "Sempre preferível ao One-Hot",
          "Criar colunas binárias",
          "Só funciona com 2 categorias",
        ],
        c: 0,
        e: "Label Encoding: categorías → inteiros (fundamental=0, médio=1, superior=2). Adequado para variáveis ordinais onde a ordem numérica reflete a realidade. Para nominais (cor, país), gera relações falsas (vermelho=0 < azul=1 < verde=2). Modelos baseados em árvore toleram Label Encoding em nominais; lineares não.",
        x: "Escolaridade: fundamental=0, médio=1, superior=2. Ordem real → Label Encoding OK. Cor: vermelho=0, azul=1, verde=2. Sem ordem real → One-Hot melhor. Exceção: XGBoost e LightGBM lidam bem com Label Encoding mesmo em nominais por fazerem splits binários.",
      },
      {
        q: "O que é log transform e quando aplicá-la em features com distribuição assimétrica?",
        o: [
          "Aplica logaritmo para comprimir valores altos e reduzir assimetria positiva (right-skewed), aproximando de distribuição normal",
          "Remove outliers do dataset",
          "Transforma dados categóricos em numéricos",
          "É o inverso da normalização",
        ],
        c: 0,
        e: "Log transform: x' = log(x+1) (o +1 evita log(0)). Comprime valores altos e expande baixos, reduzindo right-skew. Indicada para: preços, salários, contagens, populações — dados com cauda longa à direita. Alternativas: Box-Cox (encontra melhor transformação automaticamente), Yeo-Johnson (aceita negativos).",
        x: "Salários: [2k, 3k, 4k, 5k, 200k]. Skewness = 4.5 (muito assimétrico). Log transform: [7.6, 8.0, 8.3, 8.5, 12.2]. Skewness = 1.1 (melhor). Regressão Linear com salário bruto: R²=0.55. Com log(salário): R²=0.82. A transformação linearizou a relação.",
      },
    ],
    Difícil: [
      {
        q: "Ao lidar com um dataset com 50% de dados faltantes em uma feature importante, qual estratégia é mais robusta que simples imputação pela média?",
        o: [
          "Imputação múltipla (MICE) que gera múltiplas estimativas refletindo a incerteza dos valores faltantes",
          "Deletar todas as linhas com dados faltantes",
          "Preencher com zero",
          "Duplicar as linhas completas para compensar",
        ],
        c: 0,
        e: "MICE (Multiple Imputation by Chained Equations) imputa cada feature faltante usando um modelo condicional baseado nas demais features, gerando múltiplos datasets completos. As análises são feitas em cada dataset e os resultados combinados, capturando a incerteza da imputação. Muito mais robusto que imputação única pela média.",
        x: "Feature 'renda' com 50% missing. MICE usa idade, escolaridade e profissão para prever renda faltante via regressão. Gera 5 datasets completos, treina modelo em cada, combina predições. Captura que 'renda imputada para jovem estudante' difere de 'executivo sênior'.",
      },
      {
        q: "O que é SMOTE e como lidar com classes desbalanceadas em ML?",
        o: [
          "SMOTE cria exemplos sintéticos da classe minoritária interpolando entre vizinhos; alternativas: undersampling, class weights",
          "Duplicar exemplos da classe minoritária",
          "Remover a classe majoritária",
          "Ignorar o desbalanceamento",
        ],
        c: 0,
        e: "SMOTE (Synthetic Minority Over-sampling Technique): cria novos exemplos interpolando entre pontos existentes da classe minoritária e seus K vizinhos mais próximos. Outras técnicas: undersampling (reduzir majoritária), class weights (penalizar erros na minoritária mais), ensemble balanceado. Aplicar SMOTE APENAS no treino, NUNCA no teste.",
        x: "Fraude: 9900 normais, 100 fraudes (1%). SMOTE gera 9800 fraudes sintéticas → 9900 normais + 9900 fraudes. Modelo agora aprende ambas classes. Sem SMOTE: modelo sempre prediz 'normal' e acerta 99% (mas detecta 0% de fraudes).",
      },
      {
        q: "O que é feature selection e quais métodos ajudam a escolher as melhores features?",
        o: [
          "Selecionar subconjunto de features mais informativas; métodos: filter (correlação), wrapper (RFE), embedded (Lasso, feature importance)",
          "Usar todas as features",
          "Apenas PCA",
          "Remover features aleatoriamente",
        ],
        c: 0,
        e: "Feature selection remove features irrelevantes/redundantes. Filter: estatísticas (correlação, chi², mutual information). Wrapper: treinar modelo com subsets (RFE, forward/backward selection). Embedded: regularização seleciona durante treino (Lasso L1, tree feature importance). Benefícios: menor overfitting, treino mais rápido, modelo mais interpretável.",
        x: "Dataset com 100 features. Feature importance do Random Forest: top 15 features explicam 95% das predições. Remover as 85 restantes: accuracy cai 0.5%, treino 6x mais rápido, modelo explicável.",
      },
      {
        q: "O que é o pipeline de pré-processamento e por que deve ser aplicado separadamente em treino e teste?",
        o: [
          "Sequência de transformações que deve ser fitted no treino e apenas transformada no teste para evitar data leakage",
          "Deve ser aplicado igualmente em todos os dados",
          "Pipeline só funciona com sklearn",
          "Não faz diferença a ordem",
        ],
        c: 0,
        e: "Pipeline.fit_transform(X_train): calcula estatísticas (μ, σ, min, max) do treino E aplica. Pipeline.transform(X_test): aplica as MESMAS estatísticas do treino sem recalcular. Se fizer fit no teste: μ_teste vaza para o modelo → métricas otimistas. sklearn.Pipeline encapsula: Scaler → Encoder → PCA → Model.",
        x: "Correto: scaler.fit(X_train) → μ=50, σ=10. scaler.transform(X_test) usa μ=50, σ=10 do treino. Errado: scaler.fit_transform(X_test) → μ_test=52, σ=9.5 (diferentes!) → teste contaminado. Accuracy 'inflada' de 95% cai para 88% em produção.",
      },
      {
        q: "O que é a técnica de binning (discretização) e quando é útil no pré-processamento?",
        o: [
          "Converter variáveis contínuas em categorias (faixas), útil quando a relação com o target é não-linear por faixas",
          "É remover outliers",
          "É o mesmo que normalização",
          "Só funciona com dados categóricos",
        ],
        c: 0,
        e: "Binning: idade contínua → faixas ('0-18', '19-30', '31-50', '51+'). Tipos: equal-width (intervalos iguais), equal-frequency (quantis iguais), custom (domínio). Útil quando: relação não-linear por faixas (risco de crédito muda por faixa etária), modelo simples (Logistic Regression), reduzir impacto de outliers.",
        x: "Renda contínua [1k-500k]: regressão linear fraca (R²=0.55). Binning: [0-3k='baixa', 3k-10k='média', 10k-30k='alta', 30k+='muito_alta']. Um-hot encode → modelo captura que risco de default é 25% para 'baixa' e 2% para 'muito_alta'. R²=0.78.",
      },
      {
        q: "O que é TF-IDF e como transforma texto em features numéricas para modelos de ML?",
        o: [
          "Term Frequency × Inverse Document Frequency: pondera palavras pela frequência no documento e raridade no corpus",
          "É apenas contar palavras",
          "É um embeddings neural",
          "Só funciona com bigrams",
        ],
        c: 0,
        e: "TF(t,d) = freq de t no documento d / total de termos em d. IDF(t) = log(N/n_t), onde N = total de docs, n_t = docs com t. TF-IDF = TF × IDF. Palavras frequentes em 1 doc mas raras no corpus têm alto TF-IDF (discriminativas). Palavras comuns como 'de', 'o' têm IDF baixo e são naturalmente penalizadas.",
        x: "Corpus de 1000 artigos. Artigo de futebol: 'gol' aparece 10x, TF=0.05. 'gol' aparece em 20 docs: IDF=log(1000/20)=1.70. TF-IDF('gol')=0.085 (alto, discriminativo). 'de' aparece em 990 docs: IDF=log(1000/990)=0.004. TF-IDF('de')=0.0001 (baixo, não discriminativo).",
      },
      {
        q: "O que são window functions na engenharia de features para séries temporais?",
        o: [
          "Cálculos sobre janelas deslizantes de tempo que geram features como média móvel, máximo, tendência e sazonalidade",
          "São filtros de imagem",
          "Funções SQL apenas",
          "Aplicam-se apenas a dados categóricos",
        ],
        c: 0,
        e: "Window functions criam features baseadas em janelas temporais: rolling_mean_7d (média dos últimos 7 dias), rolling_std_30d, lag_1 (valor do dia anterior), diff_1 (variação em relação ao anterior), ewma (média móvel exponencial). Essenciais para capturar tendência, sazonalidade e volatilidade em dados temporais.",
        x: "Prever vendas diárias: features brutas [data, vendas] → R²=0.40. Window features: média_7d, média_30d, vendas_ontem (lag_1), vendas_semana_passada (lag_7), pico_últimos_30d, tendência_30d (slope). Com window features: R²=0.87. O modelo agora captura padrões temporais.",
      },
    ],
  },

  // ── Processamento de Linguagem Natural ──
  "Processamento de Linguagem Natural": {
    Fácil: [
      {
        q: "No NLP, o que é 'tokenização' e por que é a primeira etapa no processamento de texto?",
        o: [
          "Dividir o texto em unidades menores (tokens) como palavras ou sub-palavras para processamento computacional",
          "Traduzir o texto para outro idioma",
          "Remover pontuação do texto",
          "Converter texto em áudio",
        ],
        c: 0,
        e: "Tokenização é o processo de dividir uma sequência de texto em tokens — podem ser palavras, sub-palavras ou caracteres. É a primeira etapa porque modelos de NLP não processam texto bruto; precisam de unidades numéricas. Cada token é mapeado para um ID numérico no vocabulário.",
        x: "'O gato sentou no tapete' → tokens: ['O', 'gato', 'sentou', 'no', 'tapete'] → IDs: [15, 4521, 8823, 22, 6701].",
      },
      {
        q: "O que é análise de sentimento e como ela é usada em aplicações reais?",
        o: [
          "Classificar texto como positivo, negativo ou neutro; usada em reviews, redes sociais e feedback de clientes",
          "Traduzir textos",
          "Resumir documentos",
          "Gerar texto",
        ],
        c: 0,
        e: "Análise de sentimento classifica a polaridade emocional de textos. Abordagens: léxico (dicionários de palavras positivas/negativas), ML (Naive Bayes, SVM com TF-IDF), Deep Learning (BERT fine-tuned). Aplicações: monitorar marca em redes sociais, classificar reviews, detectar urgência em tickets de suporte.",
        x: "Review: 'Produto excelente, entrega rápida!' → Positivo (0.95). 'Péssima qualidade, devolvi' → Negativo (0.92). 'Chegou ontem' → Neutro (0.78). Empresa monitora 10k reviews/dia para detectar problemas rapidamente.",
      },
      {
        q: "O que é TF-IDF e como ele representa a importância de palavras em documentos?",
        o: [
          "TF mede frequência no documento; IDF penaliza palavras comuns em todos os documentos; TF-IDF destaca termos discriminantes",
          "Conta apenas frequência",
          "Embedding neural",
          "Método de tradução",
        ],
        c: 0,
        e: "TF (Term Frequency): frequência do termo no documento. IDF (Inverse Document Frequency): log(N/df), onde N = total de documentos e df = documentos contendo o termo. TF-IDF = TF × IDF. Palavras frequentes mas comuns ('o', 'de') têm IDF baixo. Palavras raras mas relevantes têm TF-IDF alto.",
        x: "3 documentos sobre programação. 'Python' aparece em 1 doc: TF=5, IDF=log(3/1)=1.1 → TF-IDF=5.5 (discriminante). 'código' aparece em todos: TF=3, IDF=log(3/3)=0 → TF-IDF=0 (não discrimina).",
      },
      {
        q: "O que é análise de sentimentos e como é usada em aplicações do mundo real?",
        o: [
          "Classificar texto como positivo, negativo ou neutro usando NLP; usada para monitorar opiniões de clientes",
          "É tradução automática",
          "Só funciona com inglês",
          "É análise de gramática",
        ],
        c: 0,
        e: "Análise de sentimentos classifica texto em polaridade (positivo, negativo, neutro) e/ou emoção (alegria, raiva, tristeza). Abordagens: léxico (lista de palavras com scores), ML clássico (TF-IDF + SVM/Naive Bayes), deep learning (BERT fine-tuned). Aplicações: monitorar reviews, mídias sociais, suporte ao cliente.",
        x: "Empresa monitora 50k tweets/dia: 'Adoro o novo produto!' → Positivo (0.95). 'Péssimo atendimento, nunca mais!' → Negativo (0.98). Alerta: sentimento negativo subiu 30% na última hora → equipe de crise investiga problema no app.",
      },
      {
        q: "O que é um bag of words (BoW) e quais são suas limitações?",
        o: [
          "Representa texto como frequência de palavras ignorando a ordem; perde contexto e semântica",
          "Mantém a ordem das palavras",
          "É o mesmo que word embeddings",
          "Só funciona com frases curtas",
        ],
        c: 0,
        e: "BoW: vetor de frequência de cada palavra do vocabulário. 'O gato comeu o peixe' e 'O peixe comeu o gato' têm o mesmo BoW! Perde: ordem (semântica muda), contexto, sinônimos. Vocabulário grande = vetores esparsos. Melhorias: n-grams (bigrams, trigrams), TF-IDF para pesar relevância.",
        x: "Vocabulário: [gato, comeu, peixe, ama, cachorro]. 'O gato comeu o peixe' → [1,1,1,0,0]. 'O gato ama o cachorro' → [1,0,0,1,1]. Similaridade cosine = 0.33. Mas: 'Gato comeu peixe' e 'Peixe comeu gato' → MESMO vetor [1,1,1,0,0]!",
      },
      {
        q: "O que é stemming e lemmatization e qual a diferença entre eles?",
        o: [
          "Stemming corta sufixos de forma agressiva (correndo→corr); lemmatization usa dicionário para encontrar a forma base (correndo→correr)",
          "São a mesma coisa",
          "Stemming é mais preciso",
          "Lemmatization não funciona em português",
        ],
        c: 0,
        e: "Stemming: algoritmo baseado em regras que remove sufixos (Porter Stemmer, Snowball). Rápido mas pode gerar radicais inválidos ('universidade'→'univers'). Lemmatization: usa dicionário e análise morfológica para retornar a forma canônica ('better'→'good', 'correndo'→'correr'). Mais preciso, mais lento.",
        x: "Stemming: 'gatos'→'gat', 'gatinho'→'gat', 'programando'→'program', 'programação'→'program'. Lemmatization: 'gatos'→'gato', 'gatinho'→'gato', 'correndo'→'correr', 'melhor'→'bom'. Para BoW/TF-IDF, stemming basta. Para tarefas que exigem palavras válidas, lemmatization.",
      },
      {
        q: "O que são stopwords e por que são removidas no pré-processamento de texto?",
        o: [
          "Palavras muito frequentes sem significado discriminativo ('o', 'de', 'é', 'em') que são removidas para reduzir ruído",
          "São palavras ofensivas",
          "São palavras raras do vocabulário",
          "Stopwords sempre devem ser mantidas",
        ],
        c: 0,
        e: "Stopwords são palavras funcionais que aparecem frequentemente em quase todos os documentos: artigos ('o', 'a'), preposições ('de', 'em'), conjunções ('e', 'mas'). Removê-las reduz dimensionalidade e ruído. Cuidado: para análise de sentimento, 'não' é crucial ('não gostei'). Para BERT/GPT, manter stopwords (o modelo usa contexto completo).",
        x: "'O gato não gostou da comida dele' → sem stopwords: 'gato gostou comida'. Problema: perdeu 'não' que inverte o sentido! Solução: lista customizada de stopwords que mantém negações. Para modelos Transformer: não remover nada, o modelo aprende o que importa.",
      },
    ],
    Médio: [
      {
        q: "Qual é a diferença entre os modelos de word embeddings Word2Vec e embeddings contextuais como BERT?",
        o: [
          "Word2Vec gera um vetor fixo por palavra; BERT gera vetores diferentes para a mesma palavra dependendo do contexto da frase",
          "Word2Vec é mais moderno que BERT",
          "BERT gera vetores fixos como Word2Vec",
          "Word2Vec entende contexto bidirecional",
        ],
        c: 0,
        e: "Word2Vec atribui um único vetor a cada palavra independentemente do contexto ('banco' tem o mesmo vetor em 'banco de dados' e 'banco de investimentos'). BERT gera embeddings contextuais: o vetor de 'banco' é diferente em cada frase, capturando o significado específico no contexto.",
        x: "Word2Vec: vec('banco') = [0.2, 0.5, ...] sempre igual. BERT: vec('banco' em 'sentou no banco') = [0.1, 0.8, ...] ≠ vec('banco' em 'conta no banco') = [0.7, 0.2, ...]. BERT entende polissemia.",
      },
      {
        q: "O que é Named Entity Recognition (NER) e quais são as entidades mais comuns?",
        o: [
          "Identificar e classificar entidades nomeadas (pessoas, organizações, locais, datas) em texto",
          "Classificar sentimento",
          "Traduzir nomes",
          "Resumir texto",
        ],
        c: 0,
        e: "NER identifica spans de texto que são entidades e classifica-os: PERSON (Elon Musk), ORG (Google), LOC (São Paulo), DATE (15 de março), MONEY (R$100). Usado em: extração de informação, chatbots (pegar nome/data do usuário), compliance (anonimizar dados pessoais). Modelos: spaCy, BERT-NER.",
        x: "Texto: 'João da Silva trabalha na Google desde 2020 em São Paulo'. NER: [João da Silva]=PERSON, [Google]=ORG, [2020]=DATE, [São Paulo]=LOC. Chatbot extrai automaticamente: nome, empresa, ano, cidade.",
      },
      {
        q: "O que é text preprocessing em NLP e quais etapas são essenciais?",
        o: [
          "Limpar e padronizar texto: lowercase, remover pontuação, stopwords, stemming/lemmatization, tokenization",
          "Apenas dividir por espaços",
          "Treinar diretamente no texto bruto",
          "Apenas remover emojis",
        ],
        c: 0,
        e: "Pipeline de preprocessing: 1) Lowercase. 2) Remover pontuação/caracteres especiais. 3) Tokenização. 4) Remover stopwords ('o', 'de', 'é'). 5) Stemming (correndo→corr) ou Lemmatization (correndo→correr). 6) Remover palavras muito raras/frequentes. Para modelos modernos (BERT), preprocessing é mínimo (o modelo aprende).",
        x: "Texto: 'Os GATOS estavam correndo rapidamente!!!' → lowercase: 'os gatos estavam correndo rapidamente' → remove stopwords: 'gatos correndo rapidamente' → lemmatization: 'gato correr rápido'. BERT: usa texto quase original, apenas tokeniza.",
      },
      {
        q: "O que é NER (Named Entity Recognition) e em quais aplicações é utilizado?",
        o: [
          "Identifica e classifica entidades nomeadas (pessoas, organizações, locais, datas) em texto",
          "É sinônimo de análise de sentimentos",
          "Reconhece apenas nomes de pessoas",
          "É tradução automática",
        ],
        c: 0,
        e: "NER classifica spans de texto em categorias: PERSON, ORG, LOC, DATE, MONEY, etc. Modelos: CRF (tradicional), BiLSTM-CRF, BERT-NER. Aplicações: extração de informações de contratos, chatbots que extraem dados (nome, CPF), análise de notícias, anonimização (substituir nomes por [PERSON]).",
        x: "Email: 'João da Silva quer agendar reunião na Google em 15/03/2025 sobre um contrato de R$1M.' NER: [João da Silva]=PERSON, [Google]=ORG, [15/03/2025]=DATE, [R$1M]=MONEY. Chatbot extrai automaticamente: contato, empresa, data, valor.",
      },
      {
        q: "O que é topic modeling e como o algoritmo LDA funciona?",
        o: [
          "Descobre tópicos latentes em uma coleção de documentos; LDA modela cada documento como mistura de tópicos",
          "É classificação supervisionada de textos",
          "Só funciona com textos em inglês",
          "É análise de sentimentos",
        ],
        c: 0,
        e: "LDA (Latent Dirichlet Allocation): não supervisionado. Assume que cada documento é mistura de tópicos, e cada tópico é distribuição de palavras. LDA aprende: 1) distribuição de tópicos por documento, 2) distribuição de palavras por tópico. Inputs: bag of words + nº de tópicos K. Alternativas modernas: BERTopic.",
        x: "1000 artigos de notícias, K=5 tópicos. Tópico 1: 'governo, eleição, político' (política). Tópico 2: 'jogo, gol, campeonato' (esporte). Artigo X: 70% Tópico 1 + 30% Tópico 3 → notícia de política econômica. Clusterização automática sem rótulos.",
      },
      {
        q: "O que é text summarization e qual a diferença entre abordagem extractiva e abstractiva?",
        o: [
          "Extractiva seleciona frases importantes do texto original; abstractiva gera frases novas que capturam a essência",
          "São idênticas",
          "Extractiva gera texto novo",
          "Abstractiva copia frases do original",
        ],
        c: 0,
        e: "Extractiva: identifica e extrai as frases mais importantes do texto original (TextRank, LexRank). Vantagem: factualmente confiável. Desvantagem: pode ser desconexa. Abstractiva: gera texto novo que resume o conteúdo (T5, BART, GPT). Vantagem: fluente e coeso. Desvantagem: pode alucinar. Modelos modernos usam abstractiva com RAG para fundamenção.",
        x: "Texto: 'A temperatura subiu 2°C. Cientistas alertam sobre seca. Governo planeja reservatórios.' Extractiva: 'Cientistas alertam sobre seca. Governo planeja reservatórios.' (copia frases). Abstractiva: 'Aumento de 2°C na temperatura gera alerta de seca, levando o governo a planejar nova infraestrutura hídrica.' (gera texto novo).",
      },
      {
        q: "O que é BM25 e como se compara ao TF-IDF para recuperação de documentos?",
        o: [
          "BM25 é uma evolução probabilística do TF-IDF com saturação de frequência e normalização por tamanho de documento",
          "É idêntico ao TF-IDF",
          "BM25 usa embeddings neurais",
          "TF-IDF é sempre superior",
        ],
        c: 0,
        e: "BM25 (Best Matching 25) melhora TF-IDF em dois aspectos: (1) Saturação TF: frequência alta não cresce linearmente (param k1 controla saturação). (2) Normalização por comprimento (param b): penaliza documentos longos proporcionalmente. É o padrão em motores de busca (Elasticsearch, Solr) e baseline forte para RAG.",
        x: "Query: 'machine learning'. TF-IDF: doc com 'ML' mencionado 100x em 200 palavras > doc com 'ML' 50x em 1000 palavras. BM25: 'ML' 100x satura (não é 100x melhor que 1x, param k1=1.5), e doc curto de 200 palavras é normalizado (param b=0.75). BM25 é mais justo e eficaz na prática.",
      },
    ],
    Difícil: [
      {
        q: "No treinamento de modelos de linguagem autorregressivos (como GPT), o que é 'causal masking' e por que é necessário?",
        o: [
          "Mascara tokens futuros durante o treinamento para que o modelo só possa atender a tokens anteriores, simulando geração sequencial",
          "Mascara tokens ruidosos para limpeza",
          "Remove tokens raros do vocabulário",
          "Bloqueia gradientes de camadas superiores",
        ],
        c: 0,
        e: "Causal masking (ou autoregressive masking) aplica uma máscara triangular na matriz de atenção, impedindo que o token na posição t atenda a tokens nas posições t+1, t+2, etc. Isso garante que a predição de cada token use apenas informações passadas, consistente com geração sequencial em inferência.",
        x: "Frase: 'O gato sentou'. Ao predizer 'sentou', a atenção só pode ver 'O' e 'gato', não tokens futuros. Máscara: [[1,0,0],[1,1,0],[1,1,1]]. Sem máscara, o modelo 'colaria' vendo a resposta correta durante o treino.",
      },
      {
        q: "O que são embeddings e por que são fundamentais para NLP moderno?",
        o: [
          "Representações vetoriais densas de palavras/frases em espaço contínuo, capturando significado semântico",
          "Índices de palavras em dicionário",
          "One-hot encoding",
          "Tabelas de frequência",
        ],
        c: 0,
        e: "Embeddings mapeiam palavras/frases para vetores densos (ex: 768 dimensões). Palavras semanticamente similares ficam próximas no espaço vetorial. Vantagens sobre one-hot: dimensionalidade fixa, capturam similaridade semântica, transferíveis entre tarefas. Tipos: Word2Vec, GloVe (estáticos), BERT, GPT (contextuais).",
        x: "One-hot: 'gato' = [0,0,0,1,0,...,0] (50k dim, esparso). Embedding: 'gato' = [0.2, -0.5, 0.8, ...] (768 dim, denso). cos_similarity(gato, felino) = 0.92, cos_similarity(gato, carro) = 0.05. Embeddings capturam significado.",
      },
      {
        q: "O que é Seq2Seq e como modelos encoder-decoder funcionam em tradução automática?",
        o: [
          "Encoder comprime a frase de entrada em vetor; decoder gera a tradução palavra por palavra a partir desse vetor",
          "Traduz palavra por palavra com dicionário",
          "Substitui palavras por sinônimos",
          "Usa regras gramaticais fixas",
        ],
        c: 0,
        e: "Seq2Seq: Encoder (LSTM/Transformer) processa a sequência de entrada e produz um vetor de contexto. Decoder gera a sequência de saída token por token, condicionado no vetor de contexto. Attention mechanism permite ao decoder focar em partes relevantes da entrada. Base do Google Translate, chatbots, sumarização.",
        x: "Traduzir 'I love cats': Encoder processa [I, love, cats] → vetor context [0.3, -0.7, ...]. Decoder: step 1 → 'Eu' (attention foca em 'I'), step 2 → 'amo' (attention foca em 'love'), step 3 → 'gatos' (attention foca em 'cats').",
      },
      {
        q: "O que é o modelo BERT e por que revolucionou o NLP?",
        o: [
          "É um Transformer bidirecional pré-treinado em masked language modeling e next sentence prediction",
          "É um modelo de tradução",
          "É uma CNN para texto",
          "Só funciona para classificação",
        ],
        c: 0,
        e: "BERT (Bidirectional Encoder Representations from Transformers): pré-treinado em 2 tarefas: 1) MLM (mascarar 15% dos tokens e prever), 2) NSP (prever se duas frases são consecutivas). Bidirecional: cada token atende a TODOS os outros (diferente de GPT que é unidirecional). Fine-tuning: adicionar camada de classificação no topo para tarefas específicas.",
        x: "Frase: 'O [MASK] sentou no tapete.' BERT bidirectional: vê 'O' E 'sentou no tapete' → prevê 'gato' (80%). GPT unidirecional: só vê 'O' → prevê 'homem' (30%). BERT + fine-tune para sentimentos: accuracy 93% vs modelo from scratch 75%.",
      },
      {
        q: "O que é Retrieval Augmented Generation (RAG) e como combina busca com geração?",
        o: [
          "Busca documentos relevantes em uma base de conhecimento e usa como contexto para o LLM gerar respostas fundamentadas",
          "É treinamento do modelo",
          "É fine-tuning com documentos",
          "Só funciona com GPT",
        ],
        c: 0,
        e: "RAG: Query → Embedding → Busca vetorial no vector store (Pinecone, Chroma, FAISS) → Top-K documentos relevantes → Prompt = query + documentos → LLM gera resposta baseada nos documentos. Vantagens: sem treino, dado atualizado, citavel, reduz alucinação. Pipeline: chunk → embed → index → retrieve → generate.",
        x: "Pergunta: 'Qual o prazo de garantia do produto X?' Sem RAG: LLM alucina '1 ano'. Com RAG: busca vetorial encontra manual.pdf → 'Garantia de 2 anos para defeitos de fabricação'. LLM responde: '2 anos, conforme manual, seção 5.2.'",
      },
      {
        q: "O que é BPE (Byte Pair Encoding) e por que é o algoritmo de tokenização dominante em LLMs?",
        o: [
          "Algoritmo que mescla iterativamente os pares de bytes/caracteres mais frequentes, criando um vocabulário de subwords equilibrado",
          "Divide texto em caracteres individuais",
          "Divide texto por espaços",
          "Usa dicionário de palavras completas",
        ],
        c: 0,
        e: "BPE começa com caracteres individuais e iterativamente merge o par mais frequente em um novo token. Repete até atingir o tamanho do vocabulário desejado (ex: 50k). Resultado: palavras comuns são tokens únicos ('the'), palavras raras são divididas em subwords ('unhappiness'→['un','happiness']). Equilibra vocabulário finito com cobertura ilimitada.",
        x: "Corpus: 'aaba aab'. Caracteres iniciais: {a,b}. Passo 1: par mais freq = 'aa' → merge 'Z=aa'. Tokens: {a,b,Z}. 'Zba Zb'. Passo 2: par 'Zb' mais freq → merge 'Y=Zb'. 'Ya Yb'. GPT-4 com 100k tokens BPE: 'Hello'→1 token, 'deoxyribonucleic'→4 subword tokens.",
      },
      {
        q: "O que são Sentence Transformers (SBERT) e como geram embeddings de frases inteiras?",
        o: [
          "BERT modificado com rede siamesa que gera embeddings de qualidade para frases inteiras, permitindo busca semântica eficiente",
          "É o BERT padrão aplicado a frases",
          "Só funciona com palavras individuais",
          "É um modelo de geração de texto",
        ],
        c: 0,
        e: "BERT padrão para comparar 2 frases: concatena e processa juntas — O(n²) para n pares. SBERT: usa rede siamesa — cada frase passa independentemente pelo BERT + pooling → embedding 768D. Comparar frases: cosseno entre embeddings — O(1). Pré-computar embeddings permite busca semântica em milhões de documentos em ms.",
        x: "BERT para busca em 1M de documentos: comparar query com cada doc = 1M forward passes (horas). SBERT: pré-computar embeddings de 1M docs (1 vez). Query → embedding → busca por cosseno via FAISS em 5ms. Accuracy similar ao BERT cross-encoder, 10000× mais rápido.",
      },
    ],
  },

  // ── Visão Computacional ──
  "Visão Computacional": {
    Fácil: [
      {
        q: "Em visão computacional, qual tipo de rede neural é mais utilizado para processar e classificar imagens?",
        o: [
          "CNN (Convolutional Neural Network)",
          "RNN (Recurrent Neural Network)",
          "GAN (Generative Adversarial Network)",
          "Autoencoder",
        ],
        c: 0,
        e: "CNNs são projetadas para processar dados em grade (imagens). Usam camadas convolucionais que aplicam filtros (kernels) para detectar features como bordas, texturas e formas. Camadas de pooling reduzem dimensionalidade e camadas densas fazem a classificação final.",
        x: "Uma CNN para classificar gatos vs cães: primeira conv detecta bordas, segunda detecta orelhas/focinho, terceira combina em padrões complexos. Pooling reduz de 224×224 para features compactas. Fully connected classifica: gato 92%, cachorro 8%.",
      },
      {
        q: "O que é uma operação de convolução e por que é eficiente para processar imagens?",
        o: [
          "Filtro (kernel) desliza sobre a imagem multiplicando e somando valores locais, detectando padrões como bordas; compartilha pesos",
          "Redimensionar imagens",
          "Comprimir arquivos",
          "Classificação linear",
        ],
        c: 0,
        e: "Convolução: kernel n×n (ex: 3×3) desliza sobre a imagem, calculando a soma ponderada em cada posição. Vantagens: compartilhamento de parâmetros (mesmo filtro em toda a imagem), invariância a translação (detecta bordas onde quer que estejam), hierarquia de features (camadas empilhadas capturam padrões crescentes).",
        x: "Kernel detector de borda vertical: [[-1,0,1],[-1,0,1],[-1,0,1]]. Desliza pela imagem 28×28. Onde há transição claro→escuro, output é alto. Um filtro 3×3 tem apenas 9 parâmetros, mas processa a imagem inteira.",
      },
      {
        q: "O que é data augmentation em visão computacional e por que é importante?",
        o: [
          "Criar variações das imagens de treino (rotação, flip, zoom, brilho) para aumentar o dataset e melhorar generalização",
          "Coletar mais imagens",
          "Aumentar resolução",
          "Remover imagens duplicadas",
        ],
        c: 0,
        e: "Data augmentation aplica transformações aleatórias nas imagens de treino: rotação (±15°), flip horizontal, crop aleatório, mudança de brilho/contraste, zoom (±20%). Aumenta efetivamente o dataset sem coletar novos dados. Reduz overfitting forçando o modelo a ser invariante a essas transformações.",
        x: "Dataset: 1000 imagens de gatos. Augmentation: cada imagem × 10 variações (rotação, flip, zoom, brilho) = 10000 imagens efetivas. Sem augmentation: accuracy 78%. Com augmentation: accuracy 89%.",
      },
      {
        q: "O que é a operação de convolução em uma CNN e o que os filtros detectam?",
        o: [
          "Filtros (kernels) deslizam pela imagem multiplicando e somando valores, detectando padrões como bordas, texturas e formas",
          "Filtros classificam a imagem inteira de uma vez",
          "Convolução reduz a imagem pela metade",
          "Filtros são definidos manualmente",
        ],
        c: 0,
        e: "Convolução: filtro 3×3 desliza pela imagem, multiplica elemento a elemento e soma → 1 valor no feature map. Filtros são APRENDIDOS durante o treino. Camadas iniciais aprendem bordas/texturas, camadas profundas aprendem partes de objetos (olhos, rodas). Parâmetros: kernel size, stride, padding.",
        x: "Imagem 32×32, filtro 3×3, stride=1, padding=0 → feature map 30×30. 32 filtros produzem 32 feature maps. Filtro 1 detecta bordas verticais, filtro 2 bordas horizontais, filtro 3 cantos. Total: 32×3×3 = 288 parâmetros (muito eficiente).",
      },
      {
        q: "O que é uma imagem em termos de dados computacionais e quais formatos são usados em ML?",
        o: [
          "Uma matriz de números representando pixels; formato usual: Altura × Largura × Canais (RGB=3, grayscale=1)",
          "Texto descrevendo a cena",
          "Um vetor unidimensional",
          "Um arquivo comprimido sem dados numéricos",
        ],
        c: 0,
        e: "Imagem RGB: tensor 3D com shape (H, W, 3). Cada pixel = [R, G, B] com valores 0-255 (uint8) ou 0.0-1.0 (float32). Grayscale: (H, W, 1). Batch para CNN: (B, C, H, W) em PyTorch, (B, H, W, C) em TensorFlow. Normalização: /255 ou ImageNet mean/std.",
        x: "Foto 1920×1080 RGB: tensor 1080×1920×3 = 6.2M valores. Para CNN: resize para 224×224×3 = 150k valores. Normalizar: pixel[128,200,50] → [0.502, 0.784, 0.196]. Batch de 32 imagens: tensor 32×3×224×224.",
      },
      {
        q: "O que é um feature map em CNNs e como ele se forma a partir da convolução?",
        o: [
          "Saída de um filtro aplicado à imagem: mapa 2D que indica onde o padrão detectado pelo filtro está presente",
          "É a imagem original",
          "É os pesos da rede",
          "É a saída final da classificação",
        ],
        c: 0,
        e: "Quando um filtro (kernel) é convolvido com a imagem, o resultado é um feature map (mapa de ativação). Valores altos indicam que o padrão do filtro foi detectado naquela região. Cada camada convolucional aplica múltiplos filtros, gerando múltiplos feature maps. Camadas profundas combinam feature maps anteriores em padrões mais complexos.",
        x: "Imagem 28×28, filtro de borda vertical 3×3 → feature map 26×26 com valores altos onde há bordas verticais. 32 filtros na camada 1 → 32 feature maps (bordas, cantos, gradientes). Camada 2 combina esses 32 maps em 64 feature maps de padrões mais complexos (curvas, texturas).",
      },
      {
        q: "Quais são as arquiteturas de CNN mais clássicas para classificação de imagens?",
        o: [
          "LeNet, AlexNet, VGG, GoogLeNet/Inception, ResNet — cada uma trouxe inovações como profundidade, skip connections e módulos inception",
          "Todas as CNNs são iguais",
          "Só existe uma arquitetura de CNN",
          "CNNs não são usadas para classificação",
        ],
        c: 0,
        e: "LeNet (1998): pioneira, dígitos. AlexNet (2012): venceu ImageNet, ReLU + dropout. VGG (2014): filtros 3×3 empilhados, muito profunda (16-19 camadas). GoogLeNet (2014): módulos Inception com múltiplas escalas. ResNet (2015): skip connections permitiram 152+ camadas. Cada uma marcou época reduzindo error rate no ImageNet.",
        x: "ImageNet Top-5 Error: AlexNet (2012) 15.3% → VGG (2014) 7.3% → GoogLeNet (2014) 6.7% → ResNet (2015) 3.6% → humanos ~5.1%. ResNet-152 superou humanos! Hoje: EfficientNet, ConvNeXt e Vision Transformers (ViT) lideram.",
      },
    ],
    Médio: [
      {
        q: "Em uma CNN, o que é 'transfer learning' e como ele reduz drasticamente o tempo de treinamento para novas tarefas?",
        o: [
          "Reutilizar pesos de um modelo pré-treinado (ex.: ImageNet) e treinar apenas as camadas finais para a nova tarefa",
          "Treinar o modelo do zero em cada nova tarefa",
          "Transferir dados entre datasets",
          "Copiar a arquitetura mas reinicializar todos os pesos",
        ],
        c: 0,
        e: "Transfer learning usa modelos pré-treinados em grandes datasets (ex.: ResNet treinado no ImageNet com 1.4M imagens). As camadas convolucionais iniciais já aprenderam features universais (bordas, texturas). Congela-se essas camadas e treina apenas as camadas finais (cabeça de classificação) com dados da nova tarefa, economizando tempo e dados.",
        x: "Classificar 500 imagens de raio-X: treinar do zero → precisa de 100k+ imagens. Transfer learning com ResNet50 pré-treinado: congela 48 camadas, treina 2 últimas → 500 imagens bastam, 95% accuracy em 10 min de treino.",
      },
      {
        q: "O que são pooling layers (Max Pooling, Average Pooling) em CNNs e qual sua função?",
        o: [
          "Reduzem dimensão espacial do feature map pegando valor máximo ou médio de regiões; reduz parâmetros e overfitting",
          "Aumentam a resolução",
          "Adicionam mais filtros",
          "Normalizam os valores",
        ],
        c: 0,
        e: "Pooling reduz a dimensão espacial do feature map. Max Pooling: pega o valor máximo em cada janela (ex: 2×2 reduz WxH pela metade). Preserva features mais fortes. Average Pooling: média da janela. Benefícios: reduz parâmetros, computação e overfitting. Adiciona invariância a pequenas translações.",
        x: "Feature map 4×4 → Max Pool 2×2, stride 2 → output 2×2. Janela [[1,3],[2,8]] → max = 8. Imagem 224×224 após conv+pool+conv+pool → 7×7 (32× menor), mas com informação semântica concentrada.",
      },
      {
        q: "O que é object detection e como difere de classificação de imagens?",
        o: [
          "Classificação: 'que objeto está na imagem?'. Detection: 'onde estão os objetos?' com bounding boxes e classes",
          "São idênticas",
          "Detection não classifica",
          "Classificação usa bounding boxes",
        ],
        c: 0,
        e: "Classificação: uma classe por imagem (gato ou cachorro). Object Detection: múltiplos objetos localizados com bounding boxes + classes. Arquiteturas: YOLO (You Only Look Once, real-time), SSD (Single Shot Detector), Faster R-CNN (two-stage, mais preciso). Métricas: mAP (mean Average Precision), IoU (Intersection over Union).",
        x: "Foto de rua: Classificação → 'cena urbana'. Object Detection → [carro (92%, bbox:[10,20,200,150]), pessoa (88%, bbox:[300,50,380,250]), semáforo (95%, bbox:[400,10,420,60])]. Cada objeto localizado com coordenadas.",
      },
      {
        q: "O que são as métricas IoU e mAP em object detection?",
        o: [
          "IoU mede sobreposição entre bounding boxes; mAP é a média de Average Precision por classe",
          "São métricas de classificação",
          "IoU mede velocidade, mAP mede tamanho",
          "São usadas apenas em segmentação",
        ],
        c: 0,
        e: "IoU (Intersection over Union): área de interseção / área de união entre bbox predito e ground truth. IoU > 0.5 = detecção correta (TP). AP (Average Precision): área sob a curva Precision-Recall para uma classe. mAP: média do AP sobre todas as classes. mAP@0.5 = IoU threshold 0.5. COCO mAP: média em IoU 0.5:0.05:0.95.",
        x: "Detector de carros: bbox predito [100,100,200,200], ground truth [110,105,205,195]. Interseção = 8550px², União = 11450px². IoU = 8550/11450 = 0.75 > 0.5 → TP. AP carros = 0.85. AP pedestres = 0.78. mAP = 0.815.",
      },
      {
        q: "O que é Semantic Segmentation vs Instance Segmentation?",
        o: [
          "Semântica rotula cada pixel por classe; Instância diferencia objetos individuais da mesma classe",
          "São a mesma coisa",
          "Instância é mais simples",
          "Semântica só funciona com 2 classes",
        ],
        c: 0,
        e: "Semantic segmentation: cada pixel recebe uma classe (céu, estrada, carro) mas não diferencia instâncias (todos os carros = 'carro'). Instance segmentation: cada pixel recebe classe E instância (carro_1, carro_2). Panoptic = semantic + instance. Modelos: U-Net, DeepLab (semantic), Mask R-CNN (instance).",
        x: "Foto com 3 carros e 2 pedestres: Semantic → todos os pixels de carro = verde, pedestre = azul (não sabe quantos). Instance → carro_1=verde, carro_2=amarelo, carro_3=roxo, pedestre_1=azul, pedestre_2=ciano. Mask R-CNN gera máscara pixel-perfect para cada instância.",
      },
      {
        q: "O que é Feature Pyramid Network (FPN) e como melhora a detecção de objetos em múltiplas escalas?",
        o: [
          "Combina feature maps de diferentes resoluções da CNN em uma pirâmide, permitindo detectar objetos pequenos e grandes simultaneamente",
          "É uma técnica de data augmentation",
          "Só detecta objetos grandes",
          "É uma função de ativação",
        ],
        c: 0,
        e: "FPN constrói uma pirâmide de features: bottom-up (encoder CNN, resolução diminui) + top-down (upsampling + lateral connections). Feature maps de alta resolução detectam objetos pequenos, feature maps de baixa resolução detectam objetos grandes. Usado em Faster R-CNN, RetinaNet, YOLO modernos.",
        x: "Imagem com pedaço de fruta (20×20px) e caminhão (200×100px). Sem FPN: detector falha na fruta (muito pequena em feature maps profundos). Com FPN: feature map P2 (alta resolução) detecta fruta, P5 (baixa resolução) detecta caminhão. mAP sobe 5-8% com FPN.",
      },
      {
        q: "O que é face recognition e como difere de face detection?",
        o: [
          "Detection localiza rostos na imagem; recognition identifica QUEM é a pessoa comparando com um banco de faces conhecidas",
          "São a mesma coisa",
          "Recognition é mais fácil que detection",
          "Detection identifica a pessoa",
        ],
        c: 0,
        e: "Face detection: localizar retangulos com rostos (MTCNN, RetinaFace). Face recognition: (1) Detection, (2) Alignment, (3) Embedding (ArcFace, FaceNet geram vetor 128/512D), (4) Comparar embedding com banco via distância cosseno. Verificação (1:1): é a pessoa X? Identificação (1:N): quem é esta pessoa?",
        x: "Foto em grupo de 10 pessoas: Face detection → 10 bounding boxes. Face recognition → cada face gera embedding 512D. Comparar com banco de funcionários: face_1 embedding ≈ 'João' (cosseno 0.92 > threshold 0.85). face_2 ≈ 'Maria' (0.88). face_3 = desconhecido (max cosseno 0.60 < 0.85).",
      },
    ],
    Difícil: [
      {
        q: "Na arquitetura U-Net para segmentação semântica, qual é o papel do 'skip connections' entre encoder e decoder?",
        o: [
          "Transmitem features de alta resolução do encoder para o decoder, preservando detalhes espaciais perdidos no downsampling",
          "Aceleram o treinamento pulando camadas",
          "Previnem overfitting removendo neurônios",
          "Conectam a entrada diretamente à saída",
        ],
        c: 0,
        e: "A U-Net tem um encoder (downsampling) e decoder (upsampling) simétricos. Skip connections concatenam feature maps do encoder com feature maps correspondentes do decoder. Isso permite que o decoder combine informações semânticas profundas (do bottleneck) com detalhes espaciais finos (do encoder), essencial para segmentação pixel-a-pixel precisa.",
        x: "Segmentação de tumores em MRI: encoder reduz 256×256 → 16×16 (perde detalhes de borda). Skip connections enviam features 256×256, 128×128, 64×64 do encoder para o decoder, que combina com upsampled features para delinear bordas do tumor com precisão de pixel.",
      },
      {
        q: "O que é YOLO (You Only Look Once) e por que revolucionou a detecção de objetos em tempo real?",
        o: [
          "Processa a imagem inteira em uma única passada pela rede, prevendo bounding boxes e classes simultaneamente",
          "Usa várias passadas",
          "Apenas classifica",
          "Baseado em template matching",
        ],
        c: 0,
        e: "YOLO divide a imagem em grid S×S. Cada célula prevê B bounding boxes + confiança + C classes em uma única forward pass. Diferente de R-CNN (propõe regiões, depois classifica cada uma). YOLO é 100× mais rápido que R-CNN. YOLOv8 atinge ~60 FPS em GPU com alta precisão.",
        x: "YOLO para carro autônomo: imagem 416×416 → grid 13×13 → cada célula prevê 3 boxes. Uma passada (30ms) detecta pedestres, carros, sinais simultaneamente. R-CNN: ~2000ms por imagem (propõe ~2000 regiões). YOLO viabiliza detecção em tempo real.",
      },
      {
        q: "O que são Vision Transformers (ViT) e como eles aplicam a arquitetura Transformer a imagens?",
        o: [
          "Dividem a imagem em patches, tratam cada patch como um token e aplicam self-attention; competem com CNNs",
          "CNN com mais camadas",
          "Transformers para texto apenas",
          "Tipo especial de pooling",
        ],
        c: 0,
        e: "ViT (Vision Transformer): divide imagem em patches (ex: 16×16), cada patch é linearizado e projetado como embedding (análogo a token de texto). Position embeddings são adicionados. Self-attention captura relações entre patches distantes (campo receptivo global desde a primeira camada, vs CNN que é local). ViT supera CNNs com dados suficientes.",
        x: "Imagem 224×224 → 196 patches de 16×16. Cada patch → embedding 768D. 196 'tokens' + [CLS] token → 12 camadas Transformer → [CLS] → classificação. Patch do olho 'atende' ao patch da boca via attention, capturando relação global.",
      },
      {
        q: "O que é o modelo SAM (Segment Anything Model) e por que é considerável para visão computacional?",
        o: [
          "Modelo fundacional que segmenta qualquer objeto em qualquer imagem dado um prompt (ponto, caixa ou texto)",
          "É um classificador de imagens",
          "Só funciona com rostos",
          "É um modelo de geração de imagens",
        ],
        c: 0,
        e: "SAM (Meta, 2023): treinado em 11M de imagens e 1.1B de máscaras. Foundation model para segmentação: aceita prompts (pontos, caixas, texto) e gera máscaras precisas para qualquer objeto. Zero-shot: funciona em domínios nunca vistos (médico, satélite). Combina image encoder (ViT), prompt encoder e mask decoder.",
        x: "Imagem de satélite (nunca treinado com satélite): clique no ponto central de um prédio → SAM segmenta o prédio perfeitamente. Caixa ao redor de um lago → máscara precisa. Antes: treinar modelo específico com 10k imagens rotuladas. SAM: zero imagens, zero treino.",
      },
      {
        q: "O que é Diffusion Model e como gera imagens de alta qualidade?",
        o: [
          "Adiciona ruído gaussiano progressivamente e aprende a reverter o processo, gerando imagens do ruído",
          "Gera imagens combinando partes de outras imagens",
          "É o mesmo que GAN",
          "Usa regras programáticas para desenhar",
        ],
        c: 0,
        e: "Diffusion Models: Forward process: imagem → ruído gaussiano em T steps. Reverse process: rede neural aprende a remover ruído step a step. Geração: começa de ruído puro e denoisa iterativamente. Vantagens sobre GANs: treino estável, maior diversidade. Exemplos: Stable Diffusion, DALL-E 3, Midjourney.",
        x: "Prompt: 'gato astronauta na lua, óleo sobre tela'. Step 1000 (ruído puro) → Step 750 (formas vagas) → Step 500 (silüeta de gato) → Step 250 (detalhes do capacete) → Step 0 (imagem final fotorrealista). 50 steps de inferência com DDIM sampler.",
      },
      {
        q: "O que é Neural Style Transfer e como combina conteúdo de uma imagem com estilo de outra?",
        o: [
          "Usa features das camadas profundas de uma CNN para conteúdo e Gram matrices das camadas rasas para estilo, otimizando uma imagem de saída",
          "Copia pixels de uma imagem para outra",
          "É um filtro do Instagram",
          "Treina uma rede do zero para cada par de imagens",
        ],
        c: 0,
        e: "Neural Style Transfer (Gatys et al., 2015): extrai conteúdo das camadas profundas de VGG (formas, objetos) e estilo das camadas rasas via Gram matrix (texturas, cores, pinceladas). A imagem de saída é otimizada para minimizar: L_total = α×L_content + β×L_style. Versões rápidas (feed-forward) geram em 1 forward pass.",
        x: "Foto de São Paulo (conteúdo) + 'Noite Estrelada' de Van Gogh (estilo). L_content preserva prédios e ruas. L_style aplica espirais, cores vibrantes, pinceladas grossas. Resultado: São Paulo pintada no estilo Van Gogh. Otimização: ~300 iterações de gradient descent diretamente nos pixels.",
      },
      {
        q: "O que é Depth Estimation monocular e como redes neurais estimam profundidade de uma única imagem?",
        o: [
          "Rede neural prevê mapa de profundidade pixel a pixel a partir de uma única imagem 2D usando pistas monoculares aprendidas",
          "Requer duas câmeras (estéreo)",
          "Mede a profundidade com sensores LIDAR",
          "Só funciona com imagens RGB-D",
        ],
        c: 0,
        e: "Depth Estimation monocular: rede (ex: DPT, MiDaS, Depth Anything) recebe 1 imagem RGB e prevê profundidade relativa ou absoluta para cada pixel. Aprende pistas monoculares: perspectiva, oclusão, tamanho relativo, textura, foco/blur. Aplicações: AR/VR, robótica, direção autônoma, efeito bokeh em smartphones.",
        x: "Foto de rua com câmera do celular: MiDaS gera mapa de profundidade — calçada=2m (perto, branco), carros=15m (médio, cinza), prédios=100m (longe, preto). Smartphone usa isso para efeito 'retrato' (desfocar fundo). Carro autônomo: combina mono depth com LIDAR para 3D map em tempo real.",
      },
    ],
  },
};

// ─── Round 1 · +1 questão por nível por categoria ───

const machineLearningRound1Extras: Record<
  string,
  Record<UserLevel, SeedCard[]>
> = {
  "Algoritmos de Classificação": {
    Fácil: [
      {
        q: "O que é a acurácia (accuracy) e quando ela pode ser uma métrica enganosa?",
        o: [
          "Proporção de previsões corretas; enganosa em classes desbalanceadas (ex: 99% classe A, 1% B — prever sempre A dá 99% accuracy sem aprender nada)",
          "Média das probabilidades de cada previsão estar correta",
          "Proporção de verdadeiros positivos sobre o total de positivos",
          "Sempre a métrica mais confiável independentemente da distribuição das classes",
        ],
        c: 0,
        e: "Accuracy = (TP+TN)/(TP+TN+FP+FN). Problemática em datasets desbalanceados: fraude bancária com 0,1% de fraudes — modelo que nunca prevê fraude tem 99,9% de accuracy mas é inútil. Alternativas: F1-score (harmônica de precision e recall), AUC-ROC, precision e recall separados por classe.",
        x: "Detecção de câncer: 990 negativos, 10 positivos. Modelo 'sempre negativo': accuracy=99% mas recall=0% (não detecta nenhum câncer). F1-score=0 revela o problema. Use precision (dos que previ positivo, quantos eram?) e recall (dos positivos reais, quantos peguei?).",
      },
    ],
    Médio: [
      {
        q: "Como o SVM (Support Vector Machine) usa o conceito de margem máxima e kernel trick?",
        o: [
          "Encontra hiperplano que maximiza a margem entre classes; kernel trick mapeia dados para espaço de maior dimensão para separar classes não-linearmente separáveis sem calcular explicitamente esse espaço",
          "Usa gradiente descendente para minimizar erro quadrático médio em classificação binária",
          "Cria ensemble de árvores de decisão com votação por maioria para maximizar separação",
          "Aplica bayes theorem para calcular probabilidade posterior de cada classe",
        ],
        c: 0,
        e: "SVM: suporte vectors = pontos mais próximos do hiperplano. Margem = distância entre suporte vectors das duas classes. Objetivo: maximizar essa margem. Kernel trick (RBF, polinomial): K(x,y) = φ(x)·φ(y) calcula produto interno no espaço transformado sem computar φ explicitamente. Permite decisões não-lineares com custo computacional linear no espaço original.",
        x: "Dados circulares (círculo dentro de círculo): linearmente inseparáveis em 2D. Kernel RBF mappa para 3D onde se tornam separáveis por hiperplano. SVM com kernel linear para texto (alta dimensionalidade já é linear). C (regularização): alto C = menos erros no treino, mais overfitting.",
      },
    ],
    Difícil: [
      {
        q: "O que é o problema de imbalanced classes e quais técnicas de reamostragem e de loss function existem para tratá-lo?",
        o: [
          "Classes desbalanceadas enviesam o modelo para a majoritária; técnicas: SMOTE (oversampling sintético), undersampling, class_weight, focal loss e threshold tuning",
          "Apenas aumentar o dataset com mais dados reais da classe minoritária resolve o problema",
          "Normalizar features resolve o desbalanceamento antes do treinamento",
          "Usar accuracy como métrica de avaliação compensa automaticamente o desbalanceamento",
        ],
        c: 0,
        e: "Desbalanceamento: modelo aprende a ignorar classe minoritária. SMOTE: gera amostras sintéticas interpolando vizinhos da classe minoritária. Undersampling: remove exemplos da majoritária (perda de dados). class_weight='balanced': penaliza erros na minoritária proporcionalmente. Focal Loss: (1-pt)^γ × CE — foca em exemplos difíceis (mal classificados). Threshold tuning: mover threshold de 0.5 para aumentar recall.",
        x: "Fraude: 10k normal, 100 fraude. SMOTE gera 9.9k fraudes sintéticas (interpolação kNN). class_weight={0:1, 1:100}. Focal Loss γ=2: erros em fraudes pesam muito mais. Após treino: threshold=0.3 em vez de 0.5 para capturar mais fraudes (aumenta recall, reduz precision). PR-AUC melhor métrica que ROC-AUC para desbalanceados.",
      },
    ],
  },
  "Algoritmos de Regressão": {
    Fácil: [
      {
        q: "O que é o coeficiente de determinação R² e como interpretar seus valores?",
        o: [
          "Proporção da variância da variável dependente explicada pelo modelo; R²=1 ajuste perfeito, R²=0 o modelo não explica nada, R²<0 é pior que a média",
          "Correlação entre features e target, sempre entre 0 e 1",
          "Erro médio quadrático normalizado pelo desvio padrão dos dados",
          "Número de features que o modelo usa efetivamente para predição",
        ],
        c: 0,
        e: "R² = 1 - SS_res/SS_tot. SS_res = soma dos quadrados dos resíduos. SS_tot = variância total dos dados (desvio em relação à média). R²=0.85: modelo explica 85% da variação. R²<0: possível com dados de teste se modelo treinou em distribuição diferente. Adjusted R² penaliza features irrelevantes adicionadas.",
        x: "Previsão de preço de imóvel: R²=0.78 — 78% da variação de preço explicada por área, localização, quartos. 22% por fatores não capturados (reforma recente, vizinhança específica). R²=0.3 em previsão de ações: normal, pois mercado tem alta aleatoriedade. Sempre comparar R² treino vs teste para detectar overfitting.",
      },
    ],
    Médio: [
      {
        q: "Como Ridge e Lasso diferem na regularização e qual a diferença prática no comportamento dos coeficientes?",
        o: [
          "Ridge (L2) encolhe coeficientes sem zerar; Lasso (L1) pode zerar coeficientes completamente (feature selection implícita) por ser geometricamente anguloso",
          "Ridge remove features; Lasso encolhe uniformemente; Elastic Net combina as duas sem zerar nenhum coeficiente",
          "São idênticos matematicamente; a diferença é apenas computacional",
          "Ridge funciona somente para regressão logística; Lasso somente para regressão linear",
        ],
        c: 0,
        e: "Ridge (L2): penalidade = λΣβ². Gradiente suave: coeficientes tendem a zero mas nunca chegam lá — todos pequenos, nenhum exatamente zero. Lasso (L1): penalidade = λΣ|β|. Geometria rômbica: ótimo frequentemente cai em vértice com β=0. Feature selection automática. Elastic Net = αL1 + (1-α)L2: combina estabilidade de Ridge com esparsidade de Lasso.",
        x: "10 features, 8 irrelevantes. Lasso (λ=0.1): 8 coeficientes zeraram automaticamente, modelo usa apenas 2 features relevantes. Ridge com mesmo λ: todos os 10 coeficientes continuam (mas pequenos). Quando features correlacionadas: Ridge distribui peso entre elas; Lasso escolhe uma arbitrariamente. Elastic Net: melhor nesse caso de multicolinearidade.",
      },
    ],
    Difícil: [
      {
        q: "O que é heteroscedasticidade em regressão e como diagnosticar e tratar?",
        o: [
          "Variância dos resíduos não é constante (varia com o valor previsto ou uma feature); diagnóstico: Breusch-Pagan test, gráfico resíduos vs fitted; tratamento: transformação log(y), WLS ou modelos robustos",
          "Correlação serial entre resíduos em séries temporais; tratamento com ARIMA",
          "Multicolinearidade severa entre features; diagnosticada por VIF alto",
          "Ausência de linearidade entre features e target; tratada com features polinomiais",
        ],
        c: 0,
        e: "Homocedasticidade (pressuposto OLS): Var(ε)=σ² constante. Heterocedasticidade: Var(ε) varia — ex: resíduos maiores para valores maiores de Y. Consequências: OLS ainda não-enviesado mas não mais BLUE, p-values e IC inválidos. Diagnóstico: resíduo vs fitted plot (cone), Breusch-Pagan, White test. Tratamentos: transformar Y (log, sqrt), WLS (pesos inversamente proporcionais à variância), HC standard errors (erros robustos).",
        x: "Preço de casas: resíduos menores para imóveis baratos, maiores para mansões. Plot cone crescente. log(preço) como target: heterocedasticidade frequentemente desaparece. WLS: peso_i = 1/variancia_i para imóvel i. statsmodels: sm.OLS(...).fit(cov_type='HC3') para inferência robusta sem transformar Y.",
      },
    ],
  },
  "Aprendizado Não Supervisionado": {
    Fácil: [
      {
        q: "Como o algoritmo K-Means define e atualiza os clusters iterativamente?",
        o: [
          "Inicializa K centroides aleatórios, atribui cada ponto ao centroide mais próximo, recalcula centroides como média do cluster; repete até convergência",
          "Constrói dendrograma hierárquico mesclando os dois pontos mais próximos a cada passo",
          "Usa rede neural para aprender representação comprimida e agrupa no espaço latente",
          "Calcula a densidade de pontos em cada região e marca regiões densas como clusters",
        ],
        c: 0,
        e: "K-Means: minimiza a inércia (soma das distâncias quadráticas ao centroide). Passos: 1) Inicializar K centroides (K-Means++ melhora inicialização). 2) Atribuição: cada ponto vai ao centroide mais próximo (distância euclidiana). 3) Atualização: centroide = média de todos os pontos do cluster. Repetir 2 e 3 até centroides não moverem. Sensível a outliers e escala — normalizar antes.",
        x: "Segmentação de clientes: K=3. Iter 1: centroide aleatório. Iter 2: clientes de alta renda agrupam perto de um centroide, jovens próximos de outro. Convergência em ~20 iterações. Elbow method: testar K=1..10, plot inércia — cotovelo indica K ótimo. K-Means++ evita inicialização ruim com centroides espalhados.",
      },
    ],
    Médio: [
      {
        q: "O que é PCA (Principal Component Analysis) e como interpretar os componentes principais?",
        o: [
          "PCA encontra combinações lineares das features (componentes) que maximizam variância explicada em ordem decrescente; componentes são ortogonais entre si",
          "Algoritmo de clustering que projeta dados em k dimensões maximizando separabilidade",
          "Técnica de regularização que remove features correlacionadas diretamente",
          "Rede neural de compressão que aprende representação não-linear dos dados",
        ],
        c: 0,
        e: "PCA: decomposição espectral da matriz de covariância. Autovalores = variância capturada. Autovetores = direções (componentes principais). PC1 = maior variância. PC2 = segunda maior, ortogonal à PC1. Scree plot: variância acumulada por componente. Escolha: componentes que explicam 90-95% da variância total. Interpretação: cada PC é combinação linear de features originais com pesos (loadings).",
        x: "Dataset com 50 features de imagens faciais. PCA: PC1 explica 40% (iluminação geral), PC2 12% (orientação facial), PC3 8% (expressão). Com 10 componentes: 85% da variância. Reduz de 50 para 10 dimensões. Biplot: loadings mostram quais features originais mais influenciam cada PC. Normalizar antes (Z-score).",
      },
    ],
    Difícil: [
      {
        q: "Como o algoritmo DBSCAN difere do K-Means e quais tipos de clusters ele consegue detectar?",
        o: [
          "DBSCAN detecta clusters de forma arbitrária e identifica outliers via densidade; não requer K predefindo; falha em clusters de densidades muito diferentes (problema de densidade variável)",
          "DBSCAN é hierárquico e requer K assim como K-Means; diferença é na métrica de distância",
          "É variante do K-Means com inicialização determinística que elimina sensibilidade ao ponto inicial",
          "Algoritmo espectral que usa grafo de vizinhança; clusters sempre esféricos como K-Means",
        ],
        c: 0,
        e: "DBSCAN: parâmetros ε (raio) e minPts (mínimo de pontos no raio). Core point: tem ≥minPts em ε. Border point: está em ε de core point mas tem <minPts. Noise (outlier): não é core nem border. Clusters: regiões densas conectadas de core points. Detecta formas arbitrárias (lua crescente, espiral). Não escala bem para alta dimensionalidade (curse of dimensionality afeta métrica de distância).",
        x: "Dados em forma de espiral: K-Means falha (assume esférico). DBSCAN ε=0.5, minPts=5: segue a densidade da espiral. Anomalia detection: pontos de ruído = outliers naturais. HDBSCAN: extensão hierárquica que lida com densidade variável entre clusters. scikit-learn: DBSCAN(eps=0.5, min_samples=5).fit(X).",
      },
    ],
  },
  "Deep Learning e Redes Neurais": {
    Fácil: [
      {
        q: "O que é a função de ativação ReLU e por que substituiu a sigmoid em redes profundas?",
        o: [
          "ReLU(x)=max(0,x); resolve o problema de vanishing gradient da sigmoid (gradiente ~0 para valores extremos) e é computacionalmente mais eficiente",
          "ReLU é uma função probabilística que normaliza ativações entre 0 e 1",
          "Substitui sigmoid pois produz outputs sempre positivos, eliminando gradientes negativos",
          "ReLU é usada apenas na camada de saída para classificação binária",
        ],
        c: 0,
        e: "Sigmoid: f(x) = 1/(1+e^-x). Gradiente máximo 0.25. Em redes profundas: gradientes multiplicados camada a camada → vanishing gradient (gradientes próximos de 0 nas primeiras camadas). ReLU: gradiente = 1 se x>0, 0 se x<0. Não satura em positivos. Rápido de computar. Problema: Dying ReLU (neurônio sempre produz 0). Variantes: Leaky ReLU, ELU, GELU (usado em Transformers).",
        x: "Rede de 10 camadas com sigmoid: gradiente na entrada = 0.25^10 ≈ 0.000001 (impraticável). Com ReLU: gradiente flui sem atenuação para x>0. GELU (BERT/GPT): suave, diferenciável em zero. Leaky ReLU: f(x) = max(0.01x, x) — evita Dying ReLU permitindo gradiente pequeno em x<0.",
      },
    ],
    Médio: [
      {
        q: "Como o mecanismo de Dropout funciona como regularização e por que só é aplicado no treino?",
        o: [
          "Desativa neurônios aleatoriamente com probabilidade p durante o treino, forçando redundância e independência entre neurônios; no teste usa todos os neurônios com pesos escalados por (1-p)",
          "Remove permanentemente os neurônios menos ativos do modelo para reduzir parâmetros",
          "Cria ensemble de modelos menores treinados em subsets de dados usando subconjuntos de neurônios",
          "Aplica ruído gaussiano às ativações durante treino e teste para robustez",
        ],
        c: 0,
        e: "Dropout (Srivastava 2014): cada neurônio é zerado com p (ex: p=0.5) independentemente a cada batch. Efeito: rede não pode depender de neurônio específico → aprende representações redundantes e robustas. Equivale a treinar 2^n sub-redes diferentes. Na inferência: todos ativos, pesos multiplicados por (1-p) para compensar escala — ou inverted dropout escala durante treino.",
        x: "Camada com 100 neurônios, p=0.3: cada forward pass desativa ~30 neurônios aleatórios. Rede aprende a funcionar com qualquer subconjunto. Treino: output × (1/(1-p)). Teste: sem Dropout. Típico: p=0.5 em FC layers, p=0.1-0.2 em conv layers. Batch Normalization + Dropout: cuidado com interação, geralmente BatchNorm depois do Dropout.",
      },
    ],
    Difícil: [
      {
        q: "O que é batch normalization e como resolve o problema de internal covariate shift?",
        o: [
          "Normaliza ativações de cada camada para média 0 e variância 1 por mini-batch (parâmetros γ e β aprendíveis); estabiliza treino, permite learning rates maiores e reduz sensibilidade à inicialização",
          "Normaliza os dados de entrada antes do treino para acelerar convergência do gradiente descendente",
          "Técnica de regularização que adiciona ruído normalizado às ativações durante o treino",
          "Balanceia gradientes entre camadas usando normalização por camada ao invés de por batch",
        ],
        c: 0,
        e: "Internal covariate shift: distribuição das ativações de camadas intermediárias muda durante o treino (parâmetros das camadas anteriores mudam). BatchNorm: para cada mini-batch, normaliza (x - μ_batch)/σ_batch, depois escala com γ e desloca com β (learnable). Na inferência: usa média/variância do treino (running statistics). Benefícios: permite LR maiores, menos sensível à inicialização, leve efeito regularizador.",
        x: "Sem BatchNorm: LR=0.001 obrigatório para estabilidade. Com BatchNorm: LR=0.01 funciona, treino 10× mais rápido. Posicionar: antes ou depois da ativação (debate — antes mais comum). Layer Normalization (Transformers): normaliza ao longo das features, não do batch — funciona com batch_size=1. Group Norm: alternativa para visão com batch pequeno.",
      },
    ],
  },
  "Estatística para ML": {
    Fácil: [
      {
        q: "Qual a diferença entre viés (bias) e variância (variance) no contexto de modelos de ML?",
        o: [
          "Viés: erro sistemático por suposições simplificadoras (underfitting); variância: sensibilidade excessiva aos dados de treino (overfitting); tradeoff entre os dois define a complexidade ideal do modelo",
          "Viés é erro de medição nos dados; variância é o desvio padrão das predições",
          "Variância indica a quantidade de parâmetros do modelo; viés é o erro no conjunto de treino",
          "São sinônimos estatísticos para o erro total do modelo de ML",
        ],
        c: 0,
        e: "Erro total = Bias² + Variance + Ruído irredutível. High bias (underfitting): modelo muito simples, erra sistematicamente em treino e teste. High variance (overfitting): modelo memoriza treino, generaliza mal. Complexity trade-off: modelo simples (linear) → high bias, low variance. Modelo complexo (deep NN) → low bias, high variance. Regularização, dropout, early stopping: reduzem variância.",
        x: "Regressão linear para dados polinomiais: high bias (linha reta não captura curva). Polinômio grau 15 no mesmo dataset: ajusta perfeitamente o treino, oscila absurdamente no teste (high variance). Grau 3: equilíbrio. Cross-validation mede variância (desvio padrão do score entre folds) e viés (score médio vs ótimo esperado).",
      },
    ],
    Médio: [
      {
        q: "O que é o teorema de Bayes e qual sua aplicação no classificador Naive Bayes?",
        o: [
          "P(A|B) = P(B|A)×P(A)/P(B); Naive Bayes usa independência condicional das features para calcular P(classe|features) de forma eficiente mesmo com muitas features",
          "Define probabilidade condicional como produto das probabilidades marginais de cada feature",
          "Teorema de convergência de estimadores de máxima verossimilhança para grandes amostras",
          "Fundamenta redes bayesianas que modelam dependências causais entre variáveis",
        ],
        c: 0,
        e: "Bayes: P(Y|X) = P(X|Y)×P(Y)/P(X). Naive Bayes assume P(X1,X2,...Xn|Y) = ∏P(Xi|Y) (features condicionalmente independentes dado a classe). 'Naive' porque raro na prática, mas funciona surpreendentemente bem. P(X) = denominador constante, ignorado na classificação. Eficiente: estima P(Xi|Y) separadamente. Gaussian NB, Multinomial NB (texto), Bernoulli NB.",
        x: "Spam: P(spam|'venda','grátis') ∝ P('venda'|spam)×P('grátis'|spam)×P(spam). Treino: conta frequência de palavras por classe. Teste: multiplica probabilidades. 'Naive': assume 'venda' e 'grátis' independentes dado spam (falso, mas funciona). Laplace smoothing: P(palavra|classe) = (count+1)/(total+vocab) para evitar probabilidade zero.",
      },
    ],
    Difícil: [
      {
        q: "O que é validação cruzada k-fold e como corrigir o data leakage em pipelines com feature engineering?",
        o: [
          "Divide dados em k folds; treina em k-1 e valida em 1 repetindo k vezes; leakage é prevenido encapsulando TODA transformação (scaler, imputer, encoder) dentro do pipeline que é ajustado somente no fold de treino",
          "Particiona dados aleatoriamente k vezes com reposição para estimativa de bootstrap",
          "Data leakage é prevenido normalizando todos os dados antes de criar qualquer fold",
          "Aplica transformações no dataset completo antes de qualquer split, depois faz k-fold",
        ],
        c: 0,
        e: "k-fold: estimativa de generalização mais confiável. Leakage: fit de scaler/imputer no dataset COMPLETO inclui estatísticas do fold de teste → modelo parece melhor que realmente é. Correto: Pipeline([(scaler, StandardScaler()), (model, SVC())]); cross_val_score(pipeline, X, y, cv=5) — scaler.fit_transform só vê X_train de cada fold. StratifiedKFold para classificação desbalanceada.",
        x: "ERRADO: scaler.fit(X_all); cross_val_score(model, X_scaled, y). CORRETO: pipe = Pipeline([('scaler', StandardScaler()), ('clf', LR())]); cross_val_score(pipe, X, y, cv=10). fold de teste nunca influencia a normalização. Time Series: TimeSeriesSplit (fold de teste sempre depois do treino — sem shuffling). Nested CV para hyperparameter tuning simultâneo.",
      },
    ],
  },
  "IA Generativa e LLMs": {
    Fácil: [
      {
        q: "O que é um Large Language Model (LLM) e como ele gera texto token a token?",
        o: [
          "Modelo de linguagem treinado com bilhões de tokens que prevê o próximo token baseado no contexto anterior; usa distribuição de probabilidade para escolher cada token",
          "Modelo que gera imagens a partir de descrições textuais usando difusão",
          "Banco de dados de frases pré-escritas que recupera respostas por similaridade",
          "Assistente de voz com reconhecimento de fala integrado e busca na internet",
        ],
        c: 0,
        e: "LLM (ex: GPT-4, Llama3): treinado para prever P(próximo_token | contexto). Na geração: dado prompt, calcula distribuição sobre vocabulário (32k+ tokens), amostra um token, adiciona ao contexto, repete. Temperature: alto → mais aleatório, baixo → mais determinístico. Top-p (nucleus sampling): considera tokens com probabilidade acumulada ≥ p. Tokenização: byte-pair encoding, ~4 chars/token.",
        x: "Prompt 'O céu é': LLM calcula P(azul|...) alto, P(pizza|...) baixo. Temperature=0: escolhe sempre 'azul'. Temperature=1: amostragem da distribuição. Temperature=2: respostas criativas/caóticas. Tokens ≠ palavras: 'ChatGPT' = 2 tokens. GPT-4 context window: 128k tokens (~96k palavras). Geração de 1 token por vez = autoregressive.",
      },
    ],
    Médio: [
      {
        q: "O que é fine-tuning supervisionado de LLMs e como difere de RAG (Retrieval-Augmented Generation)?",
        o: [
          "Fine-tuning atualiza pesos do modelo com exemplos do domínio (conhecimento no parâmetro); RAG recupera documentos relevantes em tempo real e os injeta no contexto (conhecimento externo e atualizável)",
          "Fine-tuning é para classificação; RAG é para geração de texto",
          "São equivalentes — ambos armazenam conhecimento externo nos embeddings",
          "RAG modifica os pesos do modelo com documentos; fine-tuning usa contexto expandido",
        ],
        c: 0,
        e: "Fine-tuning SFT: continua treinamento com pares (instrução, resposta desejada) do domínio. Conhecimento gravado nos pesos. Desvantagem: requer retreinamento para atualizar info, caro, risco de catastrophic forgetting. RAG: embedding dos documentos → banco vetorial. Query time: recupera top-k por similaridade → injeta no prompt. Vantagem: conhecimento atualizado sem retreinar. Desvantagem: qualidade depende do retrieval.",
        x: "Chatbot jurídico. Fine-tuning: treinar com 10k Q&A de leis → modelo 'sabe' direito. RAG: embedar todas as leis no Pinecone → query 'direito trabalhista' recupera artigos relevantes → LLM responde com base nos documentos. Fine-tuning: estável, sem latência de busca. RAG: atualiza banco vetorial quando lei muda sem retreinar modelo.",
      },
    ],
    Difícil: [
      {
        q: "O que é RLHF (Reinforcement Learning from Human Feedback) e como o PPO é aplicado para alinhar LLMs?",
        o: [
          "RLHF: treina reward model com preferências humanas e usa PPO para otimizar a política (LLM) maximizando reward com penalidade KL para não desviar muito do modelo base",
          "Fine-tuning supervisionado com anotações humanas binárias de certo/errado",
          "Técnica de data augmentation onde humanos corrigem outputs do modelo iterativamente",
          "Método de destilação de conhecimento de modelos grandes para pequenos com feedback humano",
        ],
        c: 0,
        e: "RLHF (InstructGPT/ChatGPT): 1) SFT: fine-tuning com demonstrações humanas. 2) Reward Model: treinar RM para prever qual resposta humanos preferem (comparações pairwise). 3) PPO: otimizar LLM para maximizar RM(resposta) - β×KL(π||π_SFT). KL penalty evita o modelo colapsar para exploits do RM (reward hacking). DPO (Direct Preference Optimization): alternativa mais simples sem RM explícito.",
        x: "ChatGPT: SFT em diálogos curados, depois RM treinado em 50k comparações humanas (qual resposta é melhor?). PPO: LLM gera resposta → RM pontua → gradiente ajusta LLM para respostas mais bem pontuadas. KL divergência: impede LLM de gerar texto estranho que engana o RM. Constitutional AI (Anthropic): substitui humanos por princípios no feedback.",
      },
    ],
  },
  "MLOps e Deploy de Modelos": {
    Fácil: [
      {
        q: "O que é model drift e qual a diferença entre data drift e concept drift?",
        o: [
          "Data drift: distribuição das features muda em produção vs treino; concept drift: relação entre features e target muda; ambos degradam performance do modelo com o tempo",
          "Model drift é a redução de performance por underfitting; corrigido com mais dados de treino",
          "Data drift ocorre apenas em séries temporais; concept drift em dados categóricos",
          "São sinônimos para overfitting do modelo nos dados de produção",
        ],
        c: 0,
        e: "Data drift (covariate shift): P(X) muda — ex: perfil demográfico dos usuários muda. Concept drift: P(Y|X) muda — ex: padrões de fraude evoluem, comportamento de compra muda em crise. Prior probability drift: P(Y) muda — mais usuários premium. Detecção: PSI (Population Stability Index), KS test, monitoramento de distribuições. Resposta: retreinamento periódico, trigger por threshold de degradação.",
        x: "Modelo de crédito treinado em 2020: data drift em 2022 (inflação muda perfil de inadimplência). Concept drift: padrões de calote antes vs depois da pandemia. Monitor: PSI > 0.25 = data drift severo → alertar. Evidently AI, WhyLabs, Arize: ferramentas de monitoramento de ML. Retreino automático quando accuracy cai abaixo de threshold.",
      },
    ],
    Médio: [
      {
        q: "O que é um feature store e qual problema ele resolve em pipelines de ML em produção?",
        o: [
          "Repositório centralizado de features computadas e versionadas; resolve inconsistência treino-serviço (training-serving skew) garantindo que treino e inferência usem as mesmas transformações",
          "Banco de dados de hiperparâmetros e métricas de experimentos de ML",
          "Repositório de modelos treinados com versionamento e rollback automático",
          "Cache de predições recentes para reduzir latência de inferência em tempo real",
        ],
        c: 0,
        e: "Training-serving skew: feature computada diferente em treino vs produção → degradação silenciosa. Feature store: features pré-computadas e armazenadas offline (batch) e online (baixa latência). Partes: feature registry (catálogo), offline store (histórico, warehouse), online store (Redis, DynamoDB para inferência). Point-in-time correctness: features históricas sem data leakage futuro em treino.",
        x: "Feature 'média de compras dos últimos 30 dias'. Treino: computa com SQL offline no warehouse. Produção: sem feature store → reimplementa em Python → resultado levemente diferente (timezone, arredondamento). Feature store (Feast, Tecton, Vertex): compute once, serve everywhere. Treino e serving usam mesmo pipeline. feature_store.get_online_features(['avg_purchase_30d'], entity_rows=[{'user_id': 123}]).",
      },
    ],
    Difícil: [
      {
        q: "O que é shadow deployment e como difere de canary release e A/B testing em ML?",
        o: [
          "Shadow: novo modelo recebe tráfego real mas não serve ao usuário (comparação silenciosa); Canary: portion pequena de usuários recebe novo modelo; A/B: split controlado para teste de hipótese estatístico",
          "São estratégias equivalentes de rollout; a escolha depende apenas do time de engenharia",
          "Shadow deployment não registra métricas; Canary usa feature flags; A/B usa ML para otimizar split",
          "A/B testing é para produto; Shadow e Canary são exclusivos para infraestrutura",
        ],
        c: 0,
        e: "Shadow: replica requisições para novo modelo em paralelo, compara predictions sem risco de usuário. Identifica bugs, diferenças de predictions, latência. Canary: 5% do tráfego para novo modelo com monitoramento intensivo. Rollback rápido se métricas pioram. A/B test: split por holdout, mede impacto em KPI de negócio (conversão, receita) com significância estatística. Interleaving: mais eficiente para ranqueamento (tanto modelo A quanto B servem para mesmo usuário).",
        x: "Novo modelo de recomendação: Shadow (1 semana) → validar latência p99, verificar que não crasha. Canary 5% → monitorar CTR, conversion rate vs controle. A/B formal 50/50 → 2 semanas para significância estatística (α=0.05, potência=0.8). Se lift positivo: rollout 100%. Netflix, Spotify: centenas de A/B tests simultâneos com mutual exclusion de experimentos.",
      },
    ],
  },
  "Pré-processamento de Dados": {
    Fácil: [
      {
        q: "Qual a diferença entre normalização (min-max scaling) e padronização (z-score standardization)?",
        o: [
          "Normalização escala para [0,1] e é afetada por outliers; padronização transforma para média 0, desvio 1 e é mais robusta; StandardScaler para algoritmos baseados em distância e gradiente",
          "São equivalentes — qualquer uma pode ser usada em qualquer algoritmo sem diferença",
          "Normalização é somente para dados categóricos; padronização para dados numéricos contínuos",
          "Padronização elimina outliers; normalização apenas reescala sem tratar valores extremos",
        ],
        c: 0,
        e: "Min-max: x' = (x - min)/(max - min) → [0,1]. Afetado por outliers (um valor extremo comprime todos os outros). Z-score: x' = (x - μ)/σ → média 0, dp 1. Mais robusto. RobustScaler: usa mediana e IQR, mais resistente a outliers extremos. Quando usar: SVM, KNN, Regressão, Redes Neurais (gradiente) precisam de escala. Árvores de decisão e Random Forest: invariantes à escala.",
        x: "Renda: [1000, 2000, 3000, 1000000]. Min-max: [0, 0.001, 0.002, 1.0] — todos comprimidos. Z-score: [-0.57, -0.57, -0.57, 1.71] — menos distorcido. RobustScaler: usa mediana=2000, IQR=1000 — (x-2000)/1000. Feature age em [18,90]: normalizar para [0,1]. KNN com age e renda sem scaler: renda domina completamente a distância.",
      },
    ],
    Médio: [
      {
        q: "O que é one-hot encoding e quando label encoding pode causar problemas em variáveis categóricas nominais?",
        o: [
          "One-hot cria coluna binária por categoria (sem ordem implícita); label encoding atribui inteiro por categoria e implica ordem/magnitude que modelos paramétricos interpretam incorretamente",
          "Label encoding cria mais features; one-hot é mais compacto e eficiente em memória",
          "São equivalentes para árvores de decisão mas diferentes apenas para redes neurais",
          "One-hot fica inviável com alta cardinalidade; label encoding é sempre preferível nesse caso",
        ],
        c: 0,
        e: "Label encoding: cor = {'azul':0, 'verde':1, 'vermelho':2}. Problema: modelo interpreta vermelho (2) como 'maior que' azul (0). Regressão linear/logística, SVM, KNN: afetados. One-hot: cria coluna is_azul, is_verde, is_vermelho — sem ordem implícita. Dummy variable trap: retirar uma coluna (k-1) em modelos com intercepto. Alta cardinalidade: target encoding, embedding.",
        x: "Cidade: São Paulo, Rio, Belo Horizonte. Label: SP=0, RJ=1, BH=2. Regressão linear: BH = 2×SP, o que não faz sentido. One-hot: is_SP, is_RJ, is_BH (dropar is_BH para evitar multicolinearidade). 1000 cidades: one-hot cria 999 colunas → target encoding ou embedding layer em deep learning.",
      },
    ],
    Difícil: [
      {
        q: "Quais estratégias existem para imputação de dados faltantes (missing values) e como o tipo de missingness (MCAR, MAR, MNAR) influencia a estratégia?",
        o: [
          "MCAR (totalmente aleatório): qualquer imputação; MAR (aleatório dado outras vars): imputação múltipla ou MICE; MNAR (não-aleatório): requer modelagem explícita do mecanismo de ausência ou coleta de dados",
          "Sempre deletar linhas com missing — não faz diferença o mecanismo de ausência",
          "One-hot encoding de missing resolve qualquer tipo de missingness sem viés",
          "MCAR e MAR são resolvidos com média; MNAR com mediana dos dados disponíveis",
        ],
        c: 0,
        e: "MCAR: P(missing) constante, independente de qualquer variável. Listwise deletion válida mas desperdiça dados. MAR: P(missing|outras_vars) — ex: renda falta mais para jovens. Imputação com outras variáveis como preditores (MICE/IterativeImputer) é válida. MNAR: P(missing|valor_próprio) — ex: pessoas com renda alta não informam. Imputação padrão gera viés. Necesita: survey redesign, modelo de seleção (Heckman), indicador binário de missingness como feature.",
        x: "Pressão arterial falta mais para pacientes saudáveis (não vão ao médico) = MNAR. Imputar com média subestima pressão média da população. Solução: adicionar feature is_pa_missing (captura padrão de ausência). MICE: itera, imputa cada feature usando as outras como preditores, repete até convergência. scikit-learn: IterativeImputer (experimental) ou MissForest (RF como imputer).",
      },
    ],
  },
  "Processamento de Linguagem Natural": {
    Fácil: [
      {
        q: "O que são word embeddings e qual problema eles resolvem em relação à representação one-hot?",
        o: [
          "Vetores densos em espaço contínuo que capturam semântica; one-hot: esparso, sem relação semântica entre palavras; embeddings: 'rei' - 'homem' + 'mulher' ≈ 'rainha'",
          "Compressão de one-hot usando PCA para reduzir dimensionalidade sem perda semântica",
          "Tabelas de hash que mapeiam palavras para IDs numéricos com colisão mínima",
          "Tokens BPE que subdividem palavras em subunidades morfológicas para vocabulários menores",
        ],
        c: 0,
        e: "One-hot: vocabulário de 50k palavras → vetores de 50k dimensões, todos zeros exceto um 1. Sem relação entre palavras semelhantes (cosseno entre qualquer par = 0). Word2Vec, GloVe, FastText: mapeiam palavra → vetor denso (300 dimensões), palavras similares têm vetores próximos. Treinados para prever contexto (CBOW) ou palavra central (Skip-gram).",
        x: "Word2Vec: 'paris' - 'france' + 'italy' ≈ 'rome' (analogias aritméticas no espaço vetorial). Cosseno('gato','felino') ≈ 0.85 (alta similaridade). Cosseno('gato','carro') ≈ 0.1. OOV (out of vocabulary): FastText usa n-gramas de caracteres → representa palavras novas. Contextualizados (BERT): mesmo token tem embedding diferente conforme contexto (banco da praça vs banco financeiro).",
      },
    ],
    Médio: [
      {
        q: "Como funciona o mecanismo de atenção (Attention) e por que é mais eficaz que RNNs para dependências de longo alcance?",
        o: [
          "Attention calcula peso de cada token em relação a todos os outros diretamente (O(n²)); RNN processa sequencialmente degradando gradiente em longas sequências; atenção acessa qualquer posição em 1 passo",
          "RNNs usam atenção internamente para resolver dependências longas com custo O(n)",
          "Atenção só funciona com textos curtos; RNN é mais eficaz para documentos longos",
          "Ambos têm mesma capacidade de longas dependências; atenção é mais rápida por paralelismo apenas",
        ],
        c: 0,
        e: "Attention: Query, Key, Value. Score = softmax(QK^T/√d_k)×V. Cada token atende a outros com pesos aprendidos. Long-range: 'O banco que fica na margem do rio transbordou' — 'banco' resolve referência em 1 hop. RNN: gradiente de posição 1 passa por M passos até posição M → vanishing gradient. Self-attention: paralelizável (vs RNN sequencial) → treino mais rápido em GPUs. Custo O(n²) em comprimento de sequência.",
        x: "Tradução: 'The cat sat on the mat, it was comfortable' — resolver 'it'. RNN LSTM: gradiente de 'cat' passou por 8 tokens, fraco. Transformer: atenção de 'it' para 'cat' com score alto (peso 0.92). Long document: Longformer usa atenção esparsa (local+global) para reduzir O(n²). Flash Attention: otimização GPU para O(n²) manejável.",
      },
    ],
    Difícil: [
      {
        q: "O que é transfer learning com BERT e como o fine-tuning de camadas superiores vs completo ('full fine-tuning') diferem?",
        o: [
          "BERT pré-treinado captura representações gerais; fine-tuning completo atualiza todos os pesos (alto custo, melhor performance); fine-tuning de camadas superiores prezerva representações gerais e adapta apenas as últimas camadas",
          "BERT nunca deve ter todos os pesos atualizados — apenas a camada de classificação final",
          "Fine-tuning de camadas superiores é exclusivo para classificação; camadas inferiores para geração",
          "Transfer learning com BERT só funciona para inglês; idiomas diferentes requerem treino do zero",
        ],
        c: 0,
        e: "BERT: pré-treinado com Masked LM + Next Sentence Prediction em 3.3B tokens. Camadas inferiores: representações sintáticas/morfológicas. Superiores: semânticas. Full fine-tuning: atualiza todos os 110M parâmetros com baixo LR (2-5e-5). Dataset pequeno: risk of catastrophic forgetting, preferir congelar camadas inferiores. LoRA: fine-tuning eficiente em parâmetros (apenas matrizes de baixo rank), reduz 100× os parâmetros treináveis.",
        x: "Classificação de sentimento em reviews médicas (dataset 10k). Full fine-tuning BERT: 92% F1. Freeze camadas 1-8, fine-tune 9-12: 89% F1, treina 3× mais rápido. LoRA rank=8: 91% F1, apenas 2% dos parâmetros treináveis. Dataset muito pequeno (<1k): congelar mais camadas, apenas classificador. mBERT/XLM-R: BERT multilíngue, fine-tune em português.",
      },
    ],
  },
  "Visão Computacional": {
    Fácil: [
      {
        q: "O que é uma Convolutional Neural Network (CNN) e qual a função das camadas convolucionais e de pooling?",
        o: [
          "CNN usa conv layers com filtros que detectam features locais (bordas, texturas) compartilhando pesos; pooling reduz dimensionalidade preservando features mais relevantes",
          "Rede que processa pixels em sequência como texto — cada pixel é um token de entrada",
          "Rede totalmente conectada com regularização específica para processamento de imagens",
          "Algoritmo que comprime imagens usando transformada de Fourier discreta para extração de features",
        ],
        c: 0,
        e: "Convolução: filtro (kernel) 3×3 desliza sobre a imagem calculando produto escalar — detecta padrões locais. Weight sharing: mesmo filtro aplicado em toda a imagem (translational invariance). Camadas iniciais: bordas e cantos. Camadas profundas: formas e partes de objetos. MaxPooling 2×2: reduz dimensão à metade tomando o máximo de cada janela — invariância a pequenas translações.",
        x: "Imagem 224×224×3. Conv 64 filtros 3×3 → 224×224×64. MaxPool 2×2 → 112×112×64. Conv 128×3×3 → 112×112×128. MaxPool → 56×56×128. Flatten + FC + Softmax. AlexNet (2012) provou eficácia de CNNs no ImageNet. ResNet-50: 50 camadas com skip connections para gradiente fluir. Transfer learning: usar ResNet pré-treinado como extrator de features.",
      },
    ],
    Médio: [
      {
        q: "Como funciona o algoritmo YOLO (You Only Look Once) e por que é mais rápido que abordagens de two-stage como R-CNN?",
        o: [
          "YOLO divide imagem em grid e prevê bounding boxes e classes em um único forward pass; two-stage extrai propostas de regiões depois classifica — mais lento mas mais preciso em objetos pequenos",
          "YOLO usa sliding window denso com CNN; R-CNN usa atenção para localizar objetos",
          "YOLO é mais lento que R-CNN mas mais preciso; a diferença é na métrica de avaliação usada",
          "YOLO processa cada região independentemente enquanto R-CNN faz uma única passagem",
        ],
        c: 0,
        e: "R-CNN: 1) Selective Search gera ~2k propostas de região. 2) CNN classifica cada proposta. ~47s por imagem (treinamento). Two-stage, alta precisão. YOLO: divide imagem em S×S grid. Cada célula prevê B bounding boxes (x,y,w,h,confidence) + C class probabilities. Uma única passagem pela rede. YOLOv8: ~2ms por imagem em GPU, suficiente para vídeo em tempo real. Trade-off: precisão ligeiramente menor em objetos muito pequenos.",
        x: "Câmera de segurança 30fps: R-CNN = impossível (~47s/frame). YOLOv8 = detecta em 2ms, 500fps. mAP@50 em COCO: YOLOv8x = 53.9, Faster-RCNN = 42. NMS (Non-Maximum Suppression): remove bounding boxes sobrepostas, guarda a de maior confiança. Anchor boxes: prior shapes para objetos de diferentes aspectos (carros largos, pessoas altas).",
      },
    ],
    Difícil: [
      {
        q: "O que são Generative Adversarial Networks (GANs) e qual o problema de mode collapse?",
        o: [
          "GAN: Generator tenta enganar o Discriminator que distingue real de falso; mode collapse: generator aprende produzir poucas variações que enganam o discriminator, ignorando diversidade dos dados reais",
          "GAN é rede que gera dados via difusão progressiva; mode collapse é instabilidade de gradiente",
          "Generator e Discriminator são treinados em datasets diferentes sem interação direta",
          "Mode collapse refere-se ao colapso dos pesos do discriminator para zero durante o treino",
        ],
        c: 0,
        e: "GAN: minimax game. G minimiza, D maximiza log D(x) + log(1-D(G(z))). Nash equilibrium: G gera distribuição idêntica à real. Mode collapse: G descobre subconjunto de outputs que consistentemente engana D (ex: sempre gera mesmo dígito '7'). D evolui para rejeitar '7' → G migra para '3' → ciclagem. Soluções: Wasserstein GAN (WGAN), minibatch discrimination, progressive training (ProGAN), diferentes arquiteturas (StyleGAN).",
        x: "GAN de dígitos MNIST: mode collapse = sempre gera '4'. WGAN usa Wasserstein distance em vez de JS divergence — gradientes mais estáveis, mode collapse menos frequente. StyleGAN2 (NVIDIA): rostos humanos foto-realistas (este-rosto-não-existe.com). Conditional GAN (cGAN): gera imagem condicionada em label (gerar 'gato' especificamente). Discriminator saturação = gradiente zero para G.",
      },
    ],
  },
};

function mergeMLBankRounds(
  base: Record<string, Record<UserLevel, SeedCard[]>>,
  ...extras: Record<string, Record<UserLevel, SeedCard[]>>[]
): Record<string, Record<UserLevel, SeedCard[]>> {
  const result: Record<string, Record<UserLevel, SeedCard[]>> = {};
  for (const cat of Object.keys(base)) {
    result[cat] = {} as Record<UserLevel, SeedCard[]>;
    for (const level of ["Fácil", "Médio", "Difícil"] as UserLevel[]) {
      const baseCards = base[cat]?.[level] ?? [];
      const seen = new Set(baseCards.map((c) => c.q.trim().toLowerCase()));
      const merged = [...baseCards];
      for (const extra of extras) {
        for (const card of extra[cat]?.[level] ?? []) {
          if (!seen.has(card.q.trim().toLowerCase())) {
            seen.add(card.q.trim().toLowerCase());
            merged.push(card);
          }
        }
      }
      result[cat][level] = merged;
    }
  }
  return result;
}

export const machineLearningBank = mergeMLBankRounds(
  machineLearningBankBase,
  machineLearningRound1Extras,
);
