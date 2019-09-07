import React from 'react'
import {Container, Grid , Typography , TextField , Button} from '@material-ui/core'
import PhotoFrames from '../../SpecialComponents/PhotoFrames'

function SearchPhotoFrame() {

    const [searchText, setSearchText] = React.useState('');

    const handleChange = name => event => {
        if(event.target.value.length >= 3)
        {
          setSearchText(event.target.value)
        }
      
    };

    return (
        <Container>
            <Grid container>
            <Grid item xs = "12">
                    <Typography variant = "h2">
                        Photo Frame Template Search
                    </Typography>
                </Grid>
                <Grid item xs = "12">
                <TextField
                    id="outlined-name"
                    label="Search"
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <Button fullWidth>Search Button</Button>
                </Grid>
                <Grid item xs = "12">
                    <Typography variant = "h5">
                        {`You Searched for Photo Frame '${searchText}'`}
                    </Typography>
                </Grid>
                <Grid items xs = "12">
                    <PhotoFrames searchValue = {searchText} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default SearchPhotoFrame
