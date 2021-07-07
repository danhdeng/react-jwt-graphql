import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from './accessToken';
import { Routes } from './Routes';

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =getAccessToken();
  // return the headers to the context so httpLink can read them
  if(token){
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  }

  return {
    headers: {
      ...headers,
    }
  }
});

// const client=new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
//     credentials: "include",
//   });

const client=new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
);

