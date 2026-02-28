import dotenv from "dotenv";

import { prisma } from "../src/prisma.js";

dotenv.config({
  path: process.cwd().endsWith("server") ? ".env" : "server/.env",
});

const CONFIRM_VALUE = "YES_DELETE_ALL_USERS";

async function main() {
  const [usersCount, attemptsCount, customCardsCount, rewardsCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.sessionAttempt.count(),
      prisma.customFlashcard.count(),
      prisma.userRewardProgress.count(),
    ]);

  console.log("=== RESET GLOBAL DE PROGRESSO (DRY-RUN) ===");
  console.log(`Users: ${usersCount}`);
  console.log(`SessionAttempt: ${attemptsCount}`);
  console.log(`CustomFlashcard: ${customCardsCount}`);
  console.log(`UserRewardProgress: ${rewardsCount}`);

  if (process.env.CONFIRM_RESET_ALL_USERS !== CONFIRM_VALUE) {
    console.log("");
    console.log("Nenhuma limpeza foi executada.");
    console.log(
      `Para executar de verdade, rode: CONFIRM_RESET_ALL_USERS=${CONFIRM_VALUE} npm run users:reset-all`,
    );
    return;
  }

  const [deletedAttempts, deletedCustomCards, deletedRewards, updatedUsers] =
    await prisma.$transaction([
      prisma.sessionAttempt.deleteMany({}),
      prisma.customFlashcard.deleteMany({}),
      prisma.userRewardProgress.deleteMany({}),
      prisma.user.updateMany({
        data: {
          totalPoints: 0,
          streakDays: 0,
        },
      }),
    ]);

  console.log("");
  console.log("=== RESET GLOBAL DE PROGRESSO (EXECUTADO) ===");
  console.log(`SessionAttempt removidos: ${deletedAttempts.count}`);
  console.log(`CustomFlashcard removidos: ${deletedCustomCards.count}`);
  console.log(`UserRewardProgress removidos: ${deletedRewards.count}`);
  console.log(`Users resetados (sem excluir conta): ${updatedUsers.count}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
