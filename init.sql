CREATE DATABASE sysu_second_hand_book_trading DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

use sysu_second_hand_book_trading;

CREATE TABLE users(
  student_id int(8) not null primary key,
  nickname varchar(20) not null,
  password char(32) not null
);

CREATE TABLE books(
  book_id int not null primary key AUTO_INCREMENT,
  publisher_id int(8) not null,
  FOREIGN KEY (publisher_id) REFERENCES users(student_id) on delete cascade,
  name char(50) not null,
  author char(32) not null,
  img varchar(60) not null default 'default.jpg',
  campus char(50) not null,
  state int(1) not null default 1,
  description text(100) not null,
  phone_num char(20) not null,
  comment text(100) not null,
  price float not null
);

CREATE TABLE trades(
  trade_id int not null primary key AUTO_INCREMENT,
  buyer_id int(8) not null,
  seller_id int(8) not null,
  book_id int not null unique key,
  FOREIGN KEY (buyer_id) REFERENCES users(student_id) on delete cascade,
  FOREIGN KEY (seller_id) REFERENCES users(student_id) on delete cascade,
  FOREIGN KEY (book_id) REFERENCES books(book_id) on delete cascade
);

CREATE TABLE sessions(
  session_id int not null primary key AUTO_INCREMENT,
  buyer_id int(8) not null,
  seller_id int(8) not null,
  UNIQUE KEY (buyer_id, seller_id),
  FOREIGN KEY (buyer_id) REFERENCES users(student_id) on delete cascade,
  FOREIGN KEY (seller_id) REFERENCES users(student_id) on delete cascade
);

CREATE TABLE messages(
  message_id int not null primary key AUTO_INCREMENT,
  session_id int not null,
  sender_id int(8) not null,
  reciever_id int(8) not null,
  content text(100) not null,
  time timestamp not null DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(student_id) on delete cascade,
  FOREIGN KEY (reciever_id) REFERENCES users(student_id) on delete cascade,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) on delete cascade
);

insert into users (student_id, nickname, password) values ('15331060', 'sugerpocket', '25d55ad283aa400af464c76d713c07ad');
insert into users (student_id, nickname, password) values ('15331059', 'fuckyou', '25d55ad283aa400af464c76d713c07ad');

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331060, 'test book', 'tinglideng','sysu', 1, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331060, 'test book2', 'tinglideng','sysu', 2, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331060, 'test book3', 'tinglideng','sysu', 3, 'test', 13719177172, '计算机 测试', 13.7);

insert into trades
(buyer_id, seller_id, book_id) values
(15331059, 15331060, 2);

insert into trades
(buyer_id, seller_id, book_id) values
(15331059, 15331060, 3);
