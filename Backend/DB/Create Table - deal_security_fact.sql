create table dbo.deal_security_fact (
As_Of_Date date not null,
ACDB_Deal_ID integer not null,
Security_ID varchar(25) not null,
primary key (ACDB_Deal_ID, Security_ID, As_Of_Date));
