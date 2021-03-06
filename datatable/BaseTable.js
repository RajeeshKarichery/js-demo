function BaseTable(options){
    var defaults = {
        bSort : false,
        paging: false,
        searching: false,
        bInfo:false,
        mapKey: 'field_name',
        colRender : null,
        cols:null,
        tag_name:"rk_datagrid_table",
		editable:false,
		selectable:true,
		enable_checkbox:true,
        reorder:false,
        buttons:false,
        toolbar:false,
		callback:{
            creationComplete:null,
			buttonsClick:null,
			rkSelectBox:null
        }
    };
    defaults = $.extend(defaults,options);
    var tag_name =  defaults.tag_name;
    var dgObject = new Object;
	dgObject.tag_name = tag_name;
	dgObject.defaults = defaults;
	this.setCols = function(cols){
        defaults.cols = cols;
		dgObject.cols = cols;
        //$("#"+tag_name+"_dtgrid_box").remove();
        execDownloadTemplate();
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
					if(col.item_renderer == "rk_text_input_renderer"){
						row.push(Mustache.render(dgObject.rk_text_input_renderer,$.extend(col,{"field_value":result[col.field_name]})));
					}
					else if(col.item_renderer == "rk_image_download_file_renderer"){
						row.push(Mustache.render(dgObject.rk_image_download_file_renderer,$.extend(col,{"field_value":result[col.field_name],"file_link":result[col.field_name+"_link"]})));
					}
                    else if(col.item_renderer == "rk_image_renderer"){
                        var _keyVal="";
                        if(col.dp){
                            for(let _item of col.dp){
                                if(_item['key'] == result[col.field_name]){
                                    _keyVal = _item['value'];
                                    break;
                                }
                            }
                        }
                        row.push(Mustache.render(dgObject.rk_image_renderer,$.extend(col,{"field_value":_keyVal})));
                    }
					else if(col.item_renderer == "rk_datagrid_select_renderer"){
						var sf_id = col.field_name;
						var ele ='<td> <div class="default_renderer" data_field="'+sf_id+'"> <select id="rk_sel_box" class="form-control"><option value="-1">Select</option>';
							$.each(col.dp,function(i,row){	
								if(row['key_val'] == result[col.field_name]){
									ele +='<option value="'+row['key_val']+'" selected>'+row['key_label']+'</option>';
								}
								else{
									ele +='<option value="'+row['key_val']+'" >'+row['key_label']+'</option>';
								}
								
							});
						ele +='</select></div></td>';	
												
						row.push(Mustache.render(ele,$.extend(col,{"field_value":result[col.field_name]})));
						//dgObject.defaults.callback.rkSelectBox.call(this,_reponse);						
						//row.push(Mustache.render(dgObject.rk_datagrid_select_renderer,$.extend(col,{"field_value":result[col.field_name]})));
						
										
					}
				}
                else{
					row.push(Mustache.render(dgObject.rk_default_renderer,$.extend(col,{"field_value":result[col.field_name]})));
				}	
            }
            rows.push(row);
        }
        dgObject.datagrid.clear();
        dgObject.datagrid.rows.add(rows).draw();
    }      
    this.init = function(){
        //if(defaults.cols==undefined || defaults.cols.length<1)
          //  return callBack(dgObject);
		if(defaults.cols!=undefined && defaults.cols.length>1)	
			execDownloadTemplate();
    }
	this.getSelectedObjects = function(){
        /*var instance_objects = [];
		for(let result of dgObject.results){
			alert(result['name']);
		}
        return instance_objects;*/
		return dgObject.results;
    }
	this.getBaseObject = function(){
		return dgObject;
	}
	this.getTableData = function(){
		return dgObject.datagrid.rows().data();
	}
	
    function execDownloadTemplate(){
        downloadTemplate("custom_datatable_comps.mst",function(template){
            var rk_datagrid = $(template).filter('#rk_datagrid').html();
            dgObject.rk_text_input_renderer = $(template).filter('#rk_datagrid_text_input_renderer').html();
            dgObject.rk_default_renderer = $(template).filter('#rk_default_renderer').html();
            dgObject.rk_image_renderer = $(template).filter('#rk_datagrid_image_renderer').html();
            dgObject.rk_image_download_file_renderer = $(template).filter('#rk_datagrid_image_download_file_renderer').html();
			dgObject.rk_datagrid_select_renderer = $(template).filter('#rk_datagrid_select_renderer').html();
			
			/*my_cb_init({tag_name:'my-cb'},function(dgObject){
				_cb = dgObject;
			});*/
			
            var params = new Object;
            columns = defaults.cols;
            var datagrid_str = '<div class="form-inline" id="'+tag_name+'_dtgrid_box">';
            dgObject.cols = columns;
			//dgObject.cols = columns;
			/*for(let col of defaults.cols){
				if(col.is_itemrenderer){
					if(col.item_renderer == "rk_datagrid_select_renderer"){
						dgObject.soptions = col.dp;
					}					
				}				
			}*/
			
			datagrid_str += Mustache.render(rk_datagrid,dgObject);
            datagrid_str += "</div>";
            //$(tag_name).replaceWith(datagrid_str);
			$(tag_name).html(datagrid_str);
			//$(tag_name).append(datagrid_str);
			
			
			
			if(dgObject.defaults.buttons == true){
				dgObject.datagrid = $("#"+tag_name+"_datagrid").DataTable({
					columnDefs: [{ targets: 0, visible: true },{orderable: false, className: 'select-checkbox',targets: 1} /*,
						{
							"render": function ( data, type, row ) {
								return '<td><select class="form-control"><option value="one">One</option><option value="two">Two</option></select></td>';
							},
							"targets": 4
						}*/
					],
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
					bInfo:dgObject.defaults.bInfo
				});
			}			
            
            if(dgObject.defaults.toolbar == true){
                $( document ).trigger(tag_name+"ToolBarInitialize","");
            }           
            //callBack(dgObject);
			$( document ).trigger(tag_name+"CreationCompleted","");

			if(dgObject.defaults.callback.creationComplete){
                dgObject.defaults.callback.creationComplete.apply();
            }



			$("#"+tag_name+"_datagrid tbody").on("change","td select",function(e){
				var _reponse = new Object();
				//_reponse['data'] =  $("#"+e.target.id).val();	
				var fSelFname = $(this).parents().attr('data_field');
				
				
				var cb_value = $(this).val();				
				_reponse['data'] =  cb_value;				
				var data = dgObject.datagrid.row( $(this).parents('tr') ).data();
				
				var slno = $(data[0]).text();
				slno = slno-1;
				
				var s_row = dgObject.results[slno];
				
				var sourceDp = []
				$.each(dgObject.cols,function(i,row){
					if (row['field_name'] == fSelFname){
						sourceDp = row['dp'];	
					}
				});			

				s_row[fSelFname] = 	cb_value;				
				if(fSelFname =='dist'){
					s_row['dist'] = cb_value;
					dgObject.results[slno] = s_row;
					dgObject.defaults.callback.rkSelectBox.call(this,_reponse);
					return;
				}
				dgObject.results[slno] = s_row;
				
				$.each(dgObject.results,function(i,row){
					console.log(row);
				});
				
						
				var ele ='<td> <div class="default_renderer" data_field="'+fSelFname+'">  <select id="rk_sel_box" class="form-control"><option value="-1">Select</option>';
							$.each(sourceDp,function(i,row){	
								if(row['key_val'] == cb_value){
									ele +='<option value="'+row['key_val']+'" selected>'+row['key_label']+'</option>';
								}
								else{
									ele +='<option value="'+row['key_val']+'" >'+row['key_label']+'</option>';
								}
								
							});
						ele +='</select></div></td>';
				data[3] = ele;
				
				var despDp =[];
				$.each(sourceDp,function(i,row){
					if (row['key_val'] == cb_value){
						despDp = row['dp'];	
					}
				});	
								
				var ele ='<td> <div class="default_renderer" data_field="dist">  <select id="rk_sel_box" class="form-control"><option value="-1">Select</option>';
							$.each(despDp,function(i,row){	
								ele +='<option value="'+row['key_val']+'" >'+row['key_label']+'</option>';
							});
						ele +='</select></div></td>';
				data[4] = ele;
								
				/*var org_str = data[3];
				var $ch = $(org_str).find('div.default_renderer').html(cb_value).parent().get(0).outerHTML;
				data[3] = $ch;*/
				
				dgObject.datagrid.row($(this).parents('tr')).data(data).draw();
				
				
				
				//console.log($ch);
				//dataType.row().data(data).draw();
				//$(this).find("td").html();
				//alert($(item).html());
				//dgObject.datagrid.row(0).invalidate().draw();				
				dgObject.defaults.callback.rkSelectBox.call(this,_reponse);
				e.preventDefault();
			});
								
			

        });
    }
	//return dgObject;
	
}


function downloadTemplate(url,callBack){
	$.ajax({
		url: url,
		success: function(template){
			callBack(template);
		}
	});
}