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

def getFunds(ACDB_Deal_ID):
    fnStr = fileStr + "::getFunds"

    sql_stmt = DB.getDealFundsSQL(ACDB_Deal_ID)
    print(sql_stmt)
    fundlist = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'ACDB_Deal_ID': item[0],
                      'Fund_Name': item[1].rstrip(" "), 
                      'Deal_Mapping_Currency': item[2],
                      'Realized_Active': item[3],
                      'Realized_Date': str(item[4])} for item in fundlist]
    json_funds = json.dumps(list_of_dicts)
    return {'retVal': True, 'json_funds': json_funds}

# UPDATE FIELDS LIST
def getFundMapping(ACDB_Deal_ID, Fund_Name):
    fnStr = fileStr + "::getFundMapping"

    sql_stmt = DB.getFundMappingSQL(ACDB_Deal_ID, Fund_Name)
    print(sql_stmt)
    mappingList = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'ACDB_Deal_ID': item[0],
                      'Deal_Name': item[1].rstrip(" "),
                      'Deal_Name_EntityCode': item[2].rstrip(" "),
                      'Fund_Name': item[3].rstrip(" "),
                      'Deal_Mapping_Currency': item[4],
                      'Realized_Active': item[5],
                      'Realized_Date': str(item[6])} for item in mappingList]
    json_mapping = json.dumps(list_of_dicts)

    return {'retVal': True, 'json_mapping': json_mapping}

# UPDATE FIELDS LIST
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

# UPDATE FIELDS LIST
def updateDeal(ACDB_Deal_ID, Closing_Date, Subsector, Strategy, Liquid_Illiquid):
    fnStr = fileStr + "::updateDeal"

    writeCursor, writeDBconn = DB.connect_to_DB()
    sql_stmt = DB.updateDealSQL(ACDB_Deal_ID, Closing_Date, Subsector, Strategy, Liquid_Illiquid)
    print(sql_stmt)
    writeCursor.execute(sql_stmt)
    DB.commitConnection(writeDBconn)
    DB.closeConnection(writeDBconn)

    return {'retVal': True, 'updatedDeal': ACDB_Deal_ID}

# UPDATE FIELDS LIST
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
    updateDateSet = mappingDateSet & existingDateSet
    print(f"updateDateSet = {updateDateSet}")
    insertDateSet = mappingDateSet.difference(updateDateSet)
    print(f"insertDateSet = {insertDateSet}")

    if len(insertDateSet) == 0 and len(updateDateSet) == 0:
        return {'retVal': False, 'errorMessage': f"{fnStr}: No valid value specified for As Of Date."}

    writeCursor, writeDBconn = DB.connect_to_DB()
    try:
        for dt in insertDateSet:
            sql_stmt = DB.insertMappingSQL(dt, ACDB_Deal_ID, Fund_Name, 
                        Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                        Commitment_Local, Legal_Commitment_Local)
            print(sql_stmt)
            writeCursor.execute(sql_stmt)
        for dt in updateDateSet:
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

DEAL_RULES = ["Deal Rule I: Deal Code Values", 
              "Deal Rule II: Deal Code to Deal Names", 
              "Deal Rule III: Deal Names to Deal Code"]
DEAL_RESULTS = [[], [], []]

def checkDealCodeValues(Deal_Name_EntityCode):
    sql_stmt = DB.checkDealCodeValuesSQL(Deal_Name_EntityCode)
    dealCodes = readCursor.execute(sql_stmt).fetchall()
    if dealCodes[0][0] > 1:
        return False
    
    return True

def checkDealCode(Deal_Name_EntityCode):
    sql_stmt = DB.checkDealCodeSQL(Deal_Name_EntityCode)
    dealCodes = readCursor.execute(sql_stmt).fetchall()
    if dealCodes[0][0] > 1:
        return False
    
    return True

def checkDealName(Deal_Name):
    sql_stmt = DB.checkDealNameSQL(Deal_Name)
    dealCodes = readCursor.execute(sql_stmt).fetchall()
    if dealCodes[0][0] > 1:
        return False
    
    return True

def checkDeals(parsedFile):
    fnStr = fileStr + "::checkDeals"

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkDealCodeValues(rec)
        if not ruleRetVal:
            DEAL_RESULTS[0].append(index)

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkDealName(rec)
        if not ruleRetVal:
            DEAL_RESULTS[1].append(index)

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkDealCode(rec)
        if not ruleRetVal:
            DEAL_RESULTS[2].append(index)

    results = json.dumps(DEAL_RESULTS)
    print(results)
    rules = json.dumps(DEAL_RULES)
    print(rules)

    return {'retVal': True, 'rules': rules, 'results': results}

def uploadDeals(parsedFile):
    fnStr = fileStr + "::uploadDeals"

    return {'retVal': True, 'uploaded': True}

MAPPING_RULES = ["Mapping Rule I: Deal Funds"]
MAPPING_RESULTS =[[]]

def checkInvestmentValues(record):
    sql_stmt = DB.checkInvestmentValuesSQL(record[0], record[1])
    dealCodes = readCursor.execute(sql_stmt).fetchall()
    if dealCodes[0][0] > 1:
        return False
    
    return True

def checkMappings(parsedFile):
    fnStr = fileStr + "::checkMappings"

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkInvestmentValues(rec)
        if not ruleRetVal:
            MAPPING_RESULTS[0].append(index)

    results = json.dumps(MAPPING_RESULTS)
    print(results)
    rules = json.dumps(MAPPING_RULES)
    print(rules)

    return {'retVal': True, 'rules': rules, 'results': results}

def uploadMappings(parsedFile):
    fnStr = fileStr + "::uploadMappings"

    return {'retVal': True, 'uploaded': True}
