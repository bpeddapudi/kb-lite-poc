import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Check, ChevronDown, Palette } from 'lucide-react'

import { useTheme } from '../../context/useTheme.js'
import { Button } from '../ui/button.jsx'
import { cn } from '../../lib/utils.js'

const LABELS = {
  light: 'Light',
  dark: 'Dark',
  midnight: 'Midnight',
  blueprint: 'Blueprint',
}

export function ThemeDropdown() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="sm" className="min-w-[10rem] justify-between gap-2">
          <span className="flex items-center gap-2">
            <Palette className="size-4 opacity-70" aria-hidden />
            <span>{LABELS[theme]}</span>
          </span>
          <ChevronDown className="size-4 opacity-60" aria-hidden />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[10rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
          sideOffset={6}
          align="end"
        >
          {themes.map((id) => (
            <DropdownMenu.Item
              key={id}
              className={cn(
                'relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none',
                'focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
              )}
              onSelect={() => setTheme(id)}
            >
              <span className="flex flex-1 items-center gap-2">{LABELS[id]}</span>
              {theme === id ? <Check className="size-4" aria-hidden /> : null}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
