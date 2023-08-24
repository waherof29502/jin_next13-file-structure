import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function combine(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function isMacOs() {
  if (typeof window === 'undefined') return false;

  return window.navigator.userAgent.includes('Mac');
}
