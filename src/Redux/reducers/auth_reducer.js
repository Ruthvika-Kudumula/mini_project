import { AuthTypes } from "../action_types/auth_types";

const initialState = {};

export default function AuthReducer(state = initialState, action = null) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case AuthTypes.LOGIN_SUCCESS: {
      // const { token } = action.data;

      localStorage.setItem("token", 123);
      // localStorage.setItem("user", JSON.stringify(action.data));
      return {
        // ...action.data,
      };
    }
    case AuthTypes.LOGOUT_SUCCESS: {
      localStorage.clear();
      return {
        
      }
    }

    case AuthTypes.POST_SUCCESS:{
      return{

      };
    }
    default:
      return state;
  }
}
