import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useState} from 'react'
import * as Yup from 'yup';
import {Container} from '@material-ui/core'
import Cookies from 'universal-cookie';
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { Redirect} from 'react-router-dom'
import S3imageUploader from '../ImageUploaders/S3imageUploader'

function UpdateCardTemplateForm({ cardName, category, price, size , cardId , searchTags}) {
    
    const [ridirectToSummaryPage , setRidirectToSummaryPage ] = useState(false)
    
    

    const UPDATE_CARD_TEMPLATE = gql`
        mutation UpdateCardTemplate
        (
            $CardName : String  
            $Category : String
            $Price : Float
            $Size : String
            $Material : String
            $SearchTags : String
            $CardId : ID!
        )
        {
            updateCardTemplate(where:{
                CardId : $CardId
            }, 
            data :{
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
                Price
                Size
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
                    CardName : cardName,
                    Category : category,
                    Price : price,
                    Size : size,
                    Material : cardId,
                    SearchTags : searchTags
  
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

                        client.mutate(
                            {
                                mutation : UPDATE_CARD_TEMPLATE,
                                variables : {
                                    CardName : fields.CardName,
                                    Category : fields.Category,
                                    Price : Number(fields.Price),
                                    Size : fields.Size,
                                    Material : fields.Material,
                                    SearchTags : fields.SearchTags,
                                    CardId : cardId
                                }
                            }
                        ).then(
                            (data) => {
                                console.log(data)
                                const cookies = new Cookies();
                                cookies.set('CreatedCardTemplate', data , { path: '/' })
                                //  setRidirectToSummaryPage(true)
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
                                <option value="FathersDay">Fathers Day</option>
                                <option value="BornDay">Born Day</option>
                                <option value="NamingDay">Naming Day</option>
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

            <div className="form-group">
                            <label>New Image</label>
                           <S3imageUploader imageName = {cardId} />
            </div>   
            
        </Container>
    )
}

export default UpdateCardTemplateForm
