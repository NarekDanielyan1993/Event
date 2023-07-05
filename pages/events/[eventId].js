import Head from 'next/head';
import { useState } from 'react';

import EventContent from 'components/event-detail/event-content';
import EventLogistics from 'components/event-detail/event-logistics';
import EventSummary from 'components/event-detail/event-summary';
import EventComments from 'components/events/event/event-comment';
import Loader from 'components/loader';
import NotFound from 'components/not-found';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import Comment from 'pages/api/comments/comment.model';
import Event from 'pages/api/events/event.model';
import {
    useCreateComment,
    useDeleteComment,
    useUpdateComment,
} from 'services/comment';

export default function EventDetailPage({ event, comments }) {
    const [commentList, setCommentList] = useState(comments || []);

    const { isLoading: isCreateCommentLoading, createComment } =
        useCreateComment();

    const { isLoading: isUpdateCommentLoading, updateComment } =
        useUpdateComment();

    const { isLoading: isDeleteCommentLoading, deleteComment } =
        useDeleteComment();

    const onSubmit = async (data) => {
        const finalData = { ...data };
        await createComment(event._id, finalData, (newComment) => {
            setCommentList((prev) => [newComment, ...prev]);
        });
    };

    const deleteComments = async (eventId, commentId) => {
        await deleteComment(eventId, commentId, () => {
            setCommentList((prev) =>
                prev.filter((comment) => comment._id !== commentId)
            );
        });
    };

    const updateComments = async (eventId, commentId, data, onClose) => {
        await updateComment(
            eventId,
            commentId,
            data,
            onClose,
            (updatedComment) => {
                setCommentList((prev) =>
                    prev.map((comment) =>
                        comment._id === updatedComment._id
                            ? updatedComment
                            : comment
                    )
                );
            }
        );
    };

    return (
        <>
            {(isCreateCommentLoading ||
                isDeleteCommentLoading ||
                isUpdateCommentLoading) && <Loader />}
            <Head>
                <title>Explore event in detail</title>
            </Head>
            {event ? (
                <>
                    <EventSummary title={event.title}>
                        {event.description}
                    </EventSummary>
                    <EventLogistics
                        address={event.location}
                        date={event.date}
                        imageAlt={event.title}
                        imageId={event.imageId}
                    />
                    <EventContent>{event.description}</EventContent>
                    <EventComments
                        comments={commentList}
                        onDeleteComments={deleteComments}
                        onSubmit={onSubmit}
                        onUpdateComments={updateComments}
                    />
                </>
            ) : (
                <NotFound />
            )}
        </>
    );
}

export async function getServerSideProps(ctx) {
    const id = ctx.params.eventId;

    try {
        const session = await getServerSession(ctx.req, ctx.res, authOptions);
        if (!session) {
            return {
                redirect: {
                    destination: '/auth',
                    permanent: false,
                },
            };
        }
        const event = await Event.getEventById(id);

        const comments = await Comment.getCommentsByEvent(id);

        return {
            props: {
                event,
                comments,
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }
}

EventDetailPage.auth = true;
