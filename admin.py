# -*- coding: utf-8 -*-
from flask import Flask,render_template,current_app,url_for,g,session,redirect,make_response,request
import random
import os
import json
import csv

app = Flask(__name__)
app.secret_key = 'super secret key'
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.jinja_env.cache = None
app.config["UPLOAD_FOLDER"] = "static/eye"

abs_path = "/home/mediwhale/PycharmProjects/fundus_gui/"

vessels = []

with open('static/vessels.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        vessels.append([row[0],row[1]])

@app.route("/")
def index():
    return render_template("index.html",vessels=vessels)

@app.before_request
def before_request():
    # g.db = dbconnect()
    print ""


@app.route("/upload_eye",methods=["POST"])
def upload_eye() :


    for f in request.files :
        eye = request.files[f]
        filename = eye.name
        index = filename.rfind('.')
        print filename
        extension = filename[index + 1:]
        fundusname = filename[0:index]

   
    save_path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
    eye.save(abs_path+save_path)

    image_path = "./static/eye/" +filename


    
    optical_disk = random.randint(0,2)
    vessel_ratio = random.randint(0,2)
    bleeding = random.randint(0,2)
    retina = random.randint(0,2)
    etc = random.randint(0,2)
 
    result = {"eye_path":image_path,"vessel_ratio":vessel_ratio,"optical_disk":optical_disk,"bleeding":bleeding,"retina":retina,"etc":etc,"fundus_name":fundusname}
    return json.dumps(result)

@app.route("/get_vessel_info",methods=["POST"])
def get_vessel_info() :
    vessel = request.json['vessel']
    max_frame = len(os.listdir("static/ivus_jpg/"+vessel))
    patient, v = vessel.split("/")
    return json.dumps({"max_frame":max_frame,"patient":patient,"v":v})

if __name__=="__main__":
    app.run(debug=True)

