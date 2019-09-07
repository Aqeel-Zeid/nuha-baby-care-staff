import React from 'react'
import {Container , Typography , Grid , Button , TextField} from '@material-ui/core'
import Event from '../../SpecialComponents/Event'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import {useState} from 'react'

export default function SearchEventPackages() {
    
    const [searchText, setSearchText] = React.useState('');
    const [gotEvent, setGotEvent] = useState([])

    const getEvent = () =>
    {
        const SEARCH_EVENT = gql`
                query EventPackages
                (
                    $search : String
                )  
                    {
                        eventPackages(where: { PackageName_contains: $search }) {
                        PackageID
                        PackageName
                        BookingCost
                        FoodPackage
                        Sounds
                        PhotographyServices
                    }
                    }
        `
        const cache = new InMemoryCache();
        const link = new HttpLink({
        uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
        })
        const client = new ApolloClient({
            cache,
            link,
            connectToDevTools: true
        })

        client.query(
            {
                query : SEARCH_EVENT,
                variables : 
                {
                    search : searchText
                }
            }
        ).then
        (
            (data) =>   
            {
                console.log(data.data.eventPackages)
                setGotEvent(data.data.eventPackages)
            }
        ).catch
        (
            (err) => 
            {
                console.log(err)
            }
        )
    }
    
    const myEventArray = gotEvent.map(
        (e) =>
        {
            return (
                <Event
                    PackageName = {e.PackageName}
                    BookingCost = {e.BookingCost}
                    FoodPackage = {e.FoodPackage}
                    PhotographyServices = {e.PhotographyServices}
                    Sounds = {e.Sounds}
                    key = {e.PackageID}
                    PackageID = {e.PackageID}
                />
                )
        }
        

        )
    

    const handleChange = name => event => {
        if(event.target.value.length >= 3)
        {
          setSearchText(event.target.value)
        }
      
    };
    
    return (
        <div>
                    <Container >
                            <Grid   container >
                                <Grid item xs = "12">
                                    <Typography variant = "h2">
                                    Event Package Search
                                    </Typography>
                                </Grid>
                                <Grid item xs = "12">
                                <TextField
                                    id="outlined-name"
                                    label="Enter Package Name"
                                    onChange={handleChange('name')}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button 
                                fullWidth
                                    onClick = {getEvent}
                                >Search</Button>
                                </Grid>
                                <Grid item xs = "12">
                                    <Typography variant = "h5">
                                        {`You Searched for '${searchText}'`}
                                    </Typography>
                                    
                                </Grid>
                                
                            </Grid>
                            <br/>
                            <Grid container style={{ backgroundColor: '#fffff', height: '80vh' }}  >
                                
                                {
                                    myEventArray
                                }
                                        
                            </Grid>
                        </Container>
        </div>
    )
}
