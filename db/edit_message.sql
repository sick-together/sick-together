UPDATE messages
SET message = $2, edited = true
WHERE message_id = $1;
