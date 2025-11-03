import { passwordResetPath } from "@/paths";
import { generateRandomToken, hashToken } from "@/utils/crypto";
import { getBaseUrl } from "@/utils/url";
import { prisma } from "@/lib/prisma";

const PASSWORD_RESET_TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 2;

export const generatePasswordResetLink = async (userId: string) => {
  const tokenId = generateRandomToken();
  const tokenHash = hashToken(tokenId);

  const pageUrl = getBaseUrl() + passwordResetPath();
  const passwordResetLink = `${pageUrl}/${tokenHash}`;

  prisma.passwordResetToken.create({
    data: {
      tokenHash,
      expiresAt: new Date(Date.now() + PASSWORD_RESET_TOKEN_LIFETIME_MS),
      userId,
    },
  });

  return passwordResetLink;
};
