from django.urls import path
from.views import IndexView, HomeView, Index

urlpatterns = [
    # path('', home, name = 'home'),
    path('', HomeView.as_view()),
    path('index/', Index, name='index'),
    # path('webcam/', webcam, name = 'webcam'),
]