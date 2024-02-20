'use server';

import { nanoid } from 'nanoid';

import SubscriberVerificationEmail from '@/emails/subscriber-verification-email';
import { emailConfig, resend } from '@/lib/email/index';

import { db } from '../db';
import { subscribers } from '../db/schema/auth';
import { emailSchema } from '../email/utils';

export async function sendEmail(prevState: any, formData: FormData) {
  try {
    const result = emailSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
    });

    if (result.success) {
      const email = String(formData.get('email'));
      const name = String(formData.get('name'));

      const token =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const subscriber = await db.insert(subscribers).values({
        id: nanoid(),
        email,
        verified: false,
        verificationToken: token,
        // add createdAt timestamp in seconds
      });

      if (!subscriber) {
        throw new Error('Error creating subscription');
      }

      const data = await resend.emails.send({
        to: [email],
        react: SubscriberVerificationEmail({
          name: name,
          tokenCallback:
            process.env.NODE_ENV === 'development'
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${token}/${email}`
              : `${`https://gshahdev.com`}/verify/${token}/${email}`,
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
