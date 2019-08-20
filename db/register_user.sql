insert into users(username, password, profile_pic, city, state) 
values ($1, $2, $3, $4, $5)
returning *;