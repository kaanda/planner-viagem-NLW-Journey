import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import { DateRange } from "react-day-picker";


export const displayedDate = (eventStartAndEndDates: DateRange | undefined) => {
    return eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "dd 'de' LLL", { locale: ptBR })
                .concat(" até ")
                .concat(format(eventStartAndEndDates.to, "dd 'de' LLL", { locale: ptBR }))
        : null;
};
