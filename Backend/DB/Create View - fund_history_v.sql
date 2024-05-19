USE [DealDB]
GO

/****** Object:  View [dbo].[fund_history_v]    Script Date: 19-05-2024 11:39:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[fund_history_v]
AS
SELECT dealName, deal_id, fund_name, as_of_date, local_cmmt, is_active, realized_irr, realized_pnl, realized_date, fund_id
FROM  dbo.deal_funds_v
GO
