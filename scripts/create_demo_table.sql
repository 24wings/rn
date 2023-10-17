create table mydemo as select * from pg_tables;

create table x (
id integer,
name varchar(20)
);

insert into x (id, name) values (1, 'Martijn');
insert into x (id, name) values (2, 'Lucas');
commit;
