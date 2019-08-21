import axios from "axios";
import { CREATE_GROUP, GET_SELECTED_GROUP, GET_GROUPS } from "./actionTypes";

const initialState = {
  groups: [],
  error: false
};

export function createGroup(group_name, group_picture, description) {
  let data = axios
    .post("/api/creategroup", { group_name, group_picture, description })
    .then(res => res.data);
  return {
    type: CREATE_GROUP,
    payload: data
  };
}

export const getGroups = () => {
  let data = axios.get('/api/getgroups')
      .then(res => res.data)
  console.log('Groups:', data)
  return {
      type: GET_GROUPS,
      payload: data
  }
}

export const getSelectedGroup = groupId => {
  let data = axios.get(`/api/selected/${groupId}`).then(res => res.data);
  console.log("Selected Group:", data);
  return {
    type: GET_SELECTED_GROUP,
    payload: data
  };
};

export default function(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case GET_GROUPS + "_FULFILLED":
      return {
        ...state,
        groups: payload
      };
    case GET_SELECTED_GROUP + "_FULFILLED":
      return {
        ...state,
        selectedGroup: payload
      };
    case CREATE_GROUP + "_FULFILLED":
      return { ...state, groups: payload };
    case CREATE_GROUP + "_REJECTED":
      return { ...state, error: payload };
    default:
      return state;
  }
}
