module.exports = {
    async joinGroup(req, res) {
        let { group_id } = req.params; 
        let { user_id } = req.session.user; 
        const db = req.app.get('db'); 
        let joins = await db.join_group([
            user_id, 
            group_id
        ]); 
        res.send(joins); 
    }
}