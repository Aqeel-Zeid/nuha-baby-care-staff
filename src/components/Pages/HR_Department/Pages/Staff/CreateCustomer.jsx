import React from 'react'
import {useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Container, Typography} from '@material-ui/core'
import S3ImageUploader from '../../../../ImageUploaders/S3imageUploader'

import Cookies from 'universal-cookie';

import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { Redirect} from 'react-router-dom'


function CreateCustomer() {
    const [ridirectToSummaryPage , setRidirectToSummaryPage ] = useState(false)
    
    return (
        <Container>
            <Typography variant = "h3">
                Create Customer
            </Typography>  
            <br/>
            <hr/>
            <br/> 
        {ridirectToSummaryPage && <Redirect to = {"/staff/CreateCustomerSummary"} /> }
        <Formik
        
            initialValues={{
                 CustomerName : '',
                 Address  : '',
                 Gender : 'Male',
                 Phone : '',
                 CustomerEmail : '',
                 Ethnicity : 'Sinhala',
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

                    const CREATE_CUSTOMER  = gql`
                        mutation CreateCustomer
                        (
                                $CustomerName : String
                                $Address : String
                                $Gender : String
                                $Phone : Int
                                $CustomerEmail :String
                                $Ethnicity : String
                        )
                            {
                            createCustomer(data:{
                                CustomerName : $CustomerName
                                Address : $Address
                                Gender : $Gender
                                Phone : $Phone
                                CustomerEmail : $CustomerEmail
                                Ethnicity : $Ethnicity
                            })
                            {
                                CustomerID
                                CustomerName
                                Address
                                Gender
                                Phone
                                CustomerEmail
                                Ethnicity
                            }
                            }
                    `
                    client.mutate
                    (
                        {
                            mutation : CREATE_CUSTOMER,
                            variables :{
                                CustomerName : fields.CustomerName,
                                Address : fields.Address,
                                Gender : fields.Gender,
                                Phone : Number(fields.Phone),
                                CustomerEmail : fields.CustomerEmail,
                                Ethnicity : fields.Ethnicity
                            }
                        }
                    ).then
                    (
                        (data) =>
                        {
                            alert('Added Successfully')
                            console.log(data)
                        }
                    ).catch
                    (
                        (err) =>
                        {
                            alert('Added UnSuccessfully')
                            console.log(err)
                        }
                    )
                }
            }
            render = {({errors, status , touched}) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="CustomerName">Customer Name</label>
                        <Field name="CustomerName" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="CustomerName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Address">Address</label>
                        <Field name="Address" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="Address" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Gender">Gender</label>
                        <Field component="select" name="Gender" class="form-control">
                            <option value="Male" class="dropdown-item" >Male</option>
                            <option value="Female" class="dropdown-item">Female</option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Phone">Phone</label>
                        <Field name="Phone" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="BookingCost" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CustomerEmail">Customer Email</label>
                        <Field name="CustomerEmail" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="PackageName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Ethnicity">Ethnicity</label>
                        <Field component="select" name="Ethnicity" class="form-control">
                            <option value="Sinhala" class="dropdown-item" >Sinhala</option>
                            <option value="Tamil" class="dropdown-item">Tamil</option>
                            <option value="Muslim" class="dropdown-item">Muslim</option>
                            <option value="Christian" class="dropdown-item">Christian</option>
                        </Field>
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

export default CreateCustomer
