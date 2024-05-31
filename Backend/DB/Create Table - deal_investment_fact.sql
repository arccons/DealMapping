USE [DealMapping]
GO

/****** Object:  Table [dbo].[deal_investment_fact]    Script Date: 25-05-2024 00:49:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[deal_investment_fact](
	[As_Of_Date] [date] NOT NULL,
	[ACDB_Deal_ID] [int] NOT NULL,
	[Fund_Name] [varchar](100) NOT NULL,
	[Realized_PnL] [numeric](20, 6) NULL,
	[Realized_IRR] [numeric](20, 6) NULL,
	[Realized_MOIC] [varchar](25) NULL,
	[Realized_Date] [date] NULL,
	[Commitment_Local] [numeric](20, 6) NULL,
	[Commitment_USD] [numeric](20, 6) NULL,
	[Legal_Commitment_Local] [numeric](20, 6) NULL,
	[Legal_Commitment_USD] [numeric](20, 6) NULL,
	[ITD_PM_Adjustment_USD] [numeric](20, 6) NULL,
	[IC_Discretionary_Unfunded_USD] [numeric](20, 6) NULL,
	[DealMapping_Filename] [varchar](255) NULL,
	[Modified] [datetime] NULL,
	[Copy_Num] [int] NULL,
	[Modified_By] [varchar](50) NULL
) ON [PRIMARY]
GO
