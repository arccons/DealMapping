USE [DealMapping]
GO

/****** Object:  View [dbo].[fund_mappings_v]    Script Date: 25-06-2024 17:43:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[fund_mappings_v]
AS
SELECT dt.As_Of_Date, dt.Deal_Name_EntityCode, dt.Fund_Name FROM 
(SELECT DISTINCT
	dbo.deal_investment_fact.As_Of_Date,
	dbo.deal.ACDB_Deal_ID,
	dbo.deal.Deal_Name,
	dbo.deal.Deal_Name_EntityCode,
	dbo.deal_investment_fact.Fund_Name,
	dbo.deal_investment_fact.Deal_Mapping_Currency, 
	dbo.deal_investment_fact.Realized_Active,
	dbo.deal_investment_fact.Realized_Date 
	FROM  dbo.deal_investment_fact
	INNER JOIN dbo.deal ON dbo.deal.ACDB_Deal_ID = dbo.deal_investment_fact.ACDB_Deal_ID) AS dt 
	GROUP BY 
		dt.As_Of_Date, 
		dt.Deal_Name_EntityCode, 
		dt.Fund_Name

GO
