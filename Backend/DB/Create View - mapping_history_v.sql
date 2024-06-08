USE [DealMapping]
GO

/****** Object:  View [dbo].[fund_history_v]    Script Date: 08-06-2024 07:50:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[mapping_history_v]
AS
SELECT DISTINCT 
	dbo.fund.Active_Realized, 
	dbo.fund.Deal_Investment_Currency,
	dbo.fund.Investment_Blended_FX_Rate,
	dbo.deal_investment_fact.*
FROM  dbo.deal_investment_fact
		INNER JOIN dbo.fund ON dbo.deal_investment_fact.Fund_Name = dbo.fund.Fund_Name
GO
