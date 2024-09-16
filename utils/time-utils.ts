import { format } from "date-fns";
import { id } from "date-fns/locale"

export class TimeUtils {

    static formatDateTime(date: string) {
        return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: id })
    }

}