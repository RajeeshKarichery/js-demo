function RCusTable(options){      
	
	RBaseTable.call(this,options);
	
	var init = this.init;
	var getBaseObject = this.getBaseObject;	
	var dgObject;
	
	var addEventListenerItemRenderSelectCustomTrigger = this.addEventListenerItemRenderSelectCustomTrigger;	
	
	this.init = function() {
		//init.call();
		dgObject = getBaseObject.call();			
		this.execDownloadTemplate();		
		//this.addEventListenerItemRenderSelectTrigger();	
		this.addEvents();
	}
	this.addEventListenerItemRenderSelectCustomTrigger = function(){
		//addEventListenerItemRenderSelectCustomTrigger.call();
		$(document).on("change","#"+dgObject.tag_name+"_datagrid tbody td select#dep_sn_sel_box",function(e){
			var _reponse = new Object();			
			var fSelFname = $(this).parents().attr('data_field');
			var cb_value = $(this).val();
			_reponse['data'] =  cb_value;
			var data = dgObject.datagrid.row( $(this).parents('tr') ).data();
			var slno = $(data[0]).text();
			slno = slno-1;
			var s_row = dgObject.results[slno];
			var sourceDp = []
			var colOptions;
			var sourceDataIndex=1;

			$.each(dgObject.cols,function(i,row){
				if (row['field_name'] == fSelFname){
					sourceDp = row['dp'];
					colOptions = row;
					if(dgObject.defaults.enable_checkbox == true)
						sourceDataIndex = i+2;
					else
						sourceDataIndex = i+1;
				}
			});
			s_row[fSelFname] = 	cb_value;
			dgObject.results[slno] = s_row;
			$.each(sourceDp,function(i,row){
				if(row['key_val'] == cb_value){
					row['selected'] = 'selected';
				}
				else
					row['selected'] = '';
			});
			colOptions['_dp'] = sourceDp;
			var ele = Mustache.render(dgObject.sn_datagrid_select_renderer,$.extend(colOptions,{"field_name":fSelFname}));
			data[sourceDataIndex] = ele;

			if(colOptions.colTrigger == undefined){
				if(dgObject.defaults.callback.itemRenderSelectTrigger !=undefined){
					dgObject.defaults.callback.itemRenderSelectTrigger.call(this,_reponse);
					return;
				}
			}
			var destColOtions;
			var destDataIndex=1;
			$.each(dgObject.cols,function(i,row){
				if (row['field_name'] == colOptions.colTrigger){
					destColOtions = row;
					if(dgObject.defaults.enable_checkbox == true)
						destDataIndex = i+2;
					else
						destDataIndex = i+1;
				}
			});
			var destDp = jQuery.grep(destColOtions.dp, function (_item) {
				return _item['pkey'] == cb_value;
			});

			$.each(destDp,function(i,row){
				row['selected'] = '';
			});
			destColOtions['_dp'] = destDp;
			var ele =  Mustache.render(dgObject.sn_datagrid_select_renderer,$.extend(destColOtions,{"field_name":colOptions.colTrigger}));
			data[destDataIndex] = ele;
			dgObject.datagrid.row($(this).parents('tr')).data(data).draw();

			if(dgObject.defaults.callback.itemRenderSelectTrigger !=undefined)
				dgObject.defaults.callback.itemRenderSelectTrigger.call(this,_reponse);
			e.preventDefault();
		});
	}
	
	this.createTable = function(){
		dgObject.datagrid = $("#"+dgObject.tag_name+"_datagrid").DataTable({
							columnDefs: [{ targets: 0, visible: false },{orderable: false, className: 'select-checkbox',targets: 1}  ],
							select: {style: 'os', selector: 'td:first-child'},
							order: [[ 1, 'asc' ]],
							bSort : false,
							paging: false,
							searching: dgObject.defaults.searching,
							bInfo:false,
							dom: '<"toolbar">Bfrtlip',
							buttons: []
						});
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
	
	
}
