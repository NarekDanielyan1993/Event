import { Menu, MenuItem } from '@mui/material';
import { StyledButton, StyledLink } from 'components/Layout/main-header/style';
import { IconButton } from 'components/button/icon-button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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
                                mt: 1.5,
                            },
                        }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                    >
                        <MenuItem>
                            <Link href="/" passHref>
                                <StyledLink>NEXT EVENTS</StyledLink>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/events" passHref>
                                <StyledLink>All events</StyledLink>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <StyledButton onClick={onLogout}>
                                Log out
                            </StyledButton>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Link href="/auth" passHref>
                    <StyledLink>Log in</StyledLink>
                </Link>
            )}
            ;
        </StyledMobileMenu>
    );
};
