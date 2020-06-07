from django.db import models
import bcrypt
class User(models.Model):
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=255)
    
        
class Blog(models.Model):
    title = models.CharField(max_length=100, unique=True)
    author = models.ForeignKey(User, on_delete= models.CASCADE,related_name="author")
    auth_name = models.ForeignKey(User, on_delete= models.CASCADE,to_field='username',related_name="auth_name")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

