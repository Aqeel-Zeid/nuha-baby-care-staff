import React from 'react'
import {useState} from 'react'
import {Container, Grid , Typography , TextField , Button} from '@material-ui/core'
import Employee from '../../SpecialComponents/Employee'
import { gql, HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';

export default function SearchEmployees() {

    const [ employeeObj, setEmployeeObj ] = useState({})
    const [ showEmployee , setShowEmployee ] = useState(false)
    const [ jobRole , setJobRole] = useState('')

    const SEARCH_EMPLOYEES = gql`
            query Staffs(
                $nic : String
            )
            {
                        staffs
                        (
                            where:{
                            nicNumber : $nic
                            }
                        )
                        {
                            employeeID
                                employeeName
                                nicNumber
                                bankAccountNumber
                                position{
                                            jobRole
                                        }
                                address
                                phoneNumber
                                workEmail
                        }
            }
    `

    const [searchText, setSearchText] = React.useState('');
    const handleChange = name => event => {

        //setSearchText(event.target.value.length)
        if(event.target.value.length < 10)
        {
            setShowEmployee(false)
        } 

        if(event.target.value.length  >= 10)
        {  
          //setSearchText(event.target.value.trim()
          setShowEmployee(true)
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
                  query:SEARCH_EMPLOYEES,
                  variables : {
                      nic : event.target.value
                  }
                
                  
              }
          ).then
          (
              (data) =>
              {
                  console.log(data.data.staffs[0].position.jobRole)
                  setEmployeeObj(data.data.staffs[0])
                  setJobRole(data.data.staffs[0].position.jobRole)
              }
          ).catch
          (
              (err) => 
              {
                  console.log(err)
              }
          )

        }
      

    };
    return (
        <div>
            <Container Container>
            <Grid   container >
                <Grid item xs = "12">
                    <Typography variant = "h2">
                        Employee Search
                    </Typography>
                </Grid>
                <Grid item xs = "12">
                <TextField
                    id="outlined-name"
                    label="Employee NIC"
                    onChange={handleChange('name')}
                    onKeyPress = {handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <Button fullWidth >Search Button</Button>
                </Grid>
                <Grid item xs = "12">
                    <Typography variant = "h5">
                        {`You Searched for Employee NIC '${searchText}'`}
                    </Typography>
                    
                </Grid>
                <Grid container style={{ backgroundColor: '#fffff', height: '80vh' }}  >
                   
                   {
                       showEmployee && <Employee data = {employeeObj} jb = {jobRole} />
                   }
                   
                   
                        
                </Grid>
            </Grid>
            <br/>
            </Container>
        </div>
    )
}
