import React from 'react'
import {
    Switch,
    TextField,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    IconButton,
} from '@mui/material'

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'

import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import AlarmAddTwoToneIcon from '@mui/icons-material/AlarmAddTwoTone'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'

function DatePickerList({ dates, setDates }) {
    const handleChangeStartDate = (date, index) => {
        setDates((pre) => {
            const newDates = [...pre]
            newDates[index].start_date = date
            return newDates
        })
    }

    const handleChangeEndDate = (date, index) => {
        setDates((pre) => {
            const newDates = [...pre]
            newDates[index].end_date = date
            return newDates
        })
    }
    const handleChangeStartTime = (date, index) => {
        setDates((pre) => {
            const newDates = [...pre]
            newDates[index].start_time = date
            return newDates
        })
    }

    const handleChangeEndTime = (date, index) => {
        setDates((pre) => {
            const newDates = [...pre]

            newDates[index].end_time = date
            return newDates
        })
    }

    const handleAddDate = () => {
        setDates((pre) => {
            const newDates = [...pre]
            newDates.push({
                start_date: null,
                end_date: null,
                start_time: null,
                end_time: null,
            })
            return newDates
        })
    }

    const moveDateUp = (index) => {
        setDates((pre) => {
            const newDates = [...pre]
            const temp = newDates[index]
            newDates[index] = newDates[index - 1]
            newDates[index - 1] = temp
            return newDates
        })
    }

    const moveDateDown = (index) => {
        setDates((pre) => {
            const newDates = [...pre]
            const temp = newDates[index]
            newDates[index] = newDates[index + 1]
            newDates[index + 1] = temp
            return newDates
        })
    }

    const handleDeleteDate = (index) => {
        setDates((pre) => {
            const newDates = [...pre]
            newDates.splice(index, 1)
            return newDates
        })
    }

    const handleCopyDate = (index) => {
        setDates((pre) => {
            const newDates = [...pre]
            newDates.splice(index + 1, 0, { ...newDates[index] })
            return newDates
        })
    }

    return (
        <div>
            <div className='mb-3'>
                <div className='d-flex mb-3 align-items-center'>
                    <p className='m-0 me-3'>Session dates</p>
                    <Button
                        variant='outlined'
                        endIcon={<AlarmAddTwoToneIcon />}
                        // style={{ textTransform: 'none' }}
                        onClick={handleAddDate}
                    >
                        Add session date
                    </Button>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {dates.map((d, i) => (
                        <div key={i}>
                            <div className='d-flex align-items-center'>
                                <div className=''>
                                    <IconButton
                                        size='small'
                                        onClick={() => {
                                            moveDateUp(i)
                                        }}
                                    >
                                        <KeyboardArrowUpTwoToneIcon />
                                    </IconButton>
                                    <IconButton
                                        size='small'
                                        onClick={() => {
                                            moveDateDown(i)
                                        }}
                                    >
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                </div>
                                <div className='me-2'>
                                    <DesktopDatePicker
                                        label='Start Date'
                                        inputFormat='DD/MM/YYYY'
                                        value={d.start_date}
                                        onChange={(newDate) => {
                                            handleChangeStartDate(newDate, i)
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                size='small'
                                            />
                                        )}
                                    />
                                </div>
                                <div className='me-2'>
                                    <DesktopDatePicker
                                        label='End Date'
                                        inputFormat='DD/MM/YYYY'
                                        value={d.end_date}
                                        onChange={(newDate) => {
                                            handleChangeEndDate(newDate, i)
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                size='small'
                                            />
                                        )}
                                    />
                                </div>
                                <div className='me-2'>
                                    <TimePicker
                                        label='Start Time'
                                        ampm={false}
                                        value={d.start_time}
                                        onChange={(newDate) => {
                                            handleChangeStartTime(newDate, i)
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                size='small'
                                            />
                                        )}
                                    />
                                </div>
                                <div className=''>
                                    <TimePicker
                                        label='End Time'
                                        value={d.end_time}
                                        ampm={false}
                                        onChange={(newDate) => {
                                            handleChangeEndTime(newDate, i)
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                size='small'
                                            />
                                        )}
                                    />
                                </div>
                                <IconButton
                                    size='small'
                                    color='error'
                                    disabled={dates.length === 1}
                                    onClick={() => {
                                        handleDeleteDate(i)
                                    }}
                                >
                                    <DeleteTwoToneIcon />
                                </IconButton>
                                <IconButton
                                    size='small'
                                    color='warning'
                                    // disabled={dates.length === 1}
                                    onClick={() => {
                                        handleCopyDate(i)
                                    }}
                                >
                                    <ContentCopyTwoToneIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </LocalizationProvider>
            </div>
        </div>
    )
}

export default DatePickerList
