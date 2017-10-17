# -*- coding: utf-8 -*-
from flask import Flask,render_template,current_app,url_for,g,session,redirect,make_response,request


app = Flask(__name__)
app.secret_key = 'super secret key'
app.config['TEMPLATE_AUTO_RELOAD'] = True
app.jinja_env.cache = None



@app.route("/")
def index():
    return render_template("index.html")

@app.before_request
def before_request():
    # g.db = dbconnect()
    print ""

if __name__=="__main__":
    app.run(debug=True)

