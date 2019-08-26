SELECT * FROM rooms
WHERE rooms.group_id = $1
order by room_id;