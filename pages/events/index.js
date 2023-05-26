import React, { useState } from 'react'
import useSWR from 'swr'

import EventList from '../../components/events/event/event-list';
import Head from 'next/head'

import { base_url } from "../../constants/";
import { getAllEvents, getFilteredEvents } from "../../dummy-data";
import EventsSearch from '../../components/events/events-search';


export default function EventsPage(props) {

    const [events, setEvents] = useState(props.events)

    const onSearch = (month, year) => {
        const updatedEvents = getFilteredEvents({year, month})
        setEvents(updatedEvents)
    }
  return (
    <div>
        <Head>
          <title>Explore All events</title>
        </Head>
        <EventsSearch onSearch={onSearch} />
        <EventList items={events} />
    </div>
  )
}

export async function getStaticProps() {
    let data = await fetch(base_url);
    data = await data.json()
    return { props: {
      events: Object.keys(data).map((key) => {
        return {
          ...data[key],
          id: key
        }
      })    
    }, revalidate: 5 };
} 