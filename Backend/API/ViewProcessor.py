import os, json
from API import MSsql as DB

fileStr = f"{__file__.strip(os.getcwd())}"

readCursor, DBconn = DB.connect_to_DB()

def getDeals():
    fnStr = fileStr + "::getDeals"

    sql_stmt = DB.getDealsSQL()
    print(sql_stmt)
    dealList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'id': item[0].rstrip(" "), 
                      'dealName': item[1],
                      'effectiveDate': str(item[2]),
                      'closingDate': str(item[3]),
                      'subSector': item[4],
                      'isLiquid': item[5].rstrip(" ")} for item in dealList]
    json_deals = json.dumps(list_of_dicts)
    #print(json_dealList)

    return {'retVal': True, 'json_deals': json_deals}

def getSecurities(dealID):
    fnStr = fileStr + "::getSecurities"

    sql_stmt = DB.getDealSecuritiesSQL(dealID)
    print(sql_stmt)
    securitiesList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'id': item[0].rstrip(" "), 
                      'dealName': item[1],
                      'security_id': item[2],
                      'as_of_date': str(item[3])} for item in securitiesList]
    json_securities = json.dumps(list_of_dicts)

    return {'retVal': True, 'json_securities': json_securities}

def getFunds(dealID):
    fnStr = fileStr + "::getFunds"

    sql_stmt = DB.getDealFundsSQL(dealID)
    print(sql_stmt)
    dealList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'dealName': item[0].rstrip(" "), 
                      'deal_id': item[1].rstrip(" "), 
                      'fund_name': item[2].rstrip(" "),
                      'as_of_date': str(item[3]),
                      'local_cmmt': item[4],
                      'is_active': item[5],
                      'realized_irr': item[6],
                      'realized_pnl': item[7],
                      'realized_date': str(item[8]), 
                      'fund_id': item[9].rstrip(" "),
                      'legal_cmmt': item[10],
                      'ic_pm_adj': item[11],
                      'realized_moic': item[12]} for item in dealList]
    json_funds = json.dumps(list_of_dicts)
    return {'retVal': True, 'json_funds': json_funds}

def getFundHistory(dealID, fund_id, as_of_date):
    fnStr = fileStr + "::getFundHistory"

    sql_stmt = DB.getFundHistorySQL(dealID, fund_id, asOfDate = as_of_date)
    print(sql_stmt)
    historyList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'dealName': item[0].rstrip(" "), 
                      'deal_id': item[1].rstrip(" "), 
                      'fund_name': item[2].rstrip(" "),
                      'as_of_date': str(item[3]),
                      'local_cmmt': item[4],
                      'is_active': item[5],
                      'realized_irr': item[6],
                      'realized_pnl': item[7],
                      'realized_date': str(item[8]), 
                      'fund_id': item[9].rstrip(" ")} for item in historyList]
    json_history = json.dumps(list_of_dicts)

    return {'retVal': True, 'json_history': json_history}

def updateDeal(dealID, effectiveDate, closingDate, subSector, isLiquid):
    fnStr = fileStr + "::updateDeal"

    writeCursor, writeDBconn = DB.connect_to_DB()
    sql_stmt = DB.updateDealSQL(dealID, effectiveDate, closingDate, subSector, isLiquid)
    print(sql_stmt)
    writeCursor.execute(sql_stmt)
    DB.commitConnection(writeDBconn)
    DB.closeConnection(writeDBconn)

    return {'retVal': True, 'updatedDeal': dealID}

def updateFund(dealID, fundName, asOfDate, local_cmmt, is_active, realized_irr, realized_pnl, realized_date):
    fnStr = fileStr + "::updateFund"

    writeCursor, writeDBconn = DB.connect_to_DB()
    sql_stmt = DB.updateFundSQL(dealID, 
                                   fundName, 
                                   asOfDate, 
                                   local_cmmt, 
                                   is_active, 
                                   realized_irr, 
                                   realized_pnl, 
                                   realized_date)
    print(sql_stmt)
    writeCursor.execute(sql_stmt)
    DB.commitConnection(writeDBconn)
    DB.closeConnection(writeDBconn)

    return {'retVal': True, 'updatedMapping': {dealID, fundName, asOfDate}}
