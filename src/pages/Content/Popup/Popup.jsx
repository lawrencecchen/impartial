import React, { useRef } from 'react';
import { Link, MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import Newsfeed from './Newsfeed';
import './Popup.css';
import useClickAway from './utils/useClickAway';

const Popup = ({ handleSetHidden }) => {
  const contentRef = useRef();
  useClickAway(contentRef, () => {
    console.log('clicked outside...');
    handleSetHidden(true);
  });

  return (
    <div
      className="App bg-gray-100  h-full overflow-y-scroll overflow-x-hidden"
      ref={contentRef}
    >
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
