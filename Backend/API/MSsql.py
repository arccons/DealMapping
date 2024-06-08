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
    sql_stmt = f"SELECT * from {DBstr}.active_deals_v ORDER BY Deal_Name"
    return sql_stmt

def getDealSecuritiesSQL(ACDB_Deal_ID):
    sql_stmt = f"SELECT * from {DBstr}.deal_securities_v WHERE ACDB_Deal_ID = {ACDB_Deal_ID} ORDER BY security_id"
    return sql_stmt

def getDealFundsSQL(ACDB_Deal_ID):
    sql_stmt_1 = f"SELECT DISTINCT Active_Realized, Deal_Investment_Currency, Investment_Blended_FX_Rate"
    sql_stmt_2 = f", ACDB_Deal_ID, Fund_Name from {DBstr}.deal_funds_v WHERE ACDB_Deal_ID = {ACDB_Deal_ID}"
    sql_stmt_3 = f" ORDER BY Fund_Name"
    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3

def getFundMappingSQL(ACDB_Deal_ID, Fund_Name):
    sql_stmt_1 = f"SELECT DISTINCT ACDB_Deal_ID, Deal_Name_EntityCode, Deal_Name, Fund_Name, Active_Realized"
    sql_stmt_2 = f" FROM {DBstr}.fund_mappings_v"
    sql_stmt_3 = f" WHERE ACDB_Deal_ID = {ACDB_Deal_ID} and Fund_Name = '{Fund_Name}'"
    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3

def getMappingHistorySQL(ACDB_Deal_ID, Fund_Name):
    sql_stmt_1 = f"SELECT * from {DBstr}.mapping_history_v"
    sql_stmt_2 = f" WHERE ACDB_Deal_ID = {ACDB_Deal_ID} AND Fund_Name = '{Fund_Name}'"
    sql_stmt_3 = f" ORDER BY As_Of_Date"
    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3

def updateDealSQL(ACDB_Deal_ID, Deal_Name_EntityCode, Deal_Name, Closing_Date, Modify_Date, Subsector, Strategy, Liquid_Illiquid):

    Closing_Date_str = f""
    if Closing_Date != '':
        Closing_Date_str = f", Closing_Date = '{Closing_Date}'"
    else:
        Closing_Date_str = f", Closing_Date = NULL"
    Modify_Date_str = f""
    if Modify_Date != '':
        Modify_Date_str = f", Modify_Date = '{Modify_Date}'"
    else:
        Modify_Date_str = f", Modify_Date = NULL"

    sql_stmt_1 = f"UPDATE {DBstr}.Deal SET "
    sql_stmt_2 = f"Subsector = '{Subsector}', Strategy = '{Strategy}'"
    sql_stmt_3 = f"{Modify_Date_str}{Closing_Date_str}"
    sql_stmt_4 = f", Liquid_Illiquid = '{Liquid_Illiquid}'"
    sql_stmt_5 = f" WHERE ACDB_Deal_ID = {ACDB_Deal_ID}"
    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3 + sql_stmt_4 + sql_stmt_5

""" def updateFundSQL(ACDB_Deal_ID, Fund_Name, Active_Realized, Deal_Investment_Currency, Investment_Blended_FX_Rate):

    if Deal_Investment_Currency == 'null':
        Deal_Investment_Currency = ''
    
    sql_stmt_1 = f"UPDATE {DBstr}.fund SET Active_Realized = '{Active_Realized}'"
    sql_stmt_2 = f", Deal_Investment_Currency = '{Deal_Investment_Currency}', Investment_Blended_FX_Rate = {Investment_Blended_FX_Rate}"
    sql_stmt_3 = f" WHERE Fund_Name = '{Fund_Name}'"

    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3
 """
def getMappingAsOfDateSQL(ACDB_Deal_ID, Fund_Name):
    sql_stmt_1 = f"SELECT As_Of_Date from {DBstr}.mapping_history_v"
    sql_stmt_2 = f" WHERE ACDB_Deal_ID = {ACDB_Deal_ID} AND Fund_Name = '{Fund_Name}'"

    return sql_stmt_1 + sql_stmt_2

def insertMappingSQL(As_Of_Date, ACDB_Deal_ID, Fund_Name, 
                     Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                     Commitment_Local, Commitment_USD, Legal_Commitment_Local, Legal_Commitment_USD, 
                     ITD_PM_Adjustment_USD, IC_Discretionary_Unfunded_USD, 
                     DealMapping_Filename, Modified, Copy_Num, Modified_By):
    
    Realized_Date_str = f""
    if Realized_Date != '':
        Realized_Date_str = f", '{Realized_Date}'"
    else:
        Realized_Date_str = f", NULL"

    sql_stmt_1 = f"INSERT INTO {DBstr}.deal_investment_fact VALUES ("
    sql_stmt_2 = f"'{As_Of_Date}', {ACDB_Deal_ID}, '{Fund_Name}'"
    sql_stmt_3 = f", {Realized_PnL}, {Realized_IRR}, {Realized_MOIC}{Realized_Date_str}"
    sql_stmt_4 = f", {Commitment_Local}, {Commitment_USD}, {Legal_Commitment_Local}, {Legal_Commitment_USD}"
    sql_stmt_5 = f", {ITD_PM_Adjustment_USD}, {IC_Discretionary_Unfunded_USD}"
    sql_stmt_6 = f", '{DealMapping_Filename}', '{Modified}', {Copy_Num}, '{Modified_By}')"

    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3 + sql_stmt_4 + sql_stmt_5 + sql_stmt_6

def updateMappingSQL(As_Of_Date, ACDB_Deal_ID, Fund_Name, 
                     Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                     Commitment_Local, Commitment_USD, Legal_Commitment_Local, Legal_Commitment_USD, 
                     ITD_PM_Adjustment_USD, IC_Discretionary_Unfunded_USD, 
                     DealMapping_Filename, Modified, Copy_Num, Modified_By):

    Realized_Date_str = f""
    if Realized_Date != '':
        Realized_Date_str = f", Realized_Date = '{Realized_Date}'"
    else:
        Realized_Date_str = f", Realized_Date = NULL"

    sql_stmt_1 = f"UPDATE {DBstr}.deal_investment_fact SET"
    sql_stmt_2 = f" As_Of_Date = '{As_Of_Date}', ACDB_Deal_ID = {ACDB_Deal_ID}, Fund_Name = '{Fund_Name}'"
    sql_stmt_3 = f", Realized_PnL = {Realized_PnL}, Realized_IRR = {Realized_IRR}, Realized_MOIC = {Realized_MOIC}{Realized_Date_str}"
    sql_stmt_4 = f", Commitment_Local = {Commitment_Local}, Commitment_USD = {Commitment_USD}"
    sql_stmt_5 = f", Legal_Commitment_Local = {Legal_Commitment_Local}, Legal_Commitment_USD = {Legal_Commitment_USD}"
    sql_stmt_6 = f", ITD_PM_Adjustment_USD = {ITD_PM_Adjustment_USD}, IC_Discretionary_Unfunded_USD = {IC_Discretionary_Unfunded_USD}"
    sql_stmt_7 = f", DealMapping_Filename = '{DealMapping_Filename}', Modified = '{Modified}', Copy_Num = {Copy_Num}, Modified_By = '{Modified_By}'"
    sql_stmt_8 = f" WHERE As_Of_Date = '{As_Of_Date}' AND ACDB_Deal_ID = {ACDB_Deal_ID} AND Fund_Name = '{Fund_Name}'"

    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3 + sql_stmt_4 + sql_stmt_5 + sql_stmt_6 + sql_stmt_7 + sql_stmt_8
