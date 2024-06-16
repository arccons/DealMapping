USE [DealMapping]
GO

/****** Object:  View [dbo].[deal_funds_v]    Script Date: 16-06-2024 03:56:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[deal_funds_v]
AS
SELECT DISTINCT 
	dbo.deal_investment_fact.ACDB_Deal_ID, 
	dbo.deal_investment_fact.Fund_Name, 
	dbo.deal_investment_fact.Realized_Active,
	dbo.deal_investment_fact.Deal_Mapping_Currency
FROM  dbo.deal_investment_fact

GO
