from django.views.generic import TemplateView
from django.shortcuts import render
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time
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

def home(request):
    browser = webdriver.Chrome(ChromeDriverManager().install())
    url = 'https://farmo.tech/pc/login.php'
    browser.get(url)

    time.sleep(.1)

    USER = "katsuyu107@gmail.com"
    PASS = "Yuuki1079810"

    login_email = browser.find_element_by_name("login_email")
    login_email.send_keys(USER)
    login_pass = browser.find_element_by_name("login_password")
    login_pass.send_keys(PASS)
    login_btn = browser.find_element_by_class_name("button01")
    login_btn.click()

    time.sleep(.1)

    soup = BeautifulSoup(browser.page_source, "html.parser")

    date_all = soup.find(class_='entry-time')
    temp = soup.find(id='latest_temperature_data')

    # print(str(temp))

    date = re.findall('..月...', str(date_all))
    time_ = re.findall('<br/>(.*):', str(date_all))
    temp = re.findall('">(.*)</label>', str(temp))

    #time.sleep(1)

    browser.close()

    context = {
        'date':date[0],
        'time_':time_[0],
        'temp':temp[0]
    }
    return render(request, 'cropapp/home.html', context)

