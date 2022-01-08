from django.urls import path
from.views import IndexView, AboutView, TestView, WebcamView, home

urlpatterns = [
    path('', home, name = 'home'),
    path('about/', AboutView.as_view()),
]