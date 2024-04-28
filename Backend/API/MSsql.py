import os
import pyodbc

def connect_to_DB():
    #print(DB_DRIVER, DB_HOST, DATABASE, TRUSTED_CONNECTION)
    #DBconn = pyodbc.connect(driver='{SQL Server}', server='DESKTOP-ALT0UH5', database='SchemaCheck', trusted_connection='yes')
    DBconn = pyodbc.connect(driver=os.getenv('MSSQL_DB_DRIVER'), server=os.getenv('MSSQL_DB_HOST'), database=os.getenv('MSSQL_DATABASE'), trusted_connection=os.getenv('MSSQL_TRUSTED_CONNECTION'))
    cursor = DBconn.cursor()
    return cursor, DBconn

def closeConnection(DBconn):
    DBconn.close()

def commitConnection(DBconn):
    DBconn.commit()

def getDealListSQL():
    sql_stmt = "SELECT * from DealDB.dbo.deals"
    #print(f"Subject List SQL = {sql_stmt}")
    return sql_stmt

def updateDealSQL(dealID, effectiveDate, closingDate, subSector, isLiquid):
    closingDateStr = ''
    if (closingDate == ''):
        closingDateStr = f""
    else:
        closingDateStr = f", closingDate = {closingDate}"
    sql_stmt_1 = f"UPDATE DealDB.dbo.deals SET effectiveDate = '{effectiveDate}'{closingDateStr} "
    sql_stmt_2 = f", subSector = '{subSector}', isLiquid = '{isLiquid}' "
    sql_stmt_3 = f"WHERE id = {dealID}"
    #print(f"Subject List SQL = {sql_stmt}")
    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3

