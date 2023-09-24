import Card from "./Card";
import statusTypes from "../enums/statusTypes";
import priorityTypes from "../enums/priorityTypes";

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
    return getAppropriateTasks(data, users, statusTypes.types);
  };
  if(groupBy === 'Priority') {
    return getAppropriateTasks(data, users, priorityTypes.types);
  };
  if(groupBy === 'User') {
    const usersKeys = Object.keys(data);
    return getAppropriateTasks(data, users, usersKeys, false);
  };
}


function getAppropriateTasks(data, users, array, displayUsername = true) {
  const tasksArray = array.map((element) => {
    const tasks = data[element].map((task) => {
      return (
        <Card 
          id={task.id}
          title={task.title}
          tags={task.tag}
          username={displayUsername ? users.find(user => user.id === task.userId).name : undefined}
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

function getHeader(types, data, groupBy) {
  const headerElements = types.map((type, idx) => {
    return (
      <div className="header-element">
        <div>
          {groupBy=='Priority' && <div className={`${priorityTypes.getIconClass(type)} icon-common`}/>}
          {groupBy=='Status' && <div className={`${statusTypes.getIconClass(type)} icon-common`}/>}
          {groupBy=='User' && <span className="user-initials">{getInitials(type)}</span>}
          {type}
          &nbsp;&nbsp;
          <span className="numberTasks">{data[type].length}</span>
        </div>
        <div>
          <div className="plus-icon icon-common"></div>
          <div className="ellipsis-icon icon-common"></div>
        </div>
      </div>
    )
  });

  const header = (
    <div className="header">
      {headerElements}
    </div>
  );

  return header;
}

function getInitials(username) {
  const words = username.split(' ');
  const firstLetters = words.map(word => word.charAt(0));
  return firstLetters.join('').toUpperCase();
}


function getFormattedDataAndHeaderByStatus(props) {
  const data = {}
  statusTypes.types.forEach(element => {
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

  const header = getHeader(statusTypes.types, data, props.groupBy);

  return (
    {
      data,
      header
    }
  );
}


function getFormattedDataAndHeaderByPriority(props) {
  const data = {}
  priorityTypes.types.forEach(element => {
    data[element] = []
  });

  if(props.data.tickets) {
    props.data.tickets.forEach(element => {
      data[priorityTypes.types[element.priority]].push(element)
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

  const header = getHeader(priorityTypes.types, data, props.groupBy);

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

  const header = getHeader(users, data, props.groupBy);

  return (
    {
      data,
      header
    }
  );
}

export default KanbanBoard;