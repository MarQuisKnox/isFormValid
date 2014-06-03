/**
 * isFormValid
 * Custom Form Validation
 *
 * @author      MarQuis Knox <opensouce@marquisknox.com>
 * @copyright   2013 MarQuis Knox
 * @link        http://marquisknox.com
 * @license     Affero Public License v3
 *
 * @since  	    Wednesday, September 30, 2013, 12:55 PM GMT+1
 * @modified    $Date: 2014-05-04 16:36:58 -0700 (Sun, 04 May 2014) $ $Author: opensource@marquisknox.com $
 * @version     $Id: custom.validation.js 40 2014-05-04 23:36:58Z opensource@marquisknox.com $
 *
 * @category    JavaScript
 * @package     isFormValid
*/

function formIsValid( formId )
{
	var errors		= new Array();	
	var required	= $('#' + formId).find('input[data-required="1"], textarea[data-required="1"], select[data-required="1"]');
	var dupes		= $('#' + formId).find('input[data-duplicate="1"], textarea[data-duplicate="1"], select[data-duplicate="1"]');
	
	if( !empty( required ) ) {
		required.each( function( index, value ) {
			var id		= $(this).attr('id');
			var myValue = trim( $(this).val() );
			
			if( !strlen( myValue ) ) {
				$('#' + id).addClass('inputError');
				errors.push( id );
			} else {
				if( $(this).data('type') == 'email' ) {
					if( isValidEmailAddress( myValue ) ) {
						$('#' + id).removeClass('inputError');							
					} else {
						errors.push( id );
						$('#' + id).addClass('inputError');							
					}						
				}
				
				if( typeof $(this).data('rules') !== 'undefined' ) {
					var rules = $(this).data('rules');
					switch( rules ) {
						case 'alphaNumericAllowDash':
							if( !isAlphaNumericWithSlash( myValue ) ) {
								$('#' + id).addClass('inputError');
								errors.push( id );	
							}
							
							break;
					}
				}
				
				if( typeof $(this).data('duplicate') !== 'undefined' ) {
					var dupeId = $(this).data('duplicate');
										
					if( $(this).val() != $('#' + dupeId).val() ) {					
						errors.push( id );
						errors.push( dupeId );							
						$('#' + id).addClass('inputError');
						$('#' + dupeId).addClass('inputError');
					}
				}
			}
			
			var type = strtolower( $('#' + id).prop('tagName') );
			switch( type ) {
				case 'select':
					$('#' + id).change(function() {
						var myValue = trim( $(this).val() );
						if( strlen( myValue ) ) {
							if( $(this).data('type') != 'email' ) {
								$('#' + id).removeClass('inputError');						
							} else {
								if( isValidEmailAddress( myValue ) ) {
									$('#' + id).removeClass('inputError');							
								} else {
									$('#' + id).addClass('inputError');							
								}
							}	
						} else {
							$('#' + id).addClass('inputError');					
						}						
					});
					
					break;
					
				default:
					$('#' + id).bind('keyup paste', function() {
						var myValue = trim( $(this).val() );
						if( strlen( myValue ) ) {
							if( $(this).data('type') != 'email' ) {
								$('#' + id).removeClass('inputError');						
							} else {
								if( isValidEmailAddress( myValue ) ) {
									$('#' + id).removeClass('inputError');							
								} else {
									$('#' + id).addClass('inputError');							
								}
							}	
						} else {
							$('#' + id).addClass('inputError');					
						}
					});						
			}
		
		});		
	}
	
	var errorSize = errors.length;
	if( errorSize > 0 ) {		
		$.each(errors, function( index, value ) {
			var element = $('#' + value);
			element.addClass('inputError');
		});
		
		return false;
	} else {
		required.each( function( index, value ) {
			var id = $(this).attr('id');
			$('#' + id).removeClass('inputError');
		});
		
		return true;		
	}	
}

function isValidEmailAddress(emailAddress) 
{
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}
