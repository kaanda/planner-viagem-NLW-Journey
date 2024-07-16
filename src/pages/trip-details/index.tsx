import { Plus} from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { CreateLinkModal } from "./create-link-modal";


export function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true);
    }

    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false);
    }

    function openCreateLinkModal() {
        setIsCreateLinkModalOpen(true);
    }

    function closeCreateLinkModal() {
        setIsCreateLinkModalOpen(false);
    }

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            
            <DestinationAndDateHeader />

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <button onClick={openCreateActivityModal} className="bg-lime-300 px-5 py-2 text-lime-950 font-medium gap-2 rounded-lg flex items-center hover:bg-lime-400">
                            Cadastrar atividade
                            <Plus className="size-5" />
                        </button>
                    </div>
                    <Activities />
                </div>

                <div className="w-80 space-y-6">
                    <ImportantLinks openCreateLinkModal={openCreateLinkModal} />

                    <div className="w-full h-px bg-zinc-800" />
                    <Guests />                    
                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
            )} 

            {isCreateLinkModalOpen && (
                <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
            )}
        </div>
    )
}
