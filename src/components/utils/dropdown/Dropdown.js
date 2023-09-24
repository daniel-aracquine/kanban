import { useState } from 'react';

function Dropdown(props) {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (id) => {
    props.handleChange(id);
    if(props.selected !==-1) setOpen(false);
  }
  
  return (
    <div className='dropdown'  style={props.style}>
      <div className='dropdown-header' onClick={toggleDropdown}>
        {props.selected ===-1 && <div className='menu-icon'/>}
        <div>{props.selected===-1 ? 'Display' : props.data[props.selected]}</div>
        <div className='arrow-down-icon'/>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`} style = {props.dropdownStyle}>
        {props.data.map((item, idx) => (
          <div className={`dropdown-item ${props.selected==idx && 'selected'} ${props.selected!==-1 && 'available-for-selection'}`} key={idx} onClick={e => handleItemClick(e.target.id)} id={idx}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown;