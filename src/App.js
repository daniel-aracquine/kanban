import { useState } from 'react';

import DisplaySelector from './components/DisplaySelector'
import KanbanBoard from './components/KanbanBoard';
import groupingTypes from './enums/groupingTypes';
import orderingTypes from './enums/orderingTypes';
import utilfunctions from './utils/utilfunctions';
import './App.css';


function App() {
  if(utilfunctions.getCookie('groupingType') == null) utilfunctions.setCookie('groupingType', 0);
  if(utilfunctions.getCookie('orderingType') == null) utilfunctions.setCookie('orderingType', 0);

  const [data, setData] = useState({});
  utilfunctions.fetchData(setData);

  const [groupingType, setGroupingType] = useState(utilfunctions.getCookie('groupingType'));
  const [orderingType, setOrderingType] = useState(utilfunctions.getCookie('orderingType'));

  const changeGrouping = (id) => {
    setGroupingType(id);
    utilfunctions.setCookie('groupingType', id);
  }

  const changeOrdering = (id) => {
    setOrderingType(id);
    utilfunctions.setCookie('orderingType', id);
  }

  return (
    <div className="App">
      <DisplaySelector
        groupingType = {groupingType}
        orderingType = {orderingType}
        changeGrouping = {changeGrouping}
        changeOrdering = {changeOrdering}
      />
      <KanbanBoard
        data = {data}
        groupBy = {groupingTypes[groupingType]}
        orderBy = {orderingTypes[orderingType]}
      />
    </div>
  );
}

export default App;
