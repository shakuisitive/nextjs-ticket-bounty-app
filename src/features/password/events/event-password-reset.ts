import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { sendEmailPasswordReset } from "../emails/send-email-password-reset";
import { generatePasswordResetLink } from "../utils/generate-password-reset-link";

export type PasswordResetEventArgs = {
    data: {
        userId: string
    }
}

export const passwordResetEvent = inngest.createFunction(
    {id: "password-reset"},
    {event: "app/password.password-reset"},
    async function({event}){
        const {userId} = event.data;

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            }
        });

        const passwordResetLink = await generatePasswordResetLink(user.id);
        
        const result = await sendEmailPasswordReset(user.username, user.email, passwordResetLink)

        if(result?.error) {
            throw new Error(`Something went wrong: ${result.error}`)
        }

        return {
            event,
            body: result
        }
    }
)