import React from 'react';
import { Link, MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import Newsfeed from './Newsfeed';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App bg-gray-100">
      {/* <div>tab url: {tabUrl}</div> */}
      {/* <div className="font-serif font-semibold text-right leading-none h-8">
        Impartial
      </div> */}

      <Router initialEntries={['/', '/hello']} initialIndex={0}>
        <Switch>
          <Route exact path="/">
            <Newsfeed />
          </Route>
          <Route path="/hello">
            <h1>Hello, world router works!</h1>
            <Link to="/">back to yeah</Link>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Popup;
