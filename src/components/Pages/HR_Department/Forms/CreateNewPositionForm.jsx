import React from 'react'
import useForm from 'react-hook-form'
import {useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container } from '@material-ui/core'


import { useMutation } from '@apollo/react-hooks';
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';


const CREATE_POSITION = gql`
    mutation CreatePosition
    (
        $name : String
        $basicSalary : Float,
        $otRate : Float
        $jobRole : String
        $contractBasis : Boolean
    )
    {
  createPosition(
    data: {
      department: { connect: { name: $name } }
      basicSalary: $basicSalary
      otRate: $otRate
      jobRole: $jobRole
      contractBasis: $contractBasis
    }
  ) {
    positionId
    department {
      departmentID
      name
    }
    basicSalary
    otRate
    jobRole
    contractBasis
    PerContractPrice
  }
}


`



function CreateNewPositionForm() {

    

    return (
        <>
        <Formik
            initialValues={{
                Position: '',
                BasicSalary: '',
                OTRate: '',
                jobRole: '',
                Department: 'Human Resource Department'
            }}
            validationSchema={Yup.object().shape({
                
                BasicSalary: Yup.number('Should Be a Number')
                    .required('should be a Number'),
                OTRate: Yup.number()
                    .required('OT rate is required'),
                jobRole: Yup.string()
                    .max(25, 'Maximum is 25 characters')
                    .required('JobRole is required')
            })}
            onSubmit={fields => {
                alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))

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
                        mutation: CREATE_POSITION,
                        variables: {
                            name: fields.Department,
                            basicSalary: Number(fields.BasicSalary) ,
                            otRate: Number(fields.OTRate) ,
                            jobRole: fields.jobRole,
                            contractBasis: false
                        }
                    }
                ).then
                    (
                        (data) => {
                            console.log(data)
                        }
                    ).
                    catch
                    (
                        (err) => { console.log(err) }
                    )


            }}
            render={({ errors, status, touched }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="jobRole">Job Role(Position)</label>
                        <Field name="jobRole" type="text" className={'form-control' + (errors.jobRole && touched.jobRole ? ' is-invalid' : '')} />
                        <ErrorMessage name="jobRole" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="BasicSalary">Basic Salary</label>
                        <Field name="BasicSalary" type="number" className={'form-control' + (errors.BasicSalary && touched.BasicSalary ? ' is-invalid' : '')} />
                        <ErrorMessage name="BasicSalary" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">

                        <label htmlFor="Department">Department</label>
                        <Field component="select" name="Department" class="form-control">
                            <option value="Human Resource Department" class="dropdown-item" >Human Resource Department</option>
                            <option value="Sales Department" class="dropdown-item" >Sales Department</option>
                            <option value="Baking Department" class="dropdown-item">Bakery</option>
                            <option value="Event Management Department">Event Management Department</option>
                            <option value="Photography Department">Photography Department</option>
                            <option value = "Cards Department">Cards Department</option>
                        </Field>
                        <ErrorMessage name="Department" component="div" className="invalid-feedback" />

                    </div>
                    <div className="form-group">
                        <label htmlFor="OTRate">Over Time Rate (Per Hour)</label>
                        <Field name="OTRate" type="text" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="OTRate" component="div" className="invalid-feedback" />
                    </div>



                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-2">Register</button>
                        <button type="reset" className="btn btn-secondary">Reset</button>
                    </div>
                </Form>

            )}

        />
        
        </>
    )
}


export default CreateNewPositionForm
