import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import numeral from 'numeral';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkEmail(email) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}

export function currencyFormat(num) {
  return `${numeral(num).format('0,0')} VND`;
}
