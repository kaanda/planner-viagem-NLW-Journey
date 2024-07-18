import { useState, FormEvent } from "react";
import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void;
}

export function CreateLinkModal({ closeCreateLinkModal }: CreateLinkModalProps) {
    const { tripId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function isValidURL(url: string) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocolo
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // nome do domínio
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ou endereço IP (v4)
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // porta e caminho
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // string de consulta
            '(\\#[-a-z\\d_]*)?$','i'); // fragmento localizador
        return !!pattern.test(url);
    }

    async function createLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const data = new FormData(event.currentTarget);
        const title = data.get("title")?.toString();
        let url = data.get("url")?.toString();

        if (!title || !url) {
            setError("Os dois campos são obrigatórios."); 
            setIsLoading(false);
            return;
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url; // Adiciona protocolo padrão se estiver ausente
        }

        if (!isValidURL(url)) {
            setError("A URL fornecida não é válida."); // português: A URL fornecida não é válida.
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post(`/trips/${tripId}/links`, { title, url });
            console.log('Response:', response);
            closeCreateLinkModal(); // Fecha o modal se a requisição for bem-sucedida
        } catch (error) {
            console.error("Erro ao criar o link:", error);
        } finally {
            setIsLoading(false);
        }
        //realod na página para qdo uma atividade for criada, ela apareça na lista de atividades istantaneamente - 
        //não é a melhor prática, seria melhor usar o conceito de estado para atualizar a lista de atividades ou usar websockets
        window.document.location.reload()
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <Modal variant="primary">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Cadastrar link</h2>
                        <button type="button" onClick={closeCreateLinkModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Todos convidados podem visualizar os links importantes.
                    </p>
                </div>

                <form onSubmit={createLink} className="space-y-3">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className="size-5 text-zinc-400" />
                        <Input 
                            name="title" 
                            placeholder="Título do link" 
                            textSize="base"
                            textColor="zinc400"
                            flex="flex1"
                            required
                        />
                    </div>

                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Link2 className="size-5 text-zinc-400" />
                        <Input  
                            name="url" 
                            placeholder="URL" 
                            textSize="base"
                            textColor="zinc400"
                            flex="flex1"
                            required
                        />
                    </div>
                    <Button 
                        type="submit"
                        variant="primary" 
                        size="full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Salvando...' : 'Salvar link'}
                    </Button>
                </form>

                {isLoading && (
                    <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                        <span className="text-white">Loading...</span>
                    </div>
                )}
            </Modal>
        </div>
    );
}
