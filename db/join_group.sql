insert into joined_groups(user_id, group_id)
values ($1, $2);

update groups
set members = members + 1
where group_id = $2;

select * from joined_groups
join groups g on g.group_id = joined_groups.group_id
ORDER BY joined_groups.group_id DESC;
