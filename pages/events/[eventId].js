import Head from 'next/head';

import EventContent from 'components/event-detail/event-content';
import EventLogistics from 'components/event-detail/event-logistics';
import EventSummary from 'components/event-detail/event-summary';
import EventComments from 'components/events/event/event-comment';
import NotFound from 'components/not-found';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import Event from 'pages/api/events/event.model';

export default function EventDetailPage({ event }) {
    const { data: session } = getSession();
    return (
        <>
            <Head>
                <title>Explore event in detail</title>
            </Head>
            {event ? (
                <>
                    <EventSummary title={event.title}>
                        {event.description}
                    </EventSummary>
                    <EventLogistics
                        address={event.location}
                        date={event.date}
                        imageAlt={event.title}
                        imageId={event.imageId}
                    />
                    <EventContent>{event.description}</EventContent>
                    {session ? (
                        <EventComments />
                    ) : (
                        <NotFound text="Authorize to leave a comment." />
                    )}
                </>
            ) : (
                <NotFound text="There is not event found." />
            )}
        </>
    );
}

export async function getServerSideProps(ctx) {
    const id = ctx.params.eventId;

    try {
        const session = await getServerSession(ctx.req, ctx.res, authOptions);
        if (!session) {
            return {
                redirect: {
                    destination: '/auth',
                    permanent: false,
                },
            };
        }
        const event = await Event.getEventById(id);

        return {
            props: {
                event,
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

EventDetailPage.auth = false;
