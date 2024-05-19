USE [DealDB]
GO

/****** Object:  View [dbo].[funded_deals_v]    Script Date: 19-05-2024 11:40:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[funded_deals_v] AS 
	SELECT d.id, d.dealName, d.effectiveDate, d.closingDate, d.subSector, d.isLiquid
	FROM  dbo.Deal AS d
	WHERE EXISTS (SELECT m.deal_id FROM dbo.DealFund m WHERE d.id = m.deal_id)
GO
