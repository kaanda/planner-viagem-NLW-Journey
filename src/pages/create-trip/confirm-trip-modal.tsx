import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void;
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({ closeConfirmTripModal, createTrip }: ConfirmTripModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <Modal variant="primary">
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
                        <Input 
                            name="name" 
                            placeholder="Seu nome completo" 
                            textSize="base"
                            textColor="zinc400"
                            flex="flex1"
                        />
                    </div>

                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Mail className="size-5 text-zinc-400" />
                        <Input 
                            type="email" 
                            name="email" 
                            placeholder="Seu e-mail pessoal" 
                            textSize="base"
                            textColor="zinc400"
                            flex="flex1"
                        />
                    </div>
                    <Button type="submit" variant="primary" size="full">
                        Confirmar criação da viagem
                    </Button>
                </form>

            </Modal>
        </div>
    );
}