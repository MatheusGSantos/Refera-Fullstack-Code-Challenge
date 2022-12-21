from rest_framework import viewsets
from order.models import Order
from rest_framework.views import APIView
from rest_framework.response import Response
from order.serializers import OrderSerializer

# Create your views here.
class OrderViewset(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
# class OrderList(APIView):
#     def get(self, request):
#         orders = Order.objects.all()
#         serializer = OrderSerializer(orders, many=True)
#         serializer.data.
#         return Response(serializer.data)
    
#     def post(self, request):
#         serializer = OrderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)
    
    
# class OrderDetail(APIView):
#     def get_object(self, pk):
        
        
#     def patch(self, request, pk):
#         order = Order.objects.get(pk=pk)
#         serializer = OrderSerializer(order, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=200)
#         return Response(serializer.errors, status=400)
        
        