import React from 'react'
import {Container, Typography} from '@material-ui/core'
import CreateEventForm from '../../Forms/CreateEventForm'

export default function CreateEvent() {
    return (
        <div>
            <Container>
                <Typography variant = "h3">
                    Create Event Package
                </Typography>
                    <CreateEventForm />
            </Container>
        </div>
    )
}
