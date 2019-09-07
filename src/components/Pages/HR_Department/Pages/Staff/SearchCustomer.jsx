import React from 'react'
import {Container, Grid , Typography , TextField , Button , Paper} from '@material-ui/core'
import CustomerTable from '../../SpecialComponents/CustomerTable'
import {useEffect,useState} from 'react'

function SearchCustomer() {

    const [searchText, setSearchText] = React.useState('');

    const handleChange = name => event => {
        if(event.target.value.length >= 3)
        {
          setSearchText(event.target.value)
        }
      
    };

    


    return (
        <Container>
            <Grid item xs = "12">
                    <Typography variant = "h2">
                        Search Customer
                    </Typography>
            </Grid>
            <Grid item xs = "12">
                <TextField
                    id="outlined-name"
                    label="Please Enter Customer Name"
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <Button fullWidth>Search Button</Button>
                </Grid>
                <Grid item xs = "12">
                    <Typography variant = "h5">
                        {`You Searched for Employee Name '${searchText}'`}
                    </Typography>
                </Grid>
                <Grid items xs = "12">
                    
                        <CustomerTable searchValue = {searchText}/>
                    
                    
                </Grid>
        </Container>
    )
}

export default SearchCustomer
