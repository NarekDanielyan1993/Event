import { useState } from 'react';

import EventDialogCreate from 'components/events/event-create-dialog';
import { CustomDate, loadImage } from 'utils';

import Button from 'components/button';
import Link from 'components/button/link';
import { useSession } from 'next-auth/react';
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
                <time>{CustomDate.formatDate(date)}</time>
                <StyledText component="address">{location}</StyledText>
            </StyledContent>
            <StyledOverlay>
                <div className="actions">
                    {!onlyView && session ? (
                        <>
                            {session.user.userId === event.userId && (
                                <>
                                    <Button
                                        onClick={() => setIsDialogOpen(true)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="delete"
                                        onClick={() => onDeleteEvent(id)}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                            <EventDialogCreate
                                isOpen={isDialogOpen}
                                onClose={() => setIsDialogOpen(false)}
                                onEdit={onUpdateEvent}
                                propData={event}
                            />
                            <Link href={`/events/${id}`}>Detail</Link>
                        </>
                    ) : (
                        <Link href={`/events/${id}`}>Detail</Link>
                    )}
                </div>
            </StyledOverlay>
        </StyledEventCard>
    );
}

export default EventItem;
