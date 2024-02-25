"use client";

import {
  type ComponentProps,
  createRef,
  useEffect,
} from 'react';
import {
  useFormState,
  useFormStatus,
} from 'react-dom';

import {
  Mail,
  X,
} from 'lucide-react';

import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useFormStateResponse } from '@/hooks/use-form-state-response';

import { sendVerificationEmail } from '@/lib/actions/send-verification-email';
import { cn } from '@/lib/utils';

import { ShinyInput } from './shiny-input';

export type Fields = ComponentProps<'input'>[]

const fields: Fields = [
  {
    type: "text",
    placeholder: "Name",
    name: "name",
    autoComplete: "off",
    defaultValue: "",
    required: true
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

function PopoverCloseButton({ ...props }: { [key: string]: any }) {
  return (
    <Button
      size="icon"
      className="bg-background scale-75 text-foreground/40 focus-visible:text-white/60 hover:bg-destructive/60 hover:text-white/60 hover:shadow-md"
      {...props}
    >
      <X />
    </Button>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="sm"
      disabled={pending}
      aria-disabled={pending}
      className={pending ? "bg-transparent pointer-events-none" : "pointer-events-auto bg-emerald-600/10 hover:bg-emerald-600/40 focus-visible:bg-emerald-600/20 focus-visible:ring-accent"}
    >
      {pending ? <Loading className="scale-90" /> : "Subscribe"}
    </Button>
  )
}

function FormMessage({ hasError, message }: { hasError: boolean, message: string }) {
  return (
    <div
      className={cn(hasError ? "scale-y-100 visible opacity-100 my-4" : "scale-y-0 hidden opacity-0", "transition-all ease-in-out text-sm p-2 bg-gray-950/40 rounded-md text-gray-400 flex gap-4")}
    >
      {message}
    </div>
  )
}

export function NewsletterForm() {
  const [state, sendVerificationEmailAction] = useFormState(sendVerificationEmail, null);
  const { success, message, field } = useFormStateResponse(state);

  const formRef = createRef<HTMLFormElement>();

  useEffect(() => {
    if (state?.success) {
      console.log('resetting form')
      formRef.current?.reset();
    }
  }, [state?.success, formRef]);

  // const translateX = `transition-trandsform -translate-y-12 ease-out`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="text-accent hover:border-2 hover:border-accent/80 hover:shadow-md focus-visible:text-accent/90 scale-90 hover:scale-105 transition-all duration-200"
        >
          <Mail />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align="center"
        alignOffset={10}
        className={cn("bg-muted/30 backdrop-blur-2xl border-emerald-900/60")}
      >
        <div className="w-full mb-3 flex flex-col ">
          <div className='flex justify-between'>
            <p className="text-lg font-semibold pt-1 text-foreground/80">The Tipline</p>
            <PopoverClose asChild >
              <PopoverCloseButton />
            </PopoverClose>
          </div>
          <p className='text-xs text-foreground'>For the latest tips, tools, and resources.</p>
        </div>
        <div className="relative">
          <form
            action={sendVerificationEmailAction}
            className="flex flex-col gap-2"
            ref={formRef}
          >
            {fields.map((field) => {
              const hasError = !success && message && field === field.name;
              return (
                <div key={field.name} className="relative group">
                  <ShinyInput
                    className="text-left"
                    key={field.name}
                    field={field}
                    label={{
                      text: field.name,
                      className: cn("", 'capitalize translate-y-1 text-xs text-accent delay-200 placeholder:text-xs not-sr-only')
                    }} />
                  <div
                    className={cn(hasError ? "scale-y-100" : "scale-y-0", "transition-transform ease-in-out")}
                  >
                    {hasError ? message : null}
                  </div>
                </div>
              )
            })}

            <div className={cn(!field && !!message ? "my-0" : "-my-2")}>
              <FormMessage hasError={!field && !!message} message={message} />
            </div>

            <SubmitButton />
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
