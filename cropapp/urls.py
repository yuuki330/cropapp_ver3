from django.urls import path
from.views import IndexView, HomeView, views

urlpatterns = [
    # path('', home, name = 'home'),
    path('', HomeView.as_view()),
    path('index/', views.Index, name='index'),
    # path('webcam/', webcam, name = 'webcam'),
]