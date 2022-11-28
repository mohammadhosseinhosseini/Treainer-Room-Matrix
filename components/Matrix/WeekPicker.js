import React, { useEffect } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { IconButton } from '@mui/material'

import { getWeekNumber } from '../../helper/helpers'

import dayjs from 'dayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

dayjs.extend(isBetweenPlugin)

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'dayIsBetween' &&
        prop !== 'isFirstDay' &&
        prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.dark,
        },
    }),
    ...(isFirstDay && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
}))

function WeekPicker({ week, changeWeek, changeWeekOnce, disabled }) {
    const [value, setValue] = React.useState(null)

    useEffect(() => {
        setValue(dayjs(week[0]))
    }, [week])

    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!value) {
            return <PickersDay {...pickersDayProps} />
        }

        const start = value.startOf('week')
        const end = value.endOf('week')

        const dayIsBetween = date.isBetween(start, end, null, '[]')
        const isFirstDay = date.isSame(start, 'day')
        const isLastDay = date.isSame(end, 'day')

        return (
            <CustomPickersDay
                {...pickersDayProps}
                disableMargin
                dayIsBetween={dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
            />
        )
    }

    return (
        <div>
            <div className='d-flex align-items-center'>
                <div>
                    <IconButton
                        color='primary'
                        disabled={disabled}
                        onClick={() => {
                            changeWeekOnce(false)
                        }}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton
                        color='primary'
                        disabled={disabled}
                        onClick={() => {
                            changeWeekOnce(true)
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </div>
                {/* <h2>CW{getWeekNumber(week[0])}</h2> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        disabled={disabled}
                        displayStaticWrapperAs='desktop'
                        label='Week picker'
                        value={week[0]}
                        onChange={(newValue) => {
                            changeWeek(newValue)
                            console.log(new Date(newValue))
                        }}
                        renderDay={renderWeekPickerDay}
                        renderInput={(params) => (
                            <TextField disabled={disabled} {...params} />
                        )}
                        inputFormat={`CW${getWeekNumber(week[0])}`}
                    />
                </LocalizationProvider>
            </div>

            <div></div>
        </div>
    )
}

export default WeekPicker
