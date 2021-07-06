import React from 'react';
import { useHelloQuery } from './generated/graphql';

function App() {
  const {data, loading}=useHelloQuery();

  if(loading || !data){
    return <p>loading...</p>
  }
  return (
    <div className="App">
      data from {data.hello}
    </div>
  );
}

export default App;
