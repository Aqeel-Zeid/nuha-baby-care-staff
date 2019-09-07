import React from 'react'


import { makeStyles } from '@material-ui/core/styles';
import { Card as Card_S, Container , Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import S3ImgView from "../../../ImageUploaders/S3ImgViewer";
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import UpdateFrame from '../Pages/Staff/UpdateFrame';

const useStyles = makeStyles({
    card: {
        maxWidth: 400,
        maxHeight: 450
    },
    media: {
        height: 20,
    },
});


function PhotoFrame(props) {

    const classes = useStyles();

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

    function handleFrameDelete()
    {
        

        const DELETE_FRAME = gql`
                    mutation DeletePhotoFrameTemplate
                    (
                        $FrameID : ID
                    )
                    {
                    deletePhotoFrameTemplate(where:
                        {
                        FrameID : $FrameID
                        })
                    {
                        FrameID
                        FrameName
                        FrameMaterial
                        PhotoFinish
                        Price
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
                mutation : DELETE_FRAME,
                variables :
                {
                        FrameID : props.FrameID
                }
            }
        ).then(
            (data) =>
            {
                alert("Frame Delete Successfully")
                setOpenDelete(false)
            }
        ).catch(
            (err) => 
            {
                alert("Frame Delete unSuccessfull")
                console.log(err)
            }
            
        )    
                  

            

    }

    return (
        <>
            <Grid item >
                <Grid item xs = "4">
                    
                </Grid>
                <Grid item xs = "8">
                    <S3ImgView imageName = {props.FrameID} height = "450" width = "400"/>
                </Grid>
                <Grid item xs = "12">
                    <Card_S className={classes.card}>
                        <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Frame Name
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.FrameName}` }
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Dimensions
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.Dimensions}` }
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Frame Material
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.FrameMaterial}` }
                                    </Typography>   
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Price
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.Price}` }
                                    </Typography> 
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Photo Finish
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.PhotoFinish}` }
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" fullWidth onClick={handleClickOpenUpload}>
                        Update
                    </Button>
                    <Button size="small" color="secondary" fullWidth  onClick={handleClickOpenDelete} >
                        Delete
                    </Button>
                </CardActions>
                    </Card_S>
                </Grid>
                <Grid item xs = "8">

                </Grid>
            </Grid>
            <div>
                <Dialog open={openUpload} onClose={handleCloseUpload} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Frame Template</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit FrameTemplate of 
                        </DialogContentText>
                            <UpdateFrame 
                                FrameID = {props.FrameID}
                                FrameName = {props.FrameName}
                                Dimensions = {props.Dimensions}
                                FrameMaterial = {props.FrameMaterial}
                                Price = {props.Price}
                                PhotoFinish = {props.PhotoFinish}
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
                <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you Sure You want delete This Frame Template
                </DialogContentText>
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleFrameDelete} color="primary">
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

export default PhotoFrame
