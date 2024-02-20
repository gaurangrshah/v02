import { redirect } from 'next/navigation';

import { verifySubscriberToken } from '@/lib/actions/verify-subscriber-token';

export type VerificationPageProps = {
  params: {
    token: string;
    email: string;
  }
}

export default async function VerificationPage({ params }: VerificationPageProps) {
  if (!params.email || !params.token) {
    return <div>Invalid token or email</div>
  }

  const email = decodeURIComponent(params.email)
  const token = decodeURIComponent(params.token)

  const result = await verifySubscriberToken({ email, token })

  if (!result?.success) {
    return result?.message ? redirect(`/?error=${result.message}`) : <div>Could not verify your email</div>
  }

  return redirect(`/?success="The email: ${email} has been verified and added to the mailing list.`)
}
