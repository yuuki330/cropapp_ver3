from django.urls import path

from.views import IndexView, AboutView, TestView

urlpatterns = [
    path('', TestView.as_view()),
    path('about/', AboutView.as_view()),
]