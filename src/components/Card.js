function Card(props) {
  return(
    <div className="card">
      <div className="card-id">
        <span>{props.id}</span>
        {props.username && <span className="user-initials">{getInitials(props.username)}</span>}
      </div>
      <div className="card-title">
        <div className="circle-icon icon-common"/>
        <span className="title">{props.title}</span>
      </div>
      {getTags(props.tags)}
    </div>
  )
}

function getTags(tags) {
  const tagElemets = tags.map((tag, idx) => <div key={idx} className="tag"><div className="dot-icon icon-common"/>{tag}</div>)
  return(
    <div className="card-tags">
      {tagElemets}
    </div>
  )
}

function getInitials(username) {
  const words = username.split(' ');
  const firstLetters = words.map(word => word.charAt(0));
  return firstLetters.join('').toUpperCase();
}

export default Card;