import React from 'react'

import classes from "./events-search.module.scss";

function EventsSearch({onSearch}) {

    const onFilterEventsHandler = (event) => {
        event.preventDefault()
        console.log(event.target[1].name)
        const year = event.target[0].value;
        const month = event.target[1].value;
        onSearch(+month, +year)
    }

    return (
        <>
            <form className={classes.form} onSubmit={onFilterEventsHandler}>
                <div className={classes.control}>
                    <label>Year: </label>
                    <select name='year'>
                        <option value={2021}>2021</option>
                        <option value={2022}>2022</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label>Month: </label>
                    <select name='month'>
                        <option value={1}>January</option>
                        <option value={2}>February</option>
                        <option value={3}>March</option>
                        <option value={4}>April</option>
                        <option value={5}>May</option>
                        <option value={6}>June</option>
                        <option value={7}>July</option>
                        <option value={8}>August</option>
                        <option value={9}>September</option>
                        <option value={10}>October</option>
                        <option value={11}>Novermber</option>
                        <option value={12}>December</option>
                    </select>
                </div>
                <button onSubmit={onFilterEventsHandler} className={classes.action}>Find Events</button>
            </form>    
        </>
    )
}

export default EventsSearch