const priorityTypes = {
  types: ['No Priority','Urgent', 'High', 'Medium', 'Low']
}

priorityTypes.getIconClass = (type) => {
  const classMap = {
    'No Priority':'no-priority-icon',
    'Urgent':'urgent-icon',
    'High':'high-icon',
    'Medium':'medium-icon',
    'Low':'low-icon'
  }

  return classMap[type] || 'icon-common';
}

export default priorityTypes;