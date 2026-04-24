from django.contrib import admin
from django.urls import include, path
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def root(_request):
    return Response({"message": "Inventory Management System API"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", root),
    path("", include("inventory.urls")),
]
