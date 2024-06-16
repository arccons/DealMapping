USE [DealMapping]
GO

/****** Object:  Table [dbo].[deal_security_fact]    Script Date: 16-06-2024 03:31:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[deal_security_fact](
	[As_Of_Date] [date] NOT NULL,
	[ACDB_Deal_ID] [int] NOT NULL,
	[Security_ID] [varchar](25) NOT NULL,
	[Investment_Type_Override] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ACDB_Deal_ID] ASC,
	[Security_ID] ASC,
	[As_Of_Date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
