"use client";

import {
  useFormState,
  useFormStatus,
} from 'react-dom';

import { z } from 'zod';

import { Button } from '@/components/ui/button';

import { sendEmail } from '@/lib/actions/resend';
import { emailSchema } from '@/lib/email/utils';

import { Input } from './ui/input';

type FormInput = z.infer<typeof emailSchema>;
type Errors = { [K in keyof FormInput]: string[] };

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>Submit</Button>
  )
}


export default function Resend() {

  const [state, formAction] = useFormState(sendEmail, null)

  return (
    <div className="p-4 md:p-0">
      <div>
        <h1 className="text-2xl font-bold my-4">Send Email with Resend</h1>

      </div>
      {state?.data ? (
        <>
          Form submitted thank you.
        </>
      ) : (
        <form action={formAction} className="space-y-3 pt-4 border-t mt-4">
          {state?.message && (
            <p className="bg-neutral-50 p-3">{String(state?.message)}</p>
          )}
          <div>
            <label className="text-neutral-700 text-sm">Name</label>
            <Input
              type="text"
              placeholder="Username"
              name="name"
              className={'w-full px-3 py-2 text-sm rounded-md border focus:outline-neutral-700 placeholder:text-gray-600'}
            />
          </div>
          <div>
            <label className="text-muted-foreground">Email</label>
            <Input
              type="email"
              placeholder="you@youremail.com"
              name="email"
              className={'w-full px-3 py-2 text-sm rounded-md border focus:outline-neutral-700 placeholder:text-gray-600'}
            />
          </div>
          <SubmitButton />
        </form>
      )
      }
    </div>
  );
}
