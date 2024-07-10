import { ComponentProps } from "react";
import { tv, VariantProps } from 'tailwind-variants';

const inputVariants = tv({
  base: 'bg-transparent outline-none placeholder-zinc-400',
    variants: {
        textSize: {
            base: 'text-base',
            lg: 'text-lg',
        },
        textColor: { 
            zinc400: 'text-zinc-400',
            zinc200: 'text-zinc-200',
        },
        flex: {
            none: '',
            flex1: 'flex-1',
        },
        scheme: {
            light: '',
            dark: '[color-scheme: dark]',
        },
    },
    defaultVariants: {
        textSize: 'base',
        textColor: 'zinc400', 
        flex: 'none',
        scheme: 'light',
    },
});

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {
}

export function Input({ textColor, textSize, flex, scheme, ...props }: InputProps) {
  return (
    <input {...props} className={inputVariants({ textColor, textSize, flex, scheme })} />
  );
}
