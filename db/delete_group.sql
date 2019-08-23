delete from messages
where group_id = $1;

delete from rooms
where group_id = $1;

delete from groups
where group_id = $1;

select * from groups
ORDER BY groups.group_id DESC;