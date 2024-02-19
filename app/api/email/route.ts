import { NextResponse } from 'next/server';

import { EmailTemplate } from '@/components/emails/FirstEmail';

import { emailConfig, resend } from '@/lib/email/index';
import { emailSchema } from '@/lib/email/utils';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = emailSchema.parse(body);
  try {
    const data = await resend.emails.send({
      to: [email],
      react: EmailTemplate({ firstName: name ?? '' }),
      ...emailConfig,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
