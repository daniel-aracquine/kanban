const statusTypes = {
  types: ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled']
}

statusTypes.getIconClass = (type) => {
  const classMap = {
    'Backlog':'backlog-icon',
    'Todo':'todo-icon',
    'In progress':'in-progress-icon',
    'Done':'done-icon',
    'Cancelled':'cancelled-icon'
  }

  return classMap[type] || 'icon-common';
}

export default statusTypes;