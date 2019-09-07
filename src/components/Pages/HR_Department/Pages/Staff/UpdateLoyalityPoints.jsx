import React from 'react'
import {Container, Grid,Button, TextField , Typography} from '@material-ui/core'
import {useState} from 'react'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
export default function UpdateLoyalityPoints() 
{
    const [phoneNumber, setPhoneNumber] = useState(0)  
    const [purchaseValue , setPurchaseValue] = useState(0)
    const [loyalityPoints , setLoyalityPoints] = useState(0)
    const [oldLoyalityPoints , setOldLoyalityPoints] = useState(0)
    

    const handleUpdate = () =>
    {
        
        const UPDATE_POINTS = gql`
            mutation UpdateCustomer
            (
                $Phone : Int
                $LoyalityPoints : Float
            ) 
            {
            updateCustomer(where: { Phone: $Phone }, data: { LoyalityPoints: $LoyalityPoints }) {
            LoyalityPoints
                        }
                    }
        `
        //Creating Client
        const cache = new InMemoryCache();
        const link = new HttpLink({
        uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
        })
        const client = new ApolloClient({
            cache,
            link,
            connectToDevTools: true
        })

        let totalPts = oldLoyalityPoints + loyalityPoints
        
        client.mutate(
            {
                mutation : UPDATE_POINTS,
                variables :
                {
                    Phone : Number(phoneNumber),
                    LoyalityPoints : Number(totalPts)
                }
            }
        ).then
        (
            (data) => 
            {
                console.log(data)          
                alert("Points Added Successfully")
            }
        ).catch
        (
            (err) =>
            {
                console.log(err)
                alert("Points Added UnSuccessfully")
            }
        )
        
        

    }

    const handlePhoneNumberChanged = (e) =>
    {
            setPhoneNumber(e.target.value)
    } 

    const handlePurchaseValueChanged = (e) =>
    {
        setPurchaseValue(e.target.value)
    }

    const handleCalculatePoints = (e) =>
    {
        const GET_LOYAL = gql`
            query Customer
            (
                $Phone : Int
            )
            {
                    customer(where: { Phone: $Phone }) {
                        LoyalityPoints
                    }        
            }
        `
        //Creating Client
        const cache = new InMemoryCache();
        const link = new HttpLink({
        uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
        })
        const client = new ApolloClient({
            cache,
            link,
            connectToDevTools: true
        })

        client.query({
            query : GET_LOYAL,
            variables : 
            {
                Phone : Number(phoneNumber)
            }
        }).then
        (
            (data) => 
            {        
                console.log(data)  
                setOldLoyalityPoints(data.data.customer.LoyalityPoints)
            }
        ).catch
        (
            (err) =>
            {
                console.log(err)
            }
        )

        let points = 0
        if(purchaseValue >= 0 && purchaseValue <= 1000 )
        {
            points = purchaseValue * 0.01
        }
        else if( purchaseValue > 1000 && purchaseValue <= 10000)
        {
            points = purchaseValue * 0.05
        }
        else if( purchaseValue > 10000 )
        {
            points = (purchaseValue * 0.01) + 2500
        }

        

        setLoyalityPoints(points)

    }

    return (
        <Container>
            <Grid container >
                <Grid item xs = "12">
                    <hr/>
                </Grid>
                <Grid item xs = "12">
                    <Typography variant = "h2">
                        Loyality Points Calculater 
                    </Typography>
                </Grid>
                <Grid item xs = "12">
                    <hr/>
                </Grid>

                
                <Grid item xs = "12">
                    <br/>
                </Grid>
                <Grid item xs = "12">
                    <TextField 
                        label = "Enter Phone Number"
                        type = "number"
                        variant = "outlined"
                        value = {phoneNumber}
                        fullWidth
                        onChange = {handlePhoneNumberChanged}
                    />
                </Grid>
                <Grid item xs = "12">
                    <br/>
                </Grid>

                <Grid item xs = "12">
                    <TextField 
                        label = "Enter Purchase Value"
                        type = "number"
                        variant = "outlined"
                        fullWidth
                        value = {purchaseValue}
                        onChange = {handlePurchaseValueChanged}
                    />
                </Grid>

                <Grid item xs = "12">
                    <br/>
                </Grid>

                <Grid item xs = "12">
                    <Button variant = "contained" 
                        color = "primary" 
                        fullWidth
                        onClick = {handleCalculatePoints}
                        >
                        Calculate Points
                    </Button>
                </Grid>
                
                <Grid item xs = "12">
                    <br/>
                </Grid>

                <Grid item xs = "12">
                    <Typography variant = "h4" color = "textSecondary">
                        { `Earned ${loyalityPoints} Points ` }
                    </Typography>
                </Grid>

                <Grid item xs = "12">
                    <br/>
                </Grid>

                <Grid item xs = "12">
                    <Button variant = "contained" 
                        color = "secondary" 
                        fullWidth
                        onClick = {handleUpdate}
                        >
                        Update Loyality Points
                    </Button>
                </Grid>

            </Grid>
        </Container>
    )
}
