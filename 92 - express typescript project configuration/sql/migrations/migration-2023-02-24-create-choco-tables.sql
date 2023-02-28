create table ingredients (
  id int4 unsigned primary key auto_increment,
  cocoa varchar(128) not null,
  sugar varchar(128) not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp
);

create table chocolates (
  id int4 unsigned primary key auto_increment,
  title varchar(256) not null,
  brand varchar(256) not null,
  price float8 not null,
  ingredientId int4 unsigned not null unique,
  rating float4 not null,
  hasNuts boolean not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (ingredientId) REFERENCES ingredients(id)
);

create table chocoImages (
  id int4 unsigned primary key auto_increment,
  src varchar(512) not null,
  chocoId int4 unsigned not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (chocoId) REFERENCES chocolates(id)
);

----------------------------
----------------------------

create table bclwftnlhkhptrlvp7x4.locations (
  id int4 unsigned primary key auto_increment,
  country varchar(256) not null,
  city varchar(256) not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp
);

create table bclwftnlhkhptrlvp7x4.houses (
  id int4 unsigned primary key auto_increment,
  title varchar(256) not null,
  locationId int4 unsigned not null unique,
  price float8 not null,
  rating float4 not null,
  hasJacuzzi boolean not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (locationId) REFERENCES locations(id)
);

create table bclwftnlhkhptrlvp7x4.images (
  id int4 unsigned primary key auto_increment,
  src varchar(512) not null,
  houseId int4 unsigned not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (houseId) REFERENCES houses(id)
);