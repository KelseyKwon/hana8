import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// clsx + twMerge -> cn이라는 함수로 쓸 것이다!
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
