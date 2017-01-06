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
        },
        callback:{
            snTabChangeEvent:null
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
            globTabObj.options = this.options;
            return this;
        },
        dataProvider: function (dp) {
            globTabObj.selectedIndex =1;
            var element  = '<div id="'+this.options.tag_name+'_Tabs">';
            element += '<ul class="nav nav-tabs">';
            for (var i=0;i<dp.length;i++) {
                var li_id = 'li_'+this.options.tag_name+'_'+(i+1);
                var span_id = 'span_'+this.options.tag_name+'_'+(i+1);
                var activeClass = i==0?'active':'';
                var tabId = dp[i]['id'];
                var tabLabel = dp[i]['label'];
                element	   += '<li id="'+li_id+'" name="'+li_id+'" class="'+activeClass+'"><a href="#'+tabId+'" data-toggle="tab" class="sntab-default"><span class="'+span_id+'">'+tabLabel+' </a></li>';

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
			var sntab = $(''+this.options.tag_name+'');
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
        setPopoverTemplateAll:function(dp){
            $.each(globTabObj.popoverList, function(index,node) {
                node.content = dp[index];
                node.show = node.content ==""?false:true;
            });
        },
        setTabTitle:function(title){
            $('#'+this.options.tag_name+'_Tabs .nav-tabs li a span').each( function() {
                var str_class =$(this).attr('class');
                if(globTabObj.selectedIndex == str_class.slice(-1)){
                    $('.'+str_class+'').html(title);
                }
            } );
        },
        setTabTitleAll:function(dp){
            $('#'+this.options.tag_name+'_Tabs .nav-tabs li a span').each( function(i) {
                var str_class =$(this).attr('class');
                $('.'+str_class+'').html(dp[i]);
            } );
        },
        setTabStyleAll:function(defaultStyle,dp){
            $('#'+this.options.tag_name+'_Tabs .nav-tabs li a').each( function(i) {
                $(this).removeClass(defaultStyle);
                $(this).addClass(dp[i]);
            } );
        }


    }; //end tabsObject


    $.tabRenderer = {};
    $.tabRenderer.init = function (options) {
        var _tab = Object.create(tabsObject).init(options);
        return _tab;
    };
    function SNTab(options){
        return $.tabRenderer.init(options);
    }
    window.SNTab = SNTab;

})( window );

/**
 * Created by rejeesh on 05-01-2017.
 */
