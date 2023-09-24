import { useState,useEffect } from 'react';

import Filter from './components/Filter/Filter'
import Board from './components/Board/Board';
import './App.css';

const groupingTypes = ['Status', 'User', 'Priority']
const orderingTypes = ['Priority', 'Title']

function App() {
  setCookies();
  const [data, setData] = useState({});
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment/')
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const [groupingType, setGroupingType] = useState(getCookie('groupingType'));
  const [orderingType, setOrderingType] = useState(getCookie('orderingType'));

  const handleChangeGroupingType = (id) => {
    setGroupingType(id);
    document.cookie = `groupingType=${id}; Secure`;
  }

  const handleChangeOrderingType = (id) => {
    setOrderingType(id);
    document.cookie = `orderingType=${id}; Secure`;
  }

  return (
    <div className="App">
      <Filter 
        groupingTypes = {groupingTypes}
        orderingTypes = {orderingTypes}
        groupingType = {groupingType}
        orderingType = {orderingType}
        handleChangeGroupingType = {handleChangeGroupingType}
        handleChangeOrderingType = {handleChangeOrderingType}
      />
      <Board
        data = {data}
        groupBy = {groupingTypes[groupingType]}
        orderBy = {orderingTypes[orderingType]}
      />
    </div>
  );
}

function setCookies() {
  if(getCookie('groupingType') === null) document.cookie = "groupingType=0; Secure";
  if(getCookie('orderingType') === null) document.cookie = "orderingType=0; Secure";
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null; // Cookie not found
}

export default App;
