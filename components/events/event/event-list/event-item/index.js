import { Button, Typography } from '@mui/material';
import { useState } from 'react';

import EventDialogCreate from 'components/events/event-create-dialog';
import { loadImage } from 'utils';

import { useSession } from 'next-auth/react';
import EventButton from './event-button';
import {
    StyledContent,
    StyledEventCard,
    StyledImage,
    StyledOverlay,
    StyledText,
} from './style';

function EventItem({ event, id, onUpdateEvent, onDeleteEvent, onlyView }) {
    const { title, location, date, imageId } = event;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data: session } = useSession();

    return (
        <StyledEventCard>
            <StyledImage
                alt={title}
                height={280}
                loader={loadImage}
                objectFit="cover"
                src={imageId}
                width={280}
            />
            <StyledContent>
                <StyledText component="h3">{title}</StyledText>
                <time>{date}</time>
                <StyledText component="address">{location}</StyledText>
            </StyledContent>
            <StyledOverlay>
                <div className="actions">
                    {!session ? (
                        <Typography
                            sx={{
                                textTransform: 'uppercase',
                                color: 'white',
                                display: 'block',
                                width: '100%',
                            }}
                            textAlign="center"
                        >
                            Log in to explore event
                        </Typography>
                    ) : !onlyView ? (
                        <>
                            <Button onClick={() => setIsDialogOpen(true)}>
                                Edit
                            </Button>
                            <Button
                                className="delete"
                                onClick={() => onDeleteEvent(id)}
                            >
                                Delete
                            </Button>
                            <EventDialogCreate
                                isOpen={isDialogOpen}
                                onClose={() => setIsDialogOpen(false)}
                                onSubmit={onUpdateEvent}
                                propData={event}
                            />
                            <EventButton
                                buttonText="Detail"
                                href={`/events/${id}`}
                            />
                        </>
                    ) : (
                        <EventButton
                            buttonText="Detail"
                            href={`/events/${id}`}
                        />
                    )}
                </div>
            </StyledOverlay>
        </StyledEventCard>
    );
}

export default EventItem;
