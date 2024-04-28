import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conditionally join classNames together
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(...inputs));
