import React from 'react';
import Image from "next/image";

import classes from "./event-item.module.scss";
import EventButton from './event-button';

function EventItem({ title, date, location, image, id }) {

    const formatedDate = new Date(date).toLocaleDateString("en-us")

    return (
        <li className={classes.eventCard}>
            <Image
                className={classes.img} 
                alt={title} 
                src={`/${image}`}
                width={280}
                height={280}
                objectFit="cover"
            />
            <div className={classes.content}>
                <div>
                    <h3 className={classes.title}>{title}</h3>
                    <div>
                        <time>{formatedDate}</time>
                    </div>
                    <div>
                        <address>{location}</address>
                    </div>
                </div>    
            </div>
            <div 
                className={classes.actions}
            >
                <EventButton
                    buttonText='Event Detail'
                    href={`events/${id}`}
                />
            </div>
        </li>
    )
}

export default EventItem;