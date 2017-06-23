function RScrollTable(options){      
	
	RBaseTable.call(this,options);	
	var init = this.init;
	var getBaseObject = this.getBaseObject;	
	var dgObject;		
	this.init = function() {
		//init.call();
		dgObject = getBaseObject.call();
		if(dgObject.defaults.cols!=undefined && dgObject.defaults.cols.length>1){			
			this.execDownloadTemplate();				
		}		
		this.addEvents();		
	}
	
	this.resizeCols = function(){
		setTimeout( function () {
			dgObject.datagrid.resize(); }, 10 );
			
	}	
	
	this.createTable = function(){
		dgObject.datagrid = $("#"+dgObject.tag_name+"_datagrid").DataTable({
							columnDefs: [{ targets: 0, visible: false },{orderable: false, targets: 1}  ],
							select: {style: 'os', selector: 'td:first-child'},
							order: [[ 1, 'asc' ]],
							bSort : false,							
							searching: dgObject.defaults.searching,
							bInfo:true,
							scrollY:"200px",
							scrollCollapse: true
							//"sDom": '<"H"lfrp>t<"F"i>',
							//"dom": '<"top"flpi>rt<"clear">'
							/*,
							
							/*"fnInitComplete": function() {
								//this.fnAdjustColumnSizing();
								//alert("oko");
								//var t = setTimeout(function () {
									//this.fnAdjustColumnSizing(false);}, 300);
									var self =dgObject.datagrid;
									setTimeout(function(){
											//alert("tim"); 
											//dgObject.datagrid.fnAdjustColumnSizing();
									},1000);
									
							}*/

							
						});
						
			/*$('#rk_mobile_datagrid').on( 'fnInitComplete', function () {
				console.log( 'Redraw occurred at: '+new Date().getTime() );
			} );*/		

				
						
	}	
	
	
}
