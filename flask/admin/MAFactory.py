import abc

class AbstractSocialShare(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def __init__(self, *args, **kwargs):
        pass

    @abc.abstractmethod
    def share(self, *args, **kwargs):
        pass


class FacebookShare(AbstractSocialShare):
    def __init__(self, *args, **kwargs):
        pass

    def share(self, *args, **kwargs):		
        for key in kwargs:
			print kwargs[key]
			#print "another keyword arg: %s: %s" % (key, kwargs[key])


class TwitterShare(AbstractSocialShare):
    def __init__(self, *args, **kwargs):
		pass
        # Initialize Twitter OAuth        

    def share(self, *args, **kwargs):
        print "TwitterShare"


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