import { useState, useEffect} from "react";

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  console.log("hello " + code)
  useEffect(() => {
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setAccessToken(data.accessToken);
        // setRefreshToken(data.refreshToken);
        // setExpiresIn(data.expiresIn);
        // console.log(window.location.href)
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      fetch("http://localhost:3001/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAccessToken(data.accessToken);
          setExpiresIn(data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return [accessToken, setAccessToken];
};

export default useAuth;
