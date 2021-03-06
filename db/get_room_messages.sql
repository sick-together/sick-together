SELECT 
groups.group_id AS groupid,
users.user_id AS userid,
username,
profile_pic,
message,
messages.room_id,
room_name
FROM messages
INNER JOIN users ON users.user_id = messages.user_id
INNER JOIN groups ON groups.group_id = messages.group_id
INNER JOIN rooms ON rooms.room_id = messages.room_id
WHERE rooms.room_id = $1 AND messages.group_id = $2
ORDER BY message_id;