import React from 'react'
import { Button, TableRow, TableCell, Chip } from '@mui/material'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'

function SessionItemSeats({ availableSeats, maxSeats }) {
    // console.log(getSeatsStatus(availableSeats, maxSeats))
    const getSeatsStatus = () => {
        const ratio = (maxSeats - availableSeats) / maxSeats
        if (ratio >= 0.5) return 'success'
        if (ratio >= 0.33) return 'warning'
        return 'error'
    }
    return (
        <div>
            <Chip
                label={`${availableSeats}/${maxSeats}`}
                size='small'
                icon={<PeopleAltTwoToneIcon style={{ fontSize: 12 }} />}
                color={getSeatsStatus()}
                style={{
                    fontSize: 10,
                    color: 'white',
                    padding: 0,
                }}
            />
        </div>
    )
}

export default SessionItemSeats
