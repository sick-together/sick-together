module.exports = {
  async createGroup(req, res) {
    let { user_id } = req.session.user;
    let { group_name, group_picture, description } = req.body;
    const db = req.app.get("db");
    let groups = await db.create_group([
      group_name,
      user_id,
      group_picture,
      description
    ]);
    res.send(groups);
  }
};
