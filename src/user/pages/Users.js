import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

//dummy userslist data
// const DUMMY_USERS = [
//   {
//     id: 'u1',
//     name: "Mrinmoy Pal",
//     image: "https://avatars.githubusercontent.com/u/109314855?v=4",
//     places: 17,
//   },
//   {
//     id: 'u2',
//     name: "Manoj Mahesh",
//     image: "https://avatars.githubusercontent.com/u/42727681?v=4",
//     places: 29,
//   }
// ];

function Users() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    //IEF: Immediately Executing Function to use async here as useEffect doesn't expect that
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div>
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedUsers && <UsersList item={loadedUsers} />}
      </React.Fragment>
    </div>
  );
}

export default Users;
