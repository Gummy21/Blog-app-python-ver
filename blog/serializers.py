from rest_framework import serializers
from blog.models import Blog,User

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('id',
                 'title',
                #  'author',
                 'content',
                 'created_at')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                 'username',
                 'password')