$.fn.firstClick = function( callback ) {
			return this.bindOnce( "click", callback );
		};
		
		$.fn.bindOnce = function( event, callback ) {
			/*var element = $( this[ 0 ] ),
				defer = element.data( "bind_once_defer_" + event );
		 
			if ( !defer ) {
				defer = $.Deferred();
				function deferCallback() {
					element.unbind( event, deferCallback );
					defer.resolveWith( this, arguments );
				}
				element.bind( event, deferCallback )
				element.data( "bind_once_defer_" + event , defer );
			}
		 
			//return defer.done( callback ).promise();
			return defer.promise();*/
			
			
			
			
			var type = 'fx';
			var defer = jQuery.Deferred(),
			  elements = this,
			  i = elements.length,
			  count = 1,
			  deferDataKey = type + "defer",
			  queueDataKey = type + "queue",
			  markDataKey = type + "mark",
			  tmp;
			function resolve() {
			  if ( !( --count ) ) {
				defer.resolveWith( elements, [ elements ] );
			  }
			}
			while( i-- ) {
			  if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
				  ( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
					jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
				  jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
				count++;
				tmp.add( resolve );
			  }
			}
			resolve();
			return defer.promise();	
			
			
			
			
		};
		
		
	
		
		
	$._Deferred = $.Deferred;
	$.Deferred = function (param) {
		var deferredToExtend = $._Deferred(param);

		deferredToExtend.test = function (param) {
			var deferred = $.Deferred();
			deferredToExtend.always(deferred.resolve.bind(deferred, param));
			return deferred.promise();
		};

		return deferredToExtend;
	};
	
	var deferred = $.Deferred();

	deferred
    .test("Deferred object was extended successfully")
    .then(function success(result) {
       // alert("Success. " + result);
    }, function fail(err) {
        alert("Failure. " + err);
    });
	deferred.reject("test");