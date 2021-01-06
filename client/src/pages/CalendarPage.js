import React from 'react'
import Calendar from '../components/calendar/Calendar'

const CalendarPage = (props) => {
    return (
        <div>
            <Calendar userData={props.userData} />
        </div>
    )
}

export default CalendarPage
