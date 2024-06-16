create table dbo.deal_investment_fact (
As_Of_Date date not null,
ACDB_Deal_ID int not null,
Fund_Name varchar(100) not null,
Deal_Mapping_Currency varchar(255),
Realized_Active varchar(25),
Realized_IRR numeric(20, 6),
Realized_MOIC numeric(10,2),
Realized_PnL numeric(20,6),
Realized_Date date,
Blended_FX_Rate numeric(20,6),
Commitment_Local numeric(20,6),
Legal_Commitment_Local numeric(20,6),
primary key (As_Of_Date, ACDB_Deal_ID, Fund_Name)
);
