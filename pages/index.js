import { QueryClient, dehydrate } from '@tanstack/react-query';
import EventList from 'components/events/event/event-list';
import EventListContainer from 'components/events/event/event-list/event-list-container';
import Loader from 'components/loader';
import NewsLetter from 'components/news-letter';
import { EVENTS_QUERY_PARAMS, QUERY_DEFAULT_PARAMS } from 'constant';
import {
    GET_PAGINATED_EVENTS_BY_CATEGORY,
    usePaginatedEvents,
} from 'services/event';
import useRegisterMailForNews from 'services/news-letter';
import Event from './api/events/event.model';

export default function HomePage() {
    const { isLoading, registerMailForNews } = useRegisterMailForNews();

    const { data: events, isLoading: isDataLoading } = usePaginatedEvents(
        EVENTS_QUERY_PARAMS.CATEGORY_TYPE.ALL.code,
        ''
    );
    return (
        <>
            <section style={{ marginBottom: '20px' }}>
                <NewsLetter
                    formSubmitHandler={registerMailForNews}
                    isLoading={isLoading}
                />
            </section>
            <EventListContainer>
                <EventList items={events?.data} onlyView={true} />
            </EventListContainer>
            {isDataLoading && <Loader />}
        </>
    );
}

const queryClient = new QueryClient(QUERY_DEFAULT_PARAMS);

export async function getServerSideProps() {
    try {
        await queryClient.prefetchInfiniteQuery({
            queryKey: [
                GET_PAGINATED_EVENTS_BY_CATEGORY,
                EVENTS_QUERY_PARAMS.CATEGORY_TYPE.ALL.code,
                '',
            ],
            queryFn: ({ pageParam = 0, queryKey }) =>
                Event.getPaginatedEventsByCategory({
                    categoryType: queryKey[1],
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
