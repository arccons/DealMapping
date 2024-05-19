USE [DealDB]
GO

/****** Object:  Table [dbo].[DealFund]    Script Date: 19-05-2024 11:41:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DealFund](
	[deal_id] [nchar](10) NOT NULL,
	[fund_name] [nchar](25) NOT NULL,
	[as_of_date] [date] NOT NULL,
	[local_cmmt] [float] NULL,
	[is_active] [smallint] NULL,
	[realized_irr] [float] NULL,
	[realized_pnl] [float] NULL,
	[realized_date] [date] NULL,
	[fund_id] [nchar](10) NULL,
	[legal_cmmt] [float] NULL,
	[ic_pm_adj] [float] NULL,
	[realized_moic] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[deal_id] ASC,
	[fund_name] ASC,
	[as_of_date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[DealFund]  WITH CHECK ADD  CONSTRAINT [fk_deal_id] FOREIGN KEY([deal_id])
REFERENCES [dbo].[Deal] ([id])
GO

ALTER TABLE [dbo].[DealFund] CHECK CONSTRAINT [fk_deal_id]
GO


