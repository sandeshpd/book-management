from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializer import *

# Create your views here.
class BookView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
