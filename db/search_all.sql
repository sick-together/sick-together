SELECT * FROM groups
WHERE UPPER(group_name) LIKE UPPER($1)
ORDER BY groups.group_id DESC;