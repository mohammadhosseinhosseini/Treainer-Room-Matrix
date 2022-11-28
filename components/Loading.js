import React from 'react'
import LinearProgress from '@mui/joy/LinearProgress'
import { Skeleton } from '@mui/material'

function Loading() {
    return (
        <div className='h-100 d-flex align-items-center'>
            <Skeleton
                variant='rounded'
                style={{ height: '100%', width: '100%' }}
            />
        </div>
    )
}

export default Loading
