import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

interface DestinationAndDateStepProps {
    openGuestInput: () => void;
    closeGuestInput: () => void;
    isGuestInputOpen: boolean;

}

export function DestinationAndDateStep({ openGuestInput, closeGuestInput, isGuestInputOpen} : DestinationAndDateStepProps) {

    return (
        <div className="h-16 rounded-xl pl-6 pr-4 bg-zinc-900 flex items-center shadow-shape gap-5">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input
                    disabled={isGuestInputOpen}
                    type="text"
                    className="text-zinc-400 text-lg bg-transparent placeholder-zinc-400 outline-none"
                    placeholder="Para onde você vai?"
                />
            </div>

            <div className="flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <input
                    disabled={isGuestInputOpen}
                    type="text"
                    className="text-zinc-400 text-lg bg-transparent placeholder-zinc-400 outline-none"
                    placeholder="Quando?"
                />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestInputOpen ? (
                <button
                    onClick={closeGuestInput}
                    className="h-9 bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 gap-2 flex items-center hover:bg-zinc-700"
                >
                    Alterar local/data
                    <Settings2 className="size-5 text-zinc-200" />
                </button>
            ) : (
                <button
                    onClick={openGuestInput}
                    className="bg-lime-300 px-5 py-2 text-lime-950 font-medium gap-2 rounded-lg flex items-center hover:bg-lime-400"
                >
                    Continuar
                    <ArrowRight className="size-5 text-lime-950" />
                </button>
            )}
        </div>
    );
}