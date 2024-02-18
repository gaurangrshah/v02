'use server';

import { EmailTemplate } from '@/components/emails/FirstEmail';

import { emailConfig, resend } from '@/lib/email/index';

import { emailSchema } from '../email/utils';

export async function sendEmail(state: any, formData: FormData) {
  try {
    const result = emailSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
    });

    if (result.success) {
      const data = await resend.emails.send({
        to: [String(formData.get('email'))],
        react: EmailTemplate({ firstName: String(formData.get('name')) }),
        ...emailConfig,
      });
      return { data };
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
