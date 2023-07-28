import EventList from 'components/events/event/event-list';
import Loader from 'components/loader';
import NewsLetter from 'components/news-letter';
import { QueryClient, dehydrate } from 'react-query';
import { GET_EVENTS } from 'services/event';
import useRegisterMailForNews from 'services/news-letter';
import Event from './api/events/event.model';

export default function HomePage({ events }) {
    const { isLoading, registerMailForNews } = useRegisterMailForNews();

    const formSubmitHandler = async (data) => {
        await registerMailForNews(data);
    };

    return (
        <>
            <section style={{ marginBottom: '20px' }}>
                <NewsLetter
                    formSubmitHandler={formSubmitHandler}
                    isLoading={isLoading}
                />
            </section>
            <EventList items={events} onlyView={true} />
            {isLoading && <Loader />}
        </>
    );
}

export async function getServerSideProps() {
    try {
        const queryClient = new QueryClient();
        const events = await queryClient.fetchQuery([GET_EVENTS], () =>
            Event.getUpcamingEvents()
        );
        return {
            props: {
                events,
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
