import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import UserPlaces from "./places/pages/UserPalces";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" Component={Users} />
          <Route path="/places/new" Component={NewPlace} />
          {/* in below path="/:userId/places" the ":userId" portion is dynami 
          and could be use for useParams hook */}
          <Route path="/:userId/places" Component={UserPlaces} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
