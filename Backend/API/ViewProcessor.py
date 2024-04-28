import os, json
#from datetime import datetime as dt
from API import MSsql as DB

fileStr = f"{__file__.strip(os.getcwd())}"

readCursor, DBconn = DB.connect_to_DB()

def getDealList():
    fnStr = fileStr + "::getDealList"

    dealList = readCursor.execute(DB.getDealListSQL()).fetchall()
    list_of_dicts = [{'id': item[0].rstrip(" "), 
                      'dealName': item[1],
                      'effectiveDate': str(item[2]),
                      'closingDate': str(item[3]),
                      'subSector': item[4],
                      'isLiquid': item[5].rstrip(" ")} for item in dealList]
    json_dealList = json.dumps(list_of_dicts)
    print(json_dealList)

    return {'retVal': True, 'dealList': json_dealList}

def updateDeal(dealID, effectiveDate, closingDate, subSector, isLiquid):
    fnStr = fileStr + "::updateDeal"

    writeCursor, writeDBconn = DB.connect_to_DB()
    sql_stmt = DB.updateDealSQL(dealID, effectiveDate, closingDate, subSector, isLiquid)
    print(sql_stmt)
    writeCursor.execute(sql_stmt)
    DB.commitConnection(writeDBconn)
    DB.closeConnection(writeDBconn)

    return {'retVal': True, 'updatedDeal': dealID}
