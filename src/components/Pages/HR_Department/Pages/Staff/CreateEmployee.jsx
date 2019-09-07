import React from 'react'
import CreateEmployeeForm from '../../Forms/CreateEmployeeForm'
import {Container, Typography, Grid} from '@material-ui/core'

function CreateEmployee() {
    return (
        <Container>
            <Grid container>
                    <Grid item xs = "12">
                        <br/>
                    </Grid>
            </Grid>
            <Grid item xs = "12">
                <Typography variant = "h2">
                    Create Employee
                </Typography>
            </Grid>
            <Grid item xs = "12">
                        <br/>
            </Grid>
            <Grid item xs = "12">
                <CreateEmployeeForm />
            </Grid>
            
        </Container>
    )
}

export default CreateEmployee
