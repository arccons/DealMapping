use DealMapping

create table dbo.deal (
ACDB_Deal_ID int not null primary key,
Deal_Name_EntityCode varchar(25) not null,
Deal_Name varchar(100) not null,
Liquid_Illiquid varchar(25),
Strategy varchar(50),
Subsector varchar(50),
Region varchar(25),
Closing_Date date,
Is_Deleted smallint default 0,
Prism_Link varchar(500),
DealCloud_Direct_Link varchar(500),
SharePoint_DealCloud_ICMemo_Link varchar(500)
constraint uc_deal_code unique nonclustered (Deal_Name_EntityCode));
