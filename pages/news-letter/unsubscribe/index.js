import Loader from 'components/loader';
import UnsubscibeCard from 'components/news-letter/unsubscribe';
import { useRouter } from 'next/router';
import { useUnsubscribeFromEmail } from 'services';

export default function Unsubscribe() {
    const { unsubscribeFromEmail, isLoading } = useUnsubscribeFromEmail();
    const { query } = useRouter();
    const { email } = query;

    const unsubscribeFormEmailHandler = async (email) => {
        await unsubscribeFromEmail({ email });
    };

    return (
        <>
            {isLoading ? <Loader /> : null}
            <UnsubscibeCard
                onUnsubscribeFromEmail={() =>
                    unsubscribeFormEmailHandler(email)
                }
            />
        </>
    );
}

Unsubscribe.layout = ({ children }) => <>{children}</>;
