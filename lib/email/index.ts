import { Resend } from 'resend';

import { env } from '@/lib/env.mjs';

export const resend = new Resend(env.RESEND_API_KEY);

export const emailConfig = {
  from: 'GShah Dev <connect@gshahdev.com>',
  subject: 'I got your message!',
  text: "I'm so glad you reached out, we'll be in touch shortly.",
};
