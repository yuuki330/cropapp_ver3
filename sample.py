from PIL.ImageOps import grayscale
import pyautogui as pgui
import time
import pyperclip as clip

pgui.FAILSAFE = True
#print(pgui.position())
#print(pgui.size())

#pgui.screenshot('sample.png', region=(0,200,300,300))

def open_explorer():
    pgui.hotkey('win','e')

open_explorer()
time.sleep(1)
pgui.hotkey('win', 'up')
pgui.hotkey('alt','d')

clip.copy("D:/katsumata/program/automation")
time.sleep(0.5)
pgui.hotkey('ctrl', 'v')
time.sleep(0.5)
pgui.hotkey('enter')

# p = pgui.locateOnScreen('.\explorer_pc.PNG', grayscale=False, confidence=0.01)
# x, y = pgui.center(p)
#print(x,y)
#pgui.click(x, y)