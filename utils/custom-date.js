import { endOfMonth, format, isValid, parseISO, startOfMonth } from 'date-fns';

import { MMMM_D_YYYY } from 'constant';
import { utcToZonedTime } from 'date-fns-tz';

export class CustomDate {
    static formatDate(dateString, formatString = MMMM_D_YYYY) {
        try {
            if (!dateString) {
                return;
            }
            if (isValid(parseISO(dateString))) {
                return format(parseISO(dateString), formatString, {
                    locale: 'enUS',
                });
            }
            return dateString;
        } catch (error) {
            return '';
        }
    }
    static timeElapsed = (date) => {
        if (!date) {
            return null;
        }

        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const dateInUserTimeZone = utcToZonedTime(new Date(date), userTimeZone);
        const now = new Date();
        const elapsed = Math.abs(now.getTime() - dateInUserTimeZone.getTime());
        const seconds = Math.floor(elapsed / 1000);

        if (seconds < 60) {
            return `${seconds}s`;
        }

        const minutes = Math.floor(seconds / 60);

        if (minutes < 60) {
            return `${minutes}m`;
        }

        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return `${hours}h`;
        }

        const days = Math.floor(hours / 24);

        if (days < 365) {
            return `${days}d`;
        }

        const years = Math.floor(days / 365);

        return `${years}y`;
    };

    static getStartOfMonth(dateString) {
        return startOfMonth(new Date(dateString));
    }

    static getEndOfMonth(dateString) {
        return endOfMonth(new Date(dateString));
    }
}
