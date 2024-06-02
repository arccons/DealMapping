import os, json, datetime
from API import MSsql as DB

fileStr = f"{__file__.strip(os.getcwd())}"

readCursor, DBconn = DB.connect_to_DB()

def getDeals():
    fnStr = fileStr + "::getDeals"

    sql_stmt = DB.getDealsSQL()
    print(sql_stmt)
    dealList = readCursor.execute(sql_stmt).fetchall()
    #print(dealList)
    list_of_dicts = [{'ACDB_Deal_ID': item[0], 
                      'Deal_Name_EntityCode': item[1].rstrip(" "),
                      'Deal_Name': item[2].rstrip(" "),
                      'Closing_Date': str(item[3]),
                      'Modify_Date': str(item[4]),
                      'Subsector': item[5].rstrip(" "),
                      'Strategy': item[6].rstrip(" "),
                      'Liquid_Illiquid': item[7].rstrip(" ")} for item in dealList]
    json_deals = json.dumps(list_of_dicts)
    #print(json_deals)

    return {'retVal': True, 'json_deals': json_deals}

def getSecurities(ACDB_Deal_ID):
    fnStr = fileStr + "::getSecurities"

    sql_stmt = DB.getDealSecuritiesSQL(ACDB_Deal_ID)
    print(sql_stmt)
    securitiesList = readCursor.execute(sql_stmt).fetchall()
    #print(securitiesList)
    list_of_dicts = [{'Security_ID': item[0],
                      'Security_Name': item[1],
                      'Investment_Type': item[2].rstrip(" "),
                      'Currency': item[3].rstrip(" "),
                      'As_Of_Date': str(item[4]),
                      'ACDB_Deal_ID': item[5]} for item in securitiesList]
    json_securities = json.dumps(list_of_dicts)
    #print(json_securities)

    return {'retVal': True, 'json_securities': json_securities}

def getFunds(dealID):
    fnStr = fileStr + "::getFunds"

    sql_stmt = DB.getDealFundsSQL(dealID)
    print(sql_stmt)
    fundlist = readCursor.execute(sql_stmt).fetchall()
    #print(fundlist)
    list_of_dicts = [{'Active_Realized': item[0], 
                      'Deal_Investment_Currency': item[1],
                      'Investment_Blended_FX_Rate': str(item[2]),
                      'ACDB_Deal_ID': item[3],
                      'Fund_Name': item[4].rstrip(" ")} for item in fundlist]
    json_funds = json.dumps(list_of_dicts)
    #print(json_funds)
    return {'retVal': True, 'json_funds': json_funds}

def getFundMapping(ACDB_Deal_ID, Fund_Name):
    fnStr = fileStr + "::getFundMapping"

    sql_stmt = DB.getFundMappingSQL(ACDB_Deal_ID, Fund_Name)
    print(sql_stmt)
    mappingList = readCursor.execute(sql_stmt).fetchall()

    list_of_dicts = [{'ACDB_Deal_ID': item[0],
                      'Deal_Name_EntityCode': item[1].rstrip(" "),
                      'Deal_Name': item[2].rstrip(" "),
                      'Fund_Name': item[3].rstrip(" "),
                      'Active_Realized': item[4]} for item in mappingList]
    json_mapping = json.dumps(list_of_dicts)
    #print(json_mapping)

    return {'retVal': True, 'json_mapping': json_mapping}

def getFundHistory(ACDB_Deal_ID, Fund_Name):
    fnStr = fileStr + "::getFundHistory"

    sql_stmt = DB.getFundHistorySQL(ACDB_Deal_ID, Fund_Name)
    print(sql_stmt)
    historyList = readCursor.execute(sql_stmt).fetchall()
    #print(historyList)
    list_of_dicts = [{'Active_Realized': item[0], 
                      'Deal_Investment_Currency': item[1],
                      'Investment_Blended_FX_Rate': str(item[2]),
                      'As_Of_Date': str(item[3]),
                      'ACDB_Deal_ID': item[4],
                      'Fund_Name': item[5].rstrip(" "),
                      'Realized_PnL': str(item[6]),
                      'Realized_IRR': str(item[7]),
                      'Realized_MOIC': item[8],
                      'Realized_Date': str(item[9]),
                      'Commitment_Local': str(item[10]), 
                      'Commitment_USD': str(item[11]),
                      'Legal_Commitment_Local': str(item[12]),
                      'Legal_Commitment_USD': str(item[13]),
                      'ITD_PM_Adjustment_USD': str(item[14]),
                      'IC_Discretionary_Unfunded_USD': str(item[15]),
                      'DealMapping_Filename': item[16],
                      'Modified': str(item[17]),
                      'Copy_Num': item[18],
                      'Modified_By': item[19]} for item in historyList]
    json_history = json.dumps(list_of_dicts)
    #print(json_history)

    return {'retVal': True, 'json_history': json_history}

def updateDeal(ACDB_Deal_ID, Deal_Name_EntityCode, Deal_Name, Closing_Date, Modify_Date, Subsector, Strategy, Liquid_Illiquid):
    fnStr = fileStr + "::updateDeal"

    writeCursor, writeDBconn = DB.connect_to_DB()
    sql_stmt = DB.updateDealSQL(ACDB_Deal_ID, Deal_Name_EntityCode, Deal_Name, Closing_Date, Modify_Date, Subsector, Strategy, Liquid_Illiquid)
    print(sql_stmt)
    writeCursor.execute(sql_stmt)
    DB.commitConnection(writeDBconn)
    DB.closeConnection(writeDBconn)

    return {'retVal': True, 'updatedDeal': ACDB_Deal_ID}

def updateFund(ACDB_Deal_ID, Fund_Name, Active_Realized, Deal_Investment_Currency, Investment_Blended_FX_Rate):
    fnStr = fileStr + "::updateFund"

    writeCursor, writeDBconn = DB.connect_to_DB()
    sql_stmt = DB.updateFundSQL(ACDB_Deal_ID, Fund_Name, Active_Realized, Deal_Investment_Currency, Investment_Blended_FX_Rate)
    print(sql_stmt)
    writeCursor.execute(sql_stmt)
    DB.commitConnection(writeDBconn)
    DB.closeConnection(writeDBconn)

    return {'retVal': True, 'updatedFund': Fund_Name}

def addMapping(ACDB_Deal_ID, Fund_Name, Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
               Commitment_Local, Commitment_USD, Legal_Commitment_Local, Legal_Commitment_USD, 
               ITD_PM_Adjustment_USD, IC_Discretionary_Unfunded_USD, 
               DealMapping_Filename, Modified, Copy_Num, Modified_By, 
               PIT, range_from, range_to):
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
    #print(sql_stmt)
    existingDateList = readCursor.execute(sql_stmt).fetchall()
    #print(f"existingDateList = {existingDateList}")
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
                        Commitment_Local, Commitment_USD, Legal_Commitment_Local, Legal_Commitment_USD, 
                        ITD_PM_Adjustment_USD, IC_Discretionary_Unfunded_USD, 
                        DealMapping_Filename, Modified, Copy_Num, Modified_By)
            print(sql_stmt)
            writeCursor.execute(sql_stmt)
        for dt in updateMappingsSet:
            sql_stmt = DB.updateMappingSQL(dt, ACDB_Deal_ID, Fund_Name, 
                        Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                        Commitment_Local, Commitment_USD, Legal_Commitment_Local, Legal_Commitment_USD, 
                        ITD_PM_Adjustment_USD, IC_Discretionary_Unfunded_USD, 
                        DealMapping_Filename, Modified, Copy_Num, Modified_By)
            print(sql_stmt)
            writeCursor.execute(sql_stmt)
        DB.commitConnection(writeDBconn)
        DB.closeConnection(writeDBconn)
        return {'retVal': True, 'mappingsAdded': {"ACDB_Deal_ID": ACDB_Deal_ID, "Fund_Name": Fund_Name}}
    except:
        DB.closeConnection(writeDBconn)
        return {'retVal': False, 'errorMessage': f"{fnStr}: Error adding mapping."}
