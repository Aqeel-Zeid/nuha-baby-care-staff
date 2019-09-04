import React from 'react'
import ReactDOM from 'react-dom'
import '../src/styles/index.css'
import App from '../src/components/App'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import {useGlobal} from 'reactn'

const client = new ApolloClient({
  uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',

})

//Apollo Client Set Up to be Accessed from anywhere
const [myApolloClient, setMyApolloClient] = useGlobal(client)


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)