SELECT 
groups.group_id AS groupid,
users.user_id AS userid,
username,
profile_pic,
message,
message_id,
messages.room_id,
room_name,
timestamp,
edited
FROM messages
INNER JOIN users ON users.user_id = messages.user_id
INNER JOIN groups ON groups.group_id = messages.group_id
INNER JOIN rooms ON rooms.room_id = messages.room_id
WHERE messages.group_id = $1
ORDER BY message_id DESC;