"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from API import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.deals), # GET
    path('deals', views.deals), # GET
    path('dealSecurities/<int:ACDB_Deal_ID>', views.dealSecurities), # GET
    path('dealFunds/<int:ACDB_Deal_ID>', views.dealFunds), # GET
    path('fundMapping/<int:ACDB_Deal_ID>/<str:Fund_Name>', views.fundMapping), # GET
    path('mappingHistory/<int:ACDB_Deal_ID>/<str:Fund_Name>', views.mappingHistory), # GET
    path('updateDeal', views.updateDeal), # POST
    #path('updateFund', views.updateFund), # POST
    path('addMapping', views.addMapping), # POST
    path('checkDeals', views.checkDeals), # POST
    path('uploadMappings', views.uploadMappings), # POST
]
