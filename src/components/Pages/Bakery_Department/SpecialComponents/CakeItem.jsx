import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Card as Card_S, Container , Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import S3ImgView from "../../../ImageUploaders/S3ImgViewer";



import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

const useStyles = makeStyles({
    card: {
        maxWidth: 400,
        maxHeight: 450
    },
    media: {
        height: 20,
    },
});


function CakeItem({CakeItemID,CakeItemName,Category,Price,SoldItems}) {

    const classes = useStyles();

    const [openDelete, setOpenDelete] = React.useState(false);
    

    function handleClickOpenDelete() {
        setOpenDelete(true);
    }

    function handleCloseDelete() {
        setOpenDelete(false);
    }

    function handleCakeItemDelete()
    {
        const DELETE_CAKE_ITEM = gql`
            mutation DeleteCakeItem
            (
                $CakeItemID : ID
            ) 
            {
            deleteCakeItem(where: { CakeItemID: $CakeItemID }) 
            {
            CakeItemID
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
                mutation : DELETE_CAKE_ITEM,
                variables : 
                {
                    CakeItemID : CakeItemID
                }
            }
        ).then
        (
            (data) =>
            {
                console.log(data)
                alert("Item Deleted ")
                handleCloseDelete(true)
            }
        ).catch
        (
            (err) =>
            {
                console.log(err)
                alert("Item Delete Unsuccessfull")

            }
        )

    }

    return (
        <>
            <Grid item >
                <Grid item xs = "4">
                    <S3ImgView imageName = {CakeItemID}  height = "450px" width = "400px"/>
                </Grid>
                <Grid item xs = "8">

                </Grid>
                <Grid item xs = "12">
                    <Card_S className={classes.card}>
                        <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {CakeItemName}
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Category
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {Category}
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Price in LKR
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {Price}
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Sold Items
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {SoldItems}
                                    </Typography>   
                                </CardContent>
                            </CardActionArea>
                    <CardActions>
                    
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
            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Card Delete</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you Sure You want delete This Card Template
                </DialogContentText>
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCakeItemDelete} color="primary">
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

export default CakeItem
