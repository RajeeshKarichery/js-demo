function BaseTab(options){
	var defaults = {
        tag_name:'tag_name',
		style:'nav nav-tabs',
        popover:{
            enable :false,
            title:'',
            titleDp:'',
            placement:'bottom',
            trigger:'manual',
            html:true,
            animation:false,
            template:null,
            templateDp:null
        },
        callback:{
            snTabChangeEvent:null
        }
    };
    
	var globTabObj = Object();
	this.init = function(){		
		globTabObj.options = $.extend(defaults,options);
		if(globTabObj.options.popover.enable){
			if(!globTabObj.options.popover.html)
				globTabObj.options.popover.html = true;
			if(!globTabObj.options.popover.placement)
				globTabObj.options.popover.placement = "bottom";
		}
		globTabObj.popoverList = [];		
		globTabObj.numberOfTabChildren =[];		
	}
	this.getBaseObject = function(){
		return globTabObj;
	}
	this.dataProvider = function(dp){
		var styleClsName = globTabObj.options.style;
            globTabObj.selectedIndex =1;
            var element  = '<div id="'+globTabObj.options.tag_name+'_Tabs">';			
            element += '<ul class="'+styleClsName+'">';
            for (var i=0;i<dp.length;i++) {
                var li_id = 'li_'+globTabObj.options.tag_name+'_'+(i+1);
                var span_id = 'span_'+globTabObj.options.tag_name+'_'+(i+1);
                var activeClass = i==0?'active':'';
                var tabId = dp[i]['id'];
                var tabLabel = dp[i]['label'];
                element	   += '<li id="'+li_id+'" name="'+li_id+'" class="'+activeClass+'"><a href="#'+tabId+'" data-toggle="tab" class="sntab-default"><span class="'+span_id+'">'+tabLabel+' </a></li>';

                //Check The PopOver Enabled
                if(globTabObj.options.popover.enable){
                    if(globTabObj.options.popover.template)
                        globTabObj.popoverList.push({index:i,title:"",content:"" ,li_id:li_id ,show :true});
                    else{
                        var _content ='';
                        var _title ='';
                        if(globTabObj.options.popover.templateDp)
                            _content = globTabObj.options.popover.templateDp[i];
                        if(globTabObj.options.popover.titleDp)
                            _title = globTabObj.options.popover.titleDp[i];

                        var _item = {index:i,title:_title,content:_content ,li_id:li_id ,show :true};
                        globTabObj.popoverList.push(_item);
                    }
                }
            }
            element    += '</ul>';
            element    += '</div>'; 
			
			element    += '<div class="tab-content"></div>'; 
			
			var sntab = $(''+globTabObj.options.tag_name+'');
            $(sntab).replaceWith(element);
            var self = this;
            $(".nav-tabs a").click(function(e){
                $(this).tab('show');
            });



            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                globTabObj.selectedIndex = $(e.target).closest('li').index()+1;
                /*var _resp = Object();
                 _resp['name'] = "oko";
                 $( document ).trigger("snTabChangeEvent", _resp );*/
                if(globTabObj.options.callback.snTabChangeEvent){
                    globTabObj.options.callback.snTabChangeEvent.apply();
                }

            });

            //PopOver
            if(globTabObj.options.popover.enable){
                //var _selfIndex = globTabObj.selectedIndex;

                var self = globTabObj.options.popover;
                var _selOb ='';
                $('.nav-tabs li').popover({title:function(){
                    if(self.title !=null){
                        return self.title;
                    }
                    if(self.titleDp !=null){
                        var _t;
                        _selOb = $(this).attr('id');
                        $.each(globTabObj.popoverList, function(index,node) {
                            if (node['li_id'] == _selOb) {
                                _t =node['title'];
                            }
                        });
                        return _t;
                    }
                },
                    placement :self.placement,
                    trigger: self.trigger,
                    html: self.html,
                    animation:self.animation,
                    content: function(){
                        _selOb = $(this).attr('id');
                        var _template;
                        if(self.template !=null){
                            _template = self.template;
                            //globTabObj.popoverList[globTabObj.selectedIndex-1]['content'] = self.template;
                            //self.template =null;
                        }
                        else{
                            $.each(globTabObj.popoverList, function(index,node) {
                                if (node['li_id'] == _selOb) {
                                    _template = node['content'];
                                }
                            });
                        }
                        return _template;
                    }
                })
                    .on("mouseenter", function () {
                        var _this = this;
                        var _show = true;
                        $.each(globTabObj.popoverList, function(index,node) {
                            if (node['li_id'] == $(_this).attr('id')) {
                                _show = node['show'];
                            }
                        });
                        if(!_show)
                            return;
                        $(this).popover("show");
                        $(".popover").on("mouseleave", function () {
                            $(_this).popover('hide');
                        });
                    })
                    .on("mouseleave", function () {
                        var _this = this;
                        setTimeout(function () {
                            if (!$(".popover:hover").length)
                                $(_this).popover("hide");
                        }, 300);
                    });
            }//popoverEnable Close
	}
	this.createTab = function(tabId,childNode){
		var el ='';
		if(globTabObj.numberOfTabChildren ==0)
			el = '<div id="'+tabId+'" class="tab-pane fade in active">'+childNode+'</div>';
		else	
			el = '<div id="'+tabId+'" class="tab-pane fade">'+childNode+'</div>';
		$(".tab-content").append(el);
		globTabObj.numberOfTabChildren++;
	}
	this.removeAllChild=function(){
		$( ".tab-content" ).empty();
		globTabObj.numberOfTabChildren=0;
	}
	this.setTabFocus = function(index){				
		if(index =='first')
			$('.nav-tabs a:first').tab('show');
		else if(index =='last')
			$('.nav-tabs a:last').tab('show');
		else{
			var isnum = /^\d+$/.test(index);
			if(isnum)
				$('.nav-tabs li:eq('+index+') a').tab('show')
			else
				$('.nav-tabs a[href="#'+index+'"]').tab('show')
		}			
	}
}
