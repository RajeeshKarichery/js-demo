	
class Legs(object):

	def __init__(self):
		super(Legs,self).__init__()
		print "Ohhhh A"
		
	def getMe(self):		
		print "from ------- Legs"
		
class Sound(object):

	def __init__(self):
		super(Sound,self).__init__()
		print "Ohhhh B"
		
	def getMe(self):		
		print "from ------- Sound"
		
class Dog(Legs,Sound):

	def __init__(self):
		super(Dog,self).__init__()
		print "Ohhhh Finaly ...."
		
	def getMe(self):
		print ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
		#Sound.getMe(self)
		#super(Dog,self).getMe()
		#print "Finaly from ------- Dog"
		return 1
		
		