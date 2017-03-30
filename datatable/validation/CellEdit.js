
jQuery.fn.dataTable.Api.register('MakeCellsEditable()', function (settings) {
    var table = this.table();

    jQuery.fn.extend({
        // UPDATE
        updateEditableCell: function (callingElement) {
            // Need to redeclare table here for situations where we have more than one datatable on the page. See issue6 on github
            var table = $(callingElement.closest("table")).DataTable().table();
            var row = table.row($(callingElement).parents('tr'));
            var cell = table.cell($(callingElement).parent());
            var columnIndex = cell.index().column;
            var inputField =getInputField(callingElement);

            // Update
            var newValue = inputField.val();
            if (!newValue && ((settings.allowNulls) && settings.allowNulls != true)) {
                // If columns specified
                if (settings.allowNulls.columns) {
                    // If current column allows nulls
                    if (settings.allowNulls.columns.indexOf(columnIndex) > -1) {
                        _update(newValue);
                    } else {
                        _addValidationCss();
                    }
                    // No columns allow null
                } else if (!newValue) {
                    _addValidationCss();
                }
                //All columns allow null
            } else {
                _update(newValue);
            }
            function _addValidationCss() {
                // Show validation error
                if (settings.allowNulls.errorClass) {
                    $(inputField).addClass(settings.allowNulls.errorClass)
                } else {
                    $(inputField).css({ "border": "red solid 1px" })
                }
            }
            function _update(newValue) {
                var oldValue = cell.data();
                cell.data(newValue);
                //Return cell & row.
                settings.onUpdate(cell, row, oldValue);
            }
            // Get current page
            var currentPageIndex = table.page.info().page;
            
            //Redraw table
            table.page(currentPageIndex).draw(false);
        },
        // CANCEL
        cancelEditableCell: function (callingElement) {
            var table = $(callingElement.closest("table")).DataTable().table();
            var cell = table.cell($(callingElement).parent());
            // Set cell to it's original value
            cell.data(cell.data())

            // Redraw table
            table.draw();
        }
    });

    // Destroy
    if (settings === "destroy") {
        $(table.body()).off("click", "td");
        table = null;
    }

    if (table != null) {
	
		
		
		/*$('#rk_table2_datagrid tbody tr td').each(function(e){
			alert($(this).text());
		});*/
		
		
		
	
	
        // On cell click
        $(table.body()).on('click', 'td', function () {

            var currentColumnIndex = table.cell(this).index().column;

            // DETERMINE WHAT COLUMNS CAN BE EDITED
            if ((settings.columns && settings.columns.indexOf(currentColumnIndex) > -1) || (!settings.columns)) {
                var row = table.row($(this).parents('tr'));
                editableCellsRow = row;

                var cell = table.cell(this).node();
               // var oldValue = table.cell(this).data();
			    var oldValue = cell.innerText;
				// Sanitize value
                oldValue = sanitizeCellValue(oldValue);
				
				var jD= true;
				/*var strDate = cell.innerHTML;
				var res="";
				strDate = strDate.replace(/\s/g,'');
				if(strDate.length>0){
					res = strDate.charAt(0);
				}				
				if(res =="<"){
					var  clname = $(cell.innerHTML).attr('class');					
					if(clname == "datepick my-input-class hasDatepicker error")
						jD = false;
				}				
				cell.innerHTML ="";*/
				
				//if(cell.innerHTML != ""){
					//$('#ejbeatycelledit').select();
				//}
				//else{
					// Show input
					
					if (!$(cell).find('input').length && !$(cell).find('select').length) {
						// Input CSS
						var input = getInputHtml(currentColumnIndex, settings, oldValue,jD);
						$(cell).html(input.html);
						if (input.focus) {
							$('#ejbeatycelledit').focus();							
						}						
					}
				//}
				
				
                
            }
        });
    }
    
});

function getInputHtml(currentColumnIndex, settings, oldValue,jD) {
    var inputSetting, inputType, input, inputCss, confirmCss, cancelCss;

    input = {"focus":true,"html":null}

    if(settings.inputTypes){
		$.each(settings.inputTypes, function (index, setting) {
			if (setting.column == currentColumnIndex) {
				inputSetting = setting;
				inputType = inputSetting.type.toLowerCase();
			}
		});
	}
    
    if (settings.inputCss) { inputCss = settings.inputCss; }
    if (settings.confirmationButton) {
        confirmCss = settings.confirmationButton.confirmCss;
        cancelCss = settings.confirmationButton.cancelCss;
        inputType = inputType + "-confirm";
    }
    switch (inputType) {
        case "datepicker": //Both datepicker options work best when confirming the values        
            if (typeof jQuery.ui == 'undefined') {
                alert("jQuery UI is required for the DatePicker control but it is not loaded on the page!");
                break;
            }
			if(jD)
				jQuery(".datepick").datepicker("destroy");	     	
				
			input.html = "<input id='ejbeatycelledit' type='text' name='date' class='datepick'  onchange='$(this).updateEditableCell(this);'  value='" + oldValue + "' style='width:100px;height:30px' ></input> ";
			
	        setTimeout(function () { //Set timeout to allow the script to write the input.html before triggering the datepicker 
	            var icon = "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif";
                // Allow the user to provide icon 
	            if (typeof inputSetting.options !== 'undefined' && typeof inputSetting.options.icon !== 'undefined') {
	                icon = inputSetting.options.icon;
	            }
	            var self = jQuery('.datepick').datepicker(
                    {
                        showOn: "button",
                        buttonImage: icon,
                        buttonImageOnly: true,                        
						dateFormat: 'd/mm/yy'
                    });

	        },100);			
	        break;        
    }
    return input;
}

function getInputField(callingElement) {
    // Update datatables cell value
    var inputField;
    switch ($(callingElement).prop('nodeName').toLowerCase()) {
        case 'a': // This means they're using confirmation buttons
            if ($(callingElement).siblings('input').length > 0) {
                inputField = $(callingElement).siblings('input');
            }            
            break;
        default:
            inputField = $(callingElement);
    }
    return inputField;
}

function sanitizeCellValue(cellValue) {
    if (typeof (cellValue) === 'undefined' || cellValue === null || cellValue.length < 1) {
        return "";
    }

    // If not a number
    if (isNaN(cellValue)) {
        // escape single quote
        cellValue = cellValue.replace(/'/g, "&#39;");
    }
    return cellValue;
}
