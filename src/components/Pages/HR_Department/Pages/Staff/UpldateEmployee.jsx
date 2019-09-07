import React from 'react'
import {useEffect, useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Container} from  '@material-ui/core'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { Query } from 'react-apollo';
import S3imageUploader from '../../../../ImageUploaders/S3imageUploader'

function UpldateEmployee(props) {

    const [positions , setPositions] = useState([])
    const [departments , setDepartments] = useState('Management')
    const [selectedDepartment , setSelectedDepartment] = useState('Branch Manager')

    

    const handleChangeDepartment = (event) => 
    {
        console.log(event.target.value)
        setDepartments(event.target.value)
    }

    const handleChangePosition = (event) =>
    {
        setSelectedDepartment(event.target.value)
    }

    useEffect(
        () => 
        {
          

            //console.log(`The Hook Ran`)
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

            client.query(
                {
                    query : GET_POSITIONS,
                    variables : 
                    {
                        name : departments
                    },

                }
            ).then(
                (data) => {
                    console.log(data)
                    setPositions(data.data.positions)
                    console.log(positions)
                    }
            )
            .catch(
                (err) => 
                {
                    console.log(err)
                }
            )

        },
        [departments]
    )


    const GET_POSITIONS = gql`
        query Positions
        (
            $name : String
        )
        {
                positions(
                    where:{
                        department:{
                        name :$name
                        }
                    })
                {
                    jobRole
                }
        }
    `

    return (
        <Container>
            <Formik
            initialValues = {{
                EmployeeName : props.data.employeeName,
                Age : props.data.age,
                NicNumber : props.data.nicNumber,
                BankAccountNumber : props.data.bankAccountNumber,
                Position : props.data.position.jobRole,
                Department  : '',
                Address : props.data.address,
                PhoneNumber : props.data.phoneNumber,
                WorkEmail : props.data.workEmail,
                Password : props.data.password,
            }}
            validationSchema = { Yup.object().shape({

            })}
            onSubmit = {(fields) => 
                {
                    console.log(fields)
                    console.log(departments , selectedDepartment)

                    console.log('Employee id' , props.data.data)
                    const cache = new InMemoryCache();
                    const link = new HttpLink({
                    uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
                    })
                    const client = new ApolloClient({
                        cache,
                        link,
                        connectToDevTools: true
                    })

                    const UPDATE_EMPLOYEE = gql`
                    mutation UpdateEmployee
                    (
                            $employeeID : ID
                            $employeeName : String
                            $nicNumber : String
                            $bankAccountNumber : String
                            $phoneNumber : String
                            $address : String
                            $workEmail : String
                            $password : String
                            $jobRole : String
                    )
                        {
                        updateStaff
                        (
                            where:
                            {
                            employeeID : $employeeID
                            }
                            data:
                            {
                            employeeName : $employeeName
                            nicNumber : $nicNumber
                            bankAccountNumber : $bankAccountNumber
                            address : $address
                            phoneNumber : $phoneNumber
                            workEmail : $workEmail
                            password : $password
                            position : {
                                connect : {
                                jobRole : $jobRole
                                }
                            }
                            
                            }
                        )
                        {
                            employeeName
                            nicNumber
                            bankAccountNumber
                            position{
                            jobRole
                            }
                            workEmail
                            address
                            password
                        }
                        }
                    `
                
                client.mutate(
                    {
                        mutation : UPDATE_EMPLOYEE,
                        variables : 
                        {
                            employeeName : fields.EmployeeName,
                            nicNumber : fields.NicNumber ,
                            age : fields.Age,
                            bankAccountNumber : fields.BankAccountNumber,
                            phoneNumber : fields.PhoneNumber , 
                            address : fields.Address,
                            workEmail : fields.WorkEmail,
                            password : fields.Password,
                            jobRole : selectedDepartment,
                            employeeID : props.data.employeeID
                        } 
                    } 
                ).then(
                    (data) => {
                        console.log(data)
                        alert("Update Successfull")
                    }
                ).catch((err) => {console.log(err)})
                    
                }

                
                
            }
            render = {({errors, status , touched , values}) =>
            (
                <Form>
                    
                    <div className="form-group">
                        <label htmlFor="Department">Department</label>
                        <Field component="select" name="Department" class="form-control" onChange = {handleChangeDepartment} value = {departments}>
                            <option value="Human Resource Department" class="dropdown-item" >Human Resource Department</option>
                            <option value="Sales Department" class="dropdown-item" >Sales Department</option>
                            <option value="Baking Department" class="dropdown-item">Bakery</option>
                            <option value="Event Management Department">Event Management Department</option>
                            <option value="Photography Department">Photography Department</option>
                            <option value = "Cards Department">Cards Department</option>
                        </Field>
                    </div>

                    <div>
                        <label htmlFor="Position">Position</label>
                            <Field component="select" name="Position" class="form-control" onChange = {handleChangePosition} onBlur = {handleChangePosition} value = {selectedDepartment} >
                                {
                                    positions.map(
                                        (position) =>
                                        {
                                            return <option value={position.jobRole} class="dropdown-item" >{position.jobRole}</option>
                                        }
                                    )
                                }
                            </Field>
                    </div>
                     <hr/>           
                    
                     <div className="form-group">
                        <label htmlFor="EmployeeName">EmployeeName</label>
                        <Field name="EmployeeName" type="text" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="OTRate" component="div" className="invalid-feedback" />
                    </div>        

                    <div className="form-group">
                        <label htmlFor="Age">Age</label>
                        <Field name="Age" type="number" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="Age" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Age">NicNumber</label>
                        <Field name="NicNumber" type="text" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="NicNumber" component="div" className="invalid-feedback" />
                    </div>    

                    <div className="form-group">
                        <label htmlFor="BankAccountNumber">BankAccountNumber</label>
                        <Field name="BankAccountNumber" type="text" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="BankAccountNumber" component="div" className="invalid-feedback" />
                    </div> 

                    <div className="form-group">
                        <label htmlFor="Address">Address</label>
                        <Field name="Address" type="text" component = "textArea" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="Address" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="PhoneNumber">PhoneNumber</label>
                        <Field name="PhoneNumber" type="string" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="PhoneNumber" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="WorkEmail">WorkEmail</label>
                        <Field name="WorkEmail" type="text" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="WorkEmail" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                        <Field name="Password" type="text" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="Password" component="div" className="invalid-feedback" />
                    </div>   

                    <div className="form-group">
                        <label htmlFor="ReEnterPassword">"ReEnterPassword"</label>
                        <Field name="ReEnterPassword" type="text" className={'form-control' + (errors.OTRate && touched.OTRate ? ' is-invalid' : '')} />
                        <ErrorMessage name="ReEnterPassword" component="div" className="invalid-feedback" />
                    </div>       

                    
                    <div className="form-group">
                        <label htmlFor="">Upload Profile Picture</label>
                        <S3imageUploader imageName = {props.data.employeeID} />
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

export default UpldateEmployee
