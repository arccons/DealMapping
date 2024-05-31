USE [DealMapping]
GO

/****** Object:  View [dbo].[history_v]    Script Date: 30-05-2024 10:52:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[history_v]
AS
SELECT DISTINCT 
	dbo.fund.Active_Realized, 
	dbo.fund.Deal_Investment_Currency,
	dbo.fund.Investment_Blended_FX_Rate,
	dbo.deal_investment_fact.As_Of_Date,
	dbo.deal_investment_fact.ACDB_Deal_ID,
	dbo.fund.Fund_Name,
	dbo.deal_investment_fact.Realized_PnL, 
	dbo.deal_investment_fact.Realized_IRR, 
	dbo.deal_investment_fact.Realized_MOIC, 
	dbo.deal_investment_fact.Realized_Date, 
	dbo.deal_investment_fact.Commitment_Local, 
	dbo.deal_investment_fact.Commitment_USD,
	dbo.deal_investment_fact.Legal_Commitment_Local, 
	dbo.deal_investment_fact.Legal_Commitment_USD, 
	dbo.deal_investment_fact.ITD_PM_Adjustment_USD, 
	dbo.deal_investment_fact.IC_Discretionary_Unfunded_USD, 
	dbo.deal_investment_fact.DealMapping_Filename, 
	dbo.deal_investment_fact.Modified, 
	dbo.deal_investment_fact.Copy_Num, 
	dbo.deal_investment_fact.Modified_By
FROM  dbo.fund 
		INNER JOIN dbo.deal_investment_fact ON dbo.deal_investment_fact.Fund_Name = dbo.fund.Fund_Name
GO
