import React from 'react'
import {useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Container} from '@material-ui/core'
import S3ImageUploader from '../../../ImageUploaders/S3imageUploader'

import Cookies from 'universal-cookie';

import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { Redirect} from 'react-router-dom'



function CreateItemForm() {

    const [ridirectToSummaryPage , setRidirectToSummaryPage ] = useState(false)
    const CREATE_ITEM = gql`
        mutation CreateItem
        (
            $ItemName : String
            $Category : String
            $Price : Int
            $Stock : Int 
            $Brand : String
        )
                {
                createItem(
                    data:
                    {
                    ItemName : $ItemName
                    Category : $Category
                    Price : $Price
                    Stock : $Stock
                    Brand : $Brand
                    })
                {
                    ItemId
                    ItemName
                    Category
                    Price
                    Stock
                    Brand
                }
                }
    `
    return (
        <Container>
        {ridirectToSummaryPage && <Redirect to = {"/staff/CreateItemSummary"} /> }
        <Formik
        
            initialValues={{    
                ItemName : '',
                Category : `Boys' Toys`,
                Price : '',
                Stock : '',
                Brand : '',
                  
            }}
            validationSchema = { Yup.object().shape({

            })}
            onSubmit = {
                fields =>
                {
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

                    client.mutate
                    (
                        {
                            mutation : CREATE_ITEM,
                            variables : {
                                ItemName : fields.ItemName,
                                Category : fields.Category,
                                Price : fields.Price,
                                Stock : fields.Stock,
                                Brand : fields.Brand,
                            }
                        }
                    ).then
                    (
                        (data) => 
                        {
                            alert("Item Added Successfully")
                            const cookies = new Cookies();
                            cookies.set('CreatedItem', data , { path: '/' })
                            setRidirectToSummaryPage(true)
                            console.log(data)
                        }
                    ).catch
                    (
                        (err) => 
                        {
                            alert("Item Adding Failed Successfully")
                            console.log(err)

                        }
                    )
                }
            }
            render = {({errors, status , touched}) => (
                <Form>

                    <div className="form-group">
                        <label htmlFor="ItemName">ItemName</label>
                        <Field name="ItemName" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="ItemName" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Brand">Brand</label>
                        <Field name="Brand" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="Brand" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Category">Category</label>
                        <Field component="select" name="Category" class="form-control">
                         
                            <option value="BoysToys" class="dropdown-item" >Boys' Toys</option>
                            <option value="GirlsToys" class="dropdown-item">Girls' Toys</option>
                            <option value="InfantWearFemale" class="dropdown-item">Infant Wear Female</option>
                            <option value="InfantWearMale" class="dropdown-item">Infant Wear Male</option>
                            <option value="ChildAccessories" class="dropdown-item">Child Accessories</option>
                            <option value="ChildrensBooks" class="dropdown-item">Childrens' Books</option>
                            
                        </Field>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Price">Price</label>
                        <Field name="Price" type="number" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="Price" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Stock">Stock</label>
                        <Field name="Stock" type="number" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="Stock" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2">Register</button>
                        <button type="reset" className="btn btn-secondary">Reset</button>
                    </div>
                </Form>
            )} 
        
        />
       
        
        </Container>
    )
}

export default CreateItemForm
