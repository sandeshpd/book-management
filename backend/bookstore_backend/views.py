from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from .serializer import *

# Create your views here.
class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    permission_classes = [AllowAny]
