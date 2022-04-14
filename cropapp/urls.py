from django.urls import path
from.views import IndexView

urlpatterns = [
    # path('', home, name = 'home'),
    path('', IndexView.as_view()),
    # path('webcam/', webcam, name = 'webcam'),
]