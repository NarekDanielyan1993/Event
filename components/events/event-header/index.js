import { Button } from '@mui/material';
import { useState } from 'react';

import EventDialogCreate from '../event-create-dialog';

import { StyledEventHeader } from './style';

function EventHeader({ onCreateEvent }) {
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
                    onCreate={onCreateEvent}
                    propData={undefined}
                />
            )}
        </StyledEventHeader>
    );
}

export default EventHeader;
