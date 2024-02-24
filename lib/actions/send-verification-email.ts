'use server';

import { LibsqlError } from '@libsql/client';

import { insertSubscriber } from '../db/services/subscribers';
import { sendSubscriberVerificationEmail } from '../email/services/send-subscriber-verification-email';
import { emailSchema } from '../email/utils';
import { validateSchema } from '../utils';

export async function sendVerificationEmail(
  prevState: any,
  formData: FormData
) {
  const result = validateSchema(formData, emailSchema);
  if (result && !result.success) {
    return {
      success: false,
      message: result.error,
    };
  }

  try {
    const email = String(formData.get('email'));
    const name = String(formData.get('name'));

    // send sub to drizzle
    const subscriber = await insertSubscriber(email);

    // generate token + send verification email
    const data = sendSubscriberVerificationEmail({
      name,
      email,
      token: subscriber.verificationToken,
    });

    return {
      data,
      success: true,
      message: 'Please check your inbox on instructions to verify your email.',
    };
  } catch (error) {
    if (error instanceof LibsqlError) {
      const uniqueConstraint =
        error.code === 'SQLITE_CONSTRAINT_UNIQUE'
          ? 'Email already subscribed'
          : null;
      return {
        success: false,
        message: uniqueConstraint ?? 'Server Error',
      };
    }

    return {
      success: false,
      message: 'Error adding your email to the mailing list. Please try again.',
    };
  }
}
