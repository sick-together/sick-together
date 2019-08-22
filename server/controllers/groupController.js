module.exports = {
  async createGroup(req, res) {
    let { id } = req.session.user;
    let { group_name, group_picture, description } = req.body;
    const db = req.app.get("db");
    let groups = await db.create_group([
      group_name,
      id,
      group_picture,
      description
    ]);
    res.send(groups);
  },
  async createGeneral(req, res) {
    let { groupId } = req.params
    const db = req.app.get('db')
    let initialRoom = await db.create_general(+groupId)
      .catch(err => console.log('Error with adding initial room', err))
    res.send(initialRoom)
  },
  async deleteGroup(req, res) {
    let { group_id } = req.params;
    const db = req.app.get("db");
    let groups = await db.delete_group([+group_id]);
    res.send(groups);
  },
  async getGroups(req, res) {
    const db = req.app.get("db");
    let groups = await db.get_groups();
    res.send(groups);
  },
  async getSelected(req, res) {
    let { groupId } = req.params;
    const db = req.app.get("db");
    let group = await db.get_selected_group(groupId);
    res.send(group);
  },
  async getGroupMessages(req, res) {
    let { groupId } = req.params;
    const db = req.app.get("db");
    let messages = await db.get_messages(+groupId);
    res.send(messages);
  },
  async addMessage(req, res) {
    let { newMessage, groupId, roomId } = req.body;
    const db = req.app.get("db");
    let messages = await db
      .add_message([newMessage, groupId, roomId, +req.session.user.id])
      .catch(err => console.log("Error with adding a message", err));
    res.send(messages);
  },
  async getRooms(req, res) {
    let { groupId } = req.params
    const db = req.app.get('db')
    let rooms = await db.get_rooms(+groupId)
    res.send(rooms)
  },
  async createRoom(req, res) {
    let { groupId } = req.params
    let { newRoom } = req.body
    const db = req.app.get('db')
    let rooms = await db.create_room([newRoom, groupId])
    res.send(rooms)
  }
};
