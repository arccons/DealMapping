USE [DealMapping]
GO

INSERT INTO [dbo].[deal]
           ([Deal_Name_EntityCode]
           ,[Deal_Name]
           ,[Closing_Date]
           ,[Modify_Date]
           ,[Subsector]
           ,[Strategy]
           ,[Liquid_Illiquid]
           ,[Prism_Link]
           ,[DealCloud_Direct_Link]
           ,[SharePoint_DealCLoud_ICMemo_Link])
     VALUES
           ('D001', 'Deal One', '2023-12-01', '2023-12-21', 'Finance', 'CLO', 'Liquid', null, null, null),
('D002', 'Deal Two', '2021-01-15', '2022-02-01', 'Residential', 'CLO', 'Iliquid', null, null, null),
('D003', 'Deal Three', '2022-07-31', '2023-04-06', 'Infrastructure', 'Alt Credit', 'Iliquid', null, null, null),
('D004', '_Expenses', '2020-01-05', '2020-01-22', 'Financing', '_Expenses', 'Liquid', null, null, null),
('D005', '_Currency', '2020-11-05', '2020-11-22', 'Financing', '_Currency', 'Liquid', null, null, null)

GO


