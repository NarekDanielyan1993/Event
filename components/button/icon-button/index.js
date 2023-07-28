import { IconButton as MuiIconButton, Tooltip } from '@mui/material';

import { SvgIcon } from '@mui/material';
import Delete from 'public/images/deleteIcon.svg';
import Edit from 'public/images/editIcon.svg';
import ErrorOutline from 'public/images/errorOutlineIcon.svg';
import Google from 'public/images/googleIcon.svg';
import Menu from 'public/images/menuIcon.svg';

export const IconButton = ({
    name,
    size = 'sm',
    tooltipText = '',
    styles,
    onClick,
    as,
    ...props
}) => {
    const iconTypes = {
        delete: Delete,
        edit: Edit,
        google: Google,
        errorOutline: ErrorOutline,
        menu: Menu,
    };
    const Icon = iconTypes[name];
    return as === 'icon' ? (
        <SvgIcon component={Icon} inheritViewBox />
    ) : (
        <Tooltip arrow color="primary" title={tooltipText}>
            <MuiIconButton
                onClick={onClick}
                size={size}
                style={styles}
                {...props}
            >
                <SvgIcon component={Icon} inheritViewBox />
            </MuiIconButton>
        </Tooltip>
    );
};

export default IconButton;
