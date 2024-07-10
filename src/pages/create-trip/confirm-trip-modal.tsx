import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void;
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({ closeConfirmTripModal, createTrip }: ConfirmTripModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[540px] bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
                        <button type="button" onClick={closeConfirmTripModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Para concluir a criação da viagem para{" "}
                        <span className="text-zinc-100 font-semibold">Florianópolis, Brasil</span> nas datas de{" "}
                        <span className="text-zinc-100 font-semibold">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
                    </p>
                </div>

                <form onSubmit={createTrip} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User className="size-5 text-zinc-400" />
                        <input
                            name="name"
                            className="text-zinc-400 text-base bg-transparent placeholder-zinc-400 outline-none flex-1"
                            placeholder="Seu nome completo"
                        />
                    </div>

                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Mail className="size-5 text-zinc-400" />
                        <input
                            type="email"
                            name="email"
                            className="text-zinc-400 text-base bg-transparent placeholder-zinc-400 outline-none flex-1"
                            placeholder="Seu e-mail pessoal"
                        />
                    </div>
                    <button type="submit" className="w-full flex justify-center items-center bg-lime-300 px-5 h-11 text-lime-950 font-medium gap-2 rounded-lg hover:bg-lime-400">
                        Confirmar criação da viagem
                    </button>
                </form>

            </div>
        </div>
    );
}