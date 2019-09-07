import React from 'react'
import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container } from '@material-ui/core'
import S3ImageUploader from '../../../ImageUploaders/S3imageUploader'

import Cookies from 'universal-cookie';

import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { Redirect } from 'react-router-dom'



function CreatePhotoFrameForm(props) {

    const [ridirectToSummaryPage, setRidirectToSummaryPage] = useState(false)

    return (
        <Container>
            {ridirectToSummaryPage && <Redirect to={"/staff/CreatePhotoFrameSummary"} />}
            <Formik
                initialValues={{
                    Dimensions: '5X7',
                    FrameMaterial: 'Plastic',
                    Price: '',
                    PhotoFinish: 'Matte',
                    FrameName: ''

                }}
                validationSchema={Yup.object().shape({

                })}
                onSubmit={
                    fields => {
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

                        const CREATE_FRAME = gql`
                            mutation CreatePhotoFrame
                            (
                                $FrameName : String
                                $FrameMaterial : String
                                $PhotoFinish : String
                                $Price : Int
                                $Dimensions : String
                            )
                                {
                                    createPhotoFrameTemplate
                                    (
                                        data:
                                        {
                                        FrameName: $FrameName
                                        FrameMaterial : $FrameMaterial
                                        PhotoFinish : $PhotoFinish
                                        Price : $Price
                                        Dimensions : $Dimensions

                                        }
                                    )
                                    {
                                        FrameID
                                        FrameName
                                        FrameMaterial
                                        PhotoFinish
                                        Price
                                        Dimensions
                                    }
                                }
                        `
                        
                        client.mutate(
                            {
                                mutation: CREATE_FRAME,
                                variables : 
                                {
                                    FrameName : fields.FrameName,
                                    FrameMaterial : fields.FrameMaterial,
                                    PhotoFinish : fields.PhotoFinish,
                                    Price : fields.Price,
                                    Dimensions : fields.Dimensions,
                                    FrameID : props.FrameID
                                }
                            }
                        ).then
                        (
                            (data) => 
                            {   
                                alert("Adding Successfully")
                                console.log(data)
                                const cookies = new Cookies();
                                cookies.set('CreatedPhotoFrame', data , { path: '/' })
                                setRidirectToSummaryPage(true)
                            }
                        ).catch
                        (
                            (err) => 
                            {
                                alert("Adding Failed Successfully")
                                console.log(err)
                            }
                        )
                            
                    }
                }
                render={({ errors, status, touched }) => (
                    <Form>

                        <div className="form-group">
                            <label htmlFor="FrameName">FrameName</label>
                            <Field name="FrameName" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                            <ErrorMessage name="FrameName" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Price">Price</label>
                            <Field name="Price" type="number" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                            <ErrorMessage name="Price" component="div" className="invalid-feedback" />
                        </div>


                        <div className="form-group">
                            <label htmlFor="PhotoFinish">PhotoFinish</label>
                            <Field component="select" name="PhotoFinish" class="form-control">
                                <option value="Matte" class="dropdown-item" >Matte</option>
                                <option value="Glossy" class="dropdown-item">Glossy</option>
                                <option value="Metalic" class="dropdown-item">Metalic</option>
                                <option value="Lustre" class="dropdown-item">Lustre</option>
                            </Field>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Dimensions">Dimensions(inches)</label>
                            <Field component="select" name="Dimensions" class="form-control">
                                <option value="5X7" class="dropdown-item" >5 X 7</option>
                                <option value="8X10" class="dropdown-item">8 X 10</option>
                                <option value="8.5X11" class="dropdown-item">8.5 X 11</option>
                                <option value="11X14" class="dropdown-item">11 X 14</option>
                                <option value="16X20" class="dropdown-item">16 X 20</option>
                                <option value="24X36" class="dropdown-item">24 X 36</option>
                            </Field>
                        </div>

                        <div className="form-group">
                            <label htmlFor="FrameMaterial">FrameMaterial</label>
                            <Field component="select" name="FrameMaterial" class="form-control">
                                <option value="Plastic" class="dropdown-item" >Plastic</option>
                                <option value="Aluminium" class="dropdown-item">Aluminium</option>
                                <option value="Copper">Copper</option>
                                <option value="Silver">Silver</option>
                                <option value="Mahogani">Mahogani</option>
                                <option value="Teak">Teak</option>
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

export default CreatePhotoFrameForm
