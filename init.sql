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
insert into users (student_id, nickname, password) values ('15331058', 'fuckyou1', '25d55ad283aa400af464c76d713c07ad');
insert into users (student_id, nickname, password) values ('15331057', 'fuckyou2', '25d55ad283aa400af464c76d713c07ad');
insert into users (student_id, nickname, password) values ('15331056', 'fuckyou3', '25d55ad283aa400af464c76d713c07ad');
insert into users (student_id, nickname, password) values ('15331055', 'fuckyou4', '25d55ad283aa400af464c76d713c07ad');
insert into users (student_id, nickname, password) values ('15331054', 'fuckyou5', '25d55ad283aa400af464c76d713c07ad');

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331060, 'test book', 'tinglideng','sysu', 1, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331060, 'test book2', 'tinglideng','sysu', 2, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331058, 'test book3', 'tinglideng','sysu', 3, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331057, 'test book4', 'tinglideng','sysu', 1, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331056, 'test book5', 'tinglideng','sysu', 1, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331055, 'test book6', 'tinglideng','sysu', 1, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331057, 'test book7', 'tinglideng','sysu', 2, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331056, 'test book8', 'tinglideng','sysu', 2, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331055, 'test book9', 'tinglideng','sysu', 2, 'test', 13719177172, '计算机 测试 abc', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331057, 'test book10', 'tinglideng','sysu', 3, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331056, 'test book11', 'tinglideng','sysu', 3, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331055, 'test book12', 'tinglideng','sysu', 3, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331057, 'test book13', 'tinglideng','sysu', 4, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331056, 'test book14', 'tinglideng','sysu', 4, 'test', 13719177172, '计算机 测试', 13.7);

insert into books
(publisher_id, name, author, campus, state, description, phone_num, comment, price) values
(15331055, 'test book15', 'tinglideng','sysu', 4, 'test', 13719177172, '计算机 测试', 13.7);



insert into sessions
(buyer_id, seller_id) values
(15331059, 15331060)

insert into trades
(buyer_id, seller_id, book_id) values
(15331058, 15331057, 7);

insert into trades
(buyer_id, seller_id, book_id) values
(15331057, 15331056, 8);

insert into trades
(buyer_id, seller_id, book_id) values
(15331056, 15331055, 9);

insert into trades
(buyer_id, seller_id, book_id) values
(15331058, 15331057, 10);

insert into trades
(buyer_id, seller_id, book_id) values
(15331057, 15331056, 11);

insert into trades
(buyer_id, seller_id, book_id) values
(15331056, 15331055, 12);

insert into trades
(buyer_id, seller_id, book_id) values
(15331058, 15331057, 13);

insert into trades
(buyer_id, seller_id, book_id) values
(15331057, 15331056, 14);

insert into trades
(buyer_id, seller_id, book_id) values
(15331056, 15331055, 15);

insert into trades
(buyer_id, seller_id, book_id) values
(15331059, 15331060, 2);

insert into trades
(buyer_id, seller_id, book_id) values
(15331059, 15331060, 3);
