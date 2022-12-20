from common.models.BaseModel import BaseModel
from django.db import models

# Create your models here.
class Category(BaseModel):
    name = models.CharField(max_length=80, unique=True)
    
    class Meta:
        db_table = "category"
        ordering = ["name"]
        verbose_name_plural = "Categories"