update users
set username = $2, city = $3, state = $4
where user_id = $1

returning *;