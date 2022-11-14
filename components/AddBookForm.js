import {
    Switch,
    TextField,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
} from '@mui/material'
import { collection, addDoc } from 'firebase/firestore'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import organizations from '../data/organizations'
import DatePickerList from './DatePickerList'
import { LoadingButton } from '@mui/lab'

import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone'

import { db } from '../firebase/db'

function AddBookForm({
    rooms,
    instructors,
    selectedRoom,
    selectedInstrucor,
    course,
    selectedDate,
    addBookedDate,
    closeModal,
}) {
    const [activeSession, setActiveSession] = useState(false)
    const [room, setRoom] = useState('')
    const [instructor, setInstructor] = useState('')
    const [maxSeats, setMaxSeats] = useState(12)
    const [sessionType, setSessionType] = useState('')
    const [trainingRefrenceNumber, setTrainingRefrenceNumber] = useState('')
    const [dates, setDates] = useState([])
    const minSeats = 1

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (selectedRoom !== '') {
            setRoom(selectedRoom)
        }
        setDates([
            {
                start_date: selectedDate,
                end_date: selectedDate,
                start_time: new Date(),
                end_time: new Date(),
            },
        ])
    }, [])

    const handleRoomChange = (e) => {
        setRoom(e.target.value)
    }

    const handleInstructorChange = (e) => {
        setInstructor(e.target.value)
    }

    const handleSessionTypeChange = (e) => {
        setSessionType(e.target.value)
    }

    const litmos_session_name = `${course.name}-${trainingRefrenceNumber}-${
        instructor &&
        organizations.find(
            (o) =>
                o.id ==
                instructors.find((i) => i.id == instructor).organization_id
        ).name
    }`

    const onSave = async () => {
        if (room === '') {
            alert('Please select a location')
            return
        }
        if (instructor === '') {
            alert('Please select an instructor')
            return
        }
        if (maxSeats < minSeats) {
            alert('Max seats must be greater or equal than min seats')
            return
        }
        if (trainingRefrenceNumber === '') {
            alert('Please enter a training reference number')
            return
        }
        if (sessionType === '') {
            alert('Please select a session type')
            return
        }
        dates.map((date) => {
            if (date.start_date === null) {
                alert('Please select a start date')
                return
            }
            if (date.end_date === null) {
                alert('Please select an end date')
                return
            }
            if (date.start_time === null) {
                alert('Please select a start time')
                return
            }
            if (date.end_time === null) {
                alert('Please select an end time')
                return
            }
        })

        // setLoading(true)

        const docRef = collection(db, 'bookedDates')

        const session_dates = dates.map((date) => {
            return {
                start_date: date.start_date.toString(),
                end_date: date.end_date.toString(),
                start_time: date.start_time.toString(),
                end_time: date.end_time.toString(),
            }
        })

        const newBookedDate = await addDoc(docRef, {
            litmos_session_name: litmos_session_name,
            room_id: parseInt(room),
            instructor_id: parseInt(instructor),
            time_zone: 'Europe/Berlin',
            min_seats: 1,
            available_seats: parseInt(maxSeats),
            max_seats: parseInt(maxSeats),
            training_reference_number: trainingRefrenceNumber,
            session_type: sessionType,
            session_dates,
        })

        alert('Session added successfully')
        closeModal()
        setLoading(false)
    }

    return (
        <div>
            <FormControlLabel
                control={
                    <Switch
                        checked={activeSession}
                        onChange={(e) => {
                            setActiveSession(e.target.checked)
                        }}
                    />
                }
                label='Active Session'
            />
            <div>Course: {course.name}</div>
            <TextField
                label='Litmos session name'
                variant='outlined'
                fullWidth
                className='my-3'
                value={litmos_session_name}
                disabled
            />
            <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Location</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={room}
                    label='Location'
                    onChange={handleRoomChange}
                    // className='my-3'
                >
                    {rooms.map((r) => (
                        <MenuItem key={r.id} value={r.id}>
                            {r.name} {r.city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth className='my-3'>
                <InputLabel id='instructors'>Instructor</InputLabel>
                <Select
                    labelId='instructors'
                    id='instructors'
                    value={instructor}
                    label='Instructor'
                    onChange={handleInstructorChange}
                    // className='my-3'
                >
                    {instructors.map((i) => (
                        <MenuItem key={i.id} value={i.id}>
                            {i.name} {i.organization}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label='Min seats'
                variant='outlined'
                fullWidth
                className='my-3'
                value={minSeats}
                disabled
            />
            <TextField
                label='Max seats'
                variant='outlined'
                fullWidth
                className='my-3'
                value={maxSeats}
                onChange={(e) => {
                    setMaxSeats(e.target.value)
                }}
            />
            <TextField
                label='Availabe seats'
                variant='outlined'
                fullWidth
                className='my-3'
                value={maxSeats}
                disabled
            />

            <TextField
                label='Training Refrence Number'
                variant='outlined'
                fullWidth
                className='my-3'
                value={trainingRefrenceNumber}
                onChange={(e) => {
                    setTrainingRefrenceNumber(e.target.value)
                }}
            />

            <FormControl fullWidth className='my-3'>
                <InputLabel id='session_type'>Session Type</InputLabel>
                <Select
                    labelId='session_type'
                    id='session_type'
                    value={sessionType}
                    label='Instructor'
                    onChange={handleSessionTypeChange}
                    // className='my-3'
                >
                    <MenuItem value='Webinar'>Webinar</MenuItem>
                    <MenuItem value='Classroom'>Classroom</MenuItem>
                    <MenuItem value='Microsoft Teams'>Microsoft Teams</MenuItem>
                </Select>
            </FormControl>

            <DatePickerList dates={dates} setDates={setDates} />

            <LoadingButton
                variant='contained'
                color='primary'
                onClick={onSave}
                fullWidth
                loading={loading}
                loadingPosition='start'
                startIcon={<SaveTwoToneIcon />}
            >
                Save
            </LoadingButton>
        </div>
    )
}

export default AddBookForm
