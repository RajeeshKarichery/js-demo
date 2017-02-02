from flask import Flask

from flask_restful import Resource, Api, abort
from functools import wraps
#from raven.contrib.flask import Sentry


from admin.adminCtrl import admin

import importlib

#from wflow.WorkFlow  import TransitFlow


app = Flask(__name__)
#sentry = Sentry(app, dsn='___DSN___')

#@app.errorhandler(werkzeug.exceptions.BadRequest)
#def handle_bad_request(e):
   # return 'bad request!'

#app.register_error_handler(400, lambda e: 'bad request!')

#api = Api(app, catch_all_404s=True)
"""
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp

class User(object):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __str__(self):
        return "User(id='%s')" % self.id

users = [
    User(1, 'user1', 'abcxyz'),
    User(2, 'user2', 'abcxyz'),
]

username_table = {u.username: u for u in users}
userid_table = {u.id: u for u in users}

def authenticate(username, password):
    user = username_table.get(username, None)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user

def identity(payload):
    user_id = payload['identity']
    return userid_table.get(user_id, None)
	

app.config['SECRET_KEY'] = 'super-secret'
app.config['JWT_LEEWAY'] = 100000

jwt = JWT(app, authenticate, identity)



def checkuser(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if current_identity.username == 'user1':
            return func(*args, **kwargs)
        return abort(401)
    return wrapper


class HelloWorld(Resource):
    decorators = [checkuser, jwt_required()]
    def get(self):
        return {'hello': current_identity.username}

class Resource(Resource):
    method_decorators = [checkuser,jwt_required()] 
	
   

api.add_resource(HelloWorld,  '/api/v1/mine',endpoint='min_e')
api.add_resource(TransitFlow, '/api/wf/mine')
"""

app.register_blueprint(admin, url_prefix='/api/admin')



def validate_req(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        #return func(*args, **kwargs)		
        #return abort(404)
		_custom_validate()
		return func(*args, **kwargs)
    return wrapper

def _custom_validate():
	#try:
		module = importlib.import_module('wflow.Route1')
		return "_custom_validate"	
	#except Exception as e:  
	#	error = "Error occured in _custom_validate" + repr(e) 
	#	print error	
	#	return error

@app.route('/')
def demo1():
    return 'Hello, Demo!'
	
@app.route('/api/name')
@validate_req
def demo_name():
    return 'Hello, demo_name!'	
	
@app.errorhandler(404)
def page_not_found(e):
    return '404'
	
@app.errorhandler(500)
def internal_server_error(error):
	return '500'
	
@app.errorhandler(Exception)
def unhandled_exception(e):	
	print e
	return ('Unhandled Exception: ')

if __name__ == '__main__':
    app.run(debug=True)