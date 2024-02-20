'use server';

import SubscriberVerificationEmail
  from '@/emails/subscriber-verification-email';
import {
  emailConfig,
  resend,
} from '@/lib/email/index';

import { emailSchema } from '../email/utils';

export async function sendEmail(prevState: any, formData: FormData) {
  try {
    const result = emailSchema.safeParse({
      name: 'subscriber' || formData.get('name'),
      email: formData.get('email'),
    });

    if (result.success) {
      // generate a secure token to be used to verify the user's email -- token should be verifiable
      // and unique to the user
      const token =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const data = await resend.emails.send({
        to: [String(formData.get('email'))],
        react: SubscriberVerificationEmail({
          firstName: String('subscriber' || formData.get('name')),
        }),
        ...emailConfig,
      });

      return { data, message: 'Email sent successfully' };
    }

    if (!result.success) {
      console.log(result.error.format());
      return {
        message: result.error.format(),
      };
    }
  } catch (error) {
    console.log('error', error);
  }
}
