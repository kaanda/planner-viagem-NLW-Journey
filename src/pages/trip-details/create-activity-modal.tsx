import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void;
}

export function CreateActivityModal({closeCreateActivityModal}: CreateActivityModalProps) {

    const { tripId } = useParams()

    async function createActivity(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget) // pega os dados do formulário

        const title = data.get('title')?.toString()
        const occurs_at = data.get('occurs_at')?.toString()
        
        await api.post(`/trips/${tripId}/activities`,{
            title,
            occurs_at,        
        })
        //realod na página para qdo uma atividade for criada, ela apareça na lista de atividades istantaneamente - 
        //não é a melhor prática, seria melhor usar o conceito de estado para atualizar a lista de atividades ou usar websockets
        window.document.location.reload()
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <Modal variant="primary">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
                        <button type="button" onClick={closeCreateActivityModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Todos convidados podem visualizar as atividades.
                    </p>
                </div>

                <form onSubmit={createActivity} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className="size-5 text-zinc-400" />
                        <Input
                            name="title"
                            textSize="base"
                            textColor="zinc200"
                            flex="flex1"
                            placeholder="Qual a atividade?"
                        />
                    </div>
                        <div className="flex items-center gap-2">
                            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center flex-1 gap-2">
                                <Calendar className="size-5 text-zinc-400" />
                                <Input
                                    type="datetime-local"
                                    name="occurs_at"
                                    textSize="base"
                                    textColor="zinc200"
                                    flex="flex1"
                                    scheme="dark"
                                    placeholder="Data e horário da ativiadade"
                                />
                            </div>
                        </div>
                    <Button variant="primary" size="full">
                        Salvar atividade
                    </Button>
                </form>

            </Modal>
        </div>
    )
}