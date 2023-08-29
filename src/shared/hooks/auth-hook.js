import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
  const [access_token, setAccess_token] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, access_token, expirationDate) => {
    setAccess_token(access_token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getItem() + 1000 * 60 * 60);
    //it's in ms, so 1000*60*60 = 1hr. expDate = currentDate + 1hr
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        access_token: access_token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setAccess_token(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (access_token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getItem() - new Date();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [access_token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.access_token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.access_token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { access_token, login, logout, userId}
};
