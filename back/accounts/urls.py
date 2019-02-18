from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from . import views

urlpatterns = [
    url(r'register/$', views.UserCreate.as_view(), name='account-create'),
    url(r'api-token-auth/$', obtain_jwt_token, name='obtain-token'),
    #url(r'api-token-auth/$', views.CustomObtainAuthToken.as_view()),
    url(r'api-token-refresh/$', refresh_jwt_token, name='refresh-token'),
    url(r'api-token-verify/$', verify_jwt_token, name='verify-token'),
]
