import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { DateRange, DayPicker } from "react-day-picker";
import { displayedDate } from "../create-trip/utils/format-date";

interface Trip {
    id: string;
    destination: string;
    starts_at: string;
    ends_at: string;
    is_confirmed: boolean;
}

interface DestinationAndDateHeaderProps {
    updateTrip: (event: FormEvent<HTMLFormElement>) => void;
    setDestination: (destination: string) => void;
    setEventStartAndEndDates: (dates: DateRange | undefined) => void;
    eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateHeader( { updateTrip, setDestination, setEventStartAndEndDates, eventStartAndEndDates }: DestinationAndDateHeaderProps) {

    const { tripId } = useParams<{ tripId: string }>();
    const [trip, setTrip] = useState<Trip | undefined>()
    const [isOpenLocationAndDate, setIsOpenLocationAndDate] = useState(true)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
    }, [tripId])
    
    const primaryDisplayedDate = trip
    ? format(new Date(trip.starts_at), "dd 'de' LLL", { locale: ptBR }).concat(" até ").concat(format(new Date(trip.ends_at), "dd 'de' LLL", { locale: ptBR }))
    : null;
    
    return (
        <form onSubmit={updateTrip} className="h-16 px-4 rounded-xl shadow-shape flex items-center justify-between bg-zinc-900">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <Input
                    disabled={isOpenLocationAndDate}
                    type="text"
                    textSize="lg"
                    textColor="zinc400"
                    placeholder={trip?.destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            <div className="flex items-center gap-5">
                <button
                    type="button"
                    onClick={setIsDatePickerOpen.bind(null, true)}
                    disabled={isOpenLocationAndDate}
                    className="flex items-center gap-2"
                >
                    {eventStartAndEndDates ? (
                        <>
                            <Calendar className="size-5 text-zinc-400" />
                            <span className="text-zinc-100">{displayedDate(eventStartAndEndDates)}</span>
                        </>
                    ) : (
                        <>
                            <Calendar className="size-5 text-zinc-400" />
                            <span className="text-zinc-100">{primaryDisplayedDate}</span>
                        </>
                    )}
                </button>

                {isDatePickerOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                        <Modal variant="primary" size={360}>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Selecione a data</h2>
                                    <button type="button" onClick={setIsDatePickerOpen.bind(null, false)}>
                                        <X className="size-5 text-zinc-400" />
                                    </button>
                                </div>
                            </div>
                            <DayPicker
                                mode="range"
                                selected={eventStartAndEndDates}
                                onSelect={setEventStartAndEndDates}
                                disabled={{ before: new Date() }}
                            />
                        </Modal>
                    </div>
                )}

                <div className="w-px h-6 bg-zinc-800" />

                {isOpenLocationAndDate ? (
                    <Button type="button" variant="secondary" onClick={() => setIsOpenLocationAndDate(false)}>
                        Alterar local/data
                        <Settings2 className="size-5" />
                    </Button>
                ) : (
                    <Button type="submit" variant="primary" >
                        Atualizar
                        <ArrowRight className="size-5" />
                    </Button>
                )}
            </div>
        </form>
    );
}