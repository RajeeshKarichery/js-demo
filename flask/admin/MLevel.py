"""	
class Legs(object):

	def __init__(self,*args, **kwargs):
		super(Legs,self).__init__()
		print "Ohhhh A"
		
	def getMe(self):		
		print "from ------- Legs"
		
class Sound(object):

	def __init__(self,*args, **kwargs):	
		print "in Sound////"
		for key in args:
			print key
		#super(Sound,self).__init__()
		print "Ohhhh B"
		
	def getMe(self):		
		print "from ------- Sound"
		
class Dog(Legs,Sound):

	def __init__(self,*args, **kwargs):
		for key in args:
			print key
		super(Dog, self).__init__(100)
		print "Ohhhh Finaly ...."
		
	def getMe(self):
		print ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
		#Sound.getMe(self)
		#super(Dog,self).getMe()
		#print "Finaly from ------- Dog"
		return 1
	"""

class Legs(object):

	def __init__(self,*args, **kwargs):
		super(Legs,self).__init__()
		print "Ohhhh A"
		
	def getMe(self):		
		print "from ------- Legs"
		
class Sound(object):
	def __init__(self,*args, **kwargs):	
		print "in Sound......"
		for key in args:
			print key
		super(Sound,self).__init__(*args, **kwargs)		
		print "Ohhhh B"
		
	def getMe(self):		
		print "from ------- Sound"
		
class Dog(Sound,Legs):

	def __init__(self,*args, **kwargs):		
		super(Dog, self).__init__(*args, **kwargs)
		print "Ohhhh Finaly ...."
		
	def getMe(self):
		print ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
		return 1
	