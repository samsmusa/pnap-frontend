import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider, createHttpLink,
    // ApolloLink,
    // concat,
    // HttpLink
} from '@apollo/client';
import './index.css'
import {setContext} from "@apollo/client/link/context/index.js";

// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/graphql',
// });
// const authMiddleware = new ApolloLink((operation, forward) => {
//   const token = window.localStorage.getItem('token');
//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : '',
//     }
//   });
//   return forward(operation);
// });

// const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql',
//     cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
    console.log('token', token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ApolloProvider>,
)
