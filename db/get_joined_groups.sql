SELECT * FROM joined_groups jg
join users u on u.user_id = jg.user_id
join groups g on g.group_id = jg.group_id
where u.user_id = $1
ORDER BY jg.group_id DESC;
