"use client";

import {
  type ComponentProps,
  useState,
} from 'react';
import {
  useFormState,
  useFormStatus,
} from 'react-dom';

import { z } from 'zod';

import {
  Mail,
  Send,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { sendEmail } from '@/lib/actions/resend';
import { emailSchema } from '@/lib/email/utils';
import { cn } from '@/lib/utils';

import { ShinyInput } from './shiny-input';

type FormInput = z.infer<typeof emailSchema>;
type Errors = { [K in keyof FormInput]: string[] };

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="peer absolute top-[0.1rem] end-0.5  font-medium rounded-md bg-black/00 hover:bg-gray-800 scale-75 border-slate-700 border-2 text-slate-600 group-focus-within:text-slate-300" size="icon">
      <Send className="text-current" />
    </Button>
  )
}

const fields: ComponentProps<'input'>[] = [
  {
    type: "text",
    placeholder: "Enter Your Name",
    name: "name",
    autoComplete: "off",
    defaultValue: ""
  },
  {
    type: "email",
    placeholder: "you@youremail.com",
    name: "email",
    autoComplete: "off",
    defaultValue: "",
    required: true,
  },
]

export function NewsletterForm() {
  const [state, formAction] = useFormState(sendEmail, null)
  const [show, setShow] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className='relative flex items-center space-y-2'>
      <Button onClick={() => setShow(prev => !prev)} className={cn(show ? "absolute z-10 mt-2 bg-gray-800/70 border-none" : "z-0 relative", state?.data && "hidden", "scale-75 bg-transparent border-2 font-medium rounded-md hover:bg-gray-800 border-slate-700 text-slate-600 hover:text-slate-400 transition-colors")} size="icon">
        {show ? <X className="text-current" /> : <Mail className="text-current" />}
      </Button>
      <div className={cn("relative text-xs font-base text-slate-300 rounded-md p-4 -ml-4 max-w-md group transition-transform duration-300 ease-in-out w-full pr-20", show ? "scale-x-100" : "scale-x-0")} role="group"
        style={{ transformOrigin: "0% 0%" }}
      >
        {state?.data ? (
          <div className={cn('max-w-md relative bg-neutral-950/50 rounded-md px-3 py-4 scale-x-0', state?.data && "scale-x-100")}>
            Form submitted thank you.
          </div>
        ) : (
          <>
            <p className={cn('peer transition-transform translate-y-6 absolute group-focus-within:-translate-y-5 delay-100 duration-400 ease-in-out ml-1', state?.message && "hidden")}>Sign up for updates, news, and free resources!</p>
            <form action={formAction}>
              {state?.message && (
                <p className="text-xs bg-neutral-50 p-2">
                  {String(JSON.stringify(state?.message))}
                </p>
              )}
              {fields.map((field, i) => (
                <ShinyInput field={field} key={i} className={cn(i === currentStep ? "visible scale-x-100" : "hidden scale-x-0")}>
                  {currentStep === i && currentStep === fields.length - 1 ?
                    <SubmitButton /> :
                    <Button className={cn(i === currentStep ? "visible scale-x-100" : "hidden scale-x-0", "peer absolute top-[0.1rem] end-0.5  font-medium rounded-md bg-black/00 hover:bg-gray-800 scale-75 border-slate-700 border-2 text-slate-600 group-focus-within:text-slate-300")} size="icon" onClick={() => setCurrentStep(prev => prev + 1)}>{'>'}</Button>}
                </ShinyInput>
              ))}
            </form >
          </>
        )}
      </div>
    </div>
  )
}
