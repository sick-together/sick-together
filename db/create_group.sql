insert into groups (group_name, user_id, group_picture, description)
values ($1, $2, $3, $4);


insert into rooms(room_name, group_id)
values('general', $5 );

select * from groups g
join users u on u.user_id = g.user_id
where user_id = $2;