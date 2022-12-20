from rest_framework import serializers
from order.models import Order
from categories.serializers import CategorySerializer

class OrderSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Order
        fields = ['id', 'category', 'contact', 'agency', 'company', 'deadline']