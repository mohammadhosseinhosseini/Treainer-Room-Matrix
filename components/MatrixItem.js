import React, { useEffect, useState } from 'react'
import { Button, TableRow, TableCell, Chip } from '@mui/material'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import { isDateEqual } from '../helper/helpers'

import SessionItem from './SessionItem/SessionItem'

function MatrixItem({
    id,
    name,
    week,
    onBookClick,
    isRoom,
    isBooked,
    showSessionDetail,
}) {
    return (
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': {
                    border: 0,
                },
            }}
        >
            <TableCell component='th' scope='row'>
                {name}
            </TableCell>
            {week.map((date) => {
                const booked_sessions = isBooked(id, date, isRoom)
                return (
                    <TableCell
                        key={date}
                        className='p-1'
                        style={{
                            height: 1,
                        }}
                    >
                        <div className='d-flex flex-column h-100'>
                            <Button
                                variant='contained'
                                className='m-0 mb-2'
                                size='small'
                                style={{
                                    fontSize: 12,
                                }}
                                onClick={() => {
                                    onBookClick(id, date)
                                }}
                            >
                                {/* {isRoom ? 'Book Room' : 'Book Trainer'} */}
                                Book
                            </Button>
                            {booked_sessions.length > 0 &&
                                booked_sessions.map((session, index) => (
                                    <SessionItem
                                        date={date}
                                        session={session}
                                        key={index}
                                        showSessionDetail={showSessionDetail}
                                        isRoom={isRoom}
                                    />
                                ))}
                        </div>
                    </TableCell>
                )
            })}
        </TableRow>
    )
}

export default MatrixItem
