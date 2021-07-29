import React from 'react';
import './styles/Calendar.scss';

const Calendar = ({ calendar }) => {
    return (
        <>
            <ul>
                <li>
                <div className="week">
                    weeks
                </div>
                <div className="day">
                    days
                </div>
                <div className="hours">
                    <div className="hour 9am">9am</div>
                    <div className="hour 10am">10am</div>
                    <div className="hour 11am">11am</div>
                    <div className="hour 12pm">12am</div>
                    <div className="hour 1pm">1pm</div>
                    <div className="hour 2pm">2pm</div>
                    <div className="hour 3pm">3pm</div>
                    <div className="hour 4pm">4pm</div>
                    <div className="hour 5pm">5pm</div>
                </div>
                </li>
                {calendar.map(day => {
                return (
                    <li key={day.num} id={day.num}> 
                    <div className="week">
                        {day.week}
                    </div>
                    <div className="day">
                        {day.day} {day.num}
                    </div>
                    <div className="hours">
                        <div className="9am"><div className="event">event</div></div>
                        <div className="10am"></div>
                        <div className="11am"></div>
                        <div className="12pm"></div>
                        <div className="1pm"></div>
                        <div className="2pm"></div>
                        <div className="3pm"></div>
                        <div className="4pm"></div>
                        <div className="5pm"></div>
                    </div>
                    </li>
                )
                })}
            </ul>
        </>
    );
};

export default Calendar;