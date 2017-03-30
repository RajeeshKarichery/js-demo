function RValiTable(options){      
	
	RBaseTable.call(this,options);
	
	var init = this.init;
	var getBaseObject = this.getBaseObject;	
	var dgObject;
	
	var addEventListenerItemRenderSelectCustomTrigger = this.addEventListenerItemRenderSelectCustomTrigger;	
	var addEventListenerTextInput = this.addEventListenerTextInput;	
	var addEventListenerItemRenderSelectDefaultTrigger = this.addEventListenerItemRenderSelectDefaultTrigger;	
	
	var setDp = this.setDp;	
	
	this.init = function() {
		//init.call();
		dgObject = getBaseObject.call();			
		this.execDownloadTemplate();		
		//this.addEventListenerItemRenderSelectTrigger();	
		//this.addEvents();
		//this.addEventListenerFocusInTextInput();
		//this.addEventListenerItemRenderSelectDefaultTrigger();		
	}
	
	this.addEventListenerFocusInTextInput = function(){
		
		//$(document).on("focusin","#"+dgObject.tag_name+"_datagrid tbody td ",function(e){
			//$(this).removeClass();
			//$(this).addClass("rk-td-white");
			//$(this).children().removeClass();
			//$(this).children().addClass("rk-td-white");
			
			/*var fSelFname = $(this).attr('data_field');
			var data = dgObject.datagrid.row( $(this).parents('tr') ).data();
			var sourceDataIndex=1;
			$.each(dgObject.cols,function(i,row){
				if (row['field_name'] == fSelFname){
					col = row;
					if(dgObject.defaults.enable_checkbox == true)
						sourceDataIndex = i+2;
					else
						sourceDataIndex = i+1;
				}
			});
			
			var ele = Mustache.render(dgObject.sn_text_input_renderer,$.extend(col,{"cls_name": "text_input_renderer-focus","field_value":""}));
			data[sourceDataIndex] = ele;
			//dgObject.datagrid.row($(this).parents('tr')).data(data).draw();	
			e.stopimmediatepropagation();*/
			
			
		//});
	}	
	
	this.addEventListenerTextInput = function(){
		$(document).on("focusout","#"+dgObject.tag_name+"_datagrid tbody td input",function(e){
			
			/*
			row.push(Mustache.render(dgObject.sn_text_input_renderer,$.extend(col,{"cls_name": "text_input_renderer" ,"field_value":result[col.field_name]})));
			*/
			
			var fSelFname = $(this).attr('data_field');
			var text_value = $(this).val();
			var col = Object();
			
			var data = dgObject.datagrid.row( $(this).parents('tr') ).data();
			var slno = $(data[0]).text();
			slno = slno-1;
			var s_row = dgObject.results[slno];
			s_row[fSelFname] = 	text_value;
			dgObject.results[slno] = s_row;
			
			var sourceDataIndex=1;
			$.each(dgObject.cols,function(i,row){
				if (row['field_name'] == fSelFname){
					col = row;
					if(dgObject.defaults.enable_checkbox == true)
						sourceDataIndex = i+2;
					else
						sourceDataIndex = i+1;
				}
			});
			
			var cls_name ='text_input_renderer_blank';
			if(col.is_required == true && text_value =="")
				cls_name = "text_input_renderer";
				
			var ele = Mustache.render(dgObject.sn_text_input_renderer,$.extend(col,{"cls_name": cls_name,"field_value":text_value}));
			data[sourceDataIndex] = ele;
			dgObject.datagrid.row($(this).parents('tr')).data(data).draw();
			
			
			
		});		
	}
	
	
	
	this.addEventListenerItemRenderSelectDefaultTrigger = function(){
		$(document).on("change","#"+dgObject.tag_name+"_datagrid tbody td select#sn_sel_box",function(e){			
			var fSelFname = $(this).parents().attr('data_field');
			var cb_value = $(this).val();
			var data = dgObject.datagrid.row( $(this).parents('tr') ).data();
			var slno = $(data[0]).text();
			slno = slno-1;
			dgObject.results[slno][fSelFname] = cb_value;
			//dgObject.datagrid.row($(this).parents('tr')).data(data).draw();			
			var sourceDp = [];
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
			
			$.each(sourceDp,function(i,row){
				if(row['key_val'] == cb_value){
					row['selected'] = 'selected';
				}
				else
					row['selected'] = '';
			});
			colOptions['_dp'] = sourceDp;
			var cls_name ='text_input_renderer_blank';			
			if(colOptions.is_required == true && cb_value =="-1")
				cls_name = "text_input_renderer";
				
			var ele = Mustache.render(dgObject.sn_datagrid_select_renderer,$.extend(colOptions,{"cls_name": cls_name,"field_name":fSelFname}));
			data[sourceDataIndex] = ele;
			dgObject.datagrid.row($(this).parents('tr')).data(data).draw();			
			
			if(dgObject.defaults.callback.itemRenderSelectTrigger !=undefined){
				var _reponse = new Object();
				_reponse['data'] =  cb_value;
				dgObject.defaults.callback.itemRenderSelectTrigger.call(this,_reponse);
			}
				
		});
		
	}	
	
	

	this.reDraw = function(){		
		$("#"+dgObject.tag_name+"_datagrid tbody td").each(function(){
			$(this).addClass("rk-td-warn");
		});		
	}
	this.setDp = function(results){
			dgObject.results = results;
			var rows = [];
			var i=1;
			for(let result of results){
				var row = [];
				row.push('<td>'+i+'</td>');
				i++;
				if(dgObject.defaults.enable_checkbox)
					row.push('<td><div class="checkbox"><label> <input type="checkbox" class="'+tag_name+'_guid" value="'+result[dgObject.defaults.mapKey]+'" aria-label="..."></label></div></td>');
				for(let col of dgObject.defaults.cols){
					if(result[col.field_name] == null)
						result[col.field_name] == "";
					if(col.is_itemrenderer){
						if(col.item_renderer == "sn_text_input_renderer"){	
							var cls_name ="text_input_renderer_blank";
							if(col.is_required == true)
								cls_name ="text_input_renderer";
							row.push(Mustache.render(dgObject.sn_text_input_renderer,$.extend(col,{"cls_name": cls_name ,"field_value":result[col.field_name]})));
						}
						else if(col.item_renderer == "sn_image_download_file_renderer"){
							row.push(Mustache.render(dgObject.sn_image_download_file_renderer,$.extend(col,{"field_value":result[col.field_name],"file_link":result[col.field_name+"_link"]})));
						}
						else if(col.item_renderer == "sn_image_renderer"){
							var _keyVal="";
							if(col.dp){
								for(let _item of col.dp){
									if(_item['key'] == result[col.field_name]){
										_keyVal = _item['value'];
										break;
									}
								}
							}
							row.push(Mustache.render(dgObject.sn_image_renderer,$.extend(col,{"field_value":_keyVal})));
						}
						else if(col.item_renderer == "sn_select_renderer"){
							var sf_id = "sn_select_"+tag_name+"_"+col.field_name;
							result['sf_id'] = sf_id;
							var ele ='<td><select id="'+sf_id+'" class="form-control"><option value="-1">Select</option>';
							$.each(result[col.field_name],function(i,row){
								ele +='<option value="'+row['list_key']+'" >'+row['list_value']+'</option>';
							});
							ele +='</select></td>';
							row.push(Mustache.render(ele,$.extend(col,{"field_value":result[col.field_value]})));
							$("#"+tag_name+"_datagrid tbody").on("change","td select",function(e){
							});
						}
						else if(col.item_renderer == "sn_datagrid_select_renderer" || col.item_renderer == "dep_sn_datagrid_select_renderer"){
							var _dp = col.dp;
							if(col.colDepended !=undefined){
								_dp = jQuery.grep(_dp, function (_item) {
									return _item['pkey'] == result[col.colDepended];
								});
							}
							var fc_value = result[col.field_name];
							$.each(_dp,function(i,row){
								if(row['key_val'] == fc_value){
									row['selected'] = 'selected';
								}
								else
									row['selected'] = '';
							});
							col['_dp'] = _dp;
							if(col.item_renderer == "sn_datagrid_select_renderer"){
								var cls_name ="text_input_renderer_blank";
								if(col.is_required == true)
									cls_name ="text_input_renderer";
								row.push(Mustache.render(dgObject.sn_datagrid_select_renderer,$.extend(col,{"cls_name": cls_name,"field_name":col.field_name})));
							}
							else	
								row.push(Mustache.render(dgObject.dep_sn_datagrid_select_renderer,$.extend(col,{"field_name":col.field_name})));
						}
						else if(col.item_renderer == "datagrid_date_renderer"){							
							row.push(Mustache.render(dgObject.datagrid_date_renderer,$.extend(col,{"field_name":col.field_name})));
							
						}
					}					
					else{
						var fVal = result[col.field_name];
						/*if(col.is_required == true && (fVal == undefined || fVal == "")){
							if(col.type =="datepicker"){								
								//row.push(Mustache.render(dgObject.error_datepicker_renderer,$.extend(col,{"field_value":""})));						
								row.push(Mustache.render(dgObject.sn_default_renderer,$.extend(col,{"field_value":""})));								
								
							}
							else if(col.type =="list"){
								row.push(Mustache.render(dgObject.sn_default_renderer,$.extend(col,{"field_value":result[col.field_name]})));
							}
							else
								row.push(Mustache.render(dgObject.error_default_renderer,$.extend(col,{"field_value":""})));
						}
						else*/
						/*if(col.type =="text"){
							if(col.is_required == true && (fVal == undefined || fVal == "")){
								row.push(Mustache.render(dgObject.sn_default_renderer,$.extend(col,{"field_value":""})));
							}
							else
								row.push(Mustache.render(dgObject.sn_default_renderer,$.extend(col,{"field_value":result[col.field_name]})));
						}
						else*/
							row.push(Mustache.render(dgObject.sn_default_renderer,$.extend(col,{"field_value":result[col.field_name]})));
					}
				}
				rows.push(row);
			}
			//dgObject.results = results;
			dgObject.datagrid.clear();
			dgObject.datagrid.rows.add(rows).draw();
			
			
			/*jQuery(".datepick").datepicker("destroy");								
								setTimeout(function () {									
									var self = jQuery('.datepick').datepicker(
										{
											showOn: "button",
											buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
											buttonImageOnly: true,
											buttonText: "Select date",
											dateFormat: 'd/mm/yy'
										});

								},100);*/			
								
			
			//this.reDraw();
			
			/*var rows = [];
			var i=1;
			for(let result of results){
				var row = [];
				row.push('<td>'+i+'</td>');
				i++;
				if(dgObject.defaults.enable_checkbox)
					row.push('<td><div class="checkbox"><label> <input type="checkbox" class="'+tag_name+'_guid" value="'+result[dgObject.defaults.mapKey]+'" aria-label="..."></label></div></td>');
				for(let col of dgObject.defaults.cols){
					if(result[col.field_name] == null)
						result[col.field_name] == "";						
					row.push(Mustache.render(dgObject.sn_default_renderer,$.extend(col,{"field_value":result[col.field_name]})));
					
				}
				rows.push(row);
				
			}
			
			dgObject.datagrid.clear();
			dgObject.datagrid.rows.add(rows).draw();*/
			
		}
	
	
	
	
	this.createTable = function(){
		/*dgObject.datagrid = $("#"+dgObject.tag_name+"_datagrid").DataTable({
							columnDefs: [{ targets: 0, visible: false },{orderable: false, targets: 1}  ],
							select: {style: 'os', selector: 'td:first-child'},
							order: [[ 1, 'asc' ]],
							bSort : false,
							paging: false,
							searching: dgObject.defaults.searching,
							bInfo:false
							
						});*/
						
						var iType =[];
						var iCol =[];
						var iColNull =[];						
								
						
						$.each(dgObject.defaults.cols,function(i,col){
							var _c='';
							if(col.type =='datepicker')
							_c = {"column": i+1, "type": col.type,"options": {"icon": "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif"}}
							else if(col.type =='list')
							_c = {"column": i+1, "type": col.type,"options": col.dp}
							else
								_c = {"column": i+1, "type": col.type,"options":null}
							iType.push(_c);
							iCol.push(i+1);
							if(col.is_required ==undefined || col.is_required == false)
								iColNull.push(i+1);
						});
						
						dgObject.datagrid = $("#"+dgObject.tag_name+"_datagrid").DataTable();
						
						dgObject.datagrid.MakeCellsEditable({
							"onUpdate": myCallbackFunction,
							"inputCss":'my-input-class',	
							"columns": iCol,
							"allowNulls": {
								"columns": iColNull,
								"errorClass": 'error'
							},
							"inputTypes": iType
						});
						
							
						
		
		$(document).on("click","#"+dgObject.tag_name+"_datagrid tbody td input#dt_picker",function(e){
			$(this).datepicker({ dateFormat: 'DD/MM/YYYY' }).datepicker("show");
			
		});
		
		
		
		/*$('#rk_table2 tbody td input').live('focus', function (e){
			$(this).select();
		});*/
		
		/*$('#rk_table2 tbody td.ui-datepicker-inline input').live('focus', function (e){
			
			$(this).datepicker({ dateFormat: 'yy-mm-dd' }).datepicker("show");
		});*/

		

		
		
	}
	
	function myCallbackFunction (updatedCell, updatedRow, oldValue) {
		console.log("The new value for the cell is: " + updatedCell.data());
		console.log("The old value for that cell was: " + oldValue);
		console.log("The values for each cell in that row are: " + updatedRow.data());
	}
	
	
}
