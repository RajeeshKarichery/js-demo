function ButtonTable(options){      
	//var obj = {};
	//var parentObj = BaseTable.call(this,options);
	BaseTable.call(this,options);
	//var init = parentObj.init;
	
	var init = this.init;
	var getBaseObject = this.getBaseObject;
	//obj.init = function() {
	
	this.init = function() {
		init.call();	
		
	}	
	
	this.createToolButtons = function(){
		 
        var _btn = [{id:1,label:"Created",key:"actionCreated"},{id:2,label:"Submitted",key:"actionSub"}]
		var dgObject = getBaseObject.call();	
        $.each(_btn,function(i,row){
            dgObject.datagrid.button().add(i, {
                'text': row['label'],
                'id':row['key'],
                'className': 'btn-xs',
                'action': function(e, dt, node, config) {                   
                    //$( document ).trigger(tag_name+"ButtonsChangeEvent",config);
					if(options.callback.buttonsClick){
						//options.callback.buttonsClick.apply(this,config);
						var _reponse = Object();
						_reponse['config'] = config;
						options.callback.buttonsClick.call(this,_reponse);
					}	
                }
            });
        })
    }
	
	//return obj;
}
