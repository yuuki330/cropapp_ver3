from django.urls import path, include
from.views import IndexView, HomeView

urlpatterns = [
    # path('', home, name = 'home'),
    path('', HomeView.as_view()),
    path('index/', include('clopapp.urls')),
    # path('webcam/', webcam, name = 'webcam'),
]