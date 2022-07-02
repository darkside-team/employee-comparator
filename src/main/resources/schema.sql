/*
create table users(
	username varchar_ignorecase(50) not null primary key,
	password varchar_ignorecase(500) not null,
	enabled boolean not null
);

create table authorities (
	username varchar_ignorecase(50) not null,
	authority varchar_ignorecase(50) not null,
	constraint fk_authorities_users foreign key(username) references users(username)
);
create unique index ix_auth_username on authorities (username,authority);
*/

/*
drop view EMPLOYEE_GRATITUDE_VIEW if exists;
CREATE VIEW EMPLOYEE_GRATITUDE_VIEW
AS SELECT eg.id, eg.receipt_date, eg.employee_id, g.id, g.name
    FROM EMPLOYEE_GRATITUDE eg inner join Gratitude g on g.id = eg.gratitude_id;
*/