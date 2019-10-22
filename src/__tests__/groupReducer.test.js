import { GET_GROUPS, CLEAR_SELECTED } from "../Redux/actionTypes";
import groupReducer from "../Redux/groupReducer";

describe("Group Reducer Tests", () => {
  it("Should return default state", () => {
    const initalState = groupReducer(undefined, {});
    expect(initalState).toEqual({
      groups: [],
      selectedGroup: {},
      groupMessages: {},
      rooms: [],
      editId: null,
      editInfo: [],
      joinedGroups: []
    });
  });

  it("Should return new groups state if receiving GET_GROUPS action type", () => {
    const incomingGroups = [
      {
        group_id: 91,
        group_name: "Rochester General Hospital",
        description: "Rochester General Hospital Chat",
        members: 12,
        user_id: 1
      },
      {
        group_id: 37,
        group_name: "Lehi General Hospital",
        description: "Lehi General Hospital Chat",
        members: 10,
        user_id: 3
      }
    ];

    const initialState = groupReducer(undefined, {
      type: GET_GROUPS + '_FULFILLED',
      payload: incomingGroups
    });
    
    expect(initialState).toEqual({
      groups: incomingGroups,
      selectedGroup: {},
      groupMessages: {},
      rooms: [],
      editId: null,
      editInfo: [],
      joinedGroups: []
    });
  });

  it('Should return cleared state after CLEAR_SELECTED', () => {
    const initialState = groupReducer(undefined, {
        type: CLEAR_SELECTED
      });
      
      expect(initialState).toEqual({
        groups: [],
        selectedGroup: {},
        groupMessages: {},
        rooms: [],
        editId: null,
        editInfo: [],
        joinedGroups: []
      });
  })
});
