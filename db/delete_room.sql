delete from rooms
where room_id = $1;

SELECT * FROM rooms
WHERE group_id = $2
ORDER BY room_id;