import { base_url } from "../../constants";

export const getEvents = async () => {
    try {
        let events = await fetch(base_url);

        events = await events.json()
        return Object.keys(events).map(event => {
            return {
                ...events[event],
                id: event
            }
        })
    } catch (error) {
        console.log(error)
        return null;
    }
}