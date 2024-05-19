USE [DealDB]
GO

INSERT INTO [dbo].[DealSecurity]
           ([deal_id]
           ,[security_id]
           ,[as_of_date])
     VALUES 
	 (1, 'S 001', GETDATE()), 
	 (1, 'S 002', GETDATE()), 
	 (1, 'S 003', GETDATE()), 
	 (2, 'S 004', GETDATE()), 
	 (2, 'S 005', GETDATE()), 
	 (2, 'S 006', GETDATE())
GO


