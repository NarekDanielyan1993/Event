import React from 'react';
import EventItem from './event-item';

import classes from "./event-list.module.scss";

function EventList({ items }) {
    return (
        <ul className={classes.eventList}>
            {items.length > 0 ? items.map(item => {
                return (
                    <EventItem 
                        key={item.id}
                        title={item.title} 
                        date={item.date} 
                        location={item.location} 
                        image={item.image} 
                        id={item.id} 
                    />
                )
            }) : <p className='center'>No items found.</p>}
        </ul>
    )
}

export default EventList;