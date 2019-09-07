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
        console.log(event.target.id)

        const DELETE_CUSTOMER = gql`
            mutation DeleteCustomer
            (
                $CustomerID : ID
            ) 
            {
             deleteCustomer(where: { CustomerID: $CustomerID }) {
             CustomerID
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

        client.mutate(
            {
                mutation : DELETE_CUSTOMER,
                variables :
                {
                    CustomerID : event.target.id
                }
            }
        ).then(
            (data) => 
            {
                console.log(data)
                alert("Customer Delete Successfull")
            }
        ).catch
        (
                (err) =>
                {
                    console.log(err)
                    alert("Customer Deleting Failed Successfully")
                }            
        )

    }

function CustomerTable(props) {
    const classes = useStyles();
    const [customerArray,setCustomerArray] = useState([])

    useEffect(
        () =>
        {
            if(props.searchValue != "")
            {
                const SEARCH_EMPLOYEE = gql`
                query Customers
                (
                    $search : String
                ){
                        customers(where: { CustomerName_contains: $search }) {
                            CustomerID
                            CustomerName
                            Address
                            Gender
                            Phone
                            CustomerEmail
                            Ethnicity
                            LoyalityPoints
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

            client.query
            (
                {
                    query : SEARCH_EMPLOYEE,
                    variables :
                    {
                        search : props.searchValue
                    }
                }
            ).then
            (
                (data) =>
                {
                    console.log(data)
                    setCustomerArray(data.data.customers)
                }
            ).catch
            (
                (err)=>
                {
                    console.log(err)
                }
                
            )
            }
            

        },
        [
            props.searchValue 
        ]

    )

    const MyCustomers = customerArray.map(
        (customer) =>
        {
            return (
                <TableRow key = {customer.CustomerID}>
                    <TableCell >{`${customer.CustomerName}`}</TableCell>
                    <TableCell >{`${customer.Address}`}</TableCell>
                    <TableCell >{`${customer.Phone}`}</TableCell>
                    <TableCell >{`${customer.CustomerEmail}`}</TableCell>
                    <TableCell >{`${customer.LoyalityPoints}`}</TableCell>
                    <TableCell>
                        <Fab 
                            aria-label="delete" 
                            className={classes.fab}
                            onClick = {handleDelete}
                            id = {`${customer.CustomerID}`}
                            key = {`${customer.CustomerID}`}
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
                    <TableCell >Name</TableCell>
                    <TableCell >Address</TableCell>
                    <TableCell >Phone</TableCell>
                    <TableCell >Email</TableCell>
                    <TableCell >Loyality Points</TableCell>
                    <TableCell >Delete Button</TableCell>
                </TableRow>
        </TableHead>
        <TableBody>
            {
                MyCustomers
            }
        </TableBody>
    </>
    )
}

export default CustomerTable
