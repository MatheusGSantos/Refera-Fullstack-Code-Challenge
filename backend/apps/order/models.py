from common.models.BaseModel import BaseModel
from django.db import models

# Create your models here.
class Order(BaseModel):
    category = models.ForeignKey('categories.Category', related_name="category", on_delete=models.CASCADE)
    contact = models.CharField(max_length=80)
    agency = models.CharField(max_length=80)
    company = models.CharField(max_length=80)
    description = models.TextField(blank=True)
    deadline = models.DateField()
    
    class Meta:
        db_table = "order"
        ordering = ["id"]
        verbose_name_plural = "Orders"