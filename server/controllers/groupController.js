module.exports = {
    async getGroups(req, res) {
        const db = req.app.get('db')
        let groups = await db.get_groups()
        res.send(groups)
    },
    async getSelected(req, res) {
        let { groupId } = req.params
        const db = req.app.get('db')
        let group = await db.get_selected_group(groupId)
        res.send(group)
    }
}