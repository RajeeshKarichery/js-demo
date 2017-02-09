class First(object):
	def get_name(self):
		print "from ------- First"
		
class Second(object):
    def get_name(self):
		print "from ------- Second"
	
class Third(First,Second):
	def get_name(self):  
		Second.get_name(self)
		print "overide from ------- Third"
	
	