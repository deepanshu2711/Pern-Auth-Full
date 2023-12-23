
create database pernauth ;

create table user(
    id serial primary key ,
    username varchar(200) not null unique,
    email varchar(200) not null unique,
    password varchar(200) not null
);

insert into user (username ,email, password) values ('deepanshu' , 'deepanshu@gmail.com' , '123');