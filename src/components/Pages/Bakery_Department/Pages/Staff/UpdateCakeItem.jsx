import React from 'react'
import {useState, useEffect} from 'react'
import {Container, Typography , Grid , TextField} from '@material-ui/core'
import S3imageUploader from '../../../../ImageUploaders/S3imageUploader'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function UpdateCakeItem() {
    return (
        <div>
            <>
            <Container>
                <br/>
                <Typography variant = "h2">
                        Update Cake Item
                </Typography>
                <Formik
                initialValues={{
                    CakeItemName : "",
                    Price : "",
                    Category : "BaseLayer"
                }}
                validationSchema={Yup.object().shape({
                        CakeItemName : Yup.string().required('Field is Required').max(25,'Maximum is 25 characters'),
                        Price : Yup.number().required('Price is Needed').min(99).max(10000)
                })}
                onSubmit={fields => {
                    console.log(fields)

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
                    
                    const UPDATE_CAKE_ITEM = gql`
                        mutation UpdateCakeItem
                        (
                            $CakeItemName : String
                            $Price : Int
                            $Category : String
                        )
                        {
                                    updateCakeItem(
                                        where: { CakeItemName: $CakeItemName }
                                        data: { Price: $Price, Category: $Category }
                                    ) {
                                        CakeItemID
                                        CakeItemName
                                        Price
                                        Category
                                        SoldItems
                                    }
                                    }

                    `

                    client.mutate
                    (
                        {
                            mutation : UPDATE_CAKE_ITEM,
                            variables : 
                            {
                                CakeItemName : fields.CakeItemName,
                                Price : Number(fields.Price),
                                Category : fields.Category
                            }
                        }
                    ).then
                    (
                        (data) =>
                        {
                            console.log(data)
                            alert("Updated Successfully ")
                            
                        }
                    ).catch
                    (
                        (err) =>
                        {
                            console.log(err)
                            alert("Updated Unuccessfully Wrong Item Name Please Enter Coreect Item Name")
                        }
                    )

                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="CakeItemName">Cake Item Name</label>
                            <Field name="CakeItemName" type="text" className={'form-control' + (errors.CakeItemName && touched.CakeItemName ? ' is-invalid' : '')} />
                            <ErrorMessage name="CakeItemName" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Price">Price</label>
                            <Field name="Price" type="number" className={'form-control' + (errors.Price && touched.Price ? ' is-invalid' : '')} />
                            <ErrorMessage name="Price" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">

                            <label htmlFor="Category">Category</label>
                            <Field component="select" name="Category" class="form-control">
                                <option value="Base" class="dropdown-item" >Base</option>
                                <option value="IcingDesign" class="dropdown-item">Icing Design</option>
                                <option value="Topping">Topping</option>
                            </Field>
                            <ErrorMessage name="Department" component="div" className="invalid-feedback" />

                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Add</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Form>

                )}

            />
                    
                </Container>
                
            </>
        </div>
    )
}

export default UpdateCakeItem
