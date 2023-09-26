use jugadores;

create table jugador (
id int not null auto_increment primary key,
nombre VARCHAR(45) not null,
equipo VARCHAR(45) not null,
pais int not null
);