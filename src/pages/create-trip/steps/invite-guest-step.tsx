import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestStepProps {
    openGuestModal: () => void;
    emailsToInvite: string[];
    openConfirmTripModal: () => void;
}

export function InviteGuestStep({ emailsToInvite, openConfirmTripModal, openGuestModal }: InviteGuestStepProps) {
    return (
        <div className="h-16 rounded-xl pl-6 pr-4 bg-zinc-900 flex items-center shadow-shape gap-5">
            <button type="button" onClick={openGuestModal} className="flex items-center gap-2 flex-1">
                <UserRoundPlus className="size-5 text-zinc-400" />

                {emailsToInvite.length > 0 ? (
                    <span className="text-zinc-400 text-lg bg-transparent">
                        {emailsToInvite.length} pessoa(s) convidada(s)
                    </span>
                ) : (
                    <span className="text-zinc-400 text-lg bg-transparent">
                        Quem estará na viagem?
                    </span>
                )}
            </button>

            <div className="w-px h-6 bg-zinc-800" />

            <button onClick={openConfirmTripModal} className="bg-lime-300 px-5 py-2 text-lime-950 font-medium gap-2 rounded-lg flex items-center hover:bg-lime-400">
                Confirmar viagem
                <ArrowRight className="size-5 text-lime-950" />
            </button>
        </div>
    );
}