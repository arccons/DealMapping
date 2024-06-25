USE [DealMapping]
GO

/****** Object:  View [dbo].[active_deals_v]    Script Date: 20-06-2024 04:24:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[active_deals_v] AS
SELECT dbo.deal.*
FROM dbo.deal
INNER JOIN dbo.deal_security_fact ON dbo.deal.ACDB_Deal_ID = dbo.deal_security_fact.ACDB_Deal_ID
UNION
SELECT dbo.deal.* 
FROM dbo.deal
INNER JOIN dbo.deal_investment_fact ON dbo.deal.ACDB_Deal_ID = dbo.deal_investment_fact.ACDB_Deal_ID
GO
