import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from "./event-utils.js";
const Calendar = () => {
    console.log(INITIAL_EVENTS);
    console.log(createEventId());
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [MyTitle, setMyTitle] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            history.push("/");
        }
    }, []);

    function renderSidebar() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className='demo-app-sidebar'>
                            <div className='demo-app-sidebar-section'>
                                <h2>Instructions</h2>
                                <ul>
                                    <li>Select dates and you will be prompted to create a new event</li>
                                    <li>Drag, drop, and resize events</li>
                                    <li>Click an event to delete it</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event');
        setMyTitle(...title);
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect() // clear date selection
        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            });
        }
    }

    const handleEventClick = (clickInfo) => {
        clickInfo.event.remove()
    }

    const handleEvents = (events) => {
        setCurrentEvents({
            currentEvents: events
        })
    }

    function renderEventContent(eventInfo) {
        console.log(eventInfo.event.title);
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className='demo-app'>
                        {renderSidebar()}
                        <div className='demo-app-main'>
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                }}
                                initialView='dayGridMonth'
                                editable={true}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                weekends={weekendsVisible}
                                initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                                select={handleDateSelect}
                                eventContent={renderEventContent} // custom render function
                                eventClick={handleEventClick}
                                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                            /* you can update a remote database when these fire:
                            eventAdd={function(){}}
                            eventChange={function(){}}
                            eventRemove={function(){}}
                            */
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Calendar
