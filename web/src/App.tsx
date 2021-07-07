// import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { setAccessToken } from './accessToken';
import { Routes } from './Routes';

function App() {
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);
  if(loading){
    return <div>loading...</div>
  }
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
