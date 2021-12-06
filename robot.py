import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome import service as fs
#from webdriver_manager.chrome import ChromeDriverManager
import schedule

# def open_farmlab(browser):
#     #browser = webdriver.Chrome(ChromeDriverManager().install())
#     url = "https://my.farm.bot/"
#     browser.get(url)
#     time.sleep(3)
#     element_email = browser.find_element_by_name("login_email")
#     element_email.send_keys("ono.yoshiyuki@aoba-denshi.com")
#     element_pass = browser.find_element_by_xpath("//*[@id='root']/div/div[2]/div[3]/div[1]/div/div[2]/form/input")
#     element_pass.send_keys("sUML&eY1F9l")
#     element_login = browser.find_element_by_tag_name("button")
#     element_login.click()
#     time.sleep(10)

def move_photo(browser):
    element_sequence1 = browser.find_element_by_xpath("//*[@id='root']/div/div[2]/nav/div/div/div/div[2]/div[1]/div/span[2]/div/div/a[4]/div/div[1]/img")
    element_sequence1.click()
    time.sleep(1)
    element_sequence2 = browser.find_element_by_xpath("//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[4]/div[1]/i")
    element_sequence2.click()
    time.sleep(1)
    element_sequence3 = browser.find_element_by_xpath("//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[4]/ul/div/li/a/p")
    element_sequence3.click()
    time.sleep(1)
    element_sequence4 = browser.find_element_by_xpath("//*[@id='sequence-editor-tools']/div/span[1]/span/button")
    element_sequence4.click()
    time.sleep(60)

# def test_move(browser):
#     element_sequence1 = browser.find_element_by_xpath("//*[@id='root']/div/div[2]/nav/div/div/div/div[2]/div[1]/div/span[2]/div/div/a[4]/div/div[1]/img")
#     element_sequence1.click()
#     time.sleep(1)
#     element_sequence2 = browser.find_element_by_xpath("//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]/i")
#     element_sequence2.click()
#     time.sleep(1)
#     element_sequence3 = browser.find_element_by_xpath("//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[2]/ul/div/li/a/p")
#     element_sequence3.click()
#     time.sleep(1)
#     element_sequence4 = browser.find_element_by_xpath("//*[@id='sequence-editor-tools']/div/span[1]/span/button")
#     element_sequence4.click()
#     time.sleep(60)

def water(browser):
    element_sequence1 = browser.find_element_by_xpath("//*[@id='root']/div/div[2]/nav/div/div/div/div[2]/div[1]/div/span[2]/div/div/a[4]/div/div[1]/img")
    element_sequence1.click()
    time.sleep(1)
    element_sequence2 = browser.find_element_by_xpath("//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[6]/div[1]/i")
    element_sequence2.click()
    time.sleep(1)
    element_sequence3 = browser.find_element_by_xpath("//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[6]/ul/div/li/a/p")
    element_sequence3.click()
    time.sleep(1)
    # element_sequence4 = browser.find_element_by_xpath("//*[@id='sequence-editor-tools']/div/span[1]/span/button")
    # element_sequence4.click()
    # time.sleep(60)


def open_farmlab(browser):
    #browser = webdriver.Chrome(ChromeDriverManager().install())
    url = "https://my.farm.bot/"
    browser.get(url)
    time.sleep(3)
    element_email = browser.find_element(by=By.NAME, value="login_email")
    element_email.send_keys("ono.yoshiyuki@aoba-denshi.com")
    element_pass = browser.find_element(by=By.XPATH, value="//*[@id='root']/div/div[2]/div[3]/div[1]/div/div[2]/form/input")
    element_pass.send_keys("sUML&eY1F9l")
    element_login = browser.find_element(by=By.TAG_NAME, value="button")
    element_login.click()
    time.sleep(10)

def test_move(browser):
    element_sequence1 = browser.find_element(by=By.XPATH, value="//*[@id='root']/div/div[2]/nav/div/div/div/div[2]/div[1]/div/span[2]/div/div/a[4]/div/div[1]/img")
    element_sequence1.click()
    time.sleep(1)
    element_sequence2 = browser.find_element(by=By.XPATH, value="//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]/i")
    element_sequence2.click()
    time.sleep(1)
    element_sequence3 = browser.find_element(by=By.XPATH, value="//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[2]/ul/div/li/a/p")
    element_sequence3.click()
    time.sleep(1)
    element_sequence4 = browser.find_element(by=By.XPATH, value="//*[@id='sequence-editor-tools']/div/span[1]/span/button")
    element_sequence4.click()
    time.sleep(60)




def job():
    #browser = webdriver.Chrome("./chromedriver.exe")
    #browser = webdriver.Chrome(ChromeDriverManager().install())

    # herokuのchromedriverのPATHを指定
    driver_path = '/app/.chromedriver/bin/chromedriver'
    options = webdriver.ChromeOptions()
    options.use_chromium = True
    options.add_argument('--headless')
    #※headlessにしている
    chrome_service = fs.Service(options=options, executable_path=driver_path)
    browser = webdriver.Chrome(service=chrome_service)

    open_farmlab(browser)
    test_move(browser)
    #water(browser)
    browser.close()

def main():
    schedule.every(120).seconds.do(job)

    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == '__main__':
    main()
#job()
