INSERT INTO rooms
(id, room_id, group_id)
VALUES ($1, $2, $3)
RETURNING *