import { useState } from 'react';

function Dropdown(props) {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (id) => {
    props.handleChange(id);
    if(props.selected !==-1) setOpen(false);
  }
  
  return (
    <div className='dropdown'>
      <div className='dropdown-header' onClick={toggleDropdown}>
        <div>{props.selected===-1 ? 'Display' : props.data[props.selected]}</div>
        <div className='arrow-down'/>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {props.data.map((item, idx) => (
          <div className={`dropdown-item ${props.selected!==-1 && 'selection'}`} key={idx} onClick={e => handleItemClick(e.target.id)} id={idx}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown;