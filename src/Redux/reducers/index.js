import { combineReducers } from "redux";
import LoaderReducer from "./loader_reducer";
import AuthReducer from "./auth_reducer";
import DashboardReducer from './dashboard_reducer';

const RootReducer = combineReducers({
  Loader: LoaderReducer,
  Auth: AuthReducer,
  Dashboard: DashboardReducer,
});

export default RootReducer;
