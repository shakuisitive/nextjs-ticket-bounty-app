import { inngest } from "@/lib/inngest";
import { generateEmailVerificationCode } from "../utils/generate-email-verification-code";
import { prisma } from "@/lib/prisma";
import { sendEmailVerification } from "../emails/send-email-verification";

export type EmailVerificationEventArgs = {
    data: {
        userId: string
    }
}

export const emailVerificationEvent = inngest.createFunction(
    {id: "email-verification"},
    {event: "app/auth.sign-up"},
    async function ({event}) {
        const {userId} = event.data

        const user = await prisma.user.findUniqueOrThrow({where: {id: userId}})

        const verificationCode = await generateEmailVerificationCode(
            user.id,
            user.email
          );
      
          const result = await sendEmailVerification(user.username, user.email, verificationCode);

            if(result?.error){
                throw new Error(`Something went wrong: ${result.error}`)
            }

          return {
            event, body: result
          }
    }
)