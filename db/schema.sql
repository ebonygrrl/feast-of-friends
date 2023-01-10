CREATE DATABASE fof_potluck;

-- Create two new databases --
DROP DATABASE IF EXISTS fof_potluck;
CREATE DATABASE fof_potluck;

-- Use inventory_db --
USE fof_potluck;

-- See database in use --
SELECT DATABASE();

-- serving as an example, this will be manipulated once the infrmation starts sorting itself out--
CREATE TABLE event (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  event_name VARCHAR(30) NOT NULL
);

-- CREATE TABLE dish (
--   id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   title VARCHAR(30) NOT NULL, 
--   salary INT NOT NULL,
--   department_id INT,

--   FOREIGN KEY (department_id) REFERENCES department(id)
-- ); 

-- CREATE TABLE user (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INT, 
--     manager_id INT,

    
--     -- FOREIGN KEY (role_id) 
--     -- REFERENCES role(id),  
--     -- FOREIGN KEY (manager_id) 
--     -- REFERENCES employee(id) 
-- );
