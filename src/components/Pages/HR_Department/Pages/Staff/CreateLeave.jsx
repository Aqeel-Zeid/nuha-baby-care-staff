import React from 'react'
import {Paper, Container, Typography, Grid} from '@material-ui/core'
import {useState, useEffect} from 'react'
import CreateLeaveForm from '../../Forms/CreateLeaveForm'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

function CreateLeave(props) {

    const [leaveRemaining, setLeaveRemaining] = useState(0)
    const [leaveTaken, setLeaveTaken] = useState(0)
    
    const [showError, setShowError] = useState(false)
    const [showForm, setShowForm] = useState(true)
    
    let now = new Date()

    useEffect(
        () => 
        {
             now = new Date()
            //get Leave Information
            const VIEW_LEAVE = gql`
                    query LeaveDaysConnection
                    (
                        $nicNumber : String
                        $month : Int
                        $year : Int
                    )
                    {
                            leaveDaysConnection(
                                where: { Month: $month, Year: $year, StaffMember: { nicNumber: $nicNumber } }
                            ) {
                                aggregate {
                                count
                                }
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
            const month = `${now.getMonth() + 1}`
            const Year = `${now.getYear() + 1900}`

            console.log( month , Year , props.nicNumber )
            client.query(
                {
                    query : VIEW_LEAVE,
                    variables :
                    {
                        nicNumber : props.nicNumber,
                        month : Number(month),
                        year : Number(Year)

                    }
                }
            ).then
            (
                (data) => 
                {
                    console.log(data.data.leaveDaysConnection.aggregate.count)
                    const x = data.data.leaveDaysConnection.aggregate.count
                    console.log(x)
                    setLeaveTaken(x)
                    setLeaveRemaining(6 - x )
                    if(x >= 6)
                    {
                        setShowForm(false)
                        setShowError(true)
                    }
                }
            ).catch
            (
                (err) => 
                {
                    console.log(err)
                }
            )
            
            

        },
        []
    )

    

    return (
        <Container fullwidth>
            
                <Grid container>
                    <Grid item xs = {12}>
                        <Typography variant = "h4">
                                Leave Application
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                        <Typography variant = "h6" color = "textSecondary">
                                {`Month ${now.getMonth() + 1}`} 
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                        <Typography variant = "h6" color = "textSecondary">
                                {`Year ${now.getYear() + 1900}`} 
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                        
                        <hr/>
                        
                    </Grid>
                    
                    <Grid item xs = {3}>
                        <Typography variant = "subtitle1" color = "textPrimary">
                                 Taken 
                        </Typography>
                    </Grid>
                    <Grid item xs = {3}>
                        <Typography variant = "body1" color = "textSecondary">
                                {leaveTaken}
                        </Typography>
                    </Grid><Grid item xs = {3}>
                        <Typography variant = "subtitle1" color = "textPrimary">
                                 Remaining
                        </Typography>
                    </Grid>
                    <Grid item xs = {3}>
                        <Typography variant = "body1" color = "textSecondary">
                                {leaveRemaining}
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                        <Typography variant = "h5">
                                {
                                    showError && <Typography varient = "error">Leave Limit Exceeded</Typography>
                                }
                               {
                                   showForm && <CreateLeaveForm 
                                                    closeDialog = {props.closeDialog}
                                                    nicNumber = {props.nicNumber} 
                                                    month = {now.getMonth() + 1} 
                                                    Year = {now.getYear() + 1900}
                                                    />
                               }
                        </Typography>
                    </Grid>
                </Grid>
            
        </Container>
    )
}

export default CreateLeave
