import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Grid, Button} from '@material-ui/core'
import S3ImgViewer from '../../../ImageUploaders/S3ImgViewer'


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import UpdateEmployee from '../Pages/Staff/UpldateEmployee'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

import CreateLeave from '../Pages/Staff/CreateLeave'


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


function Employee(props) {

    const [openUpload, setOpenUpload] = React.useState(false);

    function handleClickOpenUpload() {
        setOpenUpload(true);
    }

    function handleCloseUpload() {
        setOpenUpload(false);
    }

    const [openDelete, setOpenDelete] = React.useState(false);

    

    function handleClickOpenDelete() {
        setOpenDelete(true);
    }

    function handleCloseDelete() {
        setOpenDelete(false);
    }

    const [openAddLeave, setOpenAddLeave] = React.useState(false);

    function handleClickOpenAddLeave() {
        setOpenAddLeave(true);
    }

    function handleCloseAddLeave() {
        setOpenAddLeave(false);
    }

    function handleEmployeeDelete()
    {
        console.log("Delete Employee")

        const cache = new InMemoryCache();
                    const link = new HttpLink({
                    uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
                    })
                    const client = new ApolloClient({
                        cache,
                        link,
                        connectToDevTools: true
                    })
        const DELETE_EMPLOYEE = gql`
            mutation DeleteStaff
            (
                $employeeID : ID
            )
            {
                        deleteStaff(where:{
                            employeeID : $employeeID
                        })
                        {
                            employeeName
                            nicNumber
                        }
                    } 
        `            
        client.mutate(
            {
                mutation : DELETE_EMPLOYEE,
                variables : {
                    employeeID : props.data.employeeID
                }
            }
        ).then(
            (data) => { alert(`Deleted Employee (Refresh Page) `)}
        )

    }

     
        const classes = useStyles();

      
    return (
        <>
        <Paper className={classes.root} fullwidth>

            <Grid container>
                <Grid item xs = "12">
                    <Typography variant="h2" component="h3">
                        {`${props.data.employeeName}`}
                    </Typography>
                </Grid>
                <Grid item xs = "12" className = {classes.CenteredStuff}>
                    <S3ImgViewer imageName = {props.data.employeeID} height = "300px"/>
                </Grid>
            </Grid>
            <Typography component="h2" color = "textSecondary" className = {classes.CenteredStuff}>
                {`${props.jb}`}
            </Typography>
            
            <br/>
            <hr/>
            <br/>

            <Grid container>
                <Grid item xs = {6} >
                    <Typography variant="h4" component="h3">
                         Phone Number
                    </Typography>
                    
                </Grid>
                <Grid item xs = {6} >
                    {`${props.data.phoneNumber}`}
                </Grid>
                <Grid item xs = {6} >
                    <Typography variant="h4" component="h3">
                        Bank Account Number
                    </Typography>
                </Grid>
                <Grid item xs = {6} >
                    {`${props.data.bankAccountNumber}`}
                </Grid>
                <Grid item xs = {6} >
                    <Typography variant="h4" component="h3">
                        Address
                    </Typography>
                </Grid>
                <Grid item xs = {6} >
                    {`${props.data.address}`}
                </Grid>
                <Grid item xs = {6} >
                    <Typography variant="h4" component="h3">
                        Email
                    </Typography>
                </Grid>
                <Grid item xs = {6} >
                    {`${props.data.workEmail}`}
                </Grid>
                <Grid item xs = {12} >
                    <Button size="small" color="primary" fullWidth onClick={handleClickOpenUpload}>
                        Update
                    </Button>
                </Grid>
                <Grid item  xs = {12}>
                    <Button size="small" color="secondary" fullWidth  onClick={handleClickOpenDelete} >
                        Delete
                    </Button>
                </Grid>
                <Grid item xs = {12}>
                    <Button onClick={handleClickOpenAddLeave} fullWidth color="primary">
                        Add Leave
                    </Button>
                </Grid>
            </Grid>

      </Paper>

      <div>
                <Dialog open={openUpload} onClose={handleCloseUpload} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Card Template</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit Employee Details
                        </DialogContentText>
                        <UpdateEmployee 
                            data = {props.data} 
                            jobRole = {props.jb}
                            testProp = "Jam Juice"
                            />
                    </DialogContent>
                    <DialogActions>
                        
                        <Button onClick={handleCloseUpload} color="primary">
                            Cancel
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Card</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you Sure You want delete This Card Template
                </DialogContentText>

                </DialogContent>
                <DialogActions>
                <Button onClick={handleEmployeeDelete} color="primary">
                    Yes I am Sure
                </Button>
                <Button onClick={handleCloseDelete} color="primary">
                    No
                </Button>
                </DialogActions>
            </Dialog>
            </div>

            <div>
            <Dialog open={openAddLeave} onClose={handleCloseAddLeave} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Leave</DialogTitle>
                <DialogContent>
                
                    <CreateLeave nicNumber = {props.data.nicNumber} closeDialog = {handleCloseAddLeave}/>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={handleCloseAddLeave} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
            </div>

      </>
    )
}

export default Employee
