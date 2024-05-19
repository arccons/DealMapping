import os
import pyodbc

DBstr = f"{os.getenv('MSSQL_DATABASE')}.dbo"

def connect_to_DB():
    DBconn = pyodbc.connect(driver=os.getenv('MSSQL_DB_DRIVER'), server=os.getenv('MSSQL_DB_HOST'), database=os.getenv('MSSQL_DATABASE'), trusted_connection=os.getenv('MSSQL_TRUSTED_CONNECTION'))
    cursor = DBconn.cursor()
    return cursor, DBconn

def closeConnection(DBconn):
    DBconn.close()

def commitConnection(DBconn):
    DBconn.commit()

def getDealsSQL():
    sql_stmt = f"SELECT * from {DBstr}.funded_deals_v ORDER BY dealName"
    return sql_stmt

def getDealSecuritiesSQL(dealID):
    sql_stmt = f"SELECT * from {DBstr}.deal_securities_v WHERE id = {dealID} ORDER BY security_id"
    return sql_stmt

def getDealFundsSQL(dealID):
    sql_stmt_1 = f"SELECT * from {DBstr}.deal_funds_v WHERE deal_id = {dealID}"
    sql_stmt_2 = f" ORDER BY dealName, fund_name, as_of_date"
    return sql_stmt_1 + sql_stmt_2

def getFundHistorySQL(dealID, fund_id, asOfDate):
    sql_stmt_1 = f"SELECT * from {DBstr}.fund_history_v"
    sql_stmt_2 = f" WHERE deal_id = {dealID} AND fund_id = {fund_id}" # AND as_of_date = {asOfDate}"
    sql_stmt_3 = f" ORDER BY fund_name, as_of_date"
    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3

def updateDealSQL(dealID, effectiveDate, closingDate, subSector, isLiquid):
    closingDateStr = ""
    if (closingDate == 'null' or closingDate == ''):
        closingDateStr = f", closingDate = null"
    else:
        closingDateStr = f", closingDate = '{closingDate}'"
    sql_stmt_1 = f"UPDATE {DBstr}.Deal SET effectiveDate = '{effectiveDate}'{closingDateStr}"
    sql_stmt_2 = f", subSector = '{subSector}', isLiquid = '{isLiquid}' "
    sql_stmt_3 = f"WHERE id = {dealID}"
    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3

def updateFundSQL(dealID, fundName, asOfDate, local_cmmt, is_active, realized_irr, realized_pnl, realized_date):
    if (local_cmmt == "" 
        and is_active == "" 
        and realized_irr == "" 
        and realized_pnl == "" 
        and realized_date == ""):
        return ""
    local_cmmt_str = ""
    if (local_cmmt != ""):
        local_cmmt_str = f"local_cmmt = '{local_cmmt}'"
    is_active_str = ""
    if (is_active != ""):
        is_active_str = f", is_active = '{is_active}'"
    realized_irr_str = ""
    if (realized_irr != ""):
        realized_irr_str = f", realized_irr = '{realized_irr}'"
    realized_pnl_str = ""
    if (realized_pnl != ""):
        realized_pnl_str = f", realized_pnl = '{realized_pnl}'"
    realized_date_str = ""
    if (realized_date != ""):
        realized_date_str = f", realized_date = '{realized_date}'"
    # NEED FIX FOR INITIAL COMMA WHEN local_cmmt_str IS BLANK
    sql_stmt_1 = f"UPDATE {DBstr}.DealFund SET {local_cmmt_str}{is_active_str}{realized_irr_str}{realized_pnl_str}{realized_date_str}"
    sql_stmt_2 = f" WHERE deal_id = {dealID} AND fund_name = '{fundName}' AND as_of_date = '{asOfDate}'"
    return sql_stmt_1 + sql_stmt_2
