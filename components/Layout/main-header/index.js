import DesktopMenu from 'components/app-menu/desktop-menu';
import { MobileMenu } from 'components/app-menu/mobile-menu';
import { signOut } from 'next-auth/react';
import { StyledMainHeader } from './style';

function MainHeader() {
    const onLogoutHandler = () => {
        signOut({ callbackUrl: '/auth' });
    };

    return (
        <StyledMainHeader>
            <DesktopMenu onLogout={onLogoutHandler} />
            <MobileMenu onLogout={onLogoutHandler} />
        </StyledMainHeader>
    );
}

export default MainHeader;
