# -*- coding: utf-8 -*-
from flask import Flask,render_template,current_app,url_for,g,session,redirect,make_response,request
import random
import os
import json

app = Flask(__name__)
app.secret_key = 'super secret key'
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.jinja_env.cache = None
app.config["UPLOAD_FOLDER"] = "static/eye"


@app.route("/")
def index():
    return render_template("index.html")

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
    eye.save(save_path)

    image_path = "./static/eye/" +filename


    
    optical_disk = random.randint(0,2)
    vessel_ratio = random.randint(0,2)
    bleeding = random.randint(0,2)
    retina = random.randint(0,2)
    etc = random.randint(0,2)
 
    result = {"eye_path":image_path,"vessel_ratio":vessel_ratio,"optical_disk":optical_disk,"bleeding":bleeding,"retina":retina,"etc":etc,"fundus_name":fundusname}
    return json.dumps(result)

if __name__=="__main__":
    app.run(debug=True)

