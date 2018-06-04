CREATE DATABASE SYSU_second_hand_book_trading DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

use SYSU_second_hand_book_trading;

CREATE TABLE users(
  student_id int(8) not null primary key,
  password char(32) not null
);

CREATE TABLE books(
  book_id int not null primary key AUTO_INCREMENT,
  publisher_id int(8) not null,
  FOREIGN KEY (publisher_id) REFERENCES users(student_id) on delete cascade,
  name char(50) not null,
  author char(32) not null,
  img varchar(60) not null,
  campus char(50) not null,
  description text(100) not null,
  phone_num char(20) not null,
  comment text(100) not null
);

CREATE TABLE trades(
  trade_id int not null primary key AUTO_INCREMENT,
  buyer_id int(8) not null,
  seller_id int(8) not null,
  book_id int not null,
  FOREIGN KEY (buyer_id) REFERENCES users(student_id) on delete cascade,
  FOREIGN KEY (seller_id) REFERENCES users(student_id) on delete cascade,
  FOREIGN KEY (book_id) REFERENCES books(book_id) on delete cascade
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

CREATE TABLE sessions(
  session_id int not null primary key AUTO_INCREMENT,
  buyer_id int(8) not null,
  seller_id int(8) not null,
  FOREIGN KEY (buyer_id) REFERENCES users(student_id) on delete cascade,
  FOREIGN KEY (seller_id) REFERENCES users(student_id) on delete cascade
);
