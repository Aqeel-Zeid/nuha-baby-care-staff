import React from 'react'
import {Typography, Container , Grid, TextField , Button} from '@material-ui/core'
import {useState} from 'react'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

export default function CreateLeaveForm(props) {

    const [showError,setShowError] = useState(false)
    const [showSubmit,setShowSubmit] = useState(false)

    function AddLeave()
    {
        const date = new Date();
        //console.log('Inside AdddLeave()', props.nicNumber, date.getMonth(selectedDate) + 1 , selectedDate  ,date.getYear(selectedDate) + 1900)
        let dayArray = `${selectedDate}`.split(" ")
        //console.log(dayArray[2])

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

        const ADD_LEAVE = gql`
            mutation CreateLeaveDay
            (
                $nicNumber : String
                $day : Int
                $month : Int
                $year : Int
            ) 
            {
                createLeaveDay(
                            data: {
                            Day: $day
                            Month: $month
                            Year: $year
                            StaffMember: { connect: { nicNumber: $nicNumber } }
                            }
                        ) {
                            LeaveID
                            StaffMember {
                            employeeName
                            }
                            Day
                            Month
                            Year
                        }
                }
        `
        client.mutate(
            {
                mutation : ADD_LEAVE,
                variables : 
                {
                    day : Number(dayArray[2]),
                    month : Number(date.getMonth(selectedDate) + 1),
                    year : Number(date.getYear(selectedDate) + 1900),
                    nicNumber : props.nicNumber
                }
            }
        ).then
        (
            (data) => 
            {
                alert("Leave Applied Successfully")
                props.closeDialog()
                console.log(data)
            }
        ).catch
        (
            (err) =>
            {
                alert("Leave Application Failed Successfully")
                console.log(err)
            }
        )

    }

    const disableSubmit = (month, day) =>
    {
            console.log(props.month , month)
            if( !(month === props.month || month === (props.month + 1) ))
            {
                setShowError(true)
            }
            
            if((month === props.month || month === (props.month + 1)))
            {
                setShowError(false)
            }
    }
    
    const date = new Date();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    function handleDateChange(date) {
        setSelectedDate(date);
        console.log(date.getMonth(date) + 1)
        console.log(date.getYear(date) + 1900)
        disableSubmit(date.getMonth(date) + 1, 21)
      }

    return (

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid Container> 
                <Grid item xs = {12}>
                    <hr/>
                </Grid>
                <Grid item xs = {12}>
                    <Typography variant = "h4">
                        Apply For Leave
                    </Typography>
                    <Typography variant = "caption" color = "error">
                        You Can Only Apply For This Month And Next
                    </Typography>
                </Grid>
                <Grid item xs = {12}>
                    <hr/>
                </Grid>
                <Grid item xs = {6}>
                
                <Grid item xs = {12}>
                <KeyboardDatePicker
                        fullWidth
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                </Grid>
                <Button
                    fullWidth
                    variant="contained" color="primary"
                    disabled = {showError}
                    onClick = {AddLeave}
                >
                    Add Leave
                </Button>
            </Grid>
        </Grid>
        </MuiPickersUtilsProvider>
    )
}
