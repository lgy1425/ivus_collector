from PIL import Image
import os

folders = os.listdir("static/ivus_jpg")

for f in folders :
    vessels = os.listdir("static/ivus_jpg/"+f)

    for v in vessels :
        files = os.listdir("static/ivus_jpg/"+f +"/"+v)

        for fi in files :
            file_name = fi[8:]
            img = Image.open("static/ivus_jpg/"+f +"/"+v+"/"+fi)
            img.resize((300,300))
            img.save("static/ivus_jpg/"+f +"/"+v+"/"+file_name)
            os.remove("static/ivus_jpg/"+f +"/"+v+"/"+fi)
