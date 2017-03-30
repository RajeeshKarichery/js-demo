function RBaseTable(options){ 
	var defaults = {
		bSort : false,
		paging: false,
		searching: false,
		bInfo:false,
		mapKey: 'field_name',
		colRender : null,
		cols:null,
		tag_name:"sn_datagrid_table",
		editable:false,
		selectable:true,
		enable_checkbox:true,
		reorder:false,
		buttons:false,
		toolbar:false,
		rowReorder: false,
		callback:{
			creationComplete:null,
			buttonsClickEvent:null,
			itemRenderSelectTrigger:null			
		}
	};
		defaults = $.extend(defaults,options);

		var tag_name =  defaults.tag_name;
		var dgObject = new Object;
		dgObject.tag_name = tag_name;
		dgObject.defaults = defaults;
		this.init = function(){		
			if(defaults.cols!=undefined && defaults.cols.length>1){			
				this.execDownloadTemplate();				
			}
			this.addEvents();	
		}
		this.addEvents = function(){
			//this.addEventListenerItemRenderSelectTrigger();
			/*this.addEventListenerRowChangeTrigger();
			this.addEventListenerRowCheckBoxChangeTrigger();
			this.addEventListenerRowHeaderCheckBoxChangeTrigger();
			
			this.addEventListenerItemRenderSelectCustomTrigger();*/
			this.addEventListenerItemRenderSelectDefaultTrigger();
			this.addEventListenerTextInput();
		}		
		
		
		/**
		*	Table Functions
		*/	
		
		
		this.getBaseObject = function(){
			return dgObject;
		}
		this.setCols = function(cols){
			defaults.cols = cols;			
			//this.execDownloadTemplate();			
		}
		this.redrawColumn = function(){
			this.execDownloadTemplate();			
		}
		this.setDp = function(results){
			dgObject.results = results;
			var rows = [];
			var i=1;
			for(let result of results){
				var row = [];
				row.push('<td>'+i+'</td>');
				i++;
				if(defaults.enable_checkbox)
					row.push('<td><div class="checkbox"><label> <input type="checkbox" class="'+tag_name+'_guid" value="'+result[defaults.mapKey]+'" aria-label="..."></label></div></td>');
				for(let col of defaults.cols){
					if(result[col.field_name] == null)
						result[col.field_name] == "";
					if(col.is_itemrenderer){
						if(col.item_renderer == "sn_text_input_renderer"){
							row.push(Mustache.render(dgObject.sn_text_input_renderer,$.extend(col,{"field_value":result[col.field_name]})));
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
							if(col.item_renderer == "sn_datagrid_select_renderer")
								row.push(Mustache.render(dgObject.sn_datagrid_select_renderer,$.extend(col,{"field_name":col.field_name})));
							else	
								row.push(Mustache.render(dgObject.dep_sn_datagrid_select_renderer,$.extend(col,{"field_name":col.field_name})));
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
		}

		this.getSelectedInstances = function(){
			instance_guids = [];
			$("#"+tag_name+"_datagrid tbody input[type='checkbox']."+tag_name+"_guid:checked").each(function(){
				instance_guids.push($(this).val());
			});
			return instance_guids;
		}
		this.getSelectedObjects = function(){
			instance_objects = [];
			$("#"+tag_name+"_datagrid tbody input[type='checkbox']."+tag_name+"_guid:checked").each(function(){
				var selected_guid = $(this).val();
				for(let result of dgObject.results){
					if(selected_guid == result[dgObject.defaults.mapKey]){
						instance_objects.push(result);
						break;
					}
				}
			});
			return instance_objects;
		}
		this.setSelectedIndex = function(data_guid){
			$("#"+tag_name+"_datagrid tbody input[type='checkbox']."+tag_name+"_guid").each(function(){
				var selected_guid = $(this).val();
				$(this).closest('tr').removeClass("selected");
				$(this).prop('checked', false);
				if(selected_guid == data_guid){
					$(this).closest('tr').addClass("selected");
					$(this).prop('checked', true);
				}
			});
		}
		this.clearCheckBox = function(){
			$("#"+tag_name+"_dt_select_all_btn").prop('checked', false);
			$("#"+tag_name+"_datagrid tbody input[type='checkbox']."+tag_name+"_guid").each(function(){
				$(this).prop('checked', false);
			});
			$("#"+tag_name+" tbody tr").removeClass("selected");
		}
		this.clearRowSelected = function(){
			dgObject.datagrid.$('tr.selected').removeClass('selected');
		}
		this.isRowSelected = function(){
			var $row =  dgObject.datagrid.$('tr.selected');
			return $row.length>0?true:false;
		}
		
		this.createTable = function(){
			dgObject.datagrid = $("#"+tag_name+"_datagrid").DataTable({
							columnDefs: [{ targets: 0, visible: false },{orderable: false, className: 'select-checkbox',targets: 1}  ],
							select: {style: 'os', selector: 'td:first-child'},
							order: [[ 1, 'asc' ]],
							bSort : dgObject.defaults.bSort,
							paging: dgObject.defaults.paging,
							searching: dgObject.defaults.searching,
							bInfo:dgObject.defaults.bInfo,
							dom: '<"toolbar">Bfrtlip',
							buttons: []
						});
		}

		/**
		*	Events Registered
		*/	
		
		
		
		this.addEventListenerTextInput = function(){
			$(document).on("change","#"+dgObject.tag_name+"_datagrid tbody input",function(e){
				alert("ppppp");		
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
				if(dgObject.defaults.callback.itemRenderSelectTrigger !=undefined){
					var _reponse = new Object();
					_reponse['data'] =  cb_value;
					dgObject.defaults.callback.itemRenderSelectTrigger.call(this,_reponse);
				}				
			});
		}	
		this.addEventListenerRowChangeTrigger = function(){
			$(document).on("click","#"+tag_name+"_datagrid tbody tr",function(){
				if(dgObject.defaults.selectable == false)
					return;
				if($(this).hasClass("selected")){
					$(this).removeClass("selected");
					$(this).find("input[type='checkbox']").prop('checked', false);
					$("#"+tag_name+"_dt_select_all_btn").prop('checked', false);
				}
				else{
					$(this).addClass("selected");
					$(this).find("input[type='checkbox']").prop('checked', true);
					if($("#"+tag_name+"_datagrid tbody tr td input[type='checkbox']:not(:checked)").length == 0)
						$("#"+tag_name+"_dt_select_all_btn").prop('checked', true);
				}
				$( document ).trigger(tag_name+"ChangeEvent","");
			});
		}
		this.addEventListenerRowCheckBoxChangeTrigger = function(){
			$(document).on("click","#"+tag_name+"_datagrid tbody tr td:first-child input[type='checkbox']",function(){
					if(dgObject.defaults.selectable == false)
						return;
					if($(this).is(":checked")){
						$(this).parent("tr").addClass("selected");
						$("#"+tag_name+"_dt_select_all_btn").prop('checked', false);
					}
					else{
						$(this).parent("tr").removeClass("selected");
						if($("#"+tag_name+"_datagrid tbody tr td:first-child input[type='checkbox']:not(:checked)").length == 0)
							$("#"+tag_name+"_dt_select_all_btn").prop('checked', true);
					}
			});		
		}
		this.addEventListenerRowHeaderCheckBoxChangeTrigger = function(){			
			$(document).on("click", "#"+tag_name+"_dt_select_all_btn",function(){
					if($(this).is(":checked")){
						if(dgObject.defaults.selectable == true)
							$("#"+tag_name+"_datagrid tbody tr").addClass("selected");
						$("#"+tag_name+"_datagrid tbody tr td:first-child input[type='checkbox']").prop('checked', true);
					}
					else{
						if(dgObject.defaults.selectable == true)
							$("#"+tag_name+"_datagrid tbody tr").removeClass("selected");
						$("#"+tag_name+"_datagrid tbody tr td:first-child input[type='checkbox']").prop('checked', false);
					}
					$( document ).trigger(tag_name+"ChangeEvent","");
			});			
		}
		
		
		this.execDownloadTemplate = function(){
			var self = this;	
			downloadTemplate("rcustom_datatable_comps.mst",function(template){
				var sn_datagrid = $(template).filter('#sn_datagrid').html();
				dgObject.sn_text_input_renderer = $(template).filter('#sn_datagrid_text_input_renderer').html();
				dgObject.sn_default_renderer = $(template).filter('#sn_default_renderer').html();
				dgObject.sn_image_renderer = $(template).filter('#sn_datagrid_image_renderer').html();
				dgObject.sn_image_download_file_renderer = $(template).filter('#sn_datagrid_image_download_file_renderer').html();
				dgObject.sn_select_box = $(template).filter('#sn_select_box').html();
				dgObject.sn_datagrid_select_renderer = $(template).filter('#sn_datagrid_select_renderer').html();
				dgObject.dep_sn_datagrid_select_renderer = $(template).filter('#dep_sn_datagrid_select_renderer').html();
				dgObject.datagrid_date_renderer = $(template).filter('#datagrid_date_renderer').html();
				
				dgObject.error_default_renderer = $(template).filter('#error_default_renderer').html();
				dgObject.error_datepicker_renderer = $(template).filter('#error_datepicker_renderer').html();
				dgObject.sn_number_input_renderer = $(template).filter('#sn_number_input_renderer').html();
				dgObject.sn_checkbox_renderer = $(template).filter('#sn_checkbox_renderer').html();
				
								

				var params = new Object;
				columns = defaults.cols;
				
				
				var datagrid_str = '<div class="form-inline" id="'+tag_name+'_dtgrid_box">';
				dgObject.cols = columns;

				datagrid_str += Mustache.render(sn_datagrid,dgObject);
				datagrid_str += "</div>";
				$(tag_name).html(datagrid_str);
				//$("#"+tag_name+"_dtgrid_box").remove();
				//$(tag_name).append(datagrid_str);
				
				self.createTable();
							
				/*if(dgObject.defaults.reorder == true){
					dgObject.datagrid = $("#"+tag_name+"_datagrid").DataTable({
						columnDefs: [{ targets: 0, visible: false },{orderable: false, className: 'select-checkbox',targets: 1}  ],
						select: {style: 'os', selector: 'td:first-child'},
						bSort : dgObject.defaults.bSort,
						paging: dgObject.defaults.paging,
						searching: dgObject.defaults.searching,
						bInfo:dgObject.defaults.bInfo,
						rowReorder: {
							selector: 'td:not(:first-child)'
						}
					});
				}
				else{
					if(dgObject.defaults.buttons == true){
						dgObject.datagrid = $("#"+tag_name+"_datagrid").DataTable({
							columnDefs: [{ targets: 0, visible: false },{orderable: false, className: 'select-checkbox',targets: 1}  ],
							select: {style: 'os', selector: 'td:first-child'},
							order: [[ 1, 'asc' ]],
							bSort : dgObject.defaults.bSort,
							paging: dgObject.defaults.paging,
							searching: dgObject.defaults.searching,
							bInfo:dgObject.defaults.bInfo,
							dom: '<"toolbar">Bfrtlip',
							buttons: []
						});
					}
					else{
						dgObject.datagrid = $("#"+tag_name+"_datagrid").DataTable({
							columnDefs: [{ targets: 0, visible: false },{orderable: false, className: 'select-checkbox',targets: 1}  ],
							select: {style: 'os', selector: 'td:first-child'},
							order: [[ 1, 'asc' ]],
							bSort : dgObject.defaults.bSort,
							paging: dgObject.defaults.paging,
							searching: dgObject.defaults.searching,
							bInfo:dgObject.defaults.bInfo,
							rowReorder:dgObject.defaults.rowReorder
						});
					}
				}*/
				
				
				
				if(dgObject.defaults.toolbar == true){
					$( document ).trigger(tag_name+"ToolBarInitialize","");
				}
				
				if(dgObject.defaults.callback.creationComplete){
					dgObject.defaults.callback.creationComplete.apply();
				}

				//implement any item_renderer callBacks here
				/*$("#"+tag_name+"_datagrid tbody").on("change","input.text_input_renderer",function(){
					var currentRow = $(this).closest("tr").index();
					var method = "on_"+$(this).attr("data_field")+"_changed";
					dgObject.results[currentRow][$(this).attr("data_field")] = $(this).val();
					dgObject[method]($(this));
				});*/

				
			});				
			
			
			
			
		}
}
function downloadTemplate(url,callBack){
	$.ajax({
		url: url,
		success: function(template){
			callBack(template);
		}
	});
}