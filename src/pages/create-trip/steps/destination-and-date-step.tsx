import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

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
                <Input
                    disabled={isGuestInputOpen}
                    type="text"
                    textSize="lg"
                    textColor="zinc400" 
                    placeholder="Para onde você vai?"
                />
            </div>

            <div className="flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <Input
                    disabled={isGuestInputOpen}
                    type="text"
                    textSize="lg"
                    textColor="zinc400" 
                    placeholder="Quando?"
                />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestInputOpen ? (
                <Button variant="secondary" onClick={closeGuestInput}>
                    Alterar local/data
                    <Settings2 className="size-5" />
                </Button>
                
            ) : (
                <Button variant="primary" onClick={openGuestInput}>
                    Continuar
                    <ArrowRight className="size-5" />
                </Button>
            )}
        </div>
    );
}