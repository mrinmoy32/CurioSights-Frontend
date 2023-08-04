import React from "react";
import UsersList from "../components/UsersList";

//dummy userslist data
const DUMMY_USERS = [
  {
    id: 'u1',
    name: "Mrinmoy Pal",
    image: "https://avatars.githubusercontent.com/u/109314855?v=4",
    places: 17,
  },
  {
    id: 'u2',
    name: "Manoj Mahesh",
    image: "https://avatars.githubusercontent.com/u/42727681?v=4",
    places: 29,
  }
];


function Users() {
  return (
    <div>
      <UsersList item={DUMMY_USERS} />
    </div>
  );
}

export default Users;
