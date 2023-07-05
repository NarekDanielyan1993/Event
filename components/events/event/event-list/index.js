import EventItem from './event-item';
import StyledEventList from './style';

function EventList({ items, onUpdateEvent, onDeleteEvent }) {
    return (
        <StyledEventList>
            {items && items.length > 0 ? (
                items.map((item) => (
                    <EventItem
                        event={item}
                        id={item._id}
                        key={item._id}
                        onDeleteEvent={onDeleteEvent}
                        onUpdateEvent={onUpdateEvent}
                    />
                ))
            ) : (
                <p>No items found</p>
            )}
        </StyledEventList>
    );
}

export default EventList;