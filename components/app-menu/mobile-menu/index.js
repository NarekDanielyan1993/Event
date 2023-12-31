import { Menu, MenuItem } from '@mui/material';
import Button from 'components/button';
import { IconButton } from 'components/button/icon-button';
import Link from 'components/button/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { StyledMobileMenu } from './style';

export const MobileMenu = ({ onLogout }) => {
    const { data: session } = useSession();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <StyledMobileMenu>
            {session ? (
                <>
                    <IconButton
                        name="menu"
                        onClick={handleClick}
                        tooltipText="Menu"
                    />
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                        onClick={handleClose}
                        onClose={handleClose}
                        open={!!anchorEl}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1,
                            },
                        }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                    >
                        <MenuItem>
                            <Link href="/">NEXT EVENTS</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/events">All events</Link>
                        </MenuItem>
                        <MenuItem>
                            <Button onClick={onLogout}>Log out</Button>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Link href="/auth">Log in</Link>
            )}
        </StyledMobileMenu>
    );
};
