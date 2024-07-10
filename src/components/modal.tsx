import { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const modalVariants = tv({ 

    variants: { 
        variant: {
            primary: 'w-[540px] bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-5', 
            secondary: 'w-[640px] bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-5',
        },
    },

    defaultVariants: {
        variant: 'primary',
    }
})


interface ModalProps extends VariantProps<typeof modalVariants>{
    children: ReactNode;
}

export function Modal ({children, variant}: ModalProps){
    return (
        <div className={modalVariants({variant})} >
            {children}
        </div>
    )
}

