import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);



  useEffect(() => {

    const savedUser = localStorage.getItem("lms_user");
    const savedToken = localStorage.getItem("lms_token");


    if (savedUser && savedToken) {

      setUser(JSON.parse(savedUser));
      setToken(savedToken);

    }

  }, []);




  const login = (userData, jwtToken) => {


    localStorage.setItem(
      "lms_user",
      JSON.stringify(userData)
    );


    localStorage.setItem(
      "lms_token",
      jwtToken
    );


    setUser(userData);
    setToken(jwtToken);

  };




  const logout = () => {


    localStorage.removeItem("lms_user");
    localStorage.removeItem("lms_token");


    setUser(null);
    setToken(null);

  };




  return (

    <AuthContext.Provider

      value={{

        user,
        token,

        login,
        logout,

        isLoggedIn: Boolean(user && token),

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}





export function useAuth() {

  return useContext(AuthContext);

}