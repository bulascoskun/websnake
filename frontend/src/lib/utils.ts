import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColors = (string: string) => {
  if (!string) return;

  const arr: any = {
    failed: 'bg-red-500',
    completed: 'bg-green-600',
    processing: 'bg-orange-400',
  };

  return arr[string];
};
