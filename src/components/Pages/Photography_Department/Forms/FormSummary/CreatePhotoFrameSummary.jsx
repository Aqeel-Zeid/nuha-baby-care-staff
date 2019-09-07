import React from 'react'
import {Container , Typography , Grid} from '@material-ui/core'
import Cookies from 'universal-cookie';
import S3ImageUploader from '../../../../ImageUploaders/S3imageUploader'



function CreatePhotoFrameSummary() {

    const cookies = new Cookies();
    const data = cookies.get('CreatedPhotoFrame').data.createPhotoFrameTemplate

    console.log(data)
    return (
        <Container>
            <Typography variant = "h2">
                Photo Frame Summary
            </Typography>
            <br/>
            <hr/>
            <br/>
            <Grid container >
                <Grid item xs = "6">
                    <Typography variant = "h4">
                            Frame Name
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4" color = "textSecondary">
                            {
                                `${data.FrameName}`
                            }
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4">
                            Dimension
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4" color = "textSecondary">
                            {
                                `${data.Dimensions}`
                            }
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4">
                            Material
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4" color = "textSecondary">
                            {
                                `${data.FrameMaterial}`
                            }
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4">
                            Photo Finish
                    </Typography>
                </Grid>
                <Grid item xs = "6">
                    <Typography variant = "h4" color = "textSecondary">
                            {
                                `${data.PhotoFinish}`
                            }
                    </Typography>
                </Grid>
                <Grid xs = "12">
                    <S3ImageUploader imageName = {data.FrameID} />
                </Grid>         
            </Grid>
        </Container>
    )
}

export default CreatePhotoFrameSummary
