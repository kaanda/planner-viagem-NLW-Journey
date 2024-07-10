import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestStep } from "./steps/invite-guest-step";

export function CreateTripPage() {

    const navigate = useNavigate();

    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [emailsToInvite, setEmailsToInvite] = useState([
        'kaka@gmail.com',
        'kaanda.kaka@gmail.com'
    ]);
    
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

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

    function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        navigate('/trips/123');
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
                />
            )}
        </div>
    );
};
