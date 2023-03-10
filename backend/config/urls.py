"""django_rest_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.urls import (
    include,
    path
)
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from apps.categories.urls import router as categories_router
from apps.order.urls import router as orders_router


router = DefaultRouter()
router.registry.extend(categories_router.registry)
router.registry.extend(orders_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
