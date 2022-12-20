from django.urls import (
    include,
    path
)
from rest_framework.routers import DefaultRouter
from order.views import OrderViewset

router = DefaultRouter()
router.register(r'orders', OrderViewset)

urlpatterns = [
    path(r'^', include(router.urls)),
]