import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {

  return (
  <Router>
    <MainNavigation />
    <main>
    <Routes>
      <Route path='/' Component={Users} />
      <Route path='/places/new' Component={NewPlace} />
    </Routes>
    </main>
  </Router>
  )
}

export default App;
