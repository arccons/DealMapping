create table dbo.deal_security (
Security_ID varchar(25) not null primary key,
ACDB_Deal_ID int,
Security_Name varchar(100),
Investment_Type varchar(50),
Currency varchar(3)
);
