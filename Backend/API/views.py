import os
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from API import ViewProcessor as VP

fileStr = f"{__file__.strip(os.getcwd())}"

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def deals(request):
    fnStr = f"{fileStr}::deals"

    retVal = VP.getDeals()
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in VP.getDeals(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "DEAL_LIST": retVal['json_deals']})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def dealSecurities(request, ACDB_Deal_ID):
    fnStr = f"{fileStr}::dealSecurities"

    retVal = VP.getSecurities(ACDB_Deal_ID)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in VP.getSecurities(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "SECURITIES_LIST": retVal['json_securities']})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def dealFunds(request, ACDB_Deal_ID):
    fnStr = f"{fileStr}::dealFunds"

    retVal = VP.getFunds(ACDB_Deal_ID)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in VP.getFunds(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "FUNDS_LIST": retVal['json_funds']})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def mappingHistory(request, ACDB_Deal_ID, Fund_Name):
    fnStr = f"{fileStr}::mappingHistory"

    retVal = VP.getMappingHistory(ACDB_Deal_ID, Fund_Name)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in VP.getFundHistory(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "HISTORY_LIST": retVal['json_history']})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def fundMapping(request, ACDB_Deal_ID, Fund_Name):
    fnStr = f"{fileStr}::fundMapping"

    retVal = VP.getFundMapping(ACDB_Deal_ID, Fund_Name)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in VP.getFundMapping(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "MAPPING": retVal['json_mapping']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def updateDeal(request):
    fnStr = f"{fileStr}::updateDeal"

    ACDB_Deal_ID = request.data['ACDB_Deal_ID']
    Deal_Name_EntityCode = request.data['Deal_Name_EntityCode']
    Deal_Name = request.data['Deal_Name']
    Closing_Date = request.data['Closing_Date']
    Modify_Date = request.data['Modify_Date']
    Subsector = request.data['Subsector']
    Strategy = request.data['Strategy']
    Liquid_Illiquid = request.data['Liquid_Illiquid']
    retVal = VP.updateDeal(ACDB_Deal_ID, 
                           Deal_Name_EntityCode, 
                           Deal_Name, 
                           Closing_Date, 
                           Modify_Date, 
                           Subsector, 
                           Strategy, 
                           Liquid_Illiquid)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in VP.updateDeal(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal updated.", "updatedDeal": retVal['updatedDeal']})

""" @api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def updateFund(request):
    fnStr = f"{fileStr}::updateFund"

    ACDB_Deal_ID = request.data['ACDB_Deal_ID']
    Fund_Name = request.data['Fund_Name']
    Active_Realized = request.data['Active_Realized']
    Deal_Investment_Currency = request.data['Deal_Investment_Currency']
    Investment_Blended_FX_Rate = request.data['Investment_Blended_FX_Rate']
    retVal = VP.updateFund(ACDB_Deal_ID, 
                           Fund_Name, 
                           Active_Realized, 
                           Deal_Investment_Currency, 
                           Investment_Blended_FX_Rate)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in VP.updateFund(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Fund updated.", "updatedFund": retVal['updatedFund']}) """

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def addMapping(request):
    fnStr = f"{fileStr}::addMapping"

    ACDB_Deal_ID = request.data['ACDB_Deal_ID']
    Fund_Name = request.data['Fund_Name']
    Realized_PnL = request.data['Realized_PnL']
    Realized_IRR = request.data['Realized_IRR']
    Realized_MOIC = request.data['Realized_MOIC']
    Realized_Date = request.data['Realized_Date']
    Commitment_Local = request.data['Commitment_Local']
    Commitment_USD = request.data['Commitment_USD']
    Legal_Commitment_Local = request.data['Legal_Commitment_Local']
    Legal_Commitment_USD = request.data['Legal_Commitment_USD']
    ITD_PM_Adjustment_USD = request.data['ITD_PM_Adjustment_USD']
    IC_Discretionary_Unfunded_USD = request.data['IC_Discretionary_Unfunded_USD']
    DealMapping_Filename = request.data['DealMapping_Filename']
    Modified = request.data['Modified']
    Copy_Num = request.data['Copy_Num']
    Modified_By = request.data['Modified_By']
    PIT = request.data['PIT']
    range_from = request.data['range_from']
    range_to = request.data['range_to']
    retVal = VP.addMapping(ACDB_Deal_ID, Fund_Name, Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                     Commitment_Local, Commitment_USD, Legal_Commitment_Local, Legal_Commitment_USD, 
                     ITD_PM_Adjustment_USD, IC_Discretionary_Unfunded_USD, 
                     DealMapping_Filename, Modified, Copy_Num, Modified_By, 
                     PIT, range_from, range_to)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in VP.addMapping(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list added.", "mappingsAdded": retVal['mappingsAdded']})
