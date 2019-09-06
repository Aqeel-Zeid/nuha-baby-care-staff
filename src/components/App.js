import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Route, Link } from "react-router-dom";
import Login from './Pages/Login'
import {ApolloClient} from 'apollo-boost'
import { HttpLink, InMemoryCache } from 'apollo-boost';

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
        </div>
    )
  }
}


export default App
