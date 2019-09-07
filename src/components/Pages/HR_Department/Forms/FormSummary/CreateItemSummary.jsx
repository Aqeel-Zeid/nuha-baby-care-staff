import React from 'react'
import Cookies from 'universal-cookie';
import {Container, Typography , Grid} from '@material-ui/core'
import S3imageUploader from '../../../../ImageUploaders/S3imageUploader'

function CreateItemSummary() {

    const cookies = new Cookies();
    console.log('Summary ' , cookies.get('CreatedItem').data.createItem)
    const data = cookies.get('CreatedItem').data.createItem;

    return (
<Container maxWidth = "md">
            <Grid container spacing = {3}>
                <Grid item xs = "12" >
                    <Typography variant = "h3" color = "textSecondry">
                        Item Added Successfully
                    </Typography>
                </Grid>
                <Grid item xs = "12">
                    <Typography variant = "h4" color = "textPrimary">
                        Item Summary
                    </Typography>
                </Grid>
                
                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "textPrimary">
                            ItemName 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "textSecondary">
                            {data.ItemName} 
                        </Typography>
                    </Grid>

                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "textPrimary">
                            Category 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "textSecondary">
                            {data.Category} 
                        </Typography>
                    </Grid>

                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "textPrimary">
                            Price : 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "textSecondary">
                            {data.Price} 
                        </Typography>
                    </Grid>

                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "textPrimary">
                            Stock
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "textSecondary">
                            {data.Stock} 
                        </Typography>
                    </Grid>

                    <Grid item xs = "4">
                        <Typography variant = "h5" color = "textPrimary">
                            Brand 
                        </Typography>
                    </Grid>
                    <Grid item xs = "8">
                        <Typography variant = "h5" color = "secondary">
                            {data.Brand} 
                        </Typography>
                    </Grid>

                    
                    <Grid item xs = "12">
                        <Typography variant = "h5" color = "textSecondary">
                            Add New Item Image 
                        </Typography>
                        <S3imageUploader imageName = {data.ItemId} />
                    </Grid>
            </Grid>
        </Container>
    )
}

export default CreateItemSummary
