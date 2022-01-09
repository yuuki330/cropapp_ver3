from django.urls import path
from.views import IndexView, AboutView, TestView, WebcamView, home, webcam

urlpatterns = [
    path('', home, name = 'home'),
    path('webcam/', webcam, name = 'webcam'),
]