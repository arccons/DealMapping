import os
import pandas
from API import MSsql as DB

fileStr = f"{__file__.strip(os.getcwd())}"

readCursor, DBconn = DB.connect_to_DB()

DEAL_RULES = ["Deal Rule I: File integrity (Deal Codes)", 
              "Deal Rule II: Deal Code Values in DB", 
              "Deal Rule III: Unique Deal Names for Deal Codes in DB", 
              "Deal Rule IV: Unique Deal Codes for Deal Names in DB"]
MAPPING_RULES = ["Mapping Rule I: File integrity (Mappings)", 
                 "Mapping Rule II: Mappings for the day"] + DEAL_RULES

dealFileColumns = ["ACDB_Deal_ID", "Deal_Name_EntityCode", "Deal_Name", "Liquid_Illiquid", "Strategy", "Subsector", "Region", "Closing_Date", "Is_Deleted"]
mappingFileColumns = ["Deal Name", "Deal Code", "Liquid / Illiquid", "Strategy", "Subsector", "DealRegion", "Closing Date", "Prism Link", "DealCloud Link", "ICMemo Link", "Fund Name", "Currency", "Deal Realized / Active", "Realized IRR", "Realized P & L", "Realized Date", "Commitment(Local)", "Legal Commitment", "ITD PM Adjustments(USD)", "IC / Discretionary Unfunded(USD)", "Adjusted Commitment(USD)", "Security_ID", "Security Name", "Investment Type"]

############################### BEGIN RULES ###############################
def checkUnique(uniquePairs, uniqueCodes, uniqueNames):
    # Check FILE
    if uniqueCodes.size != uniquePairs.size or uniqueNames.size != uniquePairs.size:
        return {"retVal": False, "fileFailed": True}

    return {"retVal": True, "fileFailed": None}

def checkDealCodeValues(uniqueCodes):
    for dealCode in pandas.Series(uniqueCodes).array:
        sql_stmt = DB.checkDealCodeValuesSQL(dealCode)
        print(sql_stmt)
        entryCount = readCursor.execute(sql_stmt).fetchall()
        if entryCount[0][0] > 1:
            return {"retVal": False, "failedCode": dealCode}

    return {"retVal": True, "failedCode": None}

def checkDealCode(uniquePairs):
    for pair in pandas.Series(uniquePairs).array:
        sql_stmt = DB.checkDealCodeSQL(pair[0], pair[1])
        print(sql_stmt)
        entryCount = readCursor.execute(sql_stmt).fetchall()
        if entryCount[0][0] > 0:
            return {"retVal": False, "failedPair": pair}

    return {"retVal": True, "failedPair": None}

def checkDealName(uniquePairs):
    for pair in pandas.Series(uniquePairs).array:
        sql_stmt = DB.checkDealNameSQL(pair[1], pair[0])
        print(sql_stmt)
        entryCount = readCursor.execute(sql_stmt).fetchall()
        if entryCount[0][0] > 0:
            return {"retVal": False, "failedPair": pair}

    return {"retVal": True, "failedPair": None}

def checkInvestmentValues(As_Of_Date, uniquePairs_mapping):
    for pair in pandas.Series(uniquePairs_mapping).array:
        sql_stmt = DB.checkInvestmentValuesSQL(As_Of_Date, pair[0], pair[1])
        print(sql_stmt)
        entryCount = readCursor.execute(sql_stmt).fetchall()
        if entryCount[0][0] > 1:
            return {"retVal": False, "failedPair": pair}

    return {"retVal": True, "failedPair": None}
############################### END RULES ###############################

def checkDeals(parsedFile):
    fnStr = fileStr + "::checkDeals"

    fileDF = pandas.DataFrame(parsedFile, columns=dealFileColumns)
    fileDF["Deal_Code_TO_Deal_Name"] = list(zip(fileDF["Deal_Name_EntityCode"], fileDF["Deal_Name"]))
    uniquePairs = pandas.Series(fileDF["Deal_Code_TO_Deal_Name"]).unique()
    uniqueCodes = pandas.Series(fileDF["Deal_Name_EntityCode"]).unique()
    uniqueNames = pandas.Series(fileDF["Deal_Name"]).unique()

    DEAL_RESULTS = [[], [], [], []]

    def getFailedDealRows(failedPair = None, failedCode = None):
        if (failedPair == None and failedCode == None):
            return list(fileDF.index)
        elif (failedPair != None and failedCode == None):
            return list((fileDF.loc[(fileDF['Deal_Name_EntityCode'] == failedPair[0]) & (fileDF['Deal_Name'] == failedPair[1])]).index)
        elif (failedPair == None and failedCode != None):
            return list((fileDF.loc[fileDF['Deal_Name_EntityCode'] == failedCode]).index)
        else:
            return None

    ruleRetVal = checkUnique(uniquePairs, uniqueCodes, uniqueNames)
    if not ruleRetVal['retVal']:
        failedRows = getFailedDealRows()
        DEAL_RESULTS[0] = DEAL_RESULTS[0] + failedRows

    ruleRetVal = checkDealCodeValues(uniqueCodes)
    if not ruleRetVal['retVal']:
        failedRows = getFailedDealRows(failedCode = ruleRetVal['failedCode'])
        DEAL_RESULTS[1] = DEAL_RESULTS[1] + failedRows

    ruleRetVal = checkDealCode(uniquePairs)
    if not ruleRetVal['retVal']:
        failedRows = getFailedDealRows(failedpair = ruleRetVal['failedPair'])
        DEAL_RESULTS[2] = DEAL_RESULTS[2] + failedRows

    ruleRetVal = checkDealName(uniquePairs)
    if not ruleRetVal['retVal']:
        failedRows = getFailedDealRows(failedpair = ruleRetVal['failedPair'])
        DEAL_RESULTS[3] = DEAL_RESULTS[3] + failedRows

    return {'retVal': True, 'rules': DEAL_RULES, 'results': DEAL_RESULTS}

def uploadDeals(As_Of_Date, parsedFile):
    fnStr = fileStr + "::uploadDeals"

    fileDF = pandas.DataFrame(parsedFile, columns=dealFileColumns)
    print(fileDF)

    return {'retVal': True, 'uploaded': True}

def checkMappings(As_Of_Date, parsedFile):
    fnStr = fileStr + "::checkMappings"

    MAPPING_RESULTS = [[], [], [], [], [], []]

    fileDF = pandas.DataFrame(parsedFile, columns=mappingFileColumns)
    fileDF["Deal_Code_TO_Deal_Name"] = list(zip(fileDF["Deal Code"], fileDF["Deal Name"]))
    fileDF["Deal_Code_TO_Fund_Name"] = list(zip(fileDF["Deal Code"], fileDF["Fund Name"]))
    uniquePairs_deal = pandas.Series(fileDF["Deal_Code_TO_Deal_Name"]).unique()
    uniquePairs_mapping = pandas.Series(fileDF["Deal_Code_TO_Fund_Name"]).unique()
    uniqueCodes = pandas.Series(fileDF["Deal Code"]).unique()
    uniqueNames = pandas.Series(fileDF["Deal Name"]).unique()

    def getFailedMappingRows(failedDealPair = None, failedMappingPair = None, failedCode = None):
        if (failedDealPair is None and failedMappingPair is None):
            if failedCode is None:
                return list(fileDF.index)
            else:
                return list((fileDF.loc[fileDF['Deal Code'] == failedCode]).index)
        elif failedDealPair is not None:
            return list((fileDF.loc[(fileDF['Deal Code'] == failedDealPair[0]) & (fileDF['Deal Name'] == failedDealPair[1])]).index)
        elif failedMappingPair is not None:
            return list((fileDF.loc[(fileDF['Deal Code'] == failedMappingPair[0]) & (fileDF['Fund Name'] == failedMappingPair[1])]).index)
        return None

    ruleRetVal = checkUnique(uniquePairs_mapping, uniqueCodes, uniqueNames)
    if not ruleRetVal['retVal']:
        failedRows = getFailedMappingRows()
        print(failedRows)
        MAPPING_RESULTS[0] = MAPPING_RESULTS[0] + failedRows

    ruleRetVal = checkInvestmentValues(As_Of_Date, uniquePairs_mapping)
    if not ruleRetVal['retVal']:
        failedRows = getFailedMappingRows(failedMappingPair = ruleRetVal['failedPair'])
        print(failedRows)
        MAPPING_RESULTS[1] = MAPPING_RESULTS[1] + failedRows
    else:
        failedRows = []
        print(failedRows)

    ruleRetVal = checkUnique(uniquePairs_deal, uniqueCodes, uniqueNames)
    if not ruleRetVal['retVal']:
        failedRows = getFailedMappingRows()
        print(failedRows)
        MAPPING_RESULTS[2] = MAPPING_RESULTS[2] + failedRows

    ruleRetVal = checkDealCodeValues(uniqueCodes = uniqueCodes)
    if not ruleRetVal['retVal']:
        failedRows = getFailedMappingRows(failedCode = ruleRetVal['failedCode'])
        print(failedRows)
        MAPPING_RESULTS[3] = MAPPING_RESULTS[3] + failedRows
    else:
        failedRows = []
        print(failedRows)

    ruleRetVal = checkDealCode(uniquePairs_deal)
    if not ruleRetVal['retVal']:
        failedRows = getFailedMappingRows(failedDealPair = ruleRetVal['failedPair'])
        print(failedRows)
        MAPPING_RESULTS[4] = MAPPING_RESULTS[4] + failedRows
    else:
        failedRows = []
        print(failedRows)

    ruleRetVal = checkDealName(uniquePairs_deal)
    if not ruleRetVal['retVal']:
        failedRows = getFailedMappingRows(failedDealPair = ruleRetVal['failedPair'])
        print(failedRows)
        MAPPING_RESULTS[5] = MAPPING_RESULTS[5] + failedRows
    else:
        failedRows = []
        print(failedRows)

    return {'retVal': True, 'rules': MAPPING_RULES, 'results': MAPPING_RESULTS}

def uploadMappings(parsedFile):
    fnStr = fileStr + "::uploadMappings"

    return {'retVal': True, 'uploaded': True}
