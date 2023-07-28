import EventHeader from 'components/events/event-header';
import EventContent from 'components/events/events-content';
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
    GET_EVENTS_BY_CATEGORY,
    useDeleteEvent,
    useGetEvents,
} from 'services/event';

export default function EventsPage() {
    const [category, setCategory] = useState(0);

    const { isLoading: isDeleteLoading, deleteEvent } = useDeleteEvent();

    const { getEvents, data: eventList } = useGetEvents();
    const [events, setEvents] = useState(eventList);

    const { showBoundary } = useErrorBoundary();

    const createEventHandler = async () => {
        try {
            const allEvents = await getEvents();
            setEvents(allEvents);
        } catch (error) {
            showBoundary(error);
        }
    };

    const updateEventHandler = async () => {
        try {
            const allEvents = await getEvents();
            setEvents(allEvents);
        } catch (error) {
            showBoundary(error);
        }
    };

    const deleteEventHandler = async (eventId) => {
        try {
            await deleteEvent(eventId);
            const allEvents = await getEvents();
            setEvents(allEvents);
        } catch (error) {
            showBoundary(error);
        }
    };

    const clearFilterHandler = () => {
        setEvents(eventList);
    };

    return (
        <div>
            {isDeleteLoading && <Loader />}
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
                category={category}
                events={eventList}
                onClearFilter={clearFilterHandler}
                setEvents={setEvents}
            />
            <EventContent
                category={category}
                deleteEventHandler={deleteEventHandler}
                eventData={events}
                setCategory={setCategory}
                setEvents={setEvents}
                updateEventHandler={updateEventHandler}
            />
        </div>
    );
}

const queryClient = new QueryClient();

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

        await queryClient.prefetchQuery(
            GET_EVENTS_BY_CATEGORY,
            () => Event.getEventsByCategory(session.user.userId),
            { staleTime: 1 * 60 * 1000, cacheTime: 5 * 60 * 1000 }
        );
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
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
