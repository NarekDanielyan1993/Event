// .eventCard {
//     position: relative;
//     flex: 0 0 280px;
//     background-color: white;
//     box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     transition: background-color 0.3s ease;

//     .img {
//         width: 100%;
//         height: 200px;
//         object-fit: fill;
//         border-radius: 5px;
//     }

//     .content {
//         padding: 5px;

//         & time {
//             color: #666666;
//             font-weight: bold;
//         }

//         & address {
//             margin: 0.5rem 0;
//             color: #666666;
//             white-space: pre;
//         }
//     }

//     .title {
//         text-align: center;
//     }

//     .overlay {
//         position: absolute;
//         display: block;
//         width: 100%;
//         height: 100%;
//         top: 0;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         background-color: rgba(0,0,0,0.7);
//         z-index: 2;
//         opacity: 0;
//         transition: .5s ease;

//         & .actions {
//             position: absolute;
//             bottom: 0;
//   	        left: 50%;
//             display: flex;
//             justify-content: center;
//   	        transform: translate(-50%, 50%);
//             transition: .5s ease;

//             & a {
//                 color: #4CAF50;
//                 display: inline-block;
//                 background-color: transparent;
//                 border: 0;
//                 padding: 6px 8px;
//                 text-transform: uppercase;
//                 transition: .5s ease;
//             }

//             & a:hover, button:hover {
//                 color: darken($color: #4CAF50, $amount: 10%);
//             }

//             & .delete {
//                 color: red;

//                 &:hover {
//                     color: darken($color: red, $amount: 10%);
//                 }
//             }
//         }
//     }

//     &:hover .overlay {
//         opacity: 1;
//     }

//     &:hover .overlay:hover .actions {
//         bottom: 50%;
//     }
// }

// .eventCard {
//     position: relative;
//     flex: 0 0 280px;
//     background-color: white;
//     box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     transition: background-color 0.3s ease;

//     .img {
//         width: 100%;
//         height: 200px;
//         object-fit: fill;
//         border-radius: 5px;
//     }

//     .content {
//         padding: 5px;

//         & time {
//             color: #666666;
//             font-weight: bold;
//         }

//         & address {
//             margin: 0.5rem 0;
//             color: #666666;
//             white-space: pre;
//         }
//     }

//     .title {
//         text-align: center;
//     }

//     .submit {
//         margin-top: auto;
//         padding: 5px;
//         & > a {
//             text-align: center;
//             display: block;
//             background-color: transparent;
//             border: 1px solid beige;
//             border-radius: 5px;
//             margin: 0 auto;
//             width: 100%;
//             padding: 8px;
//             text-transform: uppercase;
//             font-weight: bold;
//             color: white;
//         }
//     }

//     .submit:hover > a {
//         background-color: darken($color: aqua, $amount: 10%);
//     }

//     .overlay {
//         position: absolute;
//         display: block;
//         width: 100%;
//         height: 100%;
//         top: 0;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         background-color: rgba(0,0,0,0.7);
//         z-index: 2;
//         opacity: 0;
//         transition: .5s ease;

//         & .actions {
//             position: absolute;
//             bottom: 0;
//   	        left: 50%;
//             display: flex;
//             justify-content: center;
//   	        transform: translate(-50%, 50%);
//             transition: .5s ease;

//             & a {
//                 color: #4CAF50;
//                 display: inline-block;
//                 background-color: transparent;
//                 border: 0;
//                 padding: 6px 8px;
//                 text-transform: uppercase;
//                 transition: .5s ease;
//             }

//             & a:hover, button:hover {
//                 color: darken($color: #4CAF50, $amount: 10%);
//             }

//             & .delete {
//                 color: red;

//                 &:hover {
//                     color: darken($color: red, $amount: 10%);
//                 }
//             }
//         }
//     }

//     &:hover .overlay {
//         opacity: 1;
//     }

//     &:hover .overlay:hover .actions {
//         bottom: 50%;
//     }
// }

import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Image from 'next/image';

export const StyledEventCard = styled('div')(({ theme }) => ({
    position: 'relative',
    // flex: '0 0 280px',
    maxWidth: '280px',
    backgroundColor: 'white',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    transition: 'background-color 0.3s ease',

    '& .submit': {
        marginTop: 'auto',
        padding: '5px',

        '& > a': {
            textAlign: 'center',
            display: 'block',
            backgroundColor: 'transparent',
            border: '1px solid beige',
            borderRadius: '5px',
            margin: '0 auto',
            width: '100%',
            padding: '8px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: 'white',
        },
    },

    '& .submit:hover > a': {
        backgroundColor: theme.palette.aqua,
    },
}));

export const StyledOverlay = styled('div')(({ theme }) => ({
    '&': {
        position: 'absolute',
        display: 'block',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 2,
        opacity: 0,
        transition: '0.5s ease',

        '& .actions': {
            position: 'absolute',
            bottom: 0,
            left: '50%',
            display: 'flex',
            justifyContent: 'center',
            transform: 'translate(-50%, 50%)',
            transition: '0.5s ease',

            '& a': {
                color: '#4CAF50',
                display: 'inline-block',
                backgroundColor: 'transparent',
                border: 0,
                padding: '6px 8px',
                textTransform: 'uppercase',
                transition: '0.5s ease',
            },

            '& a:hover, button:hover': {
                color: theme.palette.primary.darker,
            },

            '& .delete': {
                color: 'red',

                '&:hover': {
                    color: 'red',
                },
            },
        },
    },

    '&:hover': {
        opacity: 1,
    },

    '&:hover .actions': {
        bottom: '50%',
    },
}));

export const StyledText = styled(Typography)(({ theme }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}));

export const StyledContent = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1.5),
    gap: theme.spacing(2),
    textAlign: 'center',
}));

export const StyledImage = styled(Image)(({ theme }) => ({
    '&': {
        width: '100%',
        display: 'block',
        height: theme.spacing(26),
        objectFit: 'fill',
        borderRadius: '5px',
    },
}));
