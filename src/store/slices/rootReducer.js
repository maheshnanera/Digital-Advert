import { combineReducers } from "redux";
import loginReducer from "./loginSlice.js";
import portal from "./portalSlice.jsx"
import organization from "./orgSlice.js"
import campaign from "./campaignSlice.jsx"


const appReducer = combineReducers({
  loginReducer: loginReducer,
  portal: portal,
  organization : organization,
  campaign:campaign

});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    console.log("Logout", action);
    localStorage.clear();
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
