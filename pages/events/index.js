import { QueryClient, dehydrate } from '@tanstack/react-query';
import EventHeader from 'components/events/event-header';
import EventContent from 'components/events/events-content';
import EventsSearch from 'components/events/events-search';
import PageHeader from 'components/page-header';
import { EVENTS_QUERY_PARAMS, QUERY_DEFAULT_PARAMS } from 'constant';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import Event from 'pages/api/events/event.model';
import { useState } from 'react';
import { GET_PAGINATED_EVENTS_BY_CATEGORY } from 'services/event';
export default function EventsPage() {
    const [category, setCategory] = useState(
        EVENTS_QUERY_PARAMS.CATEGORY_TYPE.ALL.code
    );
    const [filterData, setFilterData] = useState('');

    return (
        <div>
            <Head>
                <title>Explore All events</title>
            </Head>
            <PageHeader>
                <EventHeader />
            </PageHeader>
            <EventsSearch category={category} setFilterData={setFilterData} />
            <EventContent
                category={category}
                filterData={filterData}
                setCategory={setCategory}
                setFilterData={setFilterData}
            />
        </div>
    );
}

const queryClient = new QueryClient(QUERY_DEFAULT_PARAMS);

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

        await queryClient.prefetchInfiniteQuery({
            queryKey: [
                GET_PAGINATED_EVENTS_BY_CATEGORY,
                EVENTS_QUERY_PARAMS.CATEGORY_TYPE.ALL.code,
                '',
            ],
            queryFn: ({ pageParam = 0, queryKey }) =>
                Event.getPaginatedEventsByCategory({
                    categoryType: queryKey[1],
                    userId: session.user.userId,
                    offset: pageParam * EVENTS_QUERY_PARAMS.PAGE_LIMIT,
                    limit: EVENTS_QUERY_PARAMS.PAGE_LIMIT,
                }),
        });
        return {
            props: {
                dehydratedState: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
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
