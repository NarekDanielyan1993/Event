import React from 'react';
import Link from "next/link";

function EventButton({style, className, href, buttonText}) {
    return (
        <Link 
            style={{...style}}
            className={className} 
            href={href}
        >
            {buttonText}
        </Link>
    )
}

export default EventButton;