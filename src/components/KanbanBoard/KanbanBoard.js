import Card from "../utils/Card/Card";

const statusTypes = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled']
const priorityTypes = ['No Priority','Urgent', 'High', 'Medium', 'Low']
const priorityIconClasses = ['ellipsis-icon', 'urgent-icon', 'high-icon', 'medium-icon', 'low-icon']
const statusIconClasses = ['backlog-icon', 'circle-icon', 'progress-icon', 'done-icon', 'cancel-icon']

function KanbanBoard(props) {
  const {data, header} = getFormattedDataAndHeader(props)
  return (
    <div className="KanbanBoard">
      {header}
      {getTasks(data, props.groupBy, props.data.users)}
    </div>
  )
}



function getTasks(data, groupBy, users) {
  if(groupBy === 'Status') {
    return getTasksByStatus(data, users);
  };
  if(groupBy === 'Priority') {
    return getTasksByPriority(data, users);
  };
  if(groupBy === 'User') {
    return getTasksByUser(data);
  };
}



function getTasksByStatus(data, users) {
  const tasksArray = statusTypes.map((element) => {
    const tasks = data[element].map((task) => {
      return (
        <Card 
          id={task.id}
          title={task.title}
          tags={task.tag}
          username={users.find(user => user.id === task.userId).name}
        />
      )
    });

    return (
      <div className="tasksRow">
        {tasks}
      </div>
    )
  });

  return (
    <div className="tasks">
      {tasksArray}
    </div>
  );
}


function getTasksByPriority(data, users) {
  const tasksArray = priorityTypes.map((element) => {
    const tasks = data[element].map((task) => {
      return (
        <Card 
          id={task.id}
          title={task.title}
          tags={task.tag}
          username={users.find(user => user.id === task.userId).name}
        />
      )
    });

    return (
      <div className="tasksRow">
        {tasks}
      </div>
    )
  });

  return (
    <div className="tasks">
      {tasksArray}
    </div>
  );
}


function getTasksByUser(data) {
  const users = Object.keys(data);
  users.sort()
  const tasksArray = users.map((element) => {
    const tasks = data[element].map((task) => {
      return (
        <Card 
          id={task.id}
          title={task.title}
          tags={task.tag}
        />
      )
    });

    return (
      <div className="tasksRow">
        {tasks}
      </div>
    )
  });

  return (
    <div className="tasks">
      {tasksArray}
    </div>
  );
}



function getFormattedDataAndHeader(props) {
  if(props.groupBy === 'Status') {
    return getFormattedDataAndHeaderByStatus(props);
  };
  if(props.groupBy === 'Priority') {
    return getFormattedDataAndHeaderByPriority(props);
  };
  if(props.groupBy === 'User') {
    return getFormattedDataAndHeaderByUser(props);
  };
}



function getHeaderElements(types, data, groupBy) {
  const headerelements = types.map((type, idx) => {
    return (
      <div className="header-element">
        <div>
          {groupBy=='Priority' && <div className={`${priorityIconClasses[idx]}`}/>}
          {groupBy=='Status' && <div className={`${statusIconClasses[idx]}`}/>}
          {groupBy=='User' && <span className="user-initials">{getInitials(type)}</span>}
          {type}
          &nbsp;&nbsp;
          <span className="numberTasks">{data[type].length}</span>
        </div>
        <div>
          <div className="plus-icon"></div>
          <div className="ellipsis-icon"></div>
        </div>
      </div>
    )
  });

  return headerelements;
}


function getInitials(username) {
  const words = username.split(' ');
  const firstLetters = words.map(word => word.charAt(0));
  return firstLetters.join('').toUpperCase();
}


function getFormattedDataAndHeaderByStatus(props) {
  const data = {}
  statusTypes.forEach(element => {
    data[element] = []
  });

  if(props.data.tickets) {
    props.data.tickets.forEach(element => {
      data[element.status].push(element)
    });
  };

  for(const key in data) {
    if(data.hasOwnProperty(key)) {
      if(props.orderBy === 'Priority') {
        data[key].sort((a,b) => b.priority - a.priority)
      } else {
        data[key].sort((a,b) => a.title.localeCompare(b.title))
      }
    }
  };

  const headerElements = getHeaderElements(statusTypes, data, props.groupBy);

  const header = (
    <div className="header">
      {headerElements}
    </div>
  );

  return (
    {
      data,
      header
    }
  );
}



function getFormattedDataAndHeaderByPriority(props) {
  const data = {}
  priorityTypes.forEach(element => {
    data[element] = []
  });

  if(props.data.tickets) {
    props.data.tickets.forEach(element => {
      data[priorityTypes[element.priority]].push(element)
    });
  };

  for(const key in data) {
    if(data.hasOwnProperty(key)) {
      if(props.orderBy === 'Priority') {
        data[key].sort((a,b) => b.priority - a.priority)
      } else {
        data[key].sort((a,b) => a.title.localeCompare(b.title))
      }
    }
  };

  const headerElements = getHeaderElements(priorityTypes, data, props.groupBy);

  const header = (
    <div className="header">
      {headerElements}
    </div>
  );

  return (
    {
      data,
      header
    }
  );
}


function getFormattedDataAndHeaderByUser(props) {
  const data = {}
  if(!props.data.tickets) {
    return (
      {
        data,
        header: <div></div>
      }
    )
  };

  props.data.users.forEach(element => {
    data[element.name] = []
  });

  props.data.tickets.forEach(element => {
    const user = props.data.users.find(user => user.id === element.userId)
    data[user.name].push(element)
  });

  for(const key in data) {
    if(data.hasOwnProperty(key)) {
      if(props.orderBy === 'Priority') {
        data[key].sort((a,b) => b.priority - a.priority)
      } else {
        data[key].sort((a,b) => (a.title).localeCompare(b.title))
      }
    }
  };

  const users = props.data.users.map((user) => user.name);
  users.sort();

  const headerElements = getHeaderElements(users, data, props.groupBy);

  const header = (
    <div className="header">
      {headerElements}
    </div>
  );

  return (
    {
      data,
      header
    }
  );
}

export default KanbanBoard;