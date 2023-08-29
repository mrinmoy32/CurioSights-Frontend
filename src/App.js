import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPalces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth.context";
import { useAuth } from "./shared/hooks/auth-hook";


function App() {

  const {access_token, login, logout, userId} = useAuth()

  let routes;
  access_token
    ? (routes = (
        <React.Fragment>
          <Route path="/" Component={Users} />
          {/* in below path="/:userId/places" the ":userId" portion is dynami c
          and could be use for useParams hook */}
          <Route path="/:userId/places" Component={UserPlaces} />
          <Route path="/places/new" Component={NewPlace} />
          <Route path="/places/:placeId" Component={UpdatePlace} />
          {/* Since both the above Route has path starting with "/places/" it could cause a problem 
          if we write "/places/:placeId" this path before. This is beacuse :placeId is dynamic 
          and can have any value even "new". So it is better to keep the path having "new" before 
          the one having ":placeId". As this executes from top to bottom it checks new first then the 
          dynamic routing */}
          <Route path="*" element={<Navigate to="/" />} />
        </React.Fragment>
      ))
    : (routes = (
        <React.Fragment>
          <Route path="/" Component={Users} />
          <Route path="/:userId/places" Component={UserPlaces} />
          <Route path="/auth" Component={Auth} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </React.Fragment>
      ));

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!access_token, //!! coverts it to boolean
        userId: userId,
        login: login,
        logout: logout,
        access_token: access_token,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
