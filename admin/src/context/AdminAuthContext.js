import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  loading: false,
  error: null,
};

export const AdminAuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        admin: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        admin: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        admin: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        admin: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AdminAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(state.admin));
  }, [state.admin]);

  return (
    <AdminAuthContext.Provider
      value={{
        admin: state.admin,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
