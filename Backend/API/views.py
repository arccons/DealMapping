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
        return Response({"error": "Error in VP.getDeals()."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "DEAL_LIST": retVal['json_deals']})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def dealSecurities(request, dealID):
    fnStr = f"{fileStr}::dealSecurities"

    retVal = VP.getSecurities(dealID)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"error": "Error in VP.getDeals()."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "SECURITIES_LIST": retVal['json_securities']})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def funds(request, dealID):
    fnStr = f"{fileStr}::funds"
    print(f"dealID = {dealID}")

    retVal = VP.getFunds(dealID)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"error": "Error in VP.getMappings()."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "FUNDS_LIST": retVal['json_funds']})

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def fundHistory(request, dealID, fund_id, as_of_date):
    fnStr = f"{fileStr}::fundHistory"
    print(f"dealID = {dealID}, fund_id = {fund_id}, as_of_date = {as_of_date}")

    retVal = VP.getFundHistory(dealID, fund_id, as_of_date)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"error": "Error in VP.getMappings()."})
    else:
        print(retVal['json_history'])
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "HISTORY_LIST": retVal['json_history']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def updateDeal(request):
    fnStr = f"{fileStr}::updateDeal"

    dealID = request.data['dealID']
    effectiveDate = request.data['effectiveDate']
    closingDate = request.data['closingDate']
    subSector = request.data['subSector']
    isLiquid = request.data['isLiquid']
    retVal = VP.updateDeal(dealID, effectiveDate, closingDate, subSector, isLiquid)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.updateDeal()."})

    retVal = VP.getDeals()
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.getDeals()."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "DEAL_LIST": retVal['json_deals']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def updateFund(request):
    fnStr = f"{fileStr}::updateFund"

    dealID = request.data['deal_id']
    fundName = request.data['fund_name']
    asOfDate = request.data['as_of_date']
    local_cmmt = request.data['local_cmmt']
    is_active = request.data['is_active']
    realized_irr = request.data['realized_irr']
    realized_pnl = request.data['realized_pnl']
    realized_date = request.data['realized_date']
    retVal = VP.updateFund(dealID, 
                              fundName, 
                              asOfDate, 
                              local_cmmt, 
                              is_active, 
                              realized_irr, 
                              realized_pnl, 
                              realized_date)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.updateMapping()."})

    retVal = VP.getFunds(dealID)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.getMappings()."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "MAPPING_LIST": retVal['json_funds']})
