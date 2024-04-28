USE [DealDB]
GO

/****** Object:  Table [dbo].[Deals]    Script Date: 23-04-2024 23:12:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Deals](
	[id] [nchar](10) NOT NULL,
	[dealName] [varchar](50) NOT NULL,
	[effectiveDate] [date] NOT NULL,
	[closingDate] [date] NULL,
	[subSector] [varchar](50) NOT NULL,
	[isLiquid] [char](10) NOT NULL
) ON [PRIMARY]
GO


