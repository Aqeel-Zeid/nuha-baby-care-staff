import React from 'react'
import {Container, Grid , Typography , TextField , Button , Paper} from '@material-ui/core'
import LeaveTable from '../../SpecialComponents/LeaveTable'

function SearchLeaveDay() {

    const [searchText, setSearchText] = React.useState('');

    const handleChange = name => event => {
        if(event.target.value.length >= 10)
        {
          setSearchText(event.target.value)
        }
      
    };

    return (
        <Container>
            <Grid item xs = "12">
                    <Typography variant = "h2">
                        Leave Day
                    </Typography>
            </Grid>
            <Grid item xs = "12">
                <TextField
                    id="outlined-name"
                    label="Please Enter Employee NIC"
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <Button fullWidth>Search Button</Button>
                </Grid>
                <Grid item xs = "12">
                    <Typography variant = "h5">
                        {`You Searched for NIC '${searchText}'`}
                    </Typography>
                </Grid>
                <Grid items xs = "12">
                    
                        <LeaveTable searchValue = {searchText}/>
                    
                    
                </Grid>
        </Container>
    )
}

export default SearchLeaveDay
