import { getPersistStore, setPersistStore } from "./StorePersister";
import { SET_ADMIN_PANEL, SET_USER } from "./actionTypes/UserActionTypes";
import { setAdminPanel, setUser } from "./actions/UserActions";

const PERSISTER_NAME = "USER";

let initialState = {
  user: {},
  isAdminPanel: false,
};
export const UserState = getPersistStore(
  Object.assign({}, initialState),
  PERSISTER_NAME
);

function UserReducer(state = UserState, action) {
  switch (action.type) {
    case SET_USER: {
      return setPersistStore(setUser(state, action.payload), PERSISTER_NAME);
    }
    case SET_ADMIN_PANEL: {
      return setPersistStore(
        setAdminPanel(state, action.payload),
        PERSISTER_NAME
      );
    }
    default:
      return state;
  }
}
export default UserReducer;
