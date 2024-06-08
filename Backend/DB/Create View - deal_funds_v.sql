USE [DealMapping]
GO

/****** Object:  View [dbo].[deal_funds_v]    Script Date: 08-06-2024 07:41:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[deal_funds_v]
AS
SELECT DISTINCT 
	dbo.fund.Active_Realized, 
	dbo.fund.Deal_Investment_Currency, 
	dbo.fund.Fund_Name, 
	dbo.fund.Investment_Blended_FX_Rate, 
	dbo.deal_investment_fact.ACDB_Deal_ID
FROM  dbo.fund INNER JOIN 
		dbo.deal_investment_fact ON dbo.fund.Fund_Name = dbo.deal_investment_fact.Fund_Name
GO
