import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import {
    StyledButton,
    StyledLink,
    StyledMainHeader,
    StyledNav,
    StyledRightSide,
} from './style';

function MainHeader() {
    const onLogoutHandler = () => {
        signOut({ callbackUrl: '/auth' });
    };

    const { data: session } = useSession();

    return (
        <StyledMainHeader>
            <StyledNav>
                {session && (
                    <Link href={'/'} passHref>
                        <StyledLink>NEXT EVENTS</StyledLink>
                    </Link>
                )}
                <StyledRightSide>
                    {session && (
                        <Link href="/events" passHref>
                            <StyledLink>All events</StyledLink>
                        </Link>
                    )}
                    {session ? (
                        <StyledButton onClick={onLogoutHandler}>
                            Log out
                        </StyledButton>
                    ) : (
                        <Link href="/auth" passHref>
                            <StyledLink>Log in</StyledLink>
                        </Link>
                    )}
                </StyledRightSide>
            </StyledNav>
        </StyledMainHeader>
    );
}

export default MainHeader;
