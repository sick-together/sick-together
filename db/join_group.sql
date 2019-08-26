INSERT INTO joined_groups (user_id, group_id)
VALUES ($1, $2); 

-- insert the user's id and the group's id into the table
-- to create a new relationship