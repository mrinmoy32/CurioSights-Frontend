import React from "react";
import UsersList from "../components/UsersList";

//dummy userslist data
const users = [
  {
    id: 1,
    name: "Mrinmoy Pal",
    image: "https://avatars.githubusercontent.com/u/109314855?v=4",
    places: 17,
  },
  {
    id: 2,
    name: "Manoj Mahesh",
    image: "https://avatars.githubusercontent.com/u/42727681?v=4",
    places: 29,
  }
];


function Users() {
  return (
    <div>
      <UsersList item={users} />
    </div>
  );
}

export default Users;
