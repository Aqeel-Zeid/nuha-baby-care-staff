import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {useEffect, useState} from 'react'

import {Button} from "@material-ui/core"
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

const useStyles = makeStyles(theme => ({
    root: {
       
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
        minWidth : '300px',
        maxWidth : '650px'
    },
    fab: {
        margin: theme.spacing(1),
      },
  }));

function handleDelete(event)
{
    console.log(event.target.id, "Event")
    const cache = new InMemoryCache();
            const link = new HttpLink({
            uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
            })
            const client = new ApolloClient({
                cache,
                link,
                connectToDevTools: true
            })
    const DELETE_LEAVE = gql`
        mutation DeleteLeaveDay
        ( $LeaveID : ID) 
        {
            deleteLeaveDay(where: { LeaveID: $LeaveID }) {
                LeaveID
            }
                }
    `

    client.mutate(
        {
            mutation : DELETE_LEAVE,
            variables :
            {
                LeaveID : event.target.id
            }

        }
    ).then(
        (data) => 
        {
            console.log(data)
            alert("Leave Delete Successfull")
        }
    ).catch
    (
            (err) =>
            {
                console.log(err)
                alert("Leave Deleting Failed Successfully")
            }            
    )

}


function LeaveTable(props) {

    const [LeaveArray,setLeaveArray] = useState([])

    useEffect(
        () => 
        {
            const date = new Date();
            const DateArray = `${date}`.split(" ")
            //console.log( DateArray )
            const nicNumber = props.nicNumber
            console.log(props.searchValue)
            const cache = new InMemoryCache();
            const link = new HttpLink({
            uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
            })
            const client = new ApolloClient({
                cache,
                link,
                connectToDevTools: true
            })

            
            const SEARCH_LEAVE = gql`
                query LeaveDays
                (
                    $nicNumber : String
                    $Day : Int
                    $Month : Int
                    $Year : Int
                )
                        {
                        leaveDays(
                        where:
                            {
                            StaffMember:
                            {
                                nicNumber : $nicNumber
                            }
                            Year : $Year
                            Month_gte : $Month
                            Day_gte : $Day
                            })
                        {
                            Day
                            Month
                            Year
                            LeaveID
                        }
                        
                        }
            `
                
            /*    
            const search = props.searchValue
            console.log('Query Parameters' ,
                            Number(DateArray[2]),
                            Number(date.getMonth() + 1),
                            Number(DateArray[3]),
                            props.searchValue   
                            )
            */                
            client.query(
                {
                    query: SEARCH_LEAVE,
                    variables :
                    {   
                        nicNumber : props.searchValue,
                        Day : Number(DateArray[2]),
                        Month : Number(date.getMonth() + 1),
                        Year : Number(DateArray[3])
                    }

                }
            ).then
            (
                (data) => 
                {
                    console.log(data)
                    setLeaveArray(data.data.leaveDays)
                }
            ).catch
            (
                (err) =>
                {
                    console.log(err)
                }
            )
            
            
        },
        [props.searchValue]
    )

    const classes = useStyles();
    console.log(props.searchValue)
    const MyLeaves = LeaveArray.map(
        ({Day, Month, Year,LeaveID}) => 
        {
            return(
                <TableRow key = {LeaveID}>
                <TableCell >{Day}</TableCell>
                <TableCell>{Month}</TableCell>
                <TableCell >{Year}</TableCell>
                <TableCell>
                    <Fab 
                        aria-label="delete" 
                        className={classes.fab}
                        onClick = {handleDelete}
                        id = {LeaveID}
                        key = {LeaveID}
                    >
                        <DeleteIcon />
                    </Fab>
              </TableCell>
              </TableRow>
            )
        }
    )
    return (

        <>
            <TableHead>
                <TableRow>
                    <TableCell >Day</TableCell>
                    <TableCell >Month</TableCell>
                    <TableCell >Year</TableCell>
                    <TableCell >Delete</TableCell>
                </TableRow>
        </TableHead>
        <TableBody>
            {
               MyLeaves
            }
                
              
        </TableBody>
    </>
    )
}

export default LeaveTable
