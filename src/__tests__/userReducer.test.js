import { LOGIN, SIGNUP, LOGOUT } from "../Redux/actionTypes";
import userReducer, {
  login,
  logout,
  signup,
  getUser,
  editUser,
  editUserProfilePic
} from "../Redux/userReducer";

describe("User Reducer Tests", () => {
  it("Should return default state", () => {
    const initalState = userReducer(undefined, {});
    expect(initalState).toEqual({
      user: {},
      redirect: false,
      error: false,
      username: "",
      profilePic: "",
      city: "",
      state: ""
    });
  });

  it("Should update reducer state on user login", () => {
    const incomingUser = {
      username: "jpm",
      profilePic: "https://i.stack.imgur.com/CVsIM.jpg?s=328&g=1",
      city: "Rochester",
      state: "NY"
    };

    const initialState = userReducer(undefined, {
      type: LOGIN + "_FULFILLED",
      payload: incomingUser
    });

    expect(initialState).toEqual({
      user: incomingUser,
      redirect: false,
      error: false,
      username: "jpm",
      profilePic: "https://i.stack.imgur.com/CVsIM.jpg?s=328&g=1",
      city: "Rochester",
      state: "NY"
    });
  });

  it("Should update reducer state on user signup", () => {
    const newUser = {
      username: "newMember",
      profilePic: "https://i.ytimg.com/vi/fVQ8Df-DN60/maxresdefault.jpg",
      city: "Lehi",
      state: "Utah"
    };

    const initialState = userReducer(undefined, {
      type: SIGNUP + "_FULFILLED",
      payload: newUser
    });

    expect(initialState).toEqual({
      user: newUser,
      redirect: false,
      error: false,
      username: "newMember",
      profilePic: "https://i.ytimg.com/vi/fVQ8Df-DN60/maxresdefault.jpg",
      city: "Lehi",
      state: "Utah"
    });
  });

  it("Should clear reducer state on logout", () => {
    const initialState = userReducer(undefined, {
      type: LOGOUT
    });

    expect(initialState).toEqual({
      user: {},
      redirect: false,
      error: false,
      username: "",
      profilePic: "",
      city: "",
      state: ""
    });
  });

  it("Should contain login function", () => {
    expect(login).toBeDefined();
  });

  it("Should contain logout function", () => {
    expect(logout).toBeDefined();
  });

  it("Should contain signup function", () => {
    expect(signup).toBeDefined();
  });

  it("Should contain getUser function", () => {
    expect(getUser).toBeDefined();
  });

  it("Should contain editUser function", () => {
    expect(editUser).toBeDefined();
  });
  it("Should contain editUserProfilePic function", () => {
    expect(editUserProfilePic).toBeDefined();
  });
});
