import React, { useState, useEffect } from 'react'
import { Button, TextField, Pagination } from '@mui/material'
import Fuse from 'fuse.js'

const maxCoursesPerPage = 5
function SelectCourseForm({ courses, selectCourse }) {
    const [searchedCourses, setSearchedCourses] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        setSearchedCourses(courses)
    }, [courses])

    const searchCourses = (e) => {
        const search = e.target.value
        if (search === '') {
            setSearchedCourses(courses)
        } else {
            const options = {
                includeScore: true,
                keys: ['name'],
            }
            const fuse = new Fuse(courses, options)
            const result = fuse.search(search)
            setSearchedCourses(result.map((r) => r.item))
            console.log(result)
        }
    }

    const handlePageChange = (e, value) => {
        setPage(value)
    }

    const shownCourses = searchedCourses.slice(
        (page - 1) * maxCoursesPerPage,
        page * maxCoursesPerPage
    )
    return (
        <div>
            <TextField
                id='outlined-basic'
                label='Search ...'
                variant='outlined'
                fullWidth
                onChange={searchCourses}
            />
            {shownCourses.map((c) => (
                <div
                    key={c.id}
                    className='my-3 d-flex'
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#eee',
                        padding: '10px 20px',
                        borderRadius: 15,
                    }}
                >
                    <p className='m-0'>{c.name} </p>
                    <Button
                        className='ms-auto'
                        variant='outlined'
                        color='primary'
                        onClick={() => {
                            selectCourse(c.id)
                        }}
                    >
                        Select
                    </Button>
                </div>
            ))}
            <Pagination
                count={searchedCourses.length / maxCoursesPerPage}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default SelectCourseForm
