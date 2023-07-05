import EventList from 'components/events/event/event-list';
import Loader from 'components/loader/index';
import NewsLetter from 'components/news-letter';
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
            <EventList items={events} />
            {isLoading && <Loader />}
        </>
    );
}

export async function getServerSideProps() {
    try {
        const events = await Event.getUpcamingEvents();

        return {
            props: {
                events,
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
