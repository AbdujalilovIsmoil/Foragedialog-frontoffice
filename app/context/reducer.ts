import { storage } from "../services";

export interface initialStateInterface {
  isAuth: boolean | undefined | null | string;
}

const initialState: initialStateInterface = {
  isAuth: storage.get("isAuthenticated")
    ? storage.get("isAuthenticated")
    : false,
};

interface actionInterface {
  type: string;
  payload: React.ReactNode;
}

const reducer = (
  state: initialStateInterface = initialState,
  action: actionInterface
) => {
  switch (action.type) {
    case "SIGN_UP":
      return {
        ...state,
        isAuth: storage.set("isAuthenticated", "true"),
      };

    default:
      return state;
  }
};

export default reducer;
