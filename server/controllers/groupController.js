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
    let { newMessage, groupId } = req.body;
    const db = req.app.get("db");
    let messages = await db
      .add_message([newMessage, groupId, +req.session.user.id])
      .catch(err => console.log("Error with adding a message", err));
    res.send(messages);
  }
};
