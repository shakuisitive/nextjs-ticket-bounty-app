import { emailVerification } from "@/emails/auth/email-verification";
import { resend } from "@/lib/resend";

export const sendEmailVerification = async (
  username: string,
  email: string,
  verificationCode: string
) => {
  const html = emailVerification(username, verificationCode);

  try {
    await resend.emails.send({
      from: "Shakir <shakir@redstonelife.com>",
      to: [email],
      subject: "Email Verification from TicketBounty App",
      html,
      replyTo: "shakirkhan72727@gmail.com",
    });
  } catch (error) {
    const message = "Something went wrong with sending the email";
    console.log(message);
    return {
      message,
      error,
    };
  }
};
