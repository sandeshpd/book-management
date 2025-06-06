from django.db import models

# Create your models here.
class Book(models.Model):
    name = models.CharField(max_length = 50)
    author = models.CharField(max_length = 50)
    language = models.CharField(max_length = 20)
    genre = models.CharField(max_length = 50, null = True, blank = True)

    def __str__(self):
        return self.name