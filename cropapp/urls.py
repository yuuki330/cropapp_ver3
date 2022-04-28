from django.urls import path
from.views import IndexView, HomeView

urlpatterns = [
    # path('', home, name = 'home'),
    path('', HomeView.as_view()),
    path('index/', HomeView.as_view(), name="index"),
    # path('webcam/', webcam, name = 'webcam'),
]