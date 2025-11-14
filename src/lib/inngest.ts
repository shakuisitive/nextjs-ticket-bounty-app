import { EventSchemas, Inngest } from "inngest";
import { PasswordResetEventArgs } from '@/features/password/events/event-password-reset';
import { EmailVerificationEventArgs } from "@/features/auth/events/event-email-verification";

type Events = {
    "app/password.password-reset": PasswordResetEventArgs,
    "app/auth.sign-up": EmailVerificationEventArgs
}

export const inngest = new Inngest({id: "the-ticket-bounty-next", schemas: new EventSchemas().fromRecord<Events>()})