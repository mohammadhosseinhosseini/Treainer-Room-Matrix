import React from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/db'
import { Button } from '@mui/material'

import rooms from '../data/rooms.json'
function add() {
    const addData = async () => {
        rooms.forEach(async (course) => {
            try {
                const docRef = await addDoc(collection(db, 'rooms'), course)
                console.log('Document written with ID: ', docRef.id)
            } catch (error) {
                console.log(error)
            }
        })
    }

    return (
        <div className='continer'>
            <Button onClick={addData}>Add</Button>
        </div>
    )
}

export default add
