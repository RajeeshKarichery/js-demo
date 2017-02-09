<?php

class WBaseAction(object):
	def __init__(self, *args, **kwargs):
        super(WBaseAction,self,*args, **kwargs).__init__()
		
	def getConvert(self):
		print "from ------- WBaseAction"

pack v1	
		
class WAction(WBaseAction):
	def __init__(self, *args, **kwargs):
        super(WAction,self,*args, **kwargs).__init__()
		
	def getConvert(self):
		WBaseAction.getConvert(self);
		print "from ------- v1.WAction"
		

pack v2		
		
class WAction(WBaseAction):
	def __init__(self, *args, **kwargs):
        super(WAction,self).__init__()
		
	def getConvert(self):
		WBaseAction.getConvert(self);
		print "from ------- v1.WAction"		
		




import abc

class AbstractAction(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def __init__(self, *args, **kwargs):
        pass

    @abc.abstractmethod
    def convert(self, *args, **kwargs):
        pass


class ActionV1(AbstractAction):
    def __init__(self, *args, **kwargs):
        pass

    def convert(self, *args, **kwargs):		
		print "ActionV1"


class ActionV2(AbstractAction):
    def __init__(self, *args, **kwargs):
		pass
       
    def convert(self, *args, **kwargs):
        print "ActionV2"



class SocialShareFactory(object):
    __share_classes = {
        "facebook": FacebookShare,
        "twitter": TwitterShare
    }

    @staticmethod
    def get_share_obj(name, *args, **kwargs):
		share_class = SocialShareFactory.__share_classes.get(name.lower(), None)  
		if share_class:
			return share_class(*args, **kwargs)
		raise NotImplementedError("The requested sharing has not been implemented")				
		
		
