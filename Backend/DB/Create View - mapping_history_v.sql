USE [DealMapping]
GO

/****** Object:  View [dbo].[mapping_history_v]    Script Date: 29-06-2024 21:42:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[mapping_history_v] AS
SELECT dbo.deal_investment_fact.*, dbo.deal.Deal_Name, dbo.deal.Deal_Name_EntityCode
FROM  dbo.deal_investment_fact
INNER JOIN dbo.deal ON dbo.deal_investment_fact.ACDB_Deal_ID = dbo.deal.ACDB_Deal_ID
GO
