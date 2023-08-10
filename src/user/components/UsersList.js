import React from "react";
import "./UsersList.css";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElement/Card";

function UsersList(props) {
  if (props.item.length === 0) {
    return (
      <Card>
        <h2>No users found</h2>
      </Card>
    );
  } else
    return (
      <ul className="user-list">
        {props.item.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              name={user.name}
              image={user.image}
              placeCount={user.places.length}
            />
          );
        })}
      </ul>
    );
}

export default UsersList;
