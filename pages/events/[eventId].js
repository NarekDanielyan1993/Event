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
import Event from 'pages/api/events/event.model';
import {
    useCreateComment,
    useDeleteComment,
    useGetComments,
    useUpdateComment,
} from 'services/comment';

export default function EventDetailPage({ event }) {
    const [commentList, setCommentList] = useState([]);

    const [showComments, setShowComments] = useState(false);

    const { isLoading: isCreateCommentLoading, createComment } =
        useCreateComment();

    const {
        isLoading: isCommentsLoading,
        getComments,
        isFetched: isCommentsFetched,
    } = useGetComments();

    const { isLoading: isUpdateCommentLoading, updateComment } =
        useUpdateComment();

    const { isLoading: isDeleteCommentLoading, deleteComment } =
        useDeleteComment();

    const getCommentsHandler = async () => {
        if (!isCommentsFetched) {
            await getComments(event._id, (allComments) => {
                setCommentList(allComments);
            });
        }
        setShowComments((prev) => !prev);
    };

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
                isUpdateCommentLoading ||
                isCommentsLoading) && <Loader />}
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
                        isCommentsFetched={isCommentsFetched}
                        onDeleteComments={deleteComments}
                        onGetComments={getCommentsHandler}
                        onSubmit={onSubmit}
                        onUpdateComments={updateComments}
                        showComments={showComments}
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

        return {
            props: {
                event,
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
