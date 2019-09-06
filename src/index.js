import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/components/App'
import { ApolloProvider } from '@apollo/react-hooks'
import { gql, HttpLink, InMemoryCache, ApolloClient} from 'apollo-boost';
import {useGlobal} from 'reactn'
import { BrowserRouter as Router} from "react-router-dom";

const cache = new InMemoryCache();
const link = new HttpLink({
uri: 'https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev',
})
const client = new ApolloClient({
cache,
link,
connectToDevTools: true
})


//Apollo Client Set Up to be Accessed from anywhere
//const [myApolloClient, setMyApolloClient] = useGlobal(client)


ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
)