import os, json, datetime
from API import MSsql as DB

fileStr = f"{__file__.strip(os.getcwd())}"

readCursor, DBconn = DB.connect_to_DB()

def getDeals():
    fnStr = fileStr + "::getDeals"

    sql_stmt = DB.getDealsSQL()
    print(sql_stmt)
    dealList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'ACDB_Deal_ID': item[0], 
                      'Deal_Name_EntityCode': item[1].rstrip(" "),
                      'Deal_Name': item[2].rstrip(" "),
                      'Liquid_Illiquid': item[3].rstrip(" "),
                      'Strategy': item[4],
                      'Subsector': item[5],
                      'Region': item[6],
                      'Closing_Date': str(item[7])} for item in dealList]
    json_deals = json.dumps(list_of_dicts)

    return {'retVal': True, 'json_deals': json_deals}

def getSecurities(ACDB_Deal_ID):
    fnStr = fileStr + "::getSecurities"

    sql_stmt = DB.getDealSecuritiesSQL(ACDB_Deal_ID)
    print(sql_stmt)
    securitiesList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'As_Of_Date': str(item[0]),
                      'ACDB_Deal_ID': item[1],
                      'Security_ID': item[2],
                      'Investment_Type_Override': item[3],
                      'Security_Name': item[4],
                      'Investment_Type': item[5].rstrip(" "),
                      'Currency': item[6].rstrip(" ")} for item in securitiesList]
    json_securities = json.dumps(list_of_dicts)

    return {'retVal': True, 'json_securities': json_securities}

def getFunds(dealID):
    fnStr = fileStr + "::getFunds"

    sql_stmt = DB.getDealFundsSQL(dealID)
    print(sql_stmt)
    fundlist = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'ACDB_Deal_ID': item[0],
                      'Fund_Name': item[1].rstrip(" "), 
                      'Realized_Active': item[2], 
                      'Deal_Mapping_Currency': item[3]} for item in fundlist]
    json_funds = json.dumps(list_of_dicts)
    return {'retVal': True, 'json_funds': json_funds}

def getFundMapping(ACDB_Deal_ID, Fund_Name):
    fnStr = fileStr + "::getFundMapping"

    sql_stmt = DB.getFundMappingSQL(ACDB_Deal_ID, Fund_Name)
    print(sql_stmt)
    mappingList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'Fund_Name': item[0].rstrip(" "),
                      'Deal_Mapping_Currency': item[1],
                      'Realized_Active': item[2],
                      'Realized_Date': str(item[3]),
                      'Deal_Name': item[4].rstrip(" "),
                      'Deal_Name_EntityCode': item[5].rstrip(" "),
                      'ACDB_Deal_ID': item[6]} for item in mappingList]
    json_mapping = json.dumps(list_of_dicts)

    return {'retVal': True, 'json_mapping': json_mapping}

def getMappingHistory(ACDB_Deal_ID, Fund_Name):
    fnStr = fileStr + "::getMappingHistory"

    sql_stmt = DB.getMappingHistorySQL(ACDB_Deal_ID, Fund_Name)
    print(sql_stmt)
    historyList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'As_Of_Date': str(item[0]),
                      'ACDB_Deal_ID': item[1],
                      'Fund_Name': item[2].rstrip(" "), 
                      'Deal_Mapping_Currency': item[3],
                      'Active_Realized': item[4],
                      'Realized_IRR': str(item[5]),
                      'Realized_MOIC': str(item[6]),
                      'Realized_PnL': str(item[7]),
                      'Realized_Date': str(item[8]),
                      'Blended_FX_Rate': str(item[9]),
                      'Commitment_Local': str(item[10]), 
                      'Legal_Commitment_Local': str(item[11])} for item in historyList]
    json_history = json.dumps(list_of_dicts)

    return {'retVal': True, 'json_history': json_history}

def updateDeal(ACDB_Deal_ID, Deal_Name_EntityCode, Deal_Name, Closing_Date, Subsector, Strategy, Liquid_Illiquid):
    fnStr = fileStr + "::updateDeal"

    writeCursor, writeDBconn = DB.connect_to_DB()
    sql_stmt = DB.updateDealSQL(ACDB_Deal_ID, Closing_Date, Subsector, Strategy, Liquid_Illiquid)
    print(sql_stmt)
    writeCursor.execute(sql_stmt)
    DB.commitConnection(writeDBconn)
    DB.closeConnection(writeDBconn)

    return {'retVal': True, 'updatedDeal': ACDB_Deal_ID}

def addMapping(ACDB_Deal_ID, Fund_Name, Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
               Commitment_Local, Legal_Commitment_Local, PIT, range_from, range_to):
    fnStr = fileStr + "::addMapping"

    mappingDateSet = set()
    if (PIT != ''):
        mappingDateSet.add(datetime.datetime.strptime(PIT, '%Y-%m-%d').date())
    else:
        if (range_from != '' and range_to != ''):
            date_from = datetime.datetime.strptime(range_from, '%Y-%m-%d').date()
            date_to = datetime.datetime.strptime(range_to, '%Y-%m-%d').date()
            delta = datetime.timedelta(days=1)
            while (date_from <= date_to):
                if date_from.weekday() < 5:
                    mappingDateSet.add(date_from)
                date_from += delta
    print(f"mappingDateSet = {mappingDateSet}")
    sql_stmt = DB.getMappingAsOfDateSQL(ACDB_Deal_ID, Fund_Name)
    existingDateList = readCursor.execute(sql_stmt).fetchall()
    existingDateSet = set()
    for dt in existingDateList:
        existingDateSet.add(dt[0])
    print(f"existingDateSet = {existingDateSet}")
    updateMappingsSet = mappingDateSet & existingDateSet
    print(f"updateMappingsSet = {updateMappingsSet}")
    insertMappingsSet = mappingDateSet.difference(updateMappingsSet)
    print(f"insertMappingsSet = {insertMappingsSet}")

    if len(insertMappingsSet) == 0 and len(updateMappingsSet) == 0:
        return {'retVal': False, 'errorMessage': f"{fnStr}: No valid value specified for As Of Date."}

    writeCursor, writeDBconn = DB.connect_to_DB()
    try:
        for dt in insertMappingsSet:
            sql_stmt = DB.insertMappingSQL(dt, ACDB_Deal_ID, Fund_Name, 
                        Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                        Commitment_Local, Legal_Commitment_Local)
            print(sql_stmt)
            writeCursor.execute(sql_stmt)
        for dt in updateMappingsSet:
            sql_stmt = DB.updateMappingSQL(dt, ACDB_Deal_ID, Fund_Name, 
                        Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                        Commitment_Local, Legal_Commitment_Local)
            print(sql_stmt)
            writeCursor.execute(sql_stmt)
        DB.commitConnection(writeDBconn)
        DB.closeConnection(writeDBconn)
        return {'retVal': True, 'mappingsAdded': {"ACDB_Deal_ID": ACDB_Deal_ID, "Fund_Name": Fund_Name}}
    except:
        DB.closeConnection(writeDBconn)
        return {'retVal': False, 'errorMessage': f"{fnStr}: Error adding mapping."}

RULES = [
    "Rule I: Deal Code Values",
    "Rule II: Deal Funds",
    "Rule III: Deal Code to Deal Names",
    "Rule IV: Deal Names to Deal Code",
    "Rule V: Just for fun"]

#RESULTS = [[1,2,3], [], [0,2,3], [], [0,1,2]]
RESULTS = [[], [], [], [], []]

def checkDeals(parsedFile):
    fnStr = fileStr + "::checkDeals"

    results = json.dumps(RESULTS)
    print(results)
    rules = json.dumps(RULES)
    print(rules)

    return {'retVal': True, 'rules': rules, 'results': results}

def uploadMappings(parsedFile):
    fnStr = fileStr + "::uploadMappings"

    return {'retVal': True, 'uploaded': True}

def reports(report_type):
    fnStr = fileStr + "::reports"

    return {'retVal': True, 'report': True}
