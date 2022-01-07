from django.urls import path
import views
from.views import IndexView, AboutView, TestView, WebcamView, HomeView

urlpatterns = [
    path('', views.main, name='main'),
    path('about/', AboutView.as_view()),
]