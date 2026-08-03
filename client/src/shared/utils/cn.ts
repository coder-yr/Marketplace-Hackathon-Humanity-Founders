import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes intelligently using clsx + tailwind-merge.
 * Resolves conflicts (e.g. p-4 + p-2 → p-2) and handles conditionals.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
