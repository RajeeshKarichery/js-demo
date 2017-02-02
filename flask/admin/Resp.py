from flask import jsonify
from datetime import datetime
class Resp:		
	def foo(self,x):
		print "executing foo(%s,%s)"%(self,x)
	@classmethod
	def class_foo(cls,x):
		print "executing class_foo(%s,%s)"%(cls,x)
		
	@staticmethod
	def static_foo(x):
		print "executing static_foo(%s)"%x    
		
class Hero:

  @staticmethod
  def say_hello():
     print("Helllo...")

  @classmethod
  def say_class_hello(cls):
     if(cls.__name__=="HeroSon"):
        print("Hi Kido")
     elif(cls.__name__=="HeroDaughter"):
        print("Hi Princess")

class HeroSon(Hero):
  def say_son_hello(self):
     print("test  hello")



class HeroDaughter(Hero):
  def say_daughter_hello(self):
     print("test  hello daughter")
	 
class Parent(object):
    def __init__(self):
        self.value = 5

    def get_value(self):
		print "Parent value"
	#return self.value	

class Base(object):
    def get_value(self):
		print "base value"

class Child(Parent,Base):

	def get_value(self):		
		#super(Child, self).get_value()
		Parent.get_value(self)
		print "overide get value"
		
#return self.value + 1


class Logger(object):
    def log(self, message):
        print message
		
		
class TimestampLogger(Logger):
    def log(self, message):
        message = "{ts} {msg}".format(ts= datetime.now(),msg=message)
        super(TimestampLogger, self).log(message)
		
class First(object):
	
    def __init__(self):
		super(First, self).__init__()
		print ">>>>>>>>>>first"	
		
		def get_name(self):
			print "from ------- First"
		
		
class Second(object):
    def __init__(self):
		#super(Second, self).__init__()
		print ">>>>>>>>>second"
	
		def get_name(self):
			print "from ------- Second"
	
class Third(First,Second):
	
    def __init__(self):  
		super(Third, self).__init__()  
			
		def get_name(self):
			print "from ------- Third"
	