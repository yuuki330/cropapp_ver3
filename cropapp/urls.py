from django.urls import path

from.views import IndexView, AboutView, TestView, WebcamView, HomeView

urlpatterns = [
    path('', HomeView.as_view()),
    path('about/', AboutView.as_view()),
]