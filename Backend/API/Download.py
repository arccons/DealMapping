import os, datetime
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
                      'Closing_Date': str(item[7]), 
                      'Is_Deleted': item[8]} for item in dealList]
    #json_deals = json.dumps(list_of_dicts)

    return {'retVal': True, 'deals': list_of_dicts}

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
    #json_securities = json.dumps(list_of_dicts)

    return {'retVal': True, 'securities': list_of_dicts}

def getFunds(ACDB_Deal_ID):
    fnStr = fileStr + "::getFunds"

    sql_stmt = DB.getDealFundsSQL(ACDB_Deal_ID)
    print(sql_stmt)
    fundlist = readCursor.execute(sql_stmt).fetchall()
    list_of_dicts = [{'ACDB_Deal_ID': item[0],
                      'Deal_Name': item[1].rstrip(" "),
                      'Deal_Name_EntityCode': item[2].rstrip(" "),
                      'Fund_Name': item[3].rstrip(" "), 
                      'Deal_Mapping_Currency': item[4],
                      'Realized_Active': item[5],
                      'Realized_Date': str(item[6])} for item in fundlist]
    #json_funds = json.dumps(list_of_dicts)
    return {'retVal': True, 'funds': list_of_dicts}

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
    #json_mapping = json.dumps(list_of_dicts)

    return {'retVal': True, 'mappings': list_of_dicts}

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
    #json_history = json.dumps(list_of_dicts)

    return {'retVal': True, 'history': list_of_dicts}

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
