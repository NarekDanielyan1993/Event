import Link from 'next/link';

function EventButton({ style, className, href, buttonText }) {
    return (
        <Link className={className} href={href} style={{ ...style }}>
            {buttonText}
        </Link>
    );
}

export default EventButton;
