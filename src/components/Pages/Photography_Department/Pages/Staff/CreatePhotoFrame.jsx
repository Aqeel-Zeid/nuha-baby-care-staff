import React from 'react'
import {Container , Typography} from '@material-ui/core'
import CreatePhotoFrameForm from '../../Forms/CreatePhotoFrameForm'

function CreatePhotoFrame() {
    return (
        <Container>
            <Typography variant = "h2">
                Create Photo Frames
            </Typography>
            <CreatePhotoFrameForm/>
        </Container>
    )
}

export default CreatePhotoFrame
