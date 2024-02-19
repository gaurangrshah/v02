import { ComponentType } from 'react';

import { ButtonProps } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type MenuAction = {
  href?: string
} | {
  onClick?: () => void
}

type MenuItem = {
  label: string
} & MenuAction

export type MenubarProps = {
  items: MenuItem[] | ComponentType<ButtonProps>[]
}

const styles = [
  'border rounded-s-lg',
  'border rounded-e-lg',
]

const defaultStyle = "px-4 py-2 text-sm font-medium text-foreground bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"

export function Menubar({ items }: MenubarProps) {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">

      {items.map((item, index) => {
        const firstIndex = index === 0;
        const lastIndex = index === items.length - 1;
        if ('href' in item) {
          return (
            <a key={index} href={item.href} className={cn(defaultStyle, firstIndex && styles[index], lastIndex && styles[items.length - 1])}>
              {item?.label}
            </a>
          )
        }
        if ('onClick' in item) {
          return (
            <button key={index} onClick={item.onClick} className={cn(defaultStyle, firstIndex && styles[index], lastIndex && styles[1])}>
              {item.label}
            </button>
          )
        }
      })}
    </div>
  )
}
export function Menubar2({ items }: MenubarProps) {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">

      {items.map((item, index) => {
        const firstIndex = index === 0;
        const lastIndex = index === items.length - 1;
        const Component = item as ComponentType<ButtonProps>
        return (
          <Component key={index} className={cn(defaultStyle, firstIndex && styles[index], lastIndex && styles[1], "px-0 py-0")} size="icon" />
        )
      })}
    </div>
  )
}
