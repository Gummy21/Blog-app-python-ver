from django.conf.urls import url
from blog import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url(r'^api/blogs$', views.blog_list),
    url(r'^api/blogs/(?P<pk>[0-9]+)$',views.blog_detail),
    url(r'^api/register$',views.register),
    url(r'^api/login$',csrf_exempt(views.login))
]
