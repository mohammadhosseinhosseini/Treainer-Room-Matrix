import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Button, IconButton } from '@mui/material'
import { isDateEqual, isWeekWqual } from '../helper/helpers'
import RestoreTwoToneIcon from '@mui/icons-material/RestoreTwoTone'
import LoopTwoToneIcon from '@mui/icons-material/LoopTwoTone'

import MatrixItem from './MatrixItem'
import WeekPicker from './Matrix/WeekPicker'
import Loading from './Loading'

const dates = (current) => {
    var week = new Array()
    // Starting Monday not Sunday
    current.setDate(current.getDate() - current.getDay() + 1)
    for (var i = 0; i < 7; i++) {
        week.push(new Date(current))
        current.setDate(current.getDate() + 1)
    }
    return week
}

const getWeekDay = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export default function Matrix({
    rooms,
    instructors,
    handleAddBook,
    bookedDates,
    showSessionDetail,
    handleAddBookWithRoom,
    courses,
    refreshData,
    loading,
}) {
    const [week, setWeek] = useState(dates(new Date()))
    useEffect(() => {}, [])

    const onClickBookRoom = (id, date) => {
        console.log(id, date)
        handleAddBook()
    }

    const onClickBookInstructor = (id, date) => {
        handleAddBook()
        console.log(id, date)
    }

    const changeWeekOnce = (forward = true) => {
        setWeek((pre) => {
            const now = pre[0]
            return dates(
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate() + (forward ? 7 : -7)
                )
            )
        })
    }

    const changeWeek = (date) => {
        setWeek(dates(new Date(date)))
    }

    const isBooked = (id, date, isRoom) => {
        let booked_sessions = []
        for (let i = 0; i < bookedDates.length; i++) {
            const bookedDate = bookedDates[i]
            if (
                (isRoom && bookedDate.room_id === id) ||
                (!isRoom && bookedDate.instructor_id === id)
            ) {
                for (let j = 0; j < bookedDate.session_dates.length; j++) {
                    const session_date = bookedDate.session_dates[j]
                    if (isDateEqual(session_date.start_date, date)) {
                        booked_sessions = [...booked_sessions, bookedDate]
                    }
                }
            }
        }
        return booked_sessions
    }

    return (
        <>
            <div className='mb-2 d-flex'>
                <WeekPicker
                    week={week}
                    changeWeek={changeWeek}
                    changeWeekOnce={changeWeekOnce}
                    disabled={loading}
                />
                <Button
                    className='ms-2'
                    variant='outlined'
                    color='primary'
                    startIcon={<RestoreTwoToneIcon />}
                    disabled={isWeekWqual(week[0], new Date())}
                    onClick={() => {
                        setWeek(dates(new Date()))
                    }}
                >
                    Current Week
                </Button>
                <Button
                    className='ms-auto'
                    variant='outlined'
                    color='success'
                    startIcon={<LoopTwoToneIcon />}
                    disabled={loading}
                    onClick={refreshData}
                >
                    Refresh Data
                </Button>
            </div>
            {loading ? (
                <div className='text-center' style={{ height: 350 }}>
                    <Loading />
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>Rooms</b>
                                </TableCell>
                                {week.map((date) => (
                                    <TableCell align='center' key={date}>
                                        {getWeekDay(date)}
                                        <br />
                                        <p
                                            className='m-0'
                                            style={{
                                                color: 'gray',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {date.toLocaleDateString('de-DE')}
                                        </p>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms.length > 0 &&
                                rooms.map((room) => (
                                    <MatrixItem
                                        key={room.id}
                                        id={room.id}
                                        name={`${room.name} (${room.city})`}
                                        week={week}
                                        onBookClick={handleAddBookWithRoom}
                                        isRoom
                                        isBooked={isBooked}
                                        showSessionDetail={showSessionDetail}
                                    />
                                ))}
                            <TableRow
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component='th' scope='row'>
                                    <b>Instructors</b>
                                </TableCell>
                                {week.map((day) => (
                                    <TableCell
                                        key={day}
                                        style={{ minWidth: 180 }}
                                    ></TableCell>
                                ))}
                            </TableRow>
                            {instructors.length > 0 &&
                                instructors.map((instructor) => (
                                    <MatrixItem
                                        key={instructor.id}
                                        id={instructor.id}
                                        name={instructor.name}
                                        week={week}
                                        onBookClick={onClickBookInstructor}
                                        isBooked={isBooked}
                                        showSessionDetail={showSessionDetail}
                                        courses={courses}
                                    />
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}
