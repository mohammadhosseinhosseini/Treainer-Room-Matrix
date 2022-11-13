import React from 'react'
import { Button, TableRow, TableCell, Chip } from '@mui/material'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import { isDateEqual } from '../helper/helpers'

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

function SessionItem({ session, date, showSessionDetail }) {
    const {
        session_type,
        litmos_session_name,
        available_seats,
        max_seats,
        session_dates,
    } = session
    return (
        <div
            className='SessionItem'
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
            <Chip
                label={`${available_seats}/${max_seats}`}
                size='small'
                icon={<PeopleAltTwoToneIcon style={{ fontSize: 12 }} />}
                color={
                    available_seats === 0
                        ? 'error'
                        : available_seats <= 4
                        ? 'warning'
                        : 'success'
                }
                style={{
                    fontSize: 10,
                    color: 'white',
                    padding: 0,
                }}
            />
            <p
                className='m-0'
                style={{
                    fontSize: 10,
                }}
            >
                {litmos_session_name}
            </p>
        </div>
    )
}

export default SessionItem
