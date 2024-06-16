USE [DealMapping]
GO

/****** Object:  View [dbo].[mapping_history_v]    Script Date: 16-06-2024 04:14:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[mapping_history_v] AS
SELECT dbo.deal_investment_fact.*
FROM  dbo.deal_investment_fact
GO
