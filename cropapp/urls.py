from django.urls import path

from.views import IndexView, AboutView

urlpatterns = [
    path('', IndexView.as_view()),
    path('yuki/', AboutView.as_view()),
]