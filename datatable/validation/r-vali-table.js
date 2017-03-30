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
		if(dgObject.defaults.cols!=undefined && dgObject.defaults.cols.length>1){			
			this.execDownloadTemplate();				
		}	
		//this.execDownloadTemplate();		
		//this.addEventListenerItemRenderSelectTrigger();	
		this.addEvents();
		this.addEventListenerFocusInTextInput();
		this.addEventListenerItemRenderSelectDefaultTrigger();		
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
		$(document).on("focusout","#"+dgObject.tag_name+"_datagrid tbody td input#txt_render",function(e){
						
			//row.push(Mustache.render(dgObject.sn_text_input_renderer,$.extend(col,{"cls_name": "text_input_renderer" ,"field_value":result[col.field_name]})));
			
			
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
		
		$(document).on("focusout","#"+dgObject.tag_name+"_datagrid tbody td input#num_render",function(e){
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
				var ele = Mustache.render(dgObject.sn_number_input_renderer,$.extend(col,{"cls_name": cls_name,"field_value":text_value}));
				data[sourceDataIndex] = ele;
				dgObject.datagrid.row($(this).parents('tr')).data(data).draw();			
		});

		
		$(document).on("keypress","#"+dgObject.tag_name+"_datagrid tbody td input#num_render",function(event){
			var key = window.event ? event.keyCode : event.which;
			if (event.keyCode === 8 || event.keyCode === 46) {
				return true;
			} else if ( key < 48 || key > 57 ) {
				return false;
			} 
			else {				
				return true;
			}
		});
		
		
		$(document).on("change","#"+dgObject.tag_name+"_datagrid tbody td input#checkbox_render",function(e){
				var text_value='N';
				var fVal="";
				if($(this).is(':checked')){
					text_value="Y";
					fVal = "checked";
				}					
				var col = Object();				
				var data = dgObject.datagrid.row( $(this).parents('tr') ).data();
				var slno = $(data[0]).text();
				slno = slno-1;
				var s_row = dgObject.results[slno];
				var fSelFname = $(this).attr('data_field');
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
				
				
				
				var cls_name ='checkbox_render_default';
				if(col.is_required == true && text_value =="N")
					cls_name = "checkbox_render_error";				
				var ele = Mustache.render(dgObject.sn_checkbox_renderer,$.extend(col,{"cls_name": cls_name,"checked":fVal}));
				data[sourceDataIndex] = ele;
				dgObject.datagrid.row($(this).parents('tr')).data(data).draw();	
			
			
			
		});
		
		
		
		$(document).on("mouseover","#"+dgObject.tag_name+"_datagrid tbody td img",function(e){
			
				var self = this;
				$(this).popover({placement:'bottom',html:true,content:function(){ 
						var fSelFname = $(self).attr('data_field');						
						if (fSelFname == 'tick_circle.png')
							return '<span class="label label-success">P</span>';
						else
							return '<span class="label label-danger">A</span>';
					}
				}).on("mouseenter", function () {
                        var _this = this;                       
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
							var fVal = result[col.field_name];
							if(fVal == undefined)
								fVal ="";
							if(col.is_required == true && fVal =="")
								cls_name ="text_input_renderer";
							row.push(Mustache.render(dgObject.sn_text_input_renderer,$.extend(col,{"cls_name": cls_name ,"field_value":fVal})));
						}
						else if(col.item_renderer == "sn_number_input_renderer"){
							var cls_name ="text_input_renderer_blank";
							var fVal = result[col.field_name];
							if(fVal == undefined)
								fVal ="";
							if(col.is_required == true && fVal =="")
								cls_name ="text_input_renderer";
							row.push(Mustache.render(dgObject.sn_number_input_renderer,$.extend(col,{"cls_name": cls_name ,"field_value":fVal})));
						}
						else if(col.item_renderer == "sn_checkbox_renderer"){
							var cls_name ="checkbox_render_default";
							var fVal = result[col.field_name];
							if(fVal == undefined)
								fVal ="";
							else if (fVal =='Y')	
								fVal = "checked";
							if(col.is_required == true && fVal =="")
								cls_name ="checkbox_render_error";								
							row.push(Mustache.render(dgObject.sn_checkbox_renderer,$.extend(col,{"cls_name": cls_name ,"checked":fVal})));
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
							row.push(Mustache.render(dgObject.error_datepicker_renderer,$.extend(col,{"field_name":col.field_name})));
							//row.push(Mustache.render(dgObject.sn_default_renderer,$.extend(col,{"field_value":result[col.field_name]})));
							
							
						}
					}					
					else{
						row.push(Mustache.render(dgObject.sn_default_renderer,$.extend(col,{"field_value":result[col.field_name]})));
					}
				}
				rows.push(row);
			}
			//dgObject.results = results;
			dgObject.datagrid.clear();
			dgObject.datagrid.rows.add(rows).draw();
			
			//this.reDraw();
			
		}
	
	
	
	
	this.createTable = function(){
		dgObject.datagrid = $("#"+dgObject.tag_name+"_datagrid").DataTable({
							columnDefs: [{ targets: 0, visible: false },{orderable: false, targets: 1}  ],
							select: {style: 'os', selector: 'td:first-child'},
							order: [[ 1, 'asc' ]],
							bSort : false,
							paging: false,
							searching: dgObject.defaults.searching,
							bInfo:false
							
						});
					
						
						
					var iType =[];
					var iCol =[];
					var iColNull =[];								
					
					$.each(dgObject.defaults.cols,function(i,col){
						var _c='';
						if(col.item_renderer =='datagrid_date_renderer'){
							_c = {"column": i+1, "type": "datepicker","options": {"icon": "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif"}}
							iType.push(_c);
							iCol.push(i+1);
							if(col.is_required ==undefined || col.is_required == false)
							iColNull.push(i+1);
						}						
					});
					
										
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


					
					
					
						
		
		/*$(document).on("click","#"+dgObject.tag_name+"_datagrid tbody td input#dt_picker",function(e){
			$(this).datepicker({ dateFormat: 'DD/MM/YYYY' }).datepicker("show");			
		});*/
		
		
		
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
