	/*function child_button_init(options,callBack){
		var childObj = my_button_init(options,callBack);
		
		childObj.init = function(){
			this.build();
		}
		childObj.getNameOver = function(){
			this.getName();
			alert("getName From --- Child");
		}	
		return childObj;
	}*/



	/*function child_button_init(){
		
		my_button_init.call(this);
		var build = this.build;
		this.build = function(){
			build.call();
		}
		
		
	}*/
	
	function ChildClass() {
		BaseClass.call(this);
		var run = this.run;
		this.run = function() {
			run.call();
			alert("ChildClass()::run()");			
		}		
	}
	
	function ChildButton(options) {
		var obj = {};
		var paretObj = BaseButton.call(this,options);
		var build = paretObj.build;
		obj.build = function() {
			build.call();
			alert("ChildButton()::build()");			
		}		
		return obj;
	}

	
	
	/*function Rectangle() {
		Shape.call(this); // call super constructor.		
	}
	Rectangle.prototype = Object.create(Shape.prototype);
	Rectangle.prototype.constructor = Rectangle;
	*/
