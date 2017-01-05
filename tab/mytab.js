/**
 * Created by rejeesh on 04-01-2017.
 */ 
;( function( window ) {

    'use strict';

    $.tabs         = {};
    $.tabs.defaults = {
        tag_name:'tag_name',
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
		}
    };
	
	var globTabObj = Object();
	
    var tabsObject = {
        init: function (options) {
            this.options = $.extend({}, $.tabs.defaults, options);
			if(this.options.popover.enable){
				if(!this.options.popover.html)
					this.options.popover.html = true;
				if(!this.options.popover.placement)
					this.options.popover.placement = "bottom";	
			}
			globTabObj.popoverList = [];					
            return this;
        },
        dataProvider: function (dp) {
			globTabObj.selectedIndex =1;
			var element  = '<div id="Tabs">';
				element += '<ul class="nav nav-tabs">';			
			for (var i=0;i<dp.length;i++) {
				var li_id = 'li_'+this.options.tag_name+'_'+(i+1);
				var span_id = 'span_'+this.options.tag_name+'_'+(i+1);
				var activeClass = i==0?'active':'';
				var tabId = dp[i]['id'];
				var tabLabel = dp[i]['label'];				
				element	   += '<li id="'+li_id+'" name="'+li_id+'" class="'+activeClass+'"><a href="#'+tabId+'" data-toggle="tab"><span class="'+span_id+'">'+tabLabel+' </a></li>';
				
				//Check The PopOver Enabled				
				if(this.options.popover.enable){
					if(this.options.popover.template)
						globTabObj.popoverList.push({index:i,title:"",content:"" ,li_id:li_id ,show :true});
					else{
						var _content ='';
						var _title ='';
						if(this.options.popover.templateDp)
							_content = this.options.popover.templateDp[i];
						if(this.options.popover.titleDp)
							_title = this.options.popover.titleDp[i];
											
						var _item = {index:i,title:_title,content:_content ,li_id:li_id ,show :true};
						globTabObj.popoverList.push(_item);
					}					
				}				
			}         
            element    += '</ul>';
			element    += '</div>';			
			var mytab = $("mytab");
			$(mytab).replaceWith(element);
			var self = this;			
			$(".nav-tabs a").click(function(e){		
				$(this).tab('show');
			});
			
			$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {				
				globTabObj.selectedIndex = $(e.target).closest('li').index()+1;			
			});

			//PopOver	
			if(this.options.popover.enable){
				//var _selfIndex = globTabObj.selectedIndex;	
					
				var self = this.options.popover;
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
		},
        selectedIndex: function(){
			return globTabObj.selectedIndex;
		},
		setPopoverTemplate:function(template){				
			$.each(globTabObj.popoverList, function(index,node) {				
				if ( index+1 == globTabObj.selectedIndex ) {
					node.content = template;					
				}				
			});					
		},
		setPopoverShow:function(flag){	
			$.each(globTabObj.popoverList, function(index,node) {				
				if ( index+1 == globTabObj.selectedIndex ) {
					node.show = flag;					
				}				
			});
		},
		setTabTitle:function(title){
			$('#Tabs .nav-tabs li a span').each( function() {
				var str_class =$(this).attr('class');				
				if(globTabObj.selectedIndex == str_class.slice(-1)){
					$('.'+str_class+'').html(title);
				}				
			} );
		},
		setTabTitleAll:function(dp){
			$('#Tabs .nav-tabs li a span').each( function(i) {
				var str_class =$(this).attr('class');				
				$('.'+str_class+'').html(dp[i]);								
			} );
		}
		
		
    }; //end tabsObject
	
	


    $.tabRenderer = {};
    $.tabRenderer.init = function (options) {
        var _pop = Object.create(tabsObject).init(options);
        return _pop;
    };
    function mytab(options){
        return $.tabRenderer.init(options);
    }
    window.mytab = mytab;

})( window );

