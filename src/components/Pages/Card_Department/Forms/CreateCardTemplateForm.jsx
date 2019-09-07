import React from 'react'
import {useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Container} from '@material-ui/core'
import S3ImageUploader from '../../../ImageUploaders/S3imageUploader'

import Cookies from 'universal-cookie';

import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { Redirect} from 'react-router-dom'

export default function CreateCardTemplateForm(props) {

    //const [imageName , setImageName] = useState('NoName')
    const [ridirectToSummaryPage , setRidirectToSummaryPage ] = useState(false)
    //GQL query
    const CREATE_CARD_TEMPLATE = gql`
        mutation CreateCardTemplate
        (
            $CardName : String  
            $Category : String
            $Price : Float
            $Size : String
            $Material : String
            $SearchTags : String

        )
        {
            createCardTemplate(
                    data:{
                        CardName : $CardName
                        Category : $Category
                        Size :  $Size
                        Price  : $Price
                        Material : $Material
                        SearchTags : $SearchTags
                    }
        )
    {
    CardId
    CardName
    Category
    Size
    Price
    Material
    SearchTags
    }
}
    `

    return (
        <Container>
        {ridirectToSummaryPage && <Redirect to = {"/staff/CreateCardTemplateSummary"} /> }
        <Formik
        
            initialValues={{
                  CardName : '',
                  Category : '',
                  Price : '',
                  Size : '',
                  Material : '',
                  SearchTags : ''

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
                    //setImageName(fields.CardName)
                    
                    client.mutate(
                        {
                            mutation: CREATE_CARD_TEMPLATE,
                            variables :{
                                CardName : fields.CardName,
                                Category : fields.Category,
                                Price : Number(fields.Price),
                                Size : fields.Size,
                                Material : fields.Material,
                                SearchTags : fields.SearchTags
                            }
                        }
                    ).then(
                        (data) => {
                            console.log(data)
                            const cookies = new Cookies();
                            cookies.set('CreatedCardTemplate', data , { path: '/' })
                            setRidirectToSummaryPage(true)
                            //props.history.push('http://localhost:3000/staff/CreateCardTemplateSummary/123')
                        }
                    ).catch(
                        (err) => {console.log(err)}
                    )
                    
                }
            }
            render = {({errors, status , touched}) => (
                <Form>
                      <div className="form-group">
                        <label htmlFor="CardName">CardName</label>
                        <Field name="CardName" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="CardName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Category">Category</label>
                        <Field component="select" name="Category" class="form-control">
                         
                            <option value="BirthDay" class="dropdown-item" >Birth Day</option>
                            <option value="MothersDay" class="dropdown-item">Mothers Day</option>
                            <option value="FathersDay" class="dropdown-item">Fathers Day</option>
                            <option value="BornDay" class="dropdown-item">Born Day</option>
                            <option value="NamingDay" class="dropdown-item">Naming Day</option>
                        </Field>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Price">Price</label>
                        <Field name="Price" type="number" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="CardName" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Material">Material</label>
                        <Field component="select" name="Material" class="form-control">
                         
                            <option value="GlossFinish" class="dropdown-item" >Gloss Finish</option>
                            <option value="MattFinish" class="dropdown-item">Matt Finish</option>
                            <option value="MagazineFinish">Magazine Finish</option>
                            <option value="RawFinish">Raw Finish</option>
                        
                    </Field>
                    </div>


                    <div className="form-group">
                        <label htmlFor="SearchTags">Search Tags (Separate By Comma)</label>
                        <Field name="SearchTags" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="CardName" component="div" className="invalid-feedback" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Size">Size (length X width) in inches</label>
                        <Field name="Size" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="Size" component="div" className="invalid-feedback" />
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
