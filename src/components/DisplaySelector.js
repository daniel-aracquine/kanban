import Dropdown from "./Dropdown";
import groupingTypes from "../enums/groupingTypes";
import orderingTypes from "../enums/orderingTypes";

function DisplaySelector(props) {

  const dropdown1Style = {
    width: '100px'
  }

  const style1 = {
    width: '130px'
  }

  const dropdown1 = (
    <Dropdown 
      data = {groupingTypes}
      handleChange = {props.changeGrouping}
      selected = {props.groupingType}
      dropdownStyle = {dropdown1Style}
      style = {style1}
    />
  );

  const dropdown2 = (
    <Dropdown 
      data = {orderingTypes}
      handleChange = {props.changeOrdering}
      selected = {props.orderingType}
      dropdownStyle = {dropdown1Style}
      style = {style1}
    />
  );

  const dropdownData = [
    (<div className="dropdown-row">
      <div>Grouping</div>
      {dropdown1}
    </div>),
    (<div className="dropdown-row">
      <div>Ordering</div>
      {dropdown2}
    </div>),
  ]

  const dropdownStyle = {
    width: '300px'
  }

  const style = {
    width: '100px'
  }

  return (
    <div className="DisplaySelector">
      <Dropdown 
        data = {dropdownData}
        handleChange = {() => {}}
        selected = {-1}
        dropdownStyle = {dropdownStyle}
        style = {style}
      />
    </div>
  )
}

export default DisplaySelector;