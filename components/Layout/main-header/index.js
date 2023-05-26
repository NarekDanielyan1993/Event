import Link from 'next/dist/client/link'
import React from 'react'

import classes from "./main-header.module.scss"

function MainHeader() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href='/events'>All events</Link>
            </div>
            <nav>
                <Link href='/'>filtered events</Link>
            </nav>
        </header>
    )
}

export default MainHeader