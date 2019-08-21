insert into groups (group_name, user_id, group_picture, description)
values ($1, $2, $3, $4);

select * from groups g
join users u on u.user_id = g.user_id
where u.user_id = $2;