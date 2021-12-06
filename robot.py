#from PIL.ImageOps import grayscale
import pyautogui as pgui
import time
import pyperclip as clip
from selenium import webdriver
#from webdriver_manager.chrome import ChromeDriverManager
import schedule

pgui.FAILSAFE = True

# def open_chrome():
#     pgui.hotkey('win','s')
#     pgui.write('chrome')
#     pgui.hotkey('enter')
#     time.sleep(0.1)
#     pgui.hotkey('win', 'up')

# def search_farmlab():
#     pgui.hotkey('ctrl', 'l')
#     clip.copy("https://my.farm.bot/")
#     pgui.hotkey('ctrl', 'v')
#     pgui.hotkey('enter')

def open_farmlab(browser):
    #browser = webdriver.Chrome(ChromeDriverManager().install())
    url = "https://my.farm.bot/"
    browser.get(url)
    time.sleep(3)
    element_email = browser.find_element_by_name("login_email")
    element_email.send_keys("ono.yoshiyuki@aoba-denshi.com")
    element_pass = browser.find_element_by_xpath("//*[@id='root']/div/div[2]/div[3]/div[1]/div/div[2]/form/input")
    element_pass.send_keys("sUML&eY1F9l")
    element_login = browser.find_element_by_tag_name("button")
    element_login.click()
    time.sleep(10)
    #browser.quit()

def move_photo(browser):
    element_sequence1 = browser.find_element_by_xpath("//*[@id='root']/div/div[2]/nav/div/div/div/div[2]/div[1]/div/span[2]/div/div/a[4]/div/div[1]/img")
    element_sequence1.click()
    time.sleep(1)
    pgui.click(x=52, y=1067)
    element_sequence3 = browser.find_element_by_xpath("//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[4]/ul/div/li/a/p")
    element_sequence3.click()
    time.sleep(1)
    element_sequence4 = browser.find_element_by_xpath("//*[@id='sequence-editor-tools']/div/span[1]/span/button")
    element_sequence4.click()
    time.sleep(5)

def test_move(browser):
    element_sequence1 = browser.find_element_by_xpath("//*[@id='root']/div/div[2]/nav/div/div/div/div[2]/div[1]/div/span[2]/div/div/a[4]/div/div[1]/img")
    element_sequence1.click()
    time.sleep(1)
    pgui.click(x=55, y=960)
    element_sequence3 = browser.find_element_by_xpath("//*[@id='root']/div/div[3]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div[2]/ul/div/li/a/p")
    element_sequence3.click()
    time.sleep(1)
    element_sequence4 = browser.find_element_by_xpath("//*[@id='sequence-editor-tools']/div/span[1]/span/button")
    element_sequence4.click()
    time.sleep(60)

def job():
    browser = webdriver.Chrome("./chromedriver.exe")
    open_farmlab(browser)
    test_move(browser)
    browser.close()

def main():
    schedule.every(10).seconds.do(job)

    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == '__main__':
    main()

#open_chrome()
# time.sleep(0.1)
# search_farmlab()
#move_photo(browser)
#print(pgui.position())