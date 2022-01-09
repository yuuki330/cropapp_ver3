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
    template_name = "cropapp/cake.html"

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

    time.sleep(1)

    soup = BeautifulSoup(browser.page_source, "html.parser")

    date_all = soup.find(class_='entry-time')
    temp = soup.find(id='latest_temperature_data')
    crown = soup.find(id='latest_crown_data')
    soil_temp = soup.find(id='latest_soil_data')
    co2 = soup.find(id='latest_co2_data')
    moist = soup.find(id='latest_moist_data')
    bright_all = soup.find(id='latest_bright_data')
    vpd = soup.find(id='latest_vpd_data')
    water = soup.find(id='latest_water_data')
    avg_temp = soup.find(id='latest_avg_temperature_data')


    date = re.findall('..月...', str(date_all))
    time_ = re.findall('<br/>(.*)', str(date_all))
    temp = re.findall('">(.*)</label>', str(temp))
    crown = re.findall('">(.*)</label>', str(crown))
    soil_temp = re.findall('">(.*)</label>', str(soil_temp))
    co2 = re.findall('">(.*)</label>', str(co2))
    moist = re.findall('">(.*)</label>', str(moist))
    bright = re.findall('">(.*)<span>', str(bright_all))
    bright_label = re.findall('<span>(.*)</span>', str(bright_all))
    vpd = re.findall('">(.*)</label>', str(vpd))
    water = re.findall('>(.*)<br', str(water))
    avg_temp = re.findall('">(.*)</label>', str(avg_temp))

    time.sleep(1)

    browser.close()

    context = {
        'date':date[0],
        'time_':time_[0],
        'temp':temp[0],
        'crown':crown[0],
        'soil_temp':soil_temp[0],
        'co2':co2[0],
        'moist':moist[0],
        'bright':bright[0],
        'bright_label':bright_label[0],
        'vpd':vpd[0],
        'water':water[0],
        'avg_temp':avg_temp[0],
    }
    return render(request, 'cropapp/home.html', context)

def webcam(request):

    return render(request, 'cropapp/webcam.html', {})