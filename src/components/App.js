import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Route, Link } from "react-router-dom";
import '../styles/App.css'
import Login from './Pages/Login'
import {ApolloClient} from 'apollo-boost'
import { HttpLink, InMemoryCache } from 'apollo-boost';
import HRDashBoard from './Pages/Dashboards/HRDashboard'
import AttendanceMarking from './Pages/HR_Department/Pages/Staff/AttendanceMarking'
import CreateEmployee from './Pages/HR_Department/Pages/Staff/CreateEmployee'
import CreateNewPositionPage from './Pages/HR_Department/Pages/Staff/CreateNewPositionPage'
import CreateCardTemplate from './Pages/Card_Department/Pages/Staff/CreateCardTemplate'
import CreateCardTemplateSummary from './Pages/Card_Department/Forms/FormSummary/CreateCardTemplateSummary'
import StaffSearchCards from './Pages/Card_Department/Pages/Staff/StaffSearchCard'
import SearchEmployees from './Pages/HR_Department/Pages/Staff/SearchEmployees'
import CreatePhotoFrame from './Pages/Photography_Department/Pages/Staff/CreatePhotoFrame'
import CreatePhotoFrameSummary from './Pages/Photography_Department/Forms/FormSummary/CreatePhotoFrameSummary'
import SearchPhotoFrame from './Pages/Photography_Department/Pages/Staff/SearchPhotoFrame'
import CreateItem from './Pages/HR_Department/Pages/Staff/CreateItem'
import CreateItemSummary from './Pages/HR_Department/Forms/FormSummary/CreateItemSummary'
import SearchItem from './Pages/HR_Department/Pages/Staff/SearchItem'
import SearchLeaveDay from './Pages/HR_Department/Pages/Staff/SearchLeaveDay'
import CreateEvent from './Pages/Event_Management_Department/Pages/Staff/CreateEvent'
import CreateEventFormSummary from './Pages/Event_Management_Department/Forms/FormSummary/CreateEventFormSummary'
import SearchEventPackages from './Pages/Event_Management_Department/Pages/Staff/SearchEventPackages'
import CreateCustomer from './Pages/HR_Department/Pages/Staff/CreateCustomer'
import SearchCustomer from './Pages/HR_Department/Pages/Staff/SearchCustomer'
import UpdateLoyalityPoints from './Pages/HR_Department/Pages/Staff/UpdateLoyalityPoints'
import CreateCakeItem from './Pages/Bakery_Department/Pages/Staff/CreateCakeItem'
import SearchCakeItem from './Pages/Bakery_Department/Pages/Staff/SearchCakeItem'
import UpdateCakeItem from './Pages/Bakery_Department/Pages/Staff/UpdateCakeItem'


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
})
const client = new ApolloClient({
  cache,
  link,
  connectToDevTools: true
})



class App extends Component {

  render() 
  {
    return (
        <div>
            
            <Route path = '/Login' component = {Login}/>
            <Route path = '/HRDashBoard' component = {HRDashBoard}/>
            <Route path = '/AttendanceMarking' component = {AttendanceMarking}/>
            <Route path = '/CreateEmployee' component = {CreateEmployee}/>
            <Route path= "/CreateNewPosition" component = {CreateNewPositionPage} />
            <Route path= "/CreateCardTemplate" component = {CreateCardTemplate} />
            <Route path= '/CreateCardTemplateSummary' component={CreateCardTemplateSummary} />
            <Route path= '/StaffSearchCard' component = {StaffSearchCards} />
            <Route path = '/CreateEmployee' component = {CreateEmployee}/>
            <Route path = "/SearchEmployees" component = {SearchEmployees}/>
            <Route path = "/CreatePhotoFrame" component = {CreatePhotoFrame}/>
            <Route path = "/CreatePhotoFrameSummary" component = {CreatePhotoFrameSummary} />
            <Route path = "/SearchPhotoFrame" component = {SearchPhotoFrame} />
            <Route path = "/CreateItem" component = {CreateItem} />
            <Route path = "/CreateItemSummary" component = {CreateItemSummary} />
            <Route path = "/SearchItem" component = {SearchItem} />
            <Route path = "/SearchLeaveDay" component = {SearchLeaveDay} />
            <Route path = "/CreateEvent" component = {CreateEvent} />
            <Route path = "/CreateEventFormSummary" component = {CreateEventFormSummary} />
            <Route path = "/SearchEventPackages" component = {SearchEventPackages} />
            <Route path = "/CreateCustomer" component = {CreateCustomer} />
            <Route path = "/SearchCustomer" component = {SearchCustomer}/>
            <Route path = "/UpdateLoyalityPoints" component = {UpdateLoyalityPoints} />
            <Route path = "/CreateCakeItem" component = {CreateCakeItem} />
            <Route path = "/SearchCakeItem" component = {SearchCakeItem} />
            <Route path = "/UpdateCakeItem" component = {UpdateCakeItem}/>
        </div>
    )
  }
}


export default App
