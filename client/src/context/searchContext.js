import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: JSON.parse(localStorage.getItem("dates")) || [],
  options: JSON.parse(localStorage.getItem("options")),
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
 
  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(state.options));
    localStorage.setItem("dates", JSON.stringify(state.dates));
  }, [state.options, state.dates]);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};