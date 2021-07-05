import React from 'react';
import {useQuery, gql} from "@apollo/client";

function App() {
  const {data, loading}=useQuery(gql`
    {
      hello
    }
  `);

  if(loading){
    return <p>loading...</p>
  }
  return (
    <div className="App">
      data from {JSON.stringify(data, null, 4)}
    </div>
  );
}

export default App;
