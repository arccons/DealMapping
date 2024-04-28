import os
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from API import ViewProcessor as VP

fileStr = f"{__file__.strip(os.getcwd())}"

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def dealList(request):
    fnStr = f"{fileStr}::dealList"

    retVal = VP.getDealList()
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"error": "Error in VP.getDealList()."})
    if not retVal['dealList']:
        return Response({"error": "Deal list does not exist."})
    else:
        return Response({"message": "Deal list received.", "DEAL_LIST": retVal['dealList']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def updateDeal(request):
    fnStr = f"{fileStr}::updateDeal"

    dealID = request.data['dealID']
    effectiveDate = request.data['effectiveDate']
    closingDate = request.data['closingDate']
    subSector = request.data['subSector']
    isLiquid = request.data['isLiquid']
    retVal = VP.updateDeal(dealID = dealID,
                           effectiveDate = effectiveDate,
                           closingDate = closingDate,
                           subSector = subSector,
                           isLiquid = isLiquid)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.updateDeal()."})
    if not retVal['updatedDeal']:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal not updated."})

    retVal = VP.getDealList()
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.getDealList()."})
    if not retVal['dealList']:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list does not exist."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "DEAL_LIST": retVal['dealList']})
