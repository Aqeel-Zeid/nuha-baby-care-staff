import React from 'react'
import {Paper , Container ,Button , Typography,Grid , TextField } from '@material-ui/core'
import {useState} from 'react'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

export default function Event(props) {

    const [heads, setHeads] = useState(0)

    const [estimate, setEstimate] = useState(0)

    function handleHeadChange (event)
    {
        setHeads(event.target.value)
    }

    function calculateBudget()
    {
        console.log('heads',heads)
        let PhotoPackage = props.PhotographyServices
        let Sounds = props.Sounds
        let FoodPackage = props.FoodPackage
        let BookingCost = props.BookingCost

        console.log(
            PhotoPackage,
            Sounds,
            FoodPackage,
            BookingCost
        )


        let PhotoPrice = 0
        let FoodPrice = 0
        let SoundsPrice = 0

        switch(PhotoPackage)
        {
            case 'StandardOnePhotographer' :  PhotoPrice = 3000
                                              break;
            case 'StandardTwoPhotographers' : PhotoPrice = 5000
                                              break;
            case  'VideographerAndPhotographer': PhotoPrice = 10000
                                                break;
            case  'PhotographyAndEditing' : PhotoPrice = 20000
                                            break;
            case 'DeluxMediaCoverage': PhotoPrice = 25000
                                        break;
            default : PhotoPrice = 0
        }

        switch(FoodPackage)
        {
            case 'LiteSnack' :  FoodPrice = 300
                                              break;
            case 'StandardMeal' : FoodPrice = 500
                                              break;
            case  '3CourseMeal': FoodPrice =    1500
                                                break;
            
            case '5CourseMeal': FoodPrice = 7000
                                        break;
            default : FoodPrice = 0
        }

        switch(Sounds)
        {
            case 'SmallRoom' :  SoundsPrice = 10000
                                              break;
            case 'LargeHall' : SoundsPrice = 30000
                                              break;
            case  'Auditorium': SoundsPrice =   50000
                                                break;
            
            case 'OutdoorSmall': SoundsPrice = 60000
                                break;
            case 'Ground': SoundsPrice = 150000
                                 break;
                                        
            default : SoundsPrice = 0
        }

        console.log(
            SoundsPrice,
            FoodPrice,
            PhotoPrice
        )

        let sum = BookingCost + SoundsPrice  + PhotoPrice + (heads*FoodPrice)
        console.log(sum)
        setEstimate(sum)
    }

    function handleClickOpenDelete() {
        setOpenDelete(true);
    }

    function handleCloseDelete() {
        setOpenDelete(false);
    }

    function handleEventDelete ()
    {
        console.log(props.PackageID)
        const DELETE_PACKAGE = gql`
            mutation DeleteEvent
            (
                $packageID : ID
            )
            {
                deleteEventPackage(where:{PackageID : $packageID})
                {
                    PackageID
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

        client.mutate(
            {
                mutation : DELETE_PACKAGE,
                variables : {
                    packageID : props.PackageID
                }
            }
        ).then
        (
            (data) =>
            {
                console.log(data)
                alert("Package Delete Successfull")
                setOpenDelete(false)
            }

        ).catch
        (
            (err) =>
            {
                console.log(err)
                alert("Package Delete Unsuccessfull")
            }
        )

    }

    const [openDelete, setOpenDelete] = React.useState(false);

    return (
        <>
        <Paper elevation = {4}>
            <Grid container>
                <Grid item xs = "12">
                      <Typography variant = "h2">
                      {`${props.PackageName}`}  
                       </Typography>  
                </Grid>
                <Grid item xs = "12">
                      <hr/>  
                </Grid>
                <Grid item xs = "6">
                        <Typography variant = "h4" color = "textSecondary">
                                Booking Cost
                       </Typography>
                </Grid>
                <Grid item xs = "6">
                       <Typography variant = "h4" color = "textSecondary">
                                {`${props.BookingCost}`}
                       </Typography>
                </Grid>
                <Grid item xs = "6">
                        <Typography variant = "h4" color = "textSecondary">
                            Food Package
                       </Typography>
                </Grid>
                <Grid item xs = "6">
                       <Typography variant = "h4" color = "textSecondary">
                            {`${props.FoodPackage}`}
                       </Typography>
                </Grid>
                <Grid item xs = "6">
                        <Typography variant = "h4" color = "textSecondary">
                            Photography Services    
                       </Typography>
                </Grid>
                <Grid item xs = "6">
                       <Typography variant = "h4" color = "textSecondary">
                            {`${props.PhotographyServices}`}
                       </Typography>
                </Grid>
                <Grid item xs = "6">
                        <Typography variant = "h4" color = "textSecondary">
                            Sounds    
                       </Typography>
                </Grid>
                <Grid item xs = "6">
                       <Typography variant = "h4" color = "textSecondary">
                            {`${props.Sounds}`}
                       </Typography>
                </Grid>
                <Grid item  xs = {12}>
                    <Button size="small" color="secondary" fullWidth  onClick={handleClickOpenDelete} >
                        Delete
                    </Button>
                </Grid>
                <Grid item xs = {12}>
                    <hr/>
                </Grid>
                <Grid item xs = {12}>
                    <Typography varient = "h4">
                         Budget Estimater
                    </Typography>
                </Grid>
                <Grid item xs = {12}>
                    <TextField
                        type = "number"
                        label = "Number Of People"
                        value = {heads}
                        onChange = {handleHeadChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs = {12}>
                    <Button
                        onClick = {calculateBudget}
                        fullWidth
                        variant = "contained" 
                        color = "Primary"
                    >
                        Calculate Budget
                    </Button>
                </Grid>
                <Grid item xs = {12}>
                    <Typography variant = "h4">
                        {`Estimated Budget is ${estimate}`}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>

        <div>
            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Card</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you Sure You want delete This Package
                </DialogContentText>

                </DialogContent>
                <DialogActions>
                <Button onClick={handleEventDelete} color="primary">
                    Yes I am Sure
                </Button>
                <Button onClick={handleCloseDelete} color="primary">
                    No
                </Button>
                </DialogActions>
            </Dialog>
        </div>

        </>
    )
}
