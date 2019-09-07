import React from 'react'
import Cookies from 'universal-cookie';
import {Container , Typography , Grid} from '@material-ui/core'
import S3ImageUploader from '../../../../ImageUploaders/S3imageUploader'

function CreateEventFormSummary() {
    const cookies = new Cookies();
    const myData = cookies.get('CreatedPackage')
    
    const myEvent = myData.data.createEventPackage
    console.log('Inside Summary Page' , myEvent)
    return (
        <Container>
            <Typography variant = "h2">
                Event Package Summary
            </Typography>
            <br/>
            <hr/>
            <br/>
            <Grid container >
                <Grid item xs = "6">
                    <Typography variant = "h4">
                            Package Name
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4" color = "textSecondary">
                            {
                                `${myEvent.PackageName}`
                            }
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4">
                            Booking Cost
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4" color = "textSecondary">
                            {
                                `${myEvent.BookingCost}`
                            }
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4">
                            Food Package
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4" color = "textSecondary">
                            {
                                `${myEvent.FoodPackage}`
                            }
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4">
                            Phototography Service
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4" color = "textSecondary">
                            {
                                `${myEvent.PhotographyServices}`
                            }
                    </Typography>
                    
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4">
                            Sounds
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4" color = "textSecondary">
                            {
                                `${myEvent.Sounds}`
                            }
                    </Typography>
                    
                </Grid>
                <Grid xs = "12">
                    <S3ImageUploader imageName = {myEvent.PackageID} />
                </Grid>         
            </Grid>
        </Container>
    )
}

export default CreateEventFormSummary
