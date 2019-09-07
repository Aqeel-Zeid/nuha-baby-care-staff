import React from 'react'
import {useGlobal} from 'reactn'
import { gql, HttpLink, InMemoryCache, ApolloClient} from 'apollo-boost';
import {Container, Grid , Typography , makeStyles, TextField , Button } from '@material-ui/core'
import Logo from '../../../src/logo.svg'
import {useState} from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Cookie from 'universal-cookie'


    const useStyles = makeStyles({
        CenteredStuff : {
            display : "flex" ,
            justifyContent : "center"
        },
        logo  :
        {
            height : "33vh"
        },
        root : 
        {
            backgroundColor : "rgb(255,182,199,0.1)"
        }
    });


export default function Login() {

   
    

    const classes = useStyles();

    const [nic, setNic]  = useState('')
    const [password, setPassword] = useState('')
    const [showSpinner, setShowSpinner] = useState(false)
    

    const handleLoginButton = () =>
    {
        console.log('Oh Please')
        
        setShowSpinner(true)

        const LOGIN_QUERY = gql`
        query Staff( $nic : String) 
        {
                staff(where: { nicNumber: $nic }) {
                    employeeID
                    employeeName
                    nicNumber
                    bankAccountNumber
                    position {
                    department {
                        name
                    }
                    jobRole
                    }
                    address
                    phoneNumber
                    workEmail
                    password
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
                query : LOGIN_QUERY,
                variables :{
                    nic : nic
                }
            }
        ).then(
            (data) =>
            {
                
                setShowSpinner(false)
                if(data.data.staff != null)
                {
                    if(data.data.staff.password === password)
                    {
                        console.log(data.data.staff)
                        const cookie = new Cookie()
                        cookie.set('USER_STAFF', data.data.staff,{path : '/'})
                        switch (data.data.staff.position.department.name) {
                            case 'Human Resource Department': 
                                console.log('Human Resource Department')
                                break
                            case 'Sales Department': 
                                console.log('Sales Department')
                                break
                            case 'Baking Department':
                                console.log('Baking Department')
                                break
                            case 'Event Management Department': 
                                console.log('Event Management Department')
                                break
                            case 'Photography Department': 
                                console.log('Photography Department')
                                break
                            case 'Cards Department': 
                                console.log('Cards Department')
                                break
                            default : console.log('Impossibreuuuu')
                                break

                        }
                            

                    }
                }
                
            }

        ) 

        
       

    }
    



    //Apollo Client Set Up to be Accessed from anywhere
    //const [myApolloClient, setMyApolloClient] = useGlobal(client)
    return (
        <Container className = {classes.root} maxWidth = "xs">
            <Grid container>
                <Grid item xs = "12">
                    <br/>
                </Grid>
                <Grid item xs = "12" className = {classes.CenteredStuff} >
                    <Typography variant = "h5" >
                            Welcome to 
                    </Typography>
                </Grid>
                <Grid item xs = "12" className = {classes.CenteredStuff} >
                    <Typography variant = "h4" >
                            Nuha`s Baby Care 
                    </Typography>
                </Grid>
                <Grid item xs = "12" className = {classes.CenteredStuff} >
                    <Typography variant = "h5" color = "textSecondary"  >
                            Staff Portal
                    </Typography>
                </Grid>
                
                <Grid item xs = "12" className = {classes.CenteredStuff}>
                    {
                        showSpinner ? <Loader type="BallTriangle" color="#00BFFF" height="200" width="200"/> : <img src = {Logo}   className = {classes.logo} />
                    }
                    
                </Grid>
                <Grid item xs = "12"  className = {classes.CenteredStuff}>
                    <Typography variant = "h4" color = "textSecondary"  >
                            Login
                    </Typography>
                </Grid>
                <Grid item xs = "12">
                    <br/>
                </Grid>
                <Grid item xs = "12" className = {classes.CenteredStuff} >
                    <TextField 
                        label = "NIC"
                        variant = "outlined"
                        value = {nic}
                        onChange = { (event)  => { setNic(event.target.value)}}
                        />
                </Grid>
                <Grid item xs = "12">
                    <br/>
                </Grid>
                <Grid item xs = "12" className = {classes.CenteredStuff} >
                    <TextField 
                        label = "Password"
                        type = "password"
                        variant = "outlined"
                        value = {password}
                        onChange = { (event)  => { setPassword(event.target.value)}}
                        
                        />
                </Grid>
                <Grid item xs = "12">
                    <br/>
                </Grid>
                <Grid item xs = "12" className = {classes.CenteredStuff} >
                    <Button
                        onClick = {handleLoginButton}
                        variant="contained" 
                        color="primary"
                    >
                        Login
                    </Button>
                </Grid>
                <Grid item xs = "12">
                    <br/>
                </Grid>
                <Grid item xs = "12">
                    <br/>
                </Grid>
            </Grid>
        </Container>
    )
}
