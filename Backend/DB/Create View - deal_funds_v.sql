USE [DealDB]
GO

/****** Object:  View [dbo].[deal_funds_v]    Script Date: 19-05-2024 10:42:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[deal_funds_v]
AS
SELECT dbo.Deal.dealName, dbo.DealFund.*
FROM  dbo.Deal INNER JOIN
       dbo.DealFund ON dbo.Deal.id = dbo.DealFund.deal_id
GO
