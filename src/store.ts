import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./store/reducers";

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
