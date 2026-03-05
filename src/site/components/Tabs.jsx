import React, { useState } from 'react';
import moment from 'moment';

// Helper function to get the current day name
const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDate = new Date();
    return days[currentDate.getDay()];
};

const Tabs = ({ opdTime, activeTab, handleTabClick }) => {
    const { week } = opdTime
    const currentDay = getCurrentDay();
    const formatTime = (time) => {
        return moment(time, 'HH:mm').format('h:mm A');
    };


    return (
        <>
            <ul className="nav nav-pills opd-locations">
                {week.map((day, index) => (
                    <li className="nav-item" key={index}>
                        <a
                            className={`nav-link ${activeTab?.label === day.location ? 'active' : ''}`}
                            onClick={(event) => handleTabClick(day.city, day.location, event)}
                            href={`#${day.location.replace(" ", "_")}`}
                            role="tab"
                            aria-controls={day.location.replace(" ", "_")}
                            aria-selected={activeTab?.label === day.location}
                            id={`${day.location.replace(" ", "_")}-tab`}
                        >
                            {day.location}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {week.map((day, index) => (
                    <div
                        key={index}
                        className={`tab-pane opd-bg fade ${activeTab?.label === day.location ? 'show active' : ''}`}
                        id={day.location.replace(" ", "_")}
                        role="tabpanel"
                        aria-labelledby={`${day.location.replace(" ", "_")}-tab`}
                    >
                        {/* Render the timetable for the current location */}
                        <table className="time-table">
                            <tr>
                                {Object.keys(day.timings).map((key, idx) => (
                                    <>
                                    { key !== 'sunday' &&
                                    <td key={idx}>
                                        {key.substring(0, 3).charAt(0).toUpperCase() + key.substring(1, 3)} {key === currentDay && <div className='today-highlighter'>Today</div>}
                                    </td>
                                }
                                </>
                                ))}
                            </tr>
                            <tr>
                                {Object.keys(day.timings).map((key, idx) => (
                                    <>
                                    { key !== 'sunday' &&
                                    <td key={idx}>
                                        {day.timings[key].status ? (
                                            <div>
                                                {day.timings[key].times.map((time, idx) => (
                                                    <div key={idx}>
                                                        {formatTime(time.openTime)} - {formatTime(time.closeTime)}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className='time-status'>{day.timings[key].apppoiment_status ? day.timings[key].apppoiment_status : '-' }</p>
                                        )}
                                    </td>
                                    }
                                    </>
                                ))}
                            </tr>
                        </table>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Tabs;
