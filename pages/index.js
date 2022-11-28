import { useState, useEffect } from 'react'
import DropDown from '../components/DropDown'
import Matrix from '../components/Matrix'
import InstructorDropDown from '../components/InstructorDropDown'
import AddBook from '../components/AddBook'
import SessionDetail from '../components/SessionDetail'

import axios from 'axios'

function Home() {
    const [rooms, setRooms] = useState([])
    const [instructors, setInstructors] = useState([])
    const [bookedDates, setBookedDates] = useState([])
    const [organizations, setOrganizations] = useState([])
    const [courses, setCourses] = useState([])
    const [showAddBook, setShowAddBook] = useState(false)
    const [session, setSession] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const { data } = await axios.get('/api/data')

        setCourses(data.courses)

        setBookedDates(
            data.bookedDates.map((date) => {
                return {
                    ...date,
                    session_dates: date.session_dates.map((date) => {
                        return {
                            start_date: new Date(date.start_date),
                            end_date: new Date(date.end_date),
                            start_time: new Date(date.start_time),
                            end_time: new Date(date.end_time),
                        }
                    }),
                }
            })
        )

        setInstructors(
            data.instructors.map((instructor) => {
                return {
                    ...instructor,
                    firebase_id: instructor.firebase_id,
                    checked: instructor.id === 1 || instructor.id === 2,
                }
            })
        )

        setRooms(
            data.rooms.map((room) => {
                return {
                    ...room,
                    firebase_id: room.firebase_id,
                    checked: room.id === 1 || room.id === 2,
                }
            })
        )

        setOrganizations(data.organizations)
    }

    const handleRoomCheck = (id) => {
        const newRooms = [...rooms]
        newRooms.map((room) => {
            if (room.id === id) {
                room.checked = !room.checked
            }
        })
        setRooms(newRooms)
    }

    const handleInstructorCheck = (id) => {
        const newInstructors = [...instructors]
        newInstructors.map((instructor) => {
            if (instructor.id === id) {
                instructor.checked = !instructor.checked
            }
        })
        setInstructors(newInstructors)
    }

    const handleAddBook = () => {
        setShowAddBook(true)
    }

    const handleAddBookWithRoom = (room_id, date) => {
        const res = rooms.find((room) => room.id === room_id)
        setSelectedRoom(res.id)
        setShowAddBook(true)
        setSelectedDate(date)
    }

    const handleCloseAddBook = () => {
        setShowAddBook(false)
    }

    const handleShowSessionDetail = (session) => {
        setSession(session)
    }

    const handleCloseSessionDetail = () => {
        setSession(null)
    }

    const selectedRooms = rooms.filter((room) => room.checked)

    const selectedInstructors = instructors.filter(
        (instructor) => instructor.checked
    )

    const addBookedDate = (bookedDate) => {
        setBookedDates((pre) => [
            ...pre,
            {
                ...bookedDate,
                session_dates: bookedDate.session_dates.map((date) => {
                    return {
                        start_date: new Date(date.start_date),
                        end_date: new Date(date.end_date),
                        start_time: new Date(date.start_time),
                        end_time: new Date(date.end_time),
                    }
                }),
            },
        ])
    }

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-9'>
                    <div>
                        <Matrix
                            bookedDates={bookedDates}
                            rooms={selectedRooms}
                            instructors={selectedInstructors}
                            handleAddBook={handleAddBook}
                            showSessionDetail={handleShowSessionDetail}
                            handleAddBookWithRoom={handleAddBookWithRoom}
                            courses={courses}
                            refreshData={getData}
                        />
                    </div>
                </div>
                <div className='col-3'>
                    <DropDown data={rooms} handleCheck={handleRoomCheck} />
                    <br />
                    <InstructorDropDown
                        instructors={instructors}
                        organizations={organizations}
                        handleCheck={handleInstructorCheck}
                    />
                </div>
            </div>
            <AddBook
                open={showAddBook}
                handleClose={handleCloseAddBook}
                rooms={rooms}
                selectedRoom={selectedRoom}
                instructors={instructors}
                selectedDate={selectedDate}
                addBookedDate={addBookedDate}
                courses={courses}
            />
            <SessionDetail
                open={session != null}
                session={session}
                handleClose={handleCloseSessionDetail}
            />
        </div>
    )
}

export default Home
