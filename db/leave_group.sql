DELETE FROM joined_groups
WHERE user_id = $1 AND group_id = $2;

update groups
set members = members - 1
where group_id = $2;

select * from joined_groups
join groups g on g.group_id = joined_groups.group_id
ORDER BY joined_groups.group_id DESC;