import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestStep } from "./steps/invite-guest-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {

    const navigate = useNavigate();

    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [emailsToInvite, setEmailsToInvite] = useState([
        'kaka@gmail.com',
        'kaanda.kaka@gmail.com'
    ]);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //criando estados para armazenar os valores dos inputs de destino, nome do dono que criou a viagem, email do dono e datas de início e fim da viagem
    //isso se chama lifting state up, ou seja, subir o estado para o componente pai
    const [destination, setDestination] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

    function openGuestInput() {
        setIsGuestInputOpen(true);
    }

    function closeGuestInput() {
        setIsGuestInputOpen(false);
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true);
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false);
    }

    function openGuestModal() {
        setIsGuestModalOpen(true);
    }

    function closeGuestModal() {
        setIsGuestModalOpen(false);
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();

        if (!email) {
            return;
        }

        // verifica se o email já foi adicionado, se já foi adicionado, não adiciona novamente
        if (emailsToInvite.includes(email)) {
            return;
        }

        setEmailsToInvite([...emailsToInvite, email]);

        event.currentTarget.reset(); // reseta o campo do formulário
    }

    function removeEmailFromInvite(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);
        setEmailsToInvite(newEmailList);
    }

    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({
            destination,
            ownerName,
            ownerEmail,
            eventStartAndEndDates,
            emailsToInvite
        });
        setIsLoading(true);

    if (!destination){
        console.log("Precisa de um destino para criar a viagem");
        return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
        console.log("Datas de início e fim do evento são obrigatórias");
        return;
    }

    if (emailsToInvite.length === 0) {
        console.log("Pelo menos um email precisa ser convidado para a viagem");
        return;
    }

    if (!ownerName || !ownerEmail) {
        console.log("Nome e email do dono da viagem são obrigatórios");
        return;
    }

    try {
        const response = await api.post('/trips', {
            destination,
            starts_at: eventStartAndEndDates.from,
            ends_at: eventStartAndEndDates.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail
        });

        const { tripId } = response.data;
        navigate(`/trips/${tripId}`);
    } catch (error) {
        console.error("Erroa ao criar uma viagem:", error);
    }finally {
        setIsLoading(false); 
    }
}
    
    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-full px-6 text-center space-y-16">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="Plann.er" className="w-40 mx-auto" />
                    <p className="text-zinc-300 text-lg">
                        Convide seus amigos e planeje sua próxima viagem!
                    </p>
                </div>

                <div className="space-y-4">
                    <DestinationAndDateStep
                        openGuestInput={openGuestInput}
                        closeGuestInput={closeGuestInput}
                        isGuestInputOpen={isGuestInputOpen}
                        setDestination={setDestination}
                        setEventStartAndEndDates={setEventStartAndEndDates}
                        eventStartAndEndDates={eventStartAndEndDates}
                    />

                    {isGuestInputOpen && (
                        <InviteGuestStep
                            emailsToInvite={emailsToInvite}
                            openConfirmTripModal={openConfirmTripModal}
                            openGuestModal={openGuestModal}
                        />
                    )}
                </div>
                <p className="text-zinc-500 text-sm">
                    Ao planejar sua viagem pela plann.er você automaticamente concorda<br /> 
                    com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
                </p>
            </div>

            {isGuestModalOpen && (
                <InviteGuestsModal 
                    closeGuestModal={closeGuestModal} 
                    emailsToInvite={emailsToInvite} 
                    removeEmailFromInvite={removeEmailFromInvite} 
                    addNewEmailToInvite={addNewEmailToInvite}
                />
            )}

            {isConfirmTripModalOpen && (
                <ConfirmTripModal 
                    closeConfirmTripModal={closeConfirmTripModal} 
                    createTrip={createTrip}
                    setOwnerName={setOwnerName}
                    setOwnerEmail={setOwnerEmail}
                    isLoading={isLoading}
                    destination={destination}
                    eventStartAndEndDates={eventStartAndEndDates}
                />
            )}
        </div>
    );
};
