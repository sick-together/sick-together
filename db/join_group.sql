insert into joined_groups(user_id, group_id)
values ($1, $2);

select * from joined_groups
ORDER BY joined_groups.group_id DESC;