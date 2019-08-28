update groups
set group_name = $1, group_picture = $2, description = $3, location = $4
where group_id = $5;

select * from groups
ORDER BY groups.group_id DESC;