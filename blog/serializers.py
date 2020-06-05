from rest_framework import serializers
from blog.models import Blog,User
import bcrypt
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
        fields = ['id',
                 'username',
                 'password']
        
    def save(self, validated_data):

        hashedpw = bcrypt.hashpw(validated_data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf8')
        user = User(
            username=validated_data['username'],
            password=hashedpw
        )
       
        user.save()
        return user





  