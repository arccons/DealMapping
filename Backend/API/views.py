import os, json
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from API import Download, Upload

fileStr = f"{__file__.strip(os.getcwd())}"

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def deals(request):
    fnStr = f"{fileStr}::deals"

    retVal = Download.getDeals()
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in Download.getDeals(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "DEALS": json.dumps(retVal['deals'])})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def dealSecurities(request, ACDB_Deal_ID):
    fnStr = f"{fileStr}::dealSecurities"

    retVal = Download.getSecurities(ACDB_Deal_ID)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in Download.getSecurities(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "SECURITIES": json.dumps(retVal['securities'])})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def dealFunds(request, ACDB_Deal_ID):
    fnStr = f"{fileStr}::dealFunds"

    retVal = Download.getFunds(ACDB_Deal_ID)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in Download.getFunds(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "FUNDS": json.dumps(retVal['funds'])})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def mappingHistory(request, ACDB_Deal_ID, Fund_Name):
    fnStr = f"{fileStr}::mappingHistory"

    retVal = Download.getMappingHistory(ACDB_Deal_ID, Fund_Name)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in Download.getFundHistory(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "HISTORY": json.dumps(retVal['history'])})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def fundMapping(request, ACDB_Deal_ID, Fund_Name):
    fnStr = f"{fileStr}::fundMapping"

    retVal = Download.getFundMapping(ACDB_Deal_ID, Fund_Name)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in Download.getFundMapping(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "MAPPINGS": json.dumps(retVal['mappings'])})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def updateDeal(request):
    fnStr = f"{fileStr}::updateDeal"

    ACDB_Deal_ID = request.data['ACDB_Deal_ID']
    Closing_Date = request.data['Closing_Date']
    Subsector = request.data['Subsector']
    Strategy = request.data['Strategy']
    Liquid_Illiquid = request.data['Liquid_Illiquid']
    retVal = Download.updateDeal(ACDB_Deal_ID, 
                           Closing_Date, 
                           Subsector, 
                           Strategy, 
                           Liquid_Illiquid)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"errorMessage": f"Error in Download.updateDeal(): {retVal['errorMessage']}"})
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
    retVal = Download.addMapping(ACDB_Deal_ID, Fund_Name, 
                           Realized_PnL, Realized_IRR, Realized_MOIC, Realized_Date, 
                           Commitment_Local, Legal_Commitment_Local, PIT, range_from, range_to)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in Download.addMapping(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list added.", "MAPPINGS_ADDED": retVal['mappingsAdded']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def checkDeals(request):
    fnStr = f"{fileStr}::checkDeals"

    parsedFile = json.loads(request.data['parsedFile'])

    retVal = Upload.checkDeals(parsedFile)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in Upload.checkDeals(): {retVal['errorMessage']}"})
    else:
        #print(retVal['rules'])
        #print(retVal['results'])
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deals list checked.", "RESULTS": json.dumps(retVal['results']), "RULES": json.dumps(retVal['rules'])})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def uploadDeals(request):
    fnStr = f"{fileStr}::uploadDeals"

    parsedFile = json.loads(request.data['parsedFile'])

    retVal = Upload.uploadDeals(parsedFile)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in Upload.uploadDeals(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deals file uploaded."})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def checkMappings(request):
    fnStr = f"{fileStr}::checkMappings"

    parsedFile = json.loads(request.data['parsedFile'])
    As_Of_Date = request.data['applicableDate']

    retVal = Upload.checkMappings(parsedFile, As_Of_Date)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in Upload.checkMappings(): {retVal['errorMessage']}"})
    else:
        #print(retVal['rules'])
        #print(retVal['results'])
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list checked.", "RESULTS": json.dumps(retVal['results']), "RULES": json.dumps(retVal['rules'])})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def uploadMappings(request):
    fnStr = f"{fileStr}::uploadMappings"

    parsedFile = json.loads(request.data['parsedFile'])

    retVal = Upload.uploadMappings(parsedFile)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": f"Error in Upload.uploadMappings(): {retVal['errorMessage']}"})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings file uploaded"})
