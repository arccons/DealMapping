import os
#import pandas
from API import MSsql as DB

fileStr = f"{__file__.strip(os.getcwd())}"

readCursor, DBconn = DB.connect_to_DB()

DEAL_RULES = ["Deal Rule I: Deal Code Values", 
              "Deal Rule II: Deal Code to Deal Names", 
              "Deal Rule III: Deal Names to Deal Code"]

def checkDealCodeValues(Deal_Name_EntityCode):
    sql_stmt = DB.checkDealCodeValuesSQL(Deal_Name_EntityCode)
    #print(sql_stmt)
    entryCount = readCursor.execute(sql_stmt).fetchall()
    if entryCount[0][0] > 1:
        return False
    
    return True

def checkDealCode(Deal_Name_EntityCode, Deal_Name):
    sql_stmt = DB.checkDealCodeSQL(Deal_Name_EntityCode, Deal_Name)
    #print(sql_stmt)
    entryCount = readCursor.execute(sql_stmt).fetchall()
    if entryCount[0][0] > 0:
        return False
    
    return True

def checkDealName(Deal_Name, Deal_Name_EntityCode):
    sql_stmt = DB.checkDealNameSQL(Deal_Name, Deal_Name_EntityCode)
    #print(sql_stmt)
    entryCount = readCursor.execute(sql_stmt).fetchall()
    if entryCount[0][0] > 0:
        return False
    
    return True

def checkDeals(parsedFile):
    fnStr = fileStr + "::checkDeals"

    #fileColumns = ["ACDB_Deal_ID", "Deal_Name_EntityCode", "Deal_Name", "Liquid_Illiquid", "Strategy", "Subsector", "Region", "Closing_Date", "Is_Deleted"]
    #fileDF = pandas.DataFrame(parsedFile, columns=fileColumns)
    #print(fileDF)

    DEAL_RESULTS = [[], [], []]

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkDealCodeValues(rec[1])
        if not ruleRetVal:
            DEAL_RESULTS[0].append(index)

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkDealCode(rec[1], rec[2])
        if not ruleRetVal:
            DEAL_RESULTS[2].append(index)

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkDealName(rec[2], rec[1])
        if not ruleRetVal:
            DEAL_RESULTS[1].append(index)

    return {'retVal': True, 'rules': DEAL_RULES, 'results': DEAL_RESULTS}

def uploadDeals(parsedFile):
    fnStr = fileStr + "::uploadDeals"

    return {'retVal': True, 'uploaded': True}

MAPPING_RULES = DEAL_RULES + ["Mapping Rule I: Deal Funds"]

def checkInvestmentValues(As_Of_Date, Deal_Name_EntityCode, Fund_Name):
    sql_stmt = DB.checkInvestmentValuesSQL(As_Of_Date, Deal_Name_EntityCode, Fund_Name)
    print(sql_stmt)
    entryCount = readCursor.execute(sql_stmt).fetchall()
    print(entryCount)
    if entryCount[0][0] > 1:
        return False

    return True

def checkMappings(parsedFile, As_Of_Date):
    fnStr = fileStr + "::checkMappings"

    MAPPING_RESULTS = [[], [], [], []]

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkDealCodeValues(rec[1])
        if not ruleRetVal:
            MAPPING_RESULTS[0].append(index)

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkDealName(rec[0], rec[1])
        if not ruleRetVal:
            MAPPING_RESULTS[1].append(index)

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkDealCode(rec[1], rec[0])
        if not ruleRetVal:
            MAPPING_RESULTS[2].append(index)

    for index, rec in enumerate(parsedFile):
        ruleRetVal = checkInvestmentValues(As_Of_Date, rec[1], rec[10])
        if not ruleRetVal:
            MAPPING_RESULTS[3].append(index)

    return {'retVal': True, 'rules': MAPPING_RULES, 'results': MAPPING_RESULTS}

def uploadMappings(parsedFile):
    fnStr = fileStr + "::uploadMappings"

    return {'retVal': True, 'uploaded': True}
