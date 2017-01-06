function my_date(options,callBack){

    var defaults = {
        tag_name:'datepicker',
		futureDate:true,
		changeYear:false,
		yearRange: "1950:2017"
    };
	var defaults = $.extend({},defaults, options );

    var dgObject = Object();
    var mydate = $(''+options.tag_name+'');
    var element = '<input type="text" id="'+options.tag_name+'">';
    $(mydate).replaceWith(element);
	
	if(!defaults.futureDate)
		defaults.maxDate = new Date();
			
	$('#'+options.tag_name+'').datepicker(defaults);
     callBack($(this),dgObject);

}
