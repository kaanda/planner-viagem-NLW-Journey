import { ArrowRight, Calendar, Contact, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useState } from "react";
import { Modal } from "../../../components/modal";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from 'date-fns'
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
    openGuestInput: () => void;
    closeGuestInput: () => void;
    isGuestInputOpen: boolean;
}

export function DestinationAndDateStep({
    openGuestInput,
    closeGuestInput,
    isGuestInputOpen,
}: DestinationAndDateStepProps) {

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ?
         format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) 
         : null;

    function openDatePicker() {
        return setIsDatePickerOpen(true);
    }

    function closeDatePicker() {
        return setIsDatePickerOpen(false);
    }

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

            <button
                onClick={openDatePicker}
                disabled={isGuestInputOpen}
                className="flex items-center gap-2 text-left"
            >
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-400 w-50 flex-1">
                    {displayedDate || 'Quando?'}
                </span>
            </button>

            {isDatePickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <Modal variant="primary" size={360}>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">
                                    Selecione a data
                                </h2>
                                <button type="button" onClick={closeDatePicker}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        <DayPicker 
                            mode="range" 
                            selected={eventStartAndEndDates} 
                            onSelect={setEventStartAndEndDates} 
                        />

                    </Modal>
                </div>
            )}

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