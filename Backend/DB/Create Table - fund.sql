USE [DealMapping]
GO

/****** Object:  Table [dbo].[fund]    Script Date: 26-05-2024 03:06:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[fund](
	[Fund_Name] [varchar](100) NOT NULL,
	[Active_Realized] [varchar](25) NULL,
	[Deal_Investment_Currency] [varchar](3) NULL,
	[Investment_Blended_FX_Rate] [numeric](20, 6) NULL,
PRIMARY KEY CLUSTERED 
(
	[Fund_Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
