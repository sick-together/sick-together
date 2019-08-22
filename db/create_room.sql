insert into rooms (room_name, group_id)
values($1, $2);

SELECT * FROM rooms
WHERE group_id = $2;
