import { useState,useEffect } from 'react';

import DisplaySelector from './components/DisplaySelector/DisplaySelector'
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
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
      <DisplaySelector 
        groupingTypes = {groupingTypes}
        orderingTypes = {orderingTypes}
        groupingType = {groupingType}
        orderingType = {orderingType}
        handleChangeGroupingType = {handleChangeGroupingType}
        handleChangeOrderingType = {handleChangeOrderingType}
      />
      <KanbanBoard
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
