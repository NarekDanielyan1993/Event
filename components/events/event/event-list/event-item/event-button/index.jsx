import Link from 'next/link';

function EventButton({ style, className, href, buttonText }) {
    return (
        <Link className={className} href={href} style={{ ...style }}>
            {buttonText}
        </Link>
    );
}

// import { Link as MuiLink } from '@mui/material';
// import NextLink from 'next/link';
// import { forwardRef } from 'react';

// const EventButton = forwardRef((props, ref) => {
//     const { href } = props;
//     return (
//         <NextLink href={href} passHref>
//             <MuiLink ref={ref} {...props} />
//         </NextLink>
//     );
// });

export default EventButton;
