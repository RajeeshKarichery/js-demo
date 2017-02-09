from flask import Blueprint,request,json
from werkzeug import secure_filename
from admin.Resp import Resp,HeroSon,HeroDaughter,Child,TimestampLogger
from admin.MLevel import Dog
from admin.MFactory import ButtonFactory
from admin.MAFactory import SocialShareFactory
from admin.MAFactory import AbstractSocialShare
from admin.MInherit import Third

from werkzeug.datastructures import ImmutableMultiDict

from admin.MyError import ValueTooSmallError

#from wflow.Route import Route

import importlib
import copy
#from run import validate_req

admin = Blueprint('admin', __name__)

@admin.route('/page')
def index():
	#a=Resp()	
	#Resp.static_foo(11)
	#Resp.class_foo(21)
	
	'''testson = HeroSon()
	testson.say_class_hello()
	HeroSon.say_hello()
	
	testdaughter = HeroDaughter()
	testdaughter.say_class_hello()
	testdaughter.say_hello()'''
	
	#c = Child()
	#c.get_value()	
	
	#lo = TimestampLogger()
	#lo.log("testing log")
	
	#t = Third()  
	#t.get_name()
	
	ob = Dog(10)
	ob.getMe()
	return "index.../page"
	
@admin.route('/factory')
def factory():
	obj = SocialShareFactory.get_share_obj("facebook",10)  
	obj.share(farg=1, myarg2="two", myarg3=3)	
	return "/factory"

	
@admin.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
	print file.filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    return 'fiiiiii'	
	
@admin.route('/upload2',methods = ['POST'])
def upload():
	#data = request.get_json()
	#data = request.form.to_dict()
	data = request.form.to_dict()	
	#data = dict(request.form)
	#ex = json.loads(request.form.get('city'))
	#print ex

	print data['name']
	#data = request.get_data(parse_form_data=True)
	#data = request.get_data(as_text=True)
	#charset = request.mimetype_params.get('charset') or 'UTF-8'

	#json.loads(request.form['user_data'])
    

	#print data.decode(charset, 'replace')
	#print data['name']
	#f = request.files['file']	
	#print f.filename	
	#f.save(secure_filename(f.filename))


	if 'multipart/form-data' in request.headers['Content-Type']:
		print "multipart"
		in_stream = request.files['file']
		print in_stream
		print in_stream.filename

	return 'file uploaded successfully'
	
@admin.route('/test1')
def test1():
	try:
		d1 = dict();
		#if(d1.has_key('A')):
		print d1['A']
		return "test1"
	except Exception as e:
		return "test1>>"		
		
@admin.route('/test2')
def test2():
	d1 = dict();
	print d1['A']
	return "test1"
	
@admin.route('/test3')
def test3():
	try:
		#ob = Route()
		#resp = ob.hello()
		#mymethod = getattr(importlib.import_module("wflow.Route"), "hello")
		#module = importlib.import_module('wflow.Route1')
		#my_class = getattr(module, 'Route1')
		#ob = my_class()
		#methodToCall = getattr(ob, "hello")
		#resp = methodToCall()	
		#return "Test3==="+resp
		
		return "test3"
	except Exception as e:  
		error = "Error occured in test3" + repr(e)  
		return error
        
@admin.route('/test4')
def test4():	
	d1 = dict()
	d1['id'] = 10
	
	resp1 = dict()
	resp1['data'] = d1
	
	print resp1
	
	resp2 =  resp1['data']
	print "resp2 value =="+str(resp2)
	
	resp2['id'] = 300
	
	print "resp1 === value "+str(resp1)
	
	#d2 = copy.deepcopy(d1)
	#d2['id'] = 11	
	#print "d2 value ="+str(d2)
	#print "d1 value ="+str(d1)
	
	number = 10
	i_num  = 5
	try:
		if(i_num < number):
			raise ValueTooSmallError
	except ValueTooSmallError:
		print("This value is too small, try again!")	   	
	return "test4"

	
	