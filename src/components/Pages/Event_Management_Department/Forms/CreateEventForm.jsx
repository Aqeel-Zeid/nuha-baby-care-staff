import React from 'react'
import {useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Container} from '@material-ui/core'
import S3ImageUploader from '../../../ImageUploaders/S3imageUploader'

import Cookies from 'universal-cookie';

import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { Redirect} from 'react-router-dom'

function CreateEventForm() {

    const [ridirectToSummaryPage , setRidirectToSummaryPage ] = useState(false)

    return (
        <Container>
        {ridirectToSummaryPage && <Redirect to = {"/staff/CreateEventFormSummary"} /> }
        <Formik
        
            initialValues={{
                 PackageName : '',
                 BookingCost : '',
                 FoodPackage : 'LiteSnack',
                 PhotographyServices : 'StandardOnePhotographer',
                 Sounds : 'SmallRoom'
            }}
            validationSchema = { Yup.object().shape({

            })}
            onSubmit = {
                fields =>
                {
                    console.log(fields)

                    const CREATE_EVENT_PACKAGE = gql`
                            mutation CreateEventPackage
                            (
                                $PackageName : String
                                $BookingCost : Int
                                $FoodPackage : String
                                $PhotographyServices : String
                                $Sounds : String
                            )
                            {
                                        createEventPackage(
                                            data: {
                                            PackageName: $PackageName
                                            BookingCost: $BookingCost
                                            FoodPackage: $FoodPackage
                                            PhotographyServices: $PhotographyServices
                                            Sounds: $Sounds
                                            }
                                        ) {
                                            PackageID
                                            PackageName
                                            BookingCost
                                            FoodPackage
                                            PhotographyServices
                                            Sounds
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
                                mutation: CREATE_EVENT_PACKAGE,
                                variables : 
                                {
                                    PackageName : fields.PackageName,
                                    BookingCost : Number(fields.BookingCost),
                                    FoodPackage : fields.FoodPackage,
                                    PhotographyServices : fields.PhotographyServices,
                                    Sounds : fields.Sounds

                                }
                            }
                        ).then
                        (
                            (data) => 
                            {
                                console.log(data)
                                const cookies = new Cookies();
                                cookies.set('CreatedPackage', data , { path: '/' })
                                alert("Package Created Successfully")
                                setRidirectToSummaryPage(true)
                            }
                        ).catch
                        (
                            (err) =>
                            {
                                console.log(err)
                                alert("Package Created UnSuccessfully")
                            }
                        )
                }
            }
            render = {({errors, status , touched}) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="PackageName">Package Name</label>
                        <Field name="PackageName" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="PackageName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="BookingCost">Booking Cost</label>
                        <Field name="BookingCost" type="Number" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="BookingCost" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="FoodPackage">Food Package</label>
                        <Field component="select" name="FoodPackage" class="form-control">
                         
                            <option value="LiteSnack" class="dropdown-item" >Lite Snack</option>
                            <option value="StandardMeal" class="dropdown-item">Standard Meal</option>
                            <option value="3CourseMeal" class="dropdown-item">3 Course Meal</option>
                            <option value="5CourseMeal" class="dropdown-item">5 Course Meal</option>
                            
                        </Field>
                    </div>

                    <div className="form-group">
                        <label htmlFor="PhotographyServices">Photography Services</label>
                        <Field component="select" name="PhotographyServices" class="form-control">
                         
                            <option value="StandardOnePhotographer" class="dropdown-item" >Standard One Photographer</option>
                            <option value="StandardTwoPhotographers" class="dropdown-item">StandardTwoPhotographers</option>
                            <option value="VideographerAndPhotographer" class="dropdown-item">Videographer And Photographer</option>
                            <option value="PhotographyAndEditing" class="dropdown-item">Photography And Editing</option>
                            <option value="DeluxMediaCoverage" class="dropdown-item">Delux Media Coverage</option>
                        
                        </Field>
                    </div>
        
                    <div className="form-group">
                        <label htmlFor="Sounds">Sounds</label>
                        <Field component="select" name="Sounds" class="form-control">
                         
                            <option value="SmallRoom" class="dropdown-item">Small Room</option>
                            <option value="LargeHall" class="dropdown-item">Large Hall</option>
                            <option value="Auditorium" class="dropdown-item">Auditorium</option>
                            <option value="OutdoorSmall" class="dropdown-item">Outdoor Small</option>
                            <option value="Ground" class="dropdown-item">Ground</option>
                        
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

export default CreateEventForm
