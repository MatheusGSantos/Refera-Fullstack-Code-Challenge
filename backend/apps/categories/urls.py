from django.urls import (
    include,
    path
)
from rest_framework.routers import DefaultRouter
from categories.views import CategoryViewset

router = DefaultRouter()
router.register(r'categories', CategoryViewset)

urlpatterns = [
    path(r'^', include(router.urls)),
]
