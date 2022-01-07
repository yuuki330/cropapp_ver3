from django.urls import path

from.views import IndexView, AboutView, TestView, WebcamView

urlpatterns = [
    path('', WebcamView.as_view()),
    path('about/', AboutView.as_view()),
]