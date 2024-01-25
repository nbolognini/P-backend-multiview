CREATE DATABASE multiview;
USE multiview;

CREATE TABLE login(
username varchar(30) not null,
role varchar(30) not null,
password varchar(30) not null,
primary key(username, password)
);

INSERT INTO login (username, password, role) VALUES
('janibarro', 'abcd1234', 'usuario'),
('naldao', 'abcd1234', 'usuario'),
('nbolognini', 'abcd1234', 'usuario'),
('sistemas26', 'abcd1234', 'superusuario'),
('admin', 'admin', 'administrador');
