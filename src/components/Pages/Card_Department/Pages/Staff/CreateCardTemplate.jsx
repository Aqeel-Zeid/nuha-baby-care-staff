import React from 'react'
import { Container, Typography} from '@material-ui/core'
import CreateCardTemplateForm from '../../Forms/CreateCardTemplateForm'

function CreateCardTemplate() {
    return (
        <div>
            Create Card Template
            <Container maxWidth="md">
                <Typography variant= "h2">
                    Create Card Template
                </Typography>
                <br/>
                <CreateCardTemplateForm/>
            </Container>
        </div>
    )
}

export default CreateCardTemplate
