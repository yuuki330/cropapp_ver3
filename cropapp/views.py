from django.views.generic import TemplateView
from django.shortcuts import render
import requests, re
from bs4 import BeautifulSoup

class IndexView(TemplateView):
    template_name = "cropapp/index.html"

class AboutView(TemplateView):
    template_name = "cropapp/about.html"

class TestView(TemplateView):
    template_name = "cropapp/test.html"

class WebcamView(TemplateView):
    template_name = "cropapp/webcam.html"

class HomeView(TemplateView):
    template_name = "cropapp/home.html"

def main(request):
    url = 'https://weather.yahoo.co.jp/weather/jp/3.html?day=1' #気象庁のHP
    res = requests.get(url)
    res.encoding = res.apparent_encoding
    soup = BeautifulSoup(res.text, "html.parser")
    weathers = soup.find_all(class_='weather')
    date_list = weather_list = []
    for i  in weathers:
        weather = re.findall('alt="(.*?)" src', str(i))
        weather_list = weather_list + weather
    context = {
        'tokyo_today_w':weather_list[4],
    }
    return render(request, 'main.html', context)