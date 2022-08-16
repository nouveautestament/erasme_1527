#kecehe5170@wnpop.com
#https://temp-mail.org/fr/

import cv2
import pytesseract
import sys


picture = sys.argv[1]
pnamec  = picture.split(".")[0]


image = cv2.imread(picture)
base_image = image.copy()

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#cv2.imwrite("gray.jpg", gray)

blur = cv2.GaussianBlur(gray, (11,11), 0)
#cv2.imwrite("blur.jpg", blur)

thresh = cv2.threshold(blur, 100, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
#cv2.imwrite("tresh.jpg", thresh)

kernal = cv2.getStructuringElement(cv2.MORPH_RECT, (10,50))
#cv2.imwrite("kernal.jpg", kernal)

dilate = cv2.dilate(thresh, kernal, iterations=1)
#cv2.imwrite("dilate.jpg", dilate)

cnts = cv2.findContours(dilate, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

cnts = cnts[0] if len(cnts) == 2 else cents[1]

cnts = sorted(cnts, key=lambda x: cv2.boundingRect(x)[0])

cc=0

for c in cnts:
    x,y,w,h = cv2.boundingRect(c)
    if h > 500 and w > 20:
        roi = image[y:y+h, x:x+w]
        if cc == 2:
            cv2.imwrite(pnamec+"_vuler.jpg", roi)
            cv2.rectangle(base_image, (x, y), (x + w, y + h), (36,255,12), 3)
            print(x,y,w,h)
        cc=cc+1
cv2.imwrite(pnamec+"_box.jpg", base_image)






























