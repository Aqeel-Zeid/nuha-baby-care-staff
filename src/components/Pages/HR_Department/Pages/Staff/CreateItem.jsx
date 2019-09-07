import React from 'react'
import CreateItemForm from '../../Forms/CreateItemForm'
import {Container, Typography} from '@material-ui/core'
function CreateItem() {
    return (
        <div>
            <Container>
                <Typography variant = "h3">
                    Create Item
                </Typography>
                <CreateItemForm/>
            </Container>
           
        </div>
    )
}

export default CreateItem
