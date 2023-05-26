import React from 'react';
import { useRouter } from "next/router";
import Head from 'next/head'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import { getEventById } from '../../dummy-data';
import { getEvents } from '../services';

export default function EventDetailPage({ event }) {

    return (
        <>
              {event ?
              <>
                  <Head>
                    <title>This is the single event</title>
                  </Head>
                  <EventSummary title={event.title}>
                      {event.description}
                  </EventSummary>
                  <EventLogistics
                      date={event.date}
                      address={event.location} 
                      image={event.image}
                      imageAlt={event.title}
                  />
                  <EventContent>
                      {event.description}
                  </EventContent>
              </>
              : 
                  <p>Not found</p>
              }
        </>
    )
}

export async function getStaticProps(ctx) {
    const events = await getEvents();
    const id = ctx.params.eventId;
    const event = events.find(event => event.id === id);
    return {
        props: {
            event,
            revalidating: 10000 
        },
        
    }
}

export async function getStaticPaths() {
    const events = await getEvents();
    const ids = events.map(event => {
        return { params: { eventId: event.id } };
    })
    return {
        paths: ids,
        fallback: 'blocking'
    }
}