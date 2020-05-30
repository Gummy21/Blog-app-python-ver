from django.db import models

class User(models.Model):
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)
    
class Blog(models.Model):
    title = models.CharField(max_length=100, unique=True)
    author = models.ForeignKey(User, on_delete= models.CASCADE,related_name="blog_post")
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

