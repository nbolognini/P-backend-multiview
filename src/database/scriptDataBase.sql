CREATE DATABASE multiview,
USE multiview;

CREATE TABLE login(
username varchar(30) not null,
role varchar(30) not null,
password varchar(30) not null,
primary key(username, password)
);

INSERT INTO login (username, password, role) VALUES
('usuario1', 'clave1', 'usuario'),
('usuario2', 'clave2', 'usuario'),
('usuario3', 'clave3', 'usuario'),
('sistemas26', 'sistemas26', 'superusuario'),
('admin', 'admin', 'admin');
