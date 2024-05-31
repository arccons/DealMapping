USE [DealMapping]
GO

/****** Object:  View [dbo].[mappings_v]    Script Date: 30-05-2024 10:43:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[mappings_v]
AS
SELECT DISTINCT
	dbo.deal.Deal_Name, 
	dbo.deal.Deal_Name_EntityCode, 
	dbo.deal_investment_fact.ACDB_Deal_ID, 
	dbo.fund.Active_Realized, 
	dbo.fund.Fund_Name,
	dbo.deal_investment_fact.As_Of_Date
FROM  dbo.deal
INNER JOIN dbo.deal_investment_fact ON dbo.deal.ACDB_Deal_ID = dbo.deal_investment_fact.ACDB_Deal_ID 
INNER JOIN dbo.fund ON dbo.deal_investment_fact.Fund_Name = dbo.fund.Fund_Name
GO
