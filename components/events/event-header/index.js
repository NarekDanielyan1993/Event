import { Button } from '@mui/material';
import { useState } from 'react';

import EventDialogCreate from '../event-create-dialog';

import { StyledEventHeader } from './style';

function EventHeader({ onSubmit }) {
    const [isDialogOpened, setIsDialogOpened] = useState(false);

    return (
        <StyledEventHeader>
            <Button color="primary" onClick={() => setIsDialogOpened(true)}>
                Create Event
            </Button>
            {isDialogOpened && (
                <EventDialogCreate
                    isOpen={isDialogOpened}
                    onClose={() => setIsDialogOpened(false)}
                    onSubmit={onSubmit}
                    propData={undefined}
                />
            )}
        </StyledEventHeader>
    );
}

export default EventHeader;
