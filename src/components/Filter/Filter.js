import Dropdown from "../utils/dropdown/Dropdown";

function Filter(props) {

  const dropdownData = [
    (<div className="dropdown-row">
      <div>Grouping</div>
      <Dropdown 
      data = {props.groupingTypes}
      handleChange = {props.handleChangeGroupingType}
      selected = {props.groupingType}
    />
    </div>),
    (<div className="dropdown-row">
      <div>Ordering</div>
      <Dropdown 
      data = {props.orderingTypes}
      handleChange = {props.handleChangeOrderingType}
      selected = {props.orderingType}
    />
    </div>),
  ]

  return (
    <div className="Filter">
      <Dropdown 
        data = {dropdownData}
        handleChange = {() => {}}
        selected = {-1}
      />
    </div>
  )
}

export default Filter;