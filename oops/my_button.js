	/*function my_button_init(options,callBack){
		return{			
			build:function(){
				var defaults = {
					tag_name:'button',
					label:null
				};
				var defaults = $.extend({},defaults, options );
				var dgObject = Object();
				var mybutton = $(''+options.tag_name+'');
				var element = '<button id="'+options.tag_name+'">'+defaults.label+'</button>';
				$(mybutton).replaceWith(element);				
			},
			getName:function(){
				alert("Button parent.....");
			}
		}
	}*/
	
	
	/*function my_button_init(){			
		this.build = function(){
			var defaults = {
				tag_name:'button',
				label:null
			};
			var defaults = $.extend({},defaults, options );
			var dgObject = Object();
			var mybutton = $(''+options.tag_name+'');
			var element = '<button id="'+options.tag_name+'">'+defaults.label+'</button>';
			$(mybutton).replaceWith(element);				
		}
		this.getName=function(){
			alert("Button parent.....");
		}
		
	}*/
	
	
	
	
	
	
	/**
	*	Factory
	*/
	
	function Animal(options){ 
		return {
			run: function() {
			  alert(options.tag_name + " From Parent!")
			},
			getAge: function() {
			  alert("10");
			}
		}
	}
	function Rabbit(options) {    
		var rabbit = Animal(options) // make animal		
		rabbit.getName = function() { // mutate
			//this.run();
			this.getAge();
			alert(options.tag_name + " Child! :)")
		}
		this.getAge = function(){
			alert(20);
		}
		return rabbit;
	}
	
	
	/**
	*	Inheritance
	*/	
	
		
	function BaseClass() {		
		this.run = function() {
			alert("BaseClass::run()");			
		}		
	}
	
	function BaseButton(options) {
		var obj = {};
		obj.build  = function() {			
			var defaults = {
				tag_name:'button',
				label:null
			};
			var defaults = $.extend({},defaults, options );
			var dgObject = Object();
			var mybutton = $(''+options.tag_name+'');
			var element = '<button id="'+options.tag_name+'">'+defaults.label+'</button>';
			$(mybutton).replaceWith(element);		
		}	
		return obj;		
	}

	
	
	
	
	
	
		

/*function my_button_init(options,callBack){
    var defaults = {
        tag_name:'button',
		label:null
    };
	var defaults = $.extend({},defaults, options );

    var dgObject = Object();
    var mybutton = $(''+options.tag_name+'');
    var element = '<button id="'+options.tag_name+'">'+defaults.label+'</button>';
    $(mybutton).replaceWith(element);

	$("#"+options.tag_name).click(function(){
		alert("am base");
	});
	
	dgObject.getName2 = function(){
		alert("getName From --- Parent");
	}	
	
	callBack($(this),dgObject);
}

function child_button_init(options,callBack){
	var childObj = my_button_init(options,callBack) // make Parent
	childObj.getName = function(){
		alert("getName From --- Child");
	}	
	callBack($(this),childObj);
}*/




/*

// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  alert('Shape moved.');
};
*/