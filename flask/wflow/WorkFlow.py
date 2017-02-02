from flask_restful import Resource,fields,reqparse, marshal_with

parser = reqparse.RequestParser()
parser.add_argument('username', required=True,help="Name cannot be blank!")
parser.add_argument('username', type=int ,help="Must Integer")

resource_fields = {'username': fields.Integer}

class TransitFlow(Resource):

    #@marshal_with(resource_fields)
    def post(self):    
    	args = parser.parse_args() 	
    	try:
    		return "Helo "+str(args['username'])
    	except Exception,e:
    		return "errooo"	
