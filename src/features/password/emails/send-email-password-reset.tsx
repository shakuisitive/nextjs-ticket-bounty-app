import { resend } from "@/lib/resend"
import { htmlTemplate } from "./html-template";

export const sendEmailPasswordReset = async (username: string, email: string, passwordResetLink: string) => {
    const html = htmlTemplate(username, passwordResetLink)    
    
    try {
        await resend.emails.send({
            from: 'Shakir <shakir@redstonelife.com>',
            to: [email],
            subject: 'Password Reset from TicketBounty App',
            html,
            replyTo: 'shakirkhan72727@gmail.com',
            // make below work as that should be standard
            // react: <EmailPasswordReset toName={username} url={passwordResetLink} /> ,
          });
    } catch (error) {
        const message = "Something went wrong with sending the email";
        console.log(message)
        return {
            message,
            error
        }        
    }
}