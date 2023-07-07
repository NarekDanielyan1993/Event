import { StyledButton, StyledLink } from 'components/Layout/main-header/style';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { StyledNav, StyledRightSide } from './style';

export const DesktopMenu = ({ onLogout }) => {
    const { data: session } = useSession();

    return (
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
                    <StyledButton onClick={onLogout}>Log out</StyledButton>
                ) : (
                    <Link href="/auth" passHref>
                        <StyledLink>Log in</StyledLink>
                    </Link>
                )}
            </StyledRightSide>
        </StyledNav>
    );
};

export default DesktopMenu;
