function my_cb_init(options,callBack){
    var defaults = {
        tag_name:'my_cb'		
    };
	var defaults = $.extend({},defaults, options );

    var dgObject = Object();
    var mycb = $(''+defaults.tag_name+'');
    var element = '<select class="form-control" id="'+defaults.tag_name+'">';
	element +='<option value="one">One</option>';
	element +='<option value="two">Two</option></select>';
	$(mycb).replaceWith(element);
	callBack($(this),dgObject);
}
