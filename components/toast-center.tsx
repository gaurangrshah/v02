"use client";

import {
  useEffect,
  useState,
} from 'react';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { toast } from 'sonner';

import { useMounted } from '@/hooks/use-mounted';

type ToastMessage = {
  type: 'success' | 'error'
  description: string | null;
} | null

export default function ToastCenter() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const mounted = useMounted();
  const [message, setMessage] = useState<ToastMessage>(null);

  const success = searchParams.get('success') || null;
  const error = searchParams.get('error') || null;

  useEffect(() => {
    if (!success && !error) return;
    setMessage({
      type: success ? 'success' : 'error',
      description: success || error
    })
  }, [success, error])

  useEffect(() => {
    if (message) {
      toast[message.type](message.type, {
        description: message.description
      })

      setTimeout(() => {
        setMessage(null)
        router.replace('/');
      }, 300)
    }
  }, [message, searchParams, router])

  if (!mounted || !message) return null;

}
