import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";

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
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    //IEF: Immediately Executing Function to use async here as useEffect doesn't expect that
    const sendRequest = async () => {
      setIsloading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message)
        }
        setLoadedUsers(responseData.users);
      } catch (err) {
        setError(err.message);
      }
      setIsloading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  }

  return (
    <div>
      <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <div className="center">
        <LoadingSpinner />
        </div>}
      {!isLoading && loadedUsers && <UsersList item={loadedUsers} />}
      </React.Fragment>
      
    </div>
  );
}

export default Users;
