// import Link from 'next/link';

// function EventButton({ style, className, href, buttonText }) {
//     return (
//         <Link className={className} href={href} style={{ ...style }}>
//             {buttonText}
//         </Link>
//     );
// }

import NextLink from 'next/link';
import StyledMuiLink from './style';

export default function Link({ as, href, children, ...props }) {
    const linkType = {
        link: StyledMuiLink,
    };
    const LinkComponent = linkType[as] || linkType.link;
    return (
        <NextLink href={href} passHref>
            <LinkComponent {...props}>{children}</LinkComponent>
        </NextLink>
    );
}
