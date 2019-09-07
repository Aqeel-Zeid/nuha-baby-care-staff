import React from 'react'
import {useState} from 'react'

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

const useStyles = makeStyles({
    card: {
        maxWidth: 400,
        maxHeight: 450
    },
    media: {
        height: 20,
    },
});

export default function Item(props) {

    function handleUpdateStock(event)
    {
        setStock(event.target.value)
    }

    const [stock, setStock] = useState(0);
    const classes = useStyles();

    function handleItemDelete()
    {
        const DELETE_ITEM = gql`
            mutation DeleteItem
            (
                $itemId : ID
            )
            {
                deleteItem(where:{
                    ItemId : $itemId
                })
                {
                    ItemId
                    ItemName
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
                mutation : DELETE_ITEM,
                variables : 
                {
                    itemId : props.ItemID
                }
            }
        ).then(
            (data) =>
            {
                console.log(data)
                alert("Item Deleted Successfully")
                setOpenDelete(false)

            }

        ).catch
        (
            (err) => 
            {
                console.log(err)
                alert("Item Deleted Unsuccessfully")
            }
        )
        

    }

    function handleStockUpdate()
    {
        //console.log("Update Stock to" , stock)

        const UPDATE_ITEM = gql`
            mutation UpdateItem
                    (
                        $newStock : Int
                        $itemId : ID
                    )
                    {
                    updateItem
                    (
                        data:
                        {
                        Stock : $newStock
                        }
                        where :
                        {
                        ItemId : $itemId
                        }
                    )
                    {
                        Stock
                        ItemName
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


        client.mutate({
            mutation : UPDATE_ITEM,
            variables : 
            {
                newStock : Number(stock),
                itemId : props.ItemID
            }
        }).then
        (
            (data) => 
            {
                console.log(data)
                alert('Stock Updated Successfully')
                setOpenUpload(false)
            }
        ).catch
        (
            (err) => 
            {
                console.log(err)
                alert('Stock Updated  Failed Successfully')
            }
        )


    }

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

    return (
        <>
            <Grid item >
                <Grid item xs = "4">
                    
                </Grid>
                <Grid item xs = "8">
                    <S3ImgView imageName = {props.ItemID} height = "450" width = "400"/>
                </Grid>
                <Grid item xs = "12">
                    <Card_S className={classes.card}>
                        <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        ItemName
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.ItemName}` }
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Category
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.Category}` }
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Stock
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.Stock}` }
                                    </Typography>   
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Price
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.Price}` }
                                    </Typography> 
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Brand
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        { `${props.Brand}` }
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
                    <DialogTitle id="form-dialog-title">Update Card Template</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Update Stocks
                        </DialogContentText>
                        
                        <Typography variant = "h4">
                            Current Stock = {`${props.Stock}`} 
                        </Typography>
                        <TextField
                            onChange = {handleUpdateStock}
                            value = {stock}
                            id="outlined-required"
                            label="New Stock"
                            defaultValue="0"
                            margin="normal"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        
                        <Button onClick={handleCloseUpload} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleStockUpdate} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        

            <div>
            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Card Delete</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you Sure You want delete This Card Template
                </DialogContentText>
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleItemDelete} color="primary">
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
