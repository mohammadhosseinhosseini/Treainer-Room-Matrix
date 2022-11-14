import React from 'react'
import { Modal, Box, Button, IconButton } from '@mui/material'
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone'
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone'
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone'
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import ClassTwoToneIcon from '@mui/icons-material/ClassTwoTone'
import InsertLinkTwoToneIcon from '@mui/icons-material/InsertLinkTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import NightsStayTwoToneIcon from '@mui/icons-material/NightsStayTwoTone'
import RoomPreferencesTwoToneIcon from '@mui/icons-material/RoomPreferencesTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'

import { db } from '../firebase/db'
import { doc, deleteDoc } from 'firebase/firestore'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
}

function SessionDetail({ open, handleClose, session }) {
    if (session == null) return <></>
    const { session_dates } = session

    const handleDeleteSession = async () => {
        try {
            await deleteDoc(doc(db, 'bookedDates', session.firebase_id))
            alert('Session deleted')
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
            >
                <Box sx={style}>
                    <div className='row'>
                        <div className='col-4'>
                            <CreateTwoToneIcon className='me-2' />
                            Name
                        </div>
                        <div className='col-8'>
                            {session.litmos_session_name}
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-4'>
                            <EventNoteTwoToneIcon className='me-2' />
                            Start
                        </div>
                        <div className='col-8'>
                            {session_dates[0].start_date.toLocaleDateString(
                                'de-DE',
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-4'>
                            <EventBusyTwoToneIcon className='me-2' />
                            End
                        </div>
                        <div className='col-8'>
                            {session_dates[
                                session_dates.length - 1
                            ].end_date.toLocaleDateString('de-DE', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-4'>
                            <PendingActionsTwoToneIcon className='me-2' />
                            Time
                        </div>
                        <div className='col-8'>
                            {session_dates.map((date, i) => {
                                return (
                                    <div key={i}>
                                        {date.start_date.toLocaleDateString(
                                            'de-DE',
                                            {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            }
                                        )}
                                        {' - '}
                                        {date.start_time.toLocaleTimeString(
                                            'de-DE',
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            }
                                        )}{' '}
                                        -{' '}
                                        {date.end_time.toLocaleTimeString(
                                            'de-DE',
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            }
                                        )}
                                    </div>
                                )
                            })}
                            {/* Start: {} {session.start_time.getHours()}:
                            {session.start_time.getMinutes()}
                            <br />
                            End Time: {session.end_time.getHours()}:
                            {session.end_time.getMinutes()} */}
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-4'>
                            <RoomPreferencesTwoToneIcon className='me-2' />
                            Training reference number
                        </div>
                        <div className='col-8'>
                            {session.training_reference_number}
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-4'>
                            <PeopleAltTwoToneIcon className='me-2' />
                            Seats
                        </div>
                        <div className='col-8'>
                            {session.available_seats}/{session.max_seats}
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-4'>
                            <ClassTwoToneIcon className='me-2' />
                            Type
                        </div>
                        <div className='col-8'>{session.session_type}</div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-4'>
                            <NightsStayTwoToneIcon className='me-2' />
                            Time Zone
                        </div>
                        <div className='col-8'>{session.time_zone}</div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-4'>
                            <InsertLinkTwoToneIcon className='me-2' />
                            Course Link
                        </div>
                        <div className='col-8'>
                            <Button
                                variant='outlined'
                                color='info'
                                startIcon={<CreateTwoToneIcon />}
                                className='me-2'
                            >
                                Edit Course
                            </Button>
                            <Button
                                variant='outlined'
                                color='warning'
                                startIcon={<VisibilityTwoToneIcon />}
                            >
                                Show Course
                            </Button>
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-4'>
                            <HighlightOffTwoToneIcon className='me-2' />
                            Delete
                        </div>
                        <div className='col-8'>
                            <Button
                                variant='outlined'
                                color='error'
                                startIcon={<DeleteForeverTwoToneIcon />}
                                className='me-2'
                                onClick={handleDeleteSession}
                            >
                                Delete Session (test purposes)
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default SessionDetail
