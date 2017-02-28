function ChildTab(options){     
	
	
	//tabs tabs-style-linetriangle
	//tabs tabs-style-tzoid
	//tabs tabs-style-topline
	//tabs tabs-style-iconfall
	
	BaseTab.call(this,options);
	var init = this.init;
	var getBaseObject = this.getBaseObject;
	var globTabObj=""
	
	this.init = function() {
		init.call();
		globTabObj = getBaseObject.call();
	}
	this.dataProvider = function(dp){
		var element  = '<div id="'+globTabObj.options.tag_name+'_Tabs" class="tabs tabs-style-linebox"> <nav><ul>';
		for (var i=0;i<dp.length;i++) {
			var tabId = dp[i]['id'];
            var tabLabel = dp[i]['label'];
			element += '<li><a href="#'+tabId+'" style="text-decoration: none"><span style="font-size:18px">'+tabLabel+'</span></a></li>';			
		}
		element +='</ul></nav>';
		element    += '<div class="content-wrap"></div>'; 
		
		var mtab = $(''+globTabObj.options.tag_name+'');
		$(mtab).replaceWith(element);
		var self = this;
		/*$(".nav-tabs a").click(function(e){
			$(this).tab('show');
		});*/		
	}
	this.createTab = function(tabId,childNode){
		var el ='';
		if(globTabObj.numberOfTabChildren ==0)
			el = '<section id="'+tabId+'" class="content-current">'+childNode+'</section>';
		else	
			el = '<section id="'+tabId+'" >'+childNode+'</section>';
		$(".content-wrap").append(el);
		globTabObj.numberOfTabChildren++;
	}	
	
}
