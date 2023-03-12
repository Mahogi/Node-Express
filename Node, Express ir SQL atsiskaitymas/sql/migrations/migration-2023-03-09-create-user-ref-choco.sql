alter table chocolates
add personId int4 unsigned,
add foreign key (personId) references users(id);

UPDATE chocolates
SET personId = 1
WHERE personId IS NULL;

alter table chocolates
modify personId int4 unsigned not null;

