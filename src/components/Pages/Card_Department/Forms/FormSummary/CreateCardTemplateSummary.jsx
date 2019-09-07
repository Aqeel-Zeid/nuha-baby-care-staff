import React from 'react'
import Cookies from 'universal-cookie';
import {Container, Typography , Grid} from '@material-ui/core'
import S3imageUploader from '../../../../ImageUploaders/S3imageUploader'

function CreateCardTemplateSummary() {
    const cookies = new Cookies();
    
    console.log('Summary ' , cookies.get('CreatedCardTemplate').data.createCardTemplate)
    
    const data = cookies.get('CreatedCardTemplate').data.createCardTemplate;
    return (
        <Container maxWidth = "md">
            <Grid container spacing = {3}>
                <Grid item xs = "12" >
                    <Typography variant = "h3" color = "secondry">
                        Card Template added Successfully
                    </Typography>
                </Grid>
                <Grid item xs = "12">
                    <Typography variant = "h4" color = "primary">
                    Card Template Summary
                    </Typography>
                </Grid>
                
                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "primary">
                            CardName : 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "secondary">
                            {data.CardName} 
                        </Typography>
                    </Grid>

                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "primary">
                            Category 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "secondary">
                            {data.Category} 
                        </Typography>
                    </Grid>

                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "primary">
                            Price : 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "secondary">
                            {data.Price} 
                        </Typography>
                    </Grid>

                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "primary">
                            Size : 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "secondary">
                            {data.Size} 
                        </Typography>
                    </Grid>

                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "primary">
                            Material : 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "secondary">
                            {data.Material} 
                        </Typography>
                    </Grid>

                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "primary">
                            Search Tags : 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "secondary">
                            {data.SearchTags} 
                        </Typography>
                    </Grid>
                    <Grid item xs = "12">
                        <Typography variant = "h5" color = "secondary">
                            Card Front Image 
                        </Typography>
                        <S3imageUploader imageName = {data.CardId} />
                    </Grid>
            </Grid>
        </Container>
            
            
            
        
    )
}

export default CreateCardTemplateSummary
