USE [DealDB]
GO

INSERT INTO [dbo].[Deals]
           ([id]
           ,[dealName]
           ,[effectiveDate]
           ,[closingDate]
           ,[subSector]
           ,[isLiquid])
     VALUES
           (1, 'Deal 001', '12/1/2019', '11/4/2021', 'Infrastructure', 'Yes'),
		   (2, 'Deal 002', '6/17/2023', NULL, 'Residential', 'Yes'),
		   (3, 'Deal 010', '4/1/2019', NULL, 'CLO', 'No')
GO


