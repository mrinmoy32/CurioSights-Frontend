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
  },
  {
    id: 3,
    name: "David Johnson",
    image: "https://example.com/david-johnson.jpg",
    places: 5,
  },
  {
    id: 4,
    name: "Emily Brown",
    image: "https://example.com/emily-brown.jpg",
    places: 20,
  },
  {
    id: 5,
    name: "Michael Wilson",
    image: "https://example.com/michael-wilson.jpg",
    places: 12,
  },
  {
    id: 6,
    name: "Sophia Davis",
    image: "https://example.com/sophia-davis.jpg",
    places: 8,
  },
  {
    id: 7,
    name: "Jacob Martinez",
    image: "https://example.com/jacob-martinez.jpg",
    places: 25,
  },
  {
    id: 8,
    name: "Olivia Thompson",
    image: "https://example.com/olivia-thompson.jpg",
    places: 18,
  },
  {
    id: 9,
    name: "Daniel Garcia",
    image: "https://example.com/daniel-garcia.jpg",
    places: 30,
  },
  {
    id: 10,
    name: "Ava Hernandez",
    image: "https://example.com/ava-hernandez.jpg",
    places: 7,
  },
];
// const users = [
//   { id: 1, name: "Mrinmoy Pal", image: "https://avatars.githubusercontent.com/u/109314855?v=4", places: 7 },
//   { id: 2, name: "Manoj Mahesh", image: "https://avatars.githubusercontent.com/u/42727681?v=4", places: 9 },
// ];

function Users() {
  return (
    <div>
      <UsersList item={users} />
    </div>
  );
}

export default Users;
