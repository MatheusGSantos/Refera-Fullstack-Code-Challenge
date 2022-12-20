from rest_framework import viewsets
from categories.models import Category
from categories.serializers import CategorySerializer

# Create your views here.
class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer