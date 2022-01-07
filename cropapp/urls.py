from django.urls import path

from.views import IndexView, AboutView, TestView, WebcamView, HomeView, main

urlpatterns = [
    path('', main()),
    path('about/', AboutView.as_view()),
]