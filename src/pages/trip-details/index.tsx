import { Plus} from "lucide-react";
import { FormEvent, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { CreateLinkModal } from "./create-link-modal";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { DateRange } from "react-day-picker";

export function TripDetailsPage() {
    
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
    
    const navigate = useNavigate();
    const { tripId } = useParams<{ tripId: string }>(); // Obtém o tripId dos parâmetros da URL

    const [destination, setDestination] = useState('');
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

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

    async function updateTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({
            destination,
            eventStartAndEndDates,
        });

        if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
            console.log("Local e datas de início e fim do evento são obrigatórios");
            return;
        }

        try {
            const payload = {
                destination,
                starts_at: eventStartAndEndDates.from.toISOString(), 
                ends_at: eventStartAndEndDates.to.toISOString(),
            };

            console.log('Payload enviado:', payload);

            const response = await api.put(`/trips/${tripId}`, payload);

            const { tripId: newTripId } = response.data;
            navigate(`/trips/${newTripId}`);

        } catch (error) {
            console.error("Erro ao atualizar a viagem:", error);
        }
    }

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            
            <DestinationAndDateHeader 
                updateTrip={updateTrip} 
                setDestination={setDestination}
                setEventStartAndEndDates={setEventStartAndEndDates}
                eventStartAndEndDates={eventStartAndEndDates}
            />

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <button onClick={openCreateActivityModal} className="bg-lime-300 px-5 py-2 text-lime-950 font-medium gap-2 rounded-lg flex items-center hover:bg-lime-400">
                            Cadastrar atividade
                            <Plus className="size-5" />
                        </button>
                    </div>
                    <Activities eventStartAndEndDates={eventStartAndEndDates} />
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
