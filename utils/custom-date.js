import { format } from 'date-fns';

import { MMMM_D_YYYY } from 'constant';

export class CustomDate {
    static toHumanReadableFormat(date) {
        return format(date, MMMM_D_YYYY);
    }

    static timeElapsed(date) {
        if (!date) {
            return null;
        }
        const now = new Date();
        const elapsed = now - new Date(date);
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
    }
}
