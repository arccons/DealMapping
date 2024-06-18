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
        return Response({"message": "Deal list received.", "DEALS": retVal['json_deals']})

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
        return Response({"message": "Deal list received.", "SECURITIES": retVal['json_securities']})

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
        return Response({"message": "Mappings list received.", "FUNDS": retVal['json_funds']})

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
        return Response({"message": "Mappings list received.", "HISTORY": retVal['json_history']})

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
        return Response({"message": "Mappings list received.", "MAPPINGS": retVal['json_mapping']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def updateDeal(request):
    fnStr = f"{fileStr}::updateDeal"

    ACDB_Deal_ID = request.data['ACDB_Deal_ID']
    Closing_Date = request.data['Closing_Date']
    Subsector = request.data['Subsector']
    Strategy = request.data['Strategy']
    Liquid_Illiquid = request.data['Liquid_Illiquid']
    retVal = VP.updateDeal(ACDB_Deal_ID, 
                           Closing_Date, 
                           Subsector, 
                           Strategy, 
                           Liquid_Illiquid)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in VP.updateDeal(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal updated.", "UPDATED_DEAL": retVal['updatedDeal']})

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
    Legal_Commitment_Local = request.data['Legal_Commitment_Local']
    PIT = request.data['PIT']
    range_from = request.data['range_from']
    range_to = request.data['range_to']
    retVal = VP.addMapping(ACDB_Deal_ID, Fund_Name, 
                           Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                           Commitment_Local, Legal_Commitment_Local, PIT, range_from, range_to)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in VP.addMapping(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list added.", "MAPPING_ADDED": retVal['mappingsAdded']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def checkDeals(request):
    fnStr = f"{fileStr}::checkDeals"

    parsedFile = request.data['parsedFile']
    print(parsedFile)

    retVal = VP.checkDeals(parsedFile)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in VP.checkDeals(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deals list checked.", "RESULTS": retVal['results'], "RULES": retVal['rules']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def uploadDeals(request):
    fnStr = f"{fileStr}::uploadDeals"

    parsedFile = request.data['parsedFile']
    print(parsedFile)

    retVal = VP.uploadDeals(parsedFile)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in VP.uploadDeals(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deals file uploaded."})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def checkMappings(request):
    fnStr = f"{fileStr}::checkMappings"

    parsedFile = request.data['parsedFile']
    print(parsedFile)

    retVal = VP.checkMappings(parsedFile)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in VP.checkMappings(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list checked.", "RESULTS": retVal['results'], "RULES": retVal['rules']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def uploadMappings(request):
    fnStr = f"{fileStr}::uploadMappings"

    parsedFile = request.data['parsedFile']
    print(parsedFile)

    retVal = VP.uploadMappings(parsedFile)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in VP.uploadMappings(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings file uploaded"})
