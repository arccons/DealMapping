USE [DealMapping]
GO

/****** Object:  View [dbo].[deal_funds_v]    Script Date: 26-06-2024 11:36:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[deal_funds_v]
AS
SELECT DISTINCT 
	dbo.deal_investment_fact.ACDB_Deal_ID,
	dbo.deal.Deal_Name,
	dbo.deal.Deal_Name_EntityCode,
	dbo.deal_investment_fact.Fund_Name,
	dbo.deal_investment_fact.Deal_Mapping_Currency,
	dbo.deal_investment_fact.Realized_Active,
	dbo.deal_investment_fact.Realized_Date,
	dbo.deal_investment_fact.Realized_IRR,
	dbo.deal_investment_fact.Realized_MOIC,
	dbo.deal_investment_fact.Realized_PnL,
	dbo.deal_investment_fact.Commitment_Local,
	dbo.deal_investment_fact.Legal_Commitment_Local
FROM  dbo.deal_investment_fact
INNER JOIN dbo.deal ON dbo.deal.ACDB_Deal_ID = dbo.deal_investment_fact.ACDB_Deal_ID

GO
