import abc

class ActionBase(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def __init__(self, *args, **kwargs):
        pass
	
   
		
	@abc.abstractmethod
	def generate(self, *args, **kwargs):
		pass