from django.urls import path
from.views import IndexView, AboutView, TestView, WebcamView, HomeView

urlpatterns = [
    path('', HomeView.home, name='main'),
    path('about/', AboutView.as_view()),
]