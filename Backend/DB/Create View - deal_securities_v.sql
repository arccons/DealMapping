USE [DealDB]
GO

/****** Object:  View [dbo].[deal_securities_v]    Script Date: 19-05-2024 11:37:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[deal_securities_v]
AS
SELECT dbo.Deal.id, dbo.Deal.dealName, dbo.DealSecurity.security_id, dbo.DealSecurity.as_of_date
FROM  dbo.Deal INNER JOIN
       dbo.DealSecurity ON dbo.Deal.id = dbo.DealSecurity.deal_id
GO
