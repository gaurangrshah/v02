'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '../db';
import { subscribers } from '../db/schema/auth';

/**
 * Verifies the subscriber's token.
 * This function checks if the provided email and token match a subscriber in the database.
 * If a match is found, it further checks if the token is still valid (not expired).
 * On successful verification, it updates the subscriber's status to verified.
 *
 * @async
 * @function verifySubscriberToken
 */
export async function verifySubscriberToken({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  try {
    const subscriber = await db
      .select()
      .from(subscribers)
      .where(
        and(
          eq(subscribers.verificationToken, token),
          eq(subscribers.email, email)
        )
      );

    if (!subscriber[0]) {
      return { error: true, message: 'Invalid token or email' };
    }

    if (subscriber[0].email.toLowerCase() !== email) {
      return { error: true, message: 'Invalid token or email -2' };
    }

    // if (subscriber[0].verified) {
    //   return { message: 'Email already verified' };
    // }

    const currentTime = new Date();
    const subscriberCreatedAt = new Date(
      Number(subscriber[0].createdAt) * 1000
    );
    const hoursDifference =
      // 36e5 = 3600000 = 1 hour in ms
      (currentTime.getTime() - subscriberCreatedAt.getTime()) / 36e5;

    if (hoursDifference > 24) {
      return { error: true, message: 'Token expired' };
    }

    await db
      .update(subscribers)
      .set({ verified: true })
      .where(
        and(
          eq(subscribers.verificationToken, token),
          eq(subscribers.email, email)
        )
      )
      .execute();

    return { success: true, message: 'Email verified successfully!' };
  } catch (error) {
    console.error(error);
    return { error: true, message: (error as Error).message };
  }
}
