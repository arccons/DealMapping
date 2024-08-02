USE [DealMapping]
GO

INSERT INTO [dbo].[deal_investment_fact]
           ([As_Of_Date]
           ,[ACDB_Deal_ID]
           ,[Fund_Name])
     VALUES
           ('2019-01-09', 1, 'Fund F001'),
		   ('2019-01-29', 1, 'Fund F002'),
		   ('2022-08-30', 2, 'Fund F003'),
		   ('2022-09-24', 2, 'Fund F004'),
		   ('2022-10-28', 2, 'Fund F006'),
		   ('2024-01-01', 3, 'Fund F007'),
		   ('2023-04-04', 4, 'Fund F001'),
		   ('2021-07-04', 5, 'Fund F003'),
		   ('2021-09-11', 5, 'Fund F004')
GO
