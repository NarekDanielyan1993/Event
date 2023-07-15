export const NEWS_LETTER_ROUTES = {
    UNSUBSCRIBE: (email) =>
        `${
            process.env.NEXT_PUBLIC_BASE_URL
        }/news-letter/unsubscribe?email=${encodeURIComponent(email)}`,
};

export const EVENT_ROUTES = {
    EVENT_REDIRECTION_FROM_EMAIL: (eventId) =>
        `${process.env.NEXT_PUBLIC_BASE_URL}/events/${eventId}`,
};
