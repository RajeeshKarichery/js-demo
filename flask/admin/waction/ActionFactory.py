import importlib
class ActionFactory(object):
		
	@staticmethod
	def get_instance(version, *args, **kwargs):  
		className = 'Action'+version.capitalize()
		print "class Name ="+className
		pack = 'admin.waction.'+version+'.'+className
		print "pack ="+pack	
		my_module = importlib.import_module(pack)  
		MyClass = getattr(my_module, className)
		if MyClass:
			return MyClass(*args, **kwargs)
		raise NotImplementedError("The requested sharing has not been implemented")
		