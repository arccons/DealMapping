USE [DealMapping]
GO

/****** Object:  View [dbo].[deal_investments_v]    Script Date: 30-05-2024 10:35:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[deal_investments_v]
AS
SELECT DISTINCT 
	dbo.fund.Active_Realized, 
	dbo.fund.Deal_Investment_Currency, 
	dbo.fund.Investment_Blended_FX_Rate, 
	dbo.deal_investment_fact.ACDB_Deal_ID, 
	dbo.fund.Fund_Name
FROM  dbo.fund INNER JOIN 
		dbo.deal_investment_fact ON dbo.fund.Fund_Name = dbo.deal_investment_fact.Fund_Name
GO
