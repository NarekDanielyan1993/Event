import EventItem from './event-item';

function EventList({ items, onlyView, onUpdateEvent, onDeleteEvent }) {
    return items && Array.isArray(items) && items.length > 0 ? (
        items.map((item) => (
            <EventItem
                event={item}
                id={item._id}
                key={item._id}
                onDeleteEvent={onDeleteEvent}
                onlyView={onlyView}
                onUpdateEvent={onUpdateEvent}
            />
        ))
    ) : (
        <p>No items found</p>
    );
}

export default EventList;
