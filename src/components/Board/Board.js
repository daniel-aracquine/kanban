const statusTypes = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled']
const priorityTypes = ['No Priority','Urgent', 'High', 'Medium', 'Low']

function Board(props) {
  
  const {data, header} = dataHeader(props)
  return (
    <div className="Board">
      {header}
      {assignments(data, props.groupBy)}
    </div>
  )
}



function assignments(data, groupBy) {
  if(groupBy === 'Status') {
    const tasksArray = statusTypes.map((element) => {
      const tasks = data[element].map((task) => {
        return Card(task.id, task.title, task.tag);
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
  };
  if(groupBy === 'Priority') {
    const tasksArray = priorityTypes.map((element) => {
      const tasks = data[element].map((task) => {
        return Card(task.id, task.title, task.tag);
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
  };
  if(groupBy === 'User') {
    const users = Object.keys(data);
  users.sort()
  const tasksArray = users.map((element) => {
    const tasks = data[element].map((task) => {
      return Card(task.id, task.title, task.tag);
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
  };
}


function dataHeader(props) {
  if(props.groupBy === 'Status') {
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

  const headerElements = headerel(statusTypes, data);

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
  };
  if(props.groupBy === 'Priority') {
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

  const headerElements = headerel(priorityTypes, data);

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
  };
  if(props.groupBy === 'User') {
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

  const headerElements = headerel(users, data);

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
  };
}


function headerel(types, data) {
  const headerelements = types.map((type, idx) => {
    return (
      <div className="header-element">
        <div>
          {type}
          &nbsp;&nbsp;
          <span>{data[type].length}</span>
        </div>
        <div>
          <div className="plus"></div>
          <div className="ellipsis"></div>
        </div>
      </div>
    )
  });

  return headerelements;
}

function Card(id,title,tags) {
  return(
    <div className="card">
      <div className="card-id">
        <span>{id}</span>
      </div>
      <div className="card-title">
        <span className="title">{title}</span>
      </div>
      {getTags(tags)}
    </div>
  )
}

function getTags(tags) {
  const tagElemets = tags.map((tag, idx) => <div key={idx} className="tag">{tag}</div>)
  return(
    <div>
      {tagElemets}
    </div>
  )
}

export default Board;