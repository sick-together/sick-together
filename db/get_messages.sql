SELECT 
groups.group_id AS groupid,
users.user_id AS userid,
username,
profile_pic,
message
FROM messages
INNER JOIN users ON users.user_id = messages.user_id
INNER JOIN groups ON groups.group_id = messages.group_id
WHERE messages.group_id = $1;