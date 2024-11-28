create database her_cart_db1;

use her_cart_db1;

create table users(
id int auto_increment primary key,
username varchar(100) not null,
email varchar(100) unique not null,
contact varchar(15),
address varchar(255),
pincode varchar(10),
password varchar(100) not null
);

select * from users;