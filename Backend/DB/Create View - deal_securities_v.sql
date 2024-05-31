USE [DealMapping]
GO

/****** Object:  View [dbo].[deal_securities_v]    Script Date: 26-05-2024 10:56:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[deal_securities_v]
AS
SELECT dbo.security.*, dbo.deal_security_fact.As_Of_Date, dbo.deal_security_fact.ACDB_Deal_ID
FROM  dbo.security INNER JOIN
       dbo.deal_security_fact ON dbo.security.Security_ID = dbo.deal_security_fact.Security_ID
GO
