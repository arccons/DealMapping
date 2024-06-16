USE [DealMapping]
GO

/****** Object:  View [dbo].[fund_mappings_v]    Script Date: 16-06-2024 04:04:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[fund_mappings_v]
AS
SELECT DISTINCT
	dbo.deal_investment_fact.Fund_Name, 
	dbo.deal_investment_fact.Deal_Mapping_Currency,
	dbo.deal_investment_fact.Realized_Active,
	dbo.deal_investment_fact.Realized_Date,
	dbo.deal.Deal_Name,
	dbo.deal.Deal_Name_EntityCode,
	dbo.deal.ACDB_Deal_ID
FROM  dbo.deal_investment_fact
INNER JOIN dbo.deal ON dbo.deal_investment_fact.ACDB_Deal_ID = dbo.deal.ACDB_Deal_ID
GO
