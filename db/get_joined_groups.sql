SELECT * FROM joined_groups jg
join users u on u.user_id = jg.user_id
where u.user_id = $1
ORDER BY jg.group_id DESC;