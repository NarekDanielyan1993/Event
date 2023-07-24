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
import { useErrorBoundary } from 'react-error-boundary';
import { QueryClient, dehydrate } from 'react-query';
import {
    GET_EVENTS,
    useCreateEvent,
    useDeleteEvent,
    useUpdateEvent,
} from 'services/event';

export default function EventsPage({ eventList }) {
    const [events, setEvents] = useState(eventList);

    const { isLoading, createEvent } = useCreateEvent();

    const { showBoundary } = useErrorBoundary();

    const { isLoading: isUpdateLoading, updateEvent } = useUpdateEvent();

    const { isLoading: isDeleteLoading, deleteEvent } = useDeleteEvent();

    const createEventHandler = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('location', data.location);
            formData.append('date', data.date);
            formData.append('file', data.file);

            const newEvent = await createEvent(formData);
            setEvents((prev) => [...prev, newEvent]);
        } catch (error) {
            showBoundary(error);
        }
    };

    const updateEventHandler = async (id, data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('location', data.location);
            formData.append('date', data.date);
            formData.append('file', data.file);
            const updatedEvent = await updateEvent(id, formData);
            setEvents((prev) =>
                prev.map((event) =>
                    event._id === updatedEvent._id ? updatedEvent : event
                )
            );
        } catch (error) {
            showBoundary(error);
        }
    };

    const deleteEventHandler = async (eventId) => {
        try {
            await deleteEvent(eventId);
            setEvents((prev) => prev.filter((event) => event._id !== eventId));
        } catch (error) {
            showBoundary(error);
        }
    };

    const clearFilterHandler = () => {
        setEvents(eventList);
    };

    return (
        <div>
            {(isLoading || isUpdateLoading || isDeleteLoading) && <Loader />}
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
                setEvents={setEvents}
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
        const queryClient = new QueryClient();
        const data = await queryClient.fetchQuery([GET_EVENTS], () =>
            Event.getAllEvents()
        );
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
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
