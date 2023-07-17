import { ON_ERROR, ON_LOGIN, UserAction, UserModel } from "./actions";

type UserState = {
  user: UserModel;
  error: string | undefined;
}

const initialState = {
  user: {
    firstName: 'Denis',
    lastName: 'Pinzariu',
    phone: '0781234567'
  } as UserModel,
  error: undefined,
}

function userReducer(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case ON_LOGIN:
      return { 
        ...state, 
        user: action.payload 
      };
    case ON_ERROR:
      return { 
        ...state,
        error: action.payload
      };
    default:
      return state;
  } 

}

export default userReducer;