import React from 'react'
import CreateNewPositionForm from '../../Forms/CreateNewPositionForm'
import {TextField , Button , Container, Typography} from '@material-ui/core'

function CreateNewPositionPage() {
    return (
        <>
            <Container maxWidth= "md">
                <br/>
                <Typography variant = 'h2'>
                    Create New Position
                </Typography>
                <br/>
            <CreateNewPositionForm/> 
            </Container>
        </>
    )
}

export default CreateNewPositionPage
