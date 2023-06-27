import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import UserPlaces from "./places/pages/UserPalces";
import UpdatePlace from "./places/pages/UpdatePlace";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" Component={Users} />
          {/* in below path="/:userId/places" the ":userId" portion is dynami c
          and could be use for useParams hook */}
          <Route path="/:userId/places" Component={UserPlaces} />
          <Route path="/places/new" Component={NewPlace} />
          <Route path="/places/:placeId" Component={UpdatePlace} />
          {/* Since both the above Route has path starting with "/places/" it could cause a problem 
          if we write "/places/:placeId" this path before. This is beacuse :placeId is dynamic 
          and can have any value even "new". So it is better to keep the path having "new" before 
          the one having ":placeId". As this executes from top to bottom it checks new first the the 
          dynamic routing */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
