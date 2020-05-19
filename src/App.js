import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [events, setEvents] = useState([])
  const [owner, setOwner] = useState('')
  const [repo, setRepo] = useState('')
  const [eventType, setEventType] = useState('')

  const handleClick = () => {
    axios.get(`https://api.github.com/repos/${owner}/${repo}/events`)
      .then(res => res.data.filter(event => event.type === eventType))
      .then(filteredRes => setEvents(filteredRes))
  }

  return (
    <div className="App" style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <span>Owner</span><input id="owner" onChange={e => setOwner(e.target.value)} style={{ marginRight: 20 }} />
        <span>Repo</span><input id="repo" onChange={e => setRepo(e.target.value)} style={{ marginRight: 20 }} />
        <span>Event Type</span>
        <select id="eventType" onChange={e => setEventType(e.target.value)}>
          <option>CommitCommentEvent</option>
          <option>CreateEvent</option>
          <option>DeleteEvent</option>
          <option>ForkEvent</option>
          <option>GollumEvent</option>
          <option>IssueCommentEvent</option>
          <option>IssuesEvent</option>
          <option>MemberEvent</option>
          <option>PublicEvent</option>
          <option>PullRequestEvent</option>
          <option>PullRequestReviewCommentEvent</option>
          <option>PushEvent</option>
          <option>ReleaseEvent</option>
          <option>SponsorshipEvent</option>
          <option>WatchEvent</option>
        </select>
        <button id="button" onClick={handleClick}>Search</button>
      </div>

      <div id="events" style={{ marginTop: 20 }}>
        { events.map((event, i) => {
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div><img src={event.actor.avatar_url} style={{ height: 60, width: 60 }} /></div>
              <div><b>EVENT TYPE: </b>{event.type}</div>
              <div><b>USER: </b>{event.actor.login}</div>
              <div><b>USER ID: </b>{event.actor.avatar_url}</div>
              <div><b>REPO: </b>{event.repo.url}</div>
              <div><b>TIMESTAMP: </b>{event.created_at}</div>
              <hr></hr>
            </div>
          )
        }) }
      </div>
    </div>
  );
}

export default App;
