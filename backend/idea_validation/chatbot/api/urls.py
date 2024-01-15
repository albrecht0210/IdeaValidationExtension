# urls.py
from django.urls import path
from .views import ChatbotAPIView


urlpatterns = [
    path('validate/', ChatbotAPIView.as_view(), name='chatbot'),
]
