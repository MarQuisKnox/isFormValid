/**
 * isFormValid
 * Custom Form Validation
 *
 * @author      MarQuis Knox <opensouce@marquisknox.com>
 * @copyright   2013 - 2015 MarQuis Knox
 * @link        http://marquisknox.com
 * @license     Affero Public License v3
 *
 * @since		Wednesday, September 30, 2013, 12:55 PM GMT+1
 * @modified    $Date: 2014-05-04 16:36:58 -0700 (Sun, 04 May 2014) $ $Author: opensource@marquisknox.com $
 * @version     $Id: custom.validation.js 40 2014-05-04 23:36:58Z opensource@marquisknox.com $
 *
 * @category    JavaScript
 * @package     isFormValid
*/

/**
 * Determine if a form is valid
 * 
 * @param	string	formId
 * @return	boolean
*/
function isFormValid( formId )
{
	var errors		= new Array();	
	var required	= $('#' + formId).find('input[required], input[data-required="1"], textarea[required], textarea[data-required="1"], select[required], select[data-required="1"]');
	var dupes		= $('#' + formId).find('input[data-duplicate="1"], input[data-dupe="1"], textarea[data-duplicate="1"], textarea[data-dupe="1"], select[data-duplicate="1"], select[data-dupe="1"]');
	
	if( required.length > 0 ) {
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
							if( !isAlphaNumericWithDash( myValue ) ) {
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
					} else {
						$('#' + id).removeClass('inputError');
						$('#' + dupeId).removeClass('inputError');						
					}
				} else if( typeof $(this).data('dupe') !== 'undefined' ) {
					var dupeId = $(this).data('dupe');
										
					if( $(this).val() != $('#' + dupeId).val() ) {					
						errors.push( id );
						errors.push( dupeId );							
						$('#' + id).addClass('inputError');
						$('#' + dupeId).addClass('inputError');
					} else {
						$('#' + id).removeClass('inputError');
						$('#' + dupeId).removeClass('inputError');						
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

function getFormErrors( formId )
{
	var errors		= new Array();	
	var required	= $('#' + formId).find('input[required], input[data-required="1"], textarea[required], textarea[data-required="1"], select[required], select[data-required="1"]');
	
	if( required.length > 0 ) {
		required.each( function( index, value ) {
			var id		= $(this).attr('id');
			var myValue = trim( $(this).val() );
			
			if( !strlen( myValue ) ) {
				errors.push( id );
			} else {
				if( $(this).data('type') == 'email' ) {
					if( !isValidEmailAddress( myValue ) ) {
						errors.push( id );							
					}				
				}
				
				if( typeof $(this).data('rules') !== 'undefined' ) {
					var rules = $(this).data('rules');
					switch( rules ) {
						case 'alphaNumericAllowDash':
							if( !isAlphaNumericWithDash( myValue ) ) {
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
					}
				} else if( typeof $(this).data('dupe') !== 'undefined' ) {
					var dupeId = $(this).data('dupe');
					if( $(this).val() != $('#' + dupeId).val() ) {					
						errors.push( id );
						errors.push( dupeId );							
					}
				}
			}
		});		
	}
	
	return errors;
}

function isAlphaNumericWithDash( string )
{
	return string.match(/^[-a-zA-Z0-9]+$/);	
}

function isValidEmailAddress(emailAddress) 
{
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}

function strlen (string) 
{
	  // http://kevin.vanzonneveld.net
	  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Sakimori
	  // +      input by: Kirk Strobeck
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   bugfixed by: Onno Marsman
	  // +    revised by: Brett Zamir (http://brett-zamir.me)
	  // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
	  // %        note 1: characters and to this function in PHP which does not count the number of bytes
	  // %        note 1: but counts the number of characters, something like this is really necessary.
	  // *     example 1: strlen('Kevin van Zonneveld');
	  // *     returns 1: 19
	  // *     example 2: strlen('A\ud87e\udc04Z');
	  // *     returns 2: 3
	  var str = string + '';
	  var i = 0,
	    chr = '',
	    lgth = 0;

	  if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
	    return string.length;
	  }

	  var getWholeChar = function (str, i) {
	    var code = str.charCodeAt(i);
	    var next = '',
	      prev = '';
	    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
	      if (str.length <= (i + 1)) {
	        throw 'High surrogate without following low surrogate';
	      }
	      next = str.charCodeAt(i + 1);
	      if (0xDC00 > next || next > 0xDFFF) {
	        throw 'High surrogate without following low surrogate';
	      }
	      return str.charAt(i) + str.charAt(i + 1);
	    } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
	      if (i === 0) {
	        throw 'Low surrogate without preceding high surrogate';
	      }
	      prev = str.charCodeAt(i - 1);
	      if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
	        throw 'Low surrogate without preceding high surrogate';
	      }
	      return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
	    }
	    return str.charAt(i);
	  };

	  for (i = 0, lgth = 0; i < str.length; i++) {
	    if ((chr = getWholeChar(str, i)) === false) {
	      continue;
	    } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
	    lgth++;
	  }
	  return lgth;
}

function trim (str, charlist) 
{
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: mdsjack (http://www.mdsjack.bo.it)
  // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
  // +      input by: Erkekjetter
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: DxGx
  // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // *     example 1: trim('    Kevin van Zonneveld    ');
  // *     returns 1: 'Kevin van Zonneveld'
  // *     example 2: trim('Hello World', 'Hdle');
  // *     returns 2: 'o Wor'
  // *     example 3: trim(16, 1);
  // *     returns 3: 6
  var whitespace, l = 0,
    i = 0;
  str += '';

  if (!charlist) {
    // default list
    whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
  } else {
    // preg_quote custom list
    charlist += '';
    whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  }

  l = str.length;
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }

  l = str.length;
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }

  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
