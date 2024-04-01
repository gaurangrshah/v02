import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button, type ButtonProps } from '../../ui/button';
import { BannerOptions } from '../options';
import { background } from '@gshah.dev/transparency/dist/utils/styles';

import { cn } from '@/lib/utils';

/**
 * This button renders with a popup trigger wrapped around it.
 * It is used to allow the default popover behavior from shadcn-ui
 * This will open an options dialog allowing us to granularly control user preferences
 *
 * @type {React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>, {asChild?: Boolean}}
 *
 * @export
 * @param {ButtonProps} {...HTMLButtonProps, variant, asChild }
 * @return {*} {React.ReactNode}
 */
export function ShowMeButton({ ...rest }: ButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...rest} onClick={console.log} />
      </PopoverTrigger>
      <PopoverContent
        align='end'
        side='top'
        className={cn('relative, w-[500px] ', background)}
      >
        <div className='absolute -left-[2.2rem] top-[3.5rem] z-0 flex rotate-[270deg] gap-2 pt-3 opacity-90 drop-shadow-md'>
          <p>Transparency</p>
        </div>
        <BannerOptions />
      </PopoverContent>
    </Popover>
  );
}
