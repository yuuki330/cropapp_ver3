from django.urls import path
from.views import IndexView, HomeView

urlpatterns = [
    # path('', HomeView.as_view()),
    path('', IndexView.as_view()),
    # path('index/', IndexView.as_view(), name="index"),
]