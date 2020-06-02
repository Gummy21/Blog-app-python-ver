from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
import bcrypt
from blog.models import Blog,User
from blog.serializers import BlogSerializer,UserSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def blog_list(request):
    #Get all
    if request.method == 'GET':
        blogs = Blog.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            blogs = blogs.filter(title__icontains=title)
        
        blogs_serializer = BlogSerializer(blogs,many=True)

        return JsonResponse(blogs_serializer.data, safe=False)




    #Create blog
    elif request.method == 'POST':
        blog_data = JSONParser().parse(request)
        blog_serializer = BlogSerializer(data= blog_data)
        if blog_serializer.is_valid():
            blog_serializer.save()
            return JsonResponse(blog_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(blog_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def blog_detail(request,pk):
    try:
        blog = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return JsonResponse({'message': 'The blog does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        blog_serializer = BlogSerializer(blog)
        return JsonResponse(blog_serializer.data)

    elif request.method == 'PUT':
        blog_data = JSONParser().parse(request)
        blog_serializer = BlogSerializer(blog, data=blog_data)
        if blog_serializer.is_valid():
            blog_serializer.save()
            return JsonResponse(blog_serializer.data)
        return JsonResponse(blog_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        blog.delete()
        return JsonResponse({'message': 'Blog was deleted'})

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data= user_data)
        if user_serializer.is_valid():
            user_serializer.save(user_serializer.validated_data)
            return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
