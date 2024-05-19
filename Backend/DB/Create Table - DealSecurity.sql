USE [DealDB]
GO

/****** Object:  Table [dbo].[DealSecurity]    Script Date: 19-05-2024 11:42:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DealSecurity](
	[deal_id] [nchar](10) NOT NULL,
	[security_id] [varchar](50) NOT NULL,
	[as_of_date] [date] NULL
) ON [PRIMARY]
GO


