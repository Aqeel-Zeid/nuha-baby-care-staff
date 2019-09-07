import React from 'react'
import {useState} from 'react'
import {Container, Grid , Typography , TextField , Button} from '@material-ui/core'
import CakeItems from '../../SpecialComponents/CakeItems'
function SearchCakeItem() {

    const [searchText, setSearchText] = React.useState('');
    
    
      const handleChange = name => event => {
          if(event.target.value.length >= 3)
          {
            setSearchText(event.target.value)
          }
        
      };

    return (
        <Container >
            <Grid   container >
                <Grid item xs = "12">
                    <Typography variant = "h2">
                        Cake Item Search
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
                        {`You Searched for '${searchText}'`}
                    </Typography>
                    
                </Grid>
                
            </Grid>
            <br/>
            <Grid container style={{ backgroundColor: '#fffff', height: '80vh' }}  >
                   
                   <CakeItems searchValue = {searchText}/>
                        
            </Grid>
        </Container>
    )
}

export default SearchCakeItem
