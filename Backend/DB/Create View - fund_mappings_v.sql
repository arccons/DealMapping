USE [DealMapping]
GO

/****** Object:  View [dbo].[fund_mappings_v]    Script Date: 08-06-2024 08:15:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[fund_mappings_v]
AS
SELECT DISTINCT
	dbo.deal.Deal_Name, 
	dbo.deal.Deal_Name_EntityCode, 
	dbo.deal_funds_v.*
FROM  dbo.deal_funds_v
INNER JOIN dbo.deal ON dbo.deal_funds_v.ACDB_Deal_ID = dbo.deal.ACDB_Deal_ID
GO
