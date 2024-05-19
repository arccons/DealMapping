USE [DealDB]
GO

/****** Object:  Table [dbo].[Deal]    Script Date: 19-05-2024 11:42:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Deal](
	[id] [nchar](10) NOT NULL,
	[dealName] [varchar](50) NOT NULL,
	[effectiveDate] [date] NOT NULL,
	[closingDate] [date] NULL,
	[subSector] [varchar](50) NOT NULL,
	[isLiquid] [char](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
