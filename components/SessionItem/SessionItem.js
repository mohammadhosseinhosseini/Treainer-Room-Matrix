import React from 'react'
import { Button, TableRow, TableCell, Chip } from '@mui/material'
import { isDateEqual } from '../../helper/helpers'
import SessionItemSeats from './SessionItemSeats'
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone'
import ClassTwoToneIcon from '@mui/icons-material/ClassTwoTone'

const getBorderColor = (session_type) => {
    switch (session_type) {
        case 'Classroom':
            return 'gray'
        case 'Webinar':
            return '#ccc'
        case 'Microsof Teams':
            return '#4287f5'
        default:
            return '#4287f5'
    }
}

const getBGColor = (session_type) => {
    switch (session_type) {
        case 'Classroom':
            return '#ababab'
        case 'Webinar':
            return '#eee'
        case 'Microsof Teams':
            return '#28c6ed'
        default:
            return '#28c6ed'
    }
}

const getColor = (session_type) => {
    switch (session_type) {
        case 'Classroom':
            return '#fff'
        case 'Webinar':
            return '#000'
        case 'Microsof Teams':
            return '#fff'
        default:
            return '#fff'
    }
}

function SessionItem({ session, date, showSessionDetail, isRoom }) {
    const {
        session_type,
        litmos_session_name,
        available_seats,
        max_seats,
        session_dates,
    } = session
    return (
        <div
            className={`SessionItem `}
            onClick={() => {
                const dates = session_dates.map((session_date) => {
                    if (isDateEqual(session_date.start_date, date))
                        return session_date
                })
                showSessionDetail({
                    ...session,
                    ...dates[0],
                })
            }}
            style={{
                borderColor: getBorderColor(session_type),
                backgroundColor: getBGColor(session_type),
                color: getColor(session_type),
            }}
        >
            <SessionItemSeats
                availableSeats={available_seats}
                maxSeats={max_seats}
            />
            <div className='d-flex mt-1'>
                {/* <ClassTwoToneIcon style={{ fontSize: 20 }} /> */}
                <p className='m-0 ms-1' style={{ fontSize: 12, color: '#333' }}>
                    <strong>Name:</strong>
                    {litmos_session_name}
                </p>
            </div>

            <div className='d-flex mt-1'>
                {/* <SchoolTwoToneIcon style={{ fontSize: 20 }} /> */}
                <p className='m-0 ms-1' style={{ fontSize: 12, color: '#333' }}>
                    {isRoom ? (
                        <>
                            <strong>Trainer:</strong>{' '}
                            {session.instructors.map((i) => i.name).join(', ')}
                        </>
                    ) : (
                        <>
                            <strong>Room:</strong> {session.room.name} (
                            {session.room.city})
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}

export default SessionItem
