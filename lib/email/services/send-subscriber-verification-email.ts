import SubscriberVerificationEmail from '@/emails/subscriber-verification-email';
import { emailConfig } from '@/lib/email/index';

import { resend } from '../';

export async function sendSubscriberVerificationEmail({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}) {
  const tokenCallback =
    process.env.NODE_ENV === 'development'
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${token}/${email}`
      : `${`https://gshahdev.com`}/verify/${token}/${email}`;
  try {
    const data = await resend.emails.send({
      to: [email],
      react: SubscriberVerificationEmail({
        name: name,
        tokenCallback,
      }),
      ...emailConfig,
    });

    if (!data) {
      throw new Error('Error sending verification email');
    }
  } catch (error) {
    console.error('Error sending verification email', error);
    throw new Error('Error sending verification email');
  }
}
