import EventHeader from 'components/events/event-header';
import EventList from 'components/events/event/event-list';
import EventsSearch from 'components/events/events-search';
import Loader from 'components/loader';
import PageHeader from 'components/page-header';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import Event from 'pages/api/events/event.model';
import { useState } from 'react';
import {
    useCreateEvent,
    useDeleteEvent,
    useFilterEvents,
    useUpdateEvent,
} from 'services/event';

export default function EventsPage({ eventList }) {
    const [events, setEvents] = useState(eventList);

    const { isLoading, createEvent } = useCreateEvent();

    const { isLoading: isFilterDatesLoading, getFilteredEvents } =
        useFilterEvents();

    const { isLoading: isUpdateLoading, updateEvent } = useUpdateEvent();

    const { isLoading: isDeleteLoading, deleteEvent } = useDeleteEvent();

    const onSearch = (date) => {
        const date_to_string = date.toISOString();
        getFilteredEvents(date_to_string, (filteredEvents) => {
            setEvents(filteredEvents);
        });
    };

    const createEventHandler = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('location', data.location);
        formData.append('date', data.date);
        formData.append('file', data.file);
        await createEvent(formData, (newEvent) => {
            setEvents((prev) => [...prev, newEvent]);
        });
    };

    const updateEventHandler = async (id, data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('location', data.location);
        formData.append('date', data.date);
        formData.append('file', data.file);
        updateEvent(id, formData, (updatedEvent) => {
            setEvents((prev) =>
                prev.map((event) =>
                    event._id === updatedEvent._id ? updatedEvent : event
                )
            );
        });
    };

    const deleteEventHandler = async (eventId) => {
        await deleteEvent(eventId, () => {
            setEvents((prev) => prev.filter((event) => event._id !== eventId));
        });
    };

    const clearFilterHandler = () => {
        setEvents(eventList);
    };

    return (
        <div>
            {(isLoading ||
                isFilterDatesLoading ||
                isUpdateLoading ||
                isDeleteLoading) && <Loader />}
            <Head>
                <title>Explore All events</title>
            </Head>
            <PageHeader>
                <EventHeader
                    onCreateEvent={createEventHandler}
                    setEvents={setEvents}
                />
            </PageHeader>
            <EventsSearch
                events={eventList}
                onClearFilter={clearFilterHandler}
                onSearch={onSearch}
            />
            <EventList
                items={events}
                onDeleteEvent={deleteEventHandler}
                onUpdateEvent={updateEventHandler}
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const session = await getServerSession(
            context.req,
            context.res,
            authOptions
        );
        if (!session) {
            return {
                redirect: {
                    destination: '/auth',
                    permanent: false,
                },
            };
        }
        const data = await Event.getAllEvents();
        return {
            props: {
                eventList: data,
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }
}

EventsPage.auth = true;
