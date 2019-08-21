delete from groups
where group_id = $1;

select * from groups
ORDER BY groups.group_id DESC;