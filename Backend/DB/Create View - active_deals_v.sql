USE [DealMapping]
GO
/****** Object:  View [dbo].[active_deals_v]    Script Date: 24-05-2024 05:29:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[active_deals_v]
AS
SELECT dbo.Deal.* 
FROM dbo.Deal
INNER JOIN dbo.deal_security_fact ON dbo.Deal.ACDB_Deal_ID = dbo.deal_security_fact.ACDB_Deal_ID
UNION
SELECT dbo.Deal.* 
FROM dbo.Deal
INNER JOIN dbo.deal_investment_fact ON dbo.Deal.ACDB_Deal_ID = dbo.deal_investment_fact.ACDB_Deal_ID
GO
