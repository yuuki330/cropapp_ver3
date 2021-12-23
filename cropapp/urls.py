from django.urls import path

from.views import IndexView, AboutView

urlpatterns = [
    path('about/', IndexView.as_view()),
    path('', AboutView.as_view()),
]