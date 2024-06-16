USE [DealMapping]
GO

/****** Object:  View [dbo].[deal_securities_v]    Script Date: 16-06-2024 05:34:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[deal_securities_v]
AS
SELECT 
	dbo.deal_security_fact.*, 
	dbo.deal_security.Security_Name, 
	dbo.deal_security.Investment_Type, 
	dbo.deal_security.Currency
FROM  dbo.deal_security_fact INNER JOIN
       dbo.deal_security ON dbo.deal_security.Security_ID = dbo.deal_security_fact.Security_ID
GO
