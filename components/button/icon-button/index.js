import GoogleIcon from '@mui/icons-material/Google';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton as MuiIconButton, Tooltip } from '@mui/material';
import { useMemo } from 'react';

export const IconButton = ({ iconName, tooltipText = '', styles, onClick }) => {
    const Icon = useMemo(() => {
        switch (iconName) {
            case 'google': {
                return GoogleIcon;
            }
            case 'menu': {
                return MenuIcon;
            }
        }
    });
    return (
        <Tooltip arrow color="primary" title={tooltipText}>
            <MuiIconButton onClick={onClick} size="small" style={styles}>
                <Icon />
            </MuiIconButton>
        </Tooltip>
    );
};
