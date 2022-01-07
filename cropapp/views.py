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
    url = 'https://www.jma.go.jp/jp/yoho/329.html' #気象庁のHP
    res = requests.get(url)
    res.encoding = res.apparent_encoding
    soup = BeautifulSoup(res.text, "html.parser")
    weathers = soup.find_all(class_='weather')
    date_list = weather_list = []
    for i  in weathers:
        j = str(i).replace('\n','')
        date = re.findall('<th class="weather">(.*?)<br/>', str(j))
        date_list = date_list + date
        weather = re.findall('alt="(.*?)" src', str(j))
        weather_list = weather_list + weather
    context = {
        'seibu_today':date_list[0], 'seibu_tomorrow':date_list[1],
        'seibu_today_w':weather_list[0], 'seibu_tomorrow_w':weather_list[1],
        }
    return render(request, 'main.html', context)