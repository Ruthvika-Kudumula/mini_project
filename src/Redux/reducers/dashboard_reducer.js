import { DashboardTypes } from "../action_types/dashboard_types";
import { AuthTypes } from "../action_types/auth_types";
const initialState = {
  UserDataRequests: [],
};

export default function DashboardReducer(state = initialState, action = null) {
  if (!state) {
    state = initialState;
  }
  console.log("state_initialstate", state.UserDataRequests);
  switch (action.type) {
    case DashboardTypes.USER_DATA_REQUEST_SUCCESS: {

      return {
        ...state,
        UserDataRequests: action.data
      };
    }
    case AuthTypes.POST_SUCCESS: {
      state.UserDataRequests.push(action.data)
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
