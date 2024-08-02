import os
import pyodbc

DBstr = f"{os.getenv('MSSQL_DATABASE')}.{os.getenv('MSSQL_DB_SCHEMA')}"

def connect_to_DB():
    DBconn = pyodbc.connect(
        driver=os.getenv('MSSQL_DB_DRIVER'), 
        server=os.getenv('MSSQL_DB_HOST'), 
        database=os.getenv('MSSQL_DATABASE'), 
        trusted_connection=os.getenv('MSSQL_TRUSTED_CONNECTION'))
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
    sql_stmt = f"SELECT * from {DBstr}.deal_funds_v WHERE ACDB_Deal_ID = {ACDB_Deal_ID} ORDER BY Fund_Name"
    return sql_stmt

def getMappingHistorySQL(ACDB_Deal_ID, Fund_Name):
    sql_stmt_1 = f"SELECT * from {DBstr}.mapping_history_v"
    sql_stmt_2 = f" WHERE ACDB_Deal_ID = {ACDB_Deal_ID} AND Fund_Name = '{Fund_Name}' ORDER BY As_Of_Date"
    return sql_stmt_1 + sql_stmt_2

def updateDealSQL(ACDB_Deal_ID, Closing_Date, Subsector, Strategy, Liquid_Illiquid):
    Closing_Date_str = f""
    if Closing_Date != '':
        Closing_Date_str = f"Closing_Date = '{Closing_Date}'"
    else:
        Closing_Date_str = f"Closing_Date = ''"

    sql_stmt_1 = f"UPDATE {DBstr}.Deal SET Subsector = '{Subsector}', Strategy = '{Strategy}', {Closing_Date_str}"
    sql_stmt_2 = f", Liquid_Illiquid = '{Liquid_Illiquid}' WHERE ACDB_Deal_ID = {ACDB_Deal_ID}"
    return sql_stmt_1 + sql_stmt_2

def getMappingAsOfDateSQL(ACDB_Deal_ID, Fund_Name):
    sql_stmt_1 = f"SELECT As_Of_Date from {DBstr}.mapping_history_v"
    sql_stmt_2 = f" WHERE ACDB_Deal_ID = {ACDB_Deal_ID} AND Fund_Name = '{Fund_Name}'"
    return sql_stmt_1 + sql_stmt_2

def insertMappingSQL(As_Of_Date, ACDB_Deal_ID, Fund_Name, Deal_Mapping_Currency, Realized_Active,
                     Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                     Commitment_Local, Legal_Commitment_Local):
    Realized_Date_str = f""
    if Realized_Date != '':
        Realized_Date_str = f"'{Realized_Date}'"

    sql_stmt_1 = f" '{As_Of_Date}', {ACDB_Deal_ID}, '{Fund_Name}', '{Deal_Mapping_Currency}', '{Realized_Active}'"
    sql_stmt_2 = f", {Realized_IRR}, {Realized_MOIC}, {Realized_PnL}, {Realized_Date_str}, 1.0"
    sql_stmt_3 = f", {Commitment_Local}, {Legal_Commitment_Local}"
    sql_stmt = f"INSERT INTO {DBstr}.deal_investment_fact VALUES ({sql_stmt_1}{sql_stmt_2}{sql_stmt_3})"
    return sql_stmt

def updateMappingSQL(As_Of_Date, ACDB_Deal_ID, Fund_Name, 
                     Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                     Commitment_Local, Legal_Commitment_Local):
    Realized_Date_str = f""
    if Realized_Date != '':
        Realized_Date_str = f", Realized_Date = '{Realized_Date}'"
    else:
        Realized_Date_str = f", Realized_Date = ''"

    sql_stmt_1 = f"UPDATE {DBstr}.deal_investment_fact SET"
    sql_stmt_2 = f" As_Of_Date = '{As_Of_Date}', ACDB_Deal_ID = {ACDB_Deal_ID}, Fund_Name = '{Fund_Name}'"
    sql_stmt_3 = f", Realized_PnL = {Realized_PnL}, Realized_IRR = {Realized_IRR}, Realized_MOIC = {Realized_MOIC}{Realized_Date_str}"
    sql_stmt_4 = f", Commitment_Local = {Commitment_Local}, Legal_Commitment_Local = {Legal_Commitment_Local}"
    sql_stmt_5 = f" WHERE As_Of_Date = '{As_Of_Date}' AND ACDB_Deal_ID = {ACDB_Deal_ID} AND Fund_Name = '{Fund_Name}'"
    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3 + sql_stmt_4 + sql_stmt_5

def checkDealCodeValuesSQL(Deal_Name_EntityCode):
    sql_stmt_1 = f"SELECT COUNT(DISTINCT Deal_Name) FROM {DBstr}.deal WHERE Deal_Name_EntityCode = '{Deal_Name_EntityCode}'"
    return sql_stmt_1

def checkDealCodeCountSQL(Deal_Name, Deal_Name_EntityCode):
    sql_stmt_1 = f"SELECT COUNT(*) FROM {DBstr}.deal"
    sql_stmt_2 = f" WHERE Deal_Name = '{Deal_Name}' AND Deal_Name_EntityCode <> '{Deal_Name_EntityCode}'"
    return sql_stmt_1 + sql_stmt_2

def getDealCodesSQL(Deal_Name):
    sql_stmt_1 = f"SELECT DISTINCT Deal_Name_EntityCode FROM {DBstr}.deal WHERE Deal_Name = '{Deal_Name}'"
    return sql_stmt_1

def checkDealNameCountSQL(Deal_Name_EntityCode, Deal_Name):
    sql_stmt_1 = f"SELECT COUNT(*) FROM {DBstr}.deal"
    sql_stmt_2 = f" WHERE Deal_Name_EntityCode = '{Deal_Name_EntityCode}' AND Deal_Name <> '{Deal_Name}'"
    return sql_stmt_1 + sql_stmt_2

def getDealNamesSQL(Deal_Name_EntityCode):
    sql_stmt_1 = f"SELECT DISTINCT Deal_Name FROM {DBstr}.deal WHERE Deal_Name_EntityCode = '{Deal_Name_EntityCode}'"
    return sql_stmt_1

def checkInvestmentValuesSQL(As_Of_Date, Deal_Name_EntityCode, Fund_Name):
    sql_stmt_1 = f"SELECT COUNT(DISTINCT As_Of_Date) FROM {DBstr}.mapping_history_v"
    sql_stmt_2 = f" WHERE Deal_Name_EntityCode = '{Deal_Name_EntityCode}'"
    sql_stmt_3 = f" AND Fund_Name = '{Fund_Name}'"
    sql_stmt_4 = f" AND As_Of_Date = '{As_Of_Date}'"
    return sql_stmt_1 + sql_stmt_2 + sql_stmt_3 + sql_stmt_4
