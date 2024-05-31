create table dbo.deal (
ACDB_Deal_ID integer not null primary key identity,
Deal_Name_EntityCode varchar(25),
Deal_Name varchar(100),
Closing_Date date,
Modify_Date date,
Subsector varchar(50),
Strategy varchar(50),
Liquid_Illiquid varchar(25),
Prism_Link varchar(500),
DealCloud_Direct_Link varchar(500),
SharePoint_DealCLoud_ICMemo_Link varchar(500)
)
