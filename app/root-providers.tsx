import { ModeToggle } from '@/components/ui/ThemeToggle';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-10 right-20">
        <ModeToggle />
      </div>
      {children}
    </>
  )
}
