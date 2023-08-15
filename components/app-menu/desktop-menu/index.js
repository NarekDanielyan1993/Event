import Button from 'components/button';
import Link from 'components/button/link';
import { useSession } from 'next-auth/react';
import { StyledNav, StyledRightSide } from './style';

export const DesktopMenu = ({ onLogout }) => {
    const { data: session } = useSession();

    return (
        <StyledNav>
            {session && <Link href="/">NEXT EVENTS</Link>}
            <StyledRightSide>
                {session && <Link href="/events">All events</Link>}
                {session ? (
                    <Button onClick={onLogout}>Log out</Button>
                ) : (
                    <Link href="/auth">Log in</Link>
                )}
            </StyledRightSide>
        </StyledNav>
    );
};

export default DesktopMenu;
