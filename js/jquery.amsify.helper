 // Amsify42 Helper 1.0.0
 // http://www.amsify42.com
 (function(AmsifyHelper, $, undefined) {
    /**
     * this function is called by default to add flash errors to html body at top
     */
    setFlashMessage();
    /**
     * assign the base url to public property which is accessible from outside
     * @type {string}
     */
    AmsifyHelper.base_url = window.location.protocol+'//'+window.location.host;
    /**
     * create path based on base url
     * @param  {string} path
     * @return {string}
     */
    AmsifyHelper.AppUrl = function(path) {
        var appUrl = AmsifyHelper.base_url;
        if(AmsifyHelper.getLocale()) {
            appUrl += '/'+AmsifyHelper.getLocale();    
        }
        appUrl += '/'+path;
        return appUrl;
    };
    /**
     * get Locale from meta tag
     * @return {string}
     */
    AmsifyHelper.getLocale = function(path) {
        return $('meta[name="_locale"]').attr('content')
    };
    /**
     * get unique token from meta tag if it is set
     * @return {string}
     */
    AmsifyHelper.getToken = function() {
        return $('meta[name="_token"]').attr('content');
    };

    /**
     * add event either directly to selector or from DOM
     * @param {boolean}  fromDOM
     * @param {string}   event
     * @param {selector} selector
     * @param {function} callback
     */
    AmsifyHelper.setEvent = function(fromDOM, event, selector, callback) {
        if(fromDOM) {
          $(document).on(event, selector, callback);
        } else {
          $(selector).on(event, callback);
        }
    };

    /**
     * get selector of input by name
     * @param  {string} name
     * @return {string}
     */
    AmsifyHelper.fieldByName = function(name) {
        return '*[name="'+name+'"]';
    };

    /**
     * get absolute/relative url based on value passed
     * @param  {string} urlString
     * @return {string}
     */
    AmsifyHelper.getActionURL = function(urlString) {
        var URL       = AmsifyHelper.base_url;
        var regexURL  = new RegExp('^(?:[a-z]+:)?//', 'i');
        if(regexURL.test(urlString)) {
            URL = urlString;
        } else {
            URL += '/'+urlString;
        }
        return URL;
    };

    /**
     * stop form submit
     * @param  {event}    e
     * @param  {selector} submitSelector
     * @param  {string}   defaultText
     * @param  {boolean}  ret
     * @return {boolean}
     */
    AmsifyHelper.stopSubmit = function(e, submitSelector, defaultText, ret) {
        e.preventDefault(); 
        if(submitSelector !== undefined && defaultText !== undefined) {
            $submitSelector.prop('disabled', false).html(defaultText); 
        }
        if(ret !== undefined) {
            return ret;
        }
    };

    /**
     * detect IE browser
     * @return {integer}
     */
    AmsifyHelper.detectIE = function() {

        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // IE 12 => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    };


    /**
     * based on browser formdata will be created
     * @param  {selector} formSelector
     * @param  {boolean}  serialize
     * @param  {object}   extraFields
     * @return {object}
     */
    AmsifyHelper.getFormData = function(formSelector, serialize, extraFields) {

    	var formData;

    	if(!AmsifyHelper.detectIE() && (serialize === undefined || serialize === false)) {
	      	formData = new FormData($(formSelector)[0]); 
	            // adding custom fields
	            if(extraFields !== undefined) {
		            if(getObjectSize(extraFields) > 0) {
		                $.each(extraFields, function(key, val) {
		                  formData.append(key, val);  
		                });
		            }
	            }
	      } else {
	        formData = $(formSelector).serialize();
	            // adding custom fields
	            if(extraFields !== undefined) {
		            if(getObjectSize(extraFields) > 0) {
		                $.each(extraFields, function(key, val) {
                            formData += '&'+key+'='+val; 
		                });
		            }
	            }
	      }
	    return formData;  
    };

    /**
     * get object size
     * @param  {object} object
     * @param  {string} key
     * @return {integer}
     */
    AmsifyHelper.getObjectSize = function(object, key) {
    	  var count = 0;
        var key;
        for(key in object) {
            if(object.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    };

    /**
     * make the array distinct
     * @param  {array} array
     * @return {array}
     */
    AmsifyHelper.distinctArray = function(array) {
       var result = [];
       $.each(array, function(index,value){
           if($.inArray(value, result) == -1) {
               result.push(value); 
           } 
       });
       return result;
    };

    /**
     * uppercase the text
     * @param  {string} string
     * @return {string}
     */
    AmsifyHelper.upperCaseFirst = function(string) {
    	return string.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
    };


    /**
     * show url on browser address bar
     * @param  {string}  path
     * @param  {integer} page
     */
    AmsifyHelper.showURL  = function(path, page) {
        if(AmsifyHelper.detectIE() == false) {
            var targetURL   =  '';
            if(path !== undefined) {
                targetURL  +=  path;  
            }
            if(page !== undefined) {
                targetURL  +=  '?page='+page;  
            }
            window.history.pushState('', '', targetURL);
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    };

    /**
     * show flash message
     * @param  {string} message
     * @param  {string} type
     */
    AmsifyHelper.showFlash = function(message, type) {
        if(message !== undefined) {            
            if($('.amsify-fixed-message').length && $('.amsify-fixed-message').css('display') == 'block') {
                $('.amsify-fixed-message').slideUp('fast', function(){
                    checkMessage(message, type);
                    $('.amsify-fixed-message').slideDown();
                    setTimeout(function(){ $('.amsify-fixed-message').slideUp();}, 5000);
                });
            } else {
                checkMessage(message, type);
                $('.amsify-fixed-message').slideDown();
                setTimeout(function(){ $('.amsify-fixed-message').slideUp();}, 5000);
            }
        }
    };


    /**
     * check whether message is appended in html
     * @param  {string} message
     * @param  {string} type
     */
    function checkMessage(message, type) {
        var msgClass    = 'black';
        if(type !== undefined) {
            if(type == 'error') {
                msgClass = 'red';
                message = '\u2718 '+message;
            } else if(type == 'success') {
                msgClass = 'green';
                message = '\u2714 '+message;
            } else if(type == 'info') {
                msgClass = 'blue';
            }
        }

        var appendMessages = false;
        if(AmsifyHelper.detectIE()) {
           if($('.amsify-fixed-message').html() === undefined) {
                appendMessages = true;
           }     
        } else {
            if(!$('.amsify-fixed-message').length) {
                appendMessages = true;
            }    
        }

        if(appendMessages) {
            var structure =    [
              {'<div/>': { 'class':'amsify-fixed-message '+msgClass, text:message }, 'prependTo': 'body'},
              {'<span/>': { 'class':'amsify-message-close', 'text':'\u2716'}, 'appendTo': '.amsify-fixed-message'},
            ];
            AmsifyHelper.addHTML(structure);
        } else {
            $('.amsify-fixed-message').attr('class', 'amsify-fixed-message '+msgClass).html(message+'<span class="amsify-message-close">X</span>');
        }
    }

    /**
     * convert object to html tags
     * @param {object}
     */
    AmsifyHelper.addHTML = function(htmlStructure) {
        $.each(htmlStructure, function(index, element){
          var $object;
          if(element !== undefined) {
              $.each(element, function(key, tag){
                if(key != 'appendTo' && key != 'prependTo') {
                  $object = $(key, tag);
                } else {
                  $object[key](tag);
                }
              });
            }
        });
    };

    /**
     * iterate form field errors
     * @param  {array} fields
     */
    AmsifyHelper.iterateErrors = function(fields) {
        $.each(fields, function(field, message){
          AmsifyHelper.showError(field, message);
        });
    };

    /**
     * create click hide message event
     */
    function setFlashMessage() {
        $(document).on('click', '.amsify-message-close', function(){
            $(this).parent('.amsify-fixed-message').slideUp();
        });
    };

    /**
     * invoke callback based on config or element attribute
     * @param  {object}   config
     * @param  {string}   key      
     * @param  {selector} selector
     * @param  {string}   attr
     */
    AmsifyHelper.callback = function(config, key, selector, attr) {
        var checkAttr = true;
        if(config !== undefined) {
            if(config[key] !== undefined && typeof config[key] == "function") {
                checkAttr = false;
                config[key]();
            }
        }
        if(checkAttr && selector !== undefined && attr !== undefined) {
            if($(selector).attr(attr)) {
              eval($(selector).attr(attr));
            }
        }
    };

    /**
     * fix IE for body loader
     * @param  {string} type
     */
    AmsifyHelper.bodyLoaderIEfix = function(type) {
        if(AmsifyHelper.detectIE()) {
            if(type !== undefined) {
                if(type == 'modal') {
                    $('.modal-body-loader').css({'top':'0', 'left':'0'});
                }
            } else {
                $('.section-body-loader').css({'top':'0', 'left':'0'});
            }
        }
    };

    /**
     * add sort icon wherever required
     * @param  {string} rowHtml       
     * @param  {string} type          
     * @param  {string} rowSearchInput
     * @return {string}
     */
    AmsifyHelper.getSortIcon = function(rowHtml, type, rowSearchInput) {
        var result = [];
        // If css is bootstrap  
        if(type == 'bootstrap') {
         result['basic'] = ' <span class="fa fa-sort"></span>';

         var htmlArray  = rowHtml.split('class=');
         var reqHtml    = $.trim(htmlArray[1]);

         if(reqHtml == '' || reqHtml == '"fa fa-sort"></span>') {
          result['insertHtml'] = ' <span class="fa fa-sort-asc"></span>';
          result['sort_type']  = 'asc';
        } 
        else if(reqHtml == '"fa fa-sort-asc"></span>') {
          result['insertHtml'] = ' <span class="fa fa-sort-desc"></span>';
          result['sort_type']  = 'desc';
        } 
        else {
          result['insertHtml'] = ' <span class="fa fa-sort"></span>';
          result['sort_type']  = 'default';
        }

      }
        // If css is simple or default
        else {
          result['basic'] = ' <span class="sort-icon"><img src="'+AmsifyHelper.base_url+'/images/arrow-updown.png"></span>';
          var htmlArray   = rowHtml.split('class="sort-icon">');
          var reqHtml     = $.trim(htmlArray[1]);
          if(reqHtml == '' || reqHtml == '<img src="'+AmsifyHelper.base_url+'/images/arrow-updown.png"></span>') {
            result['insertHtml'] = ' <span class="sort-icon"><img src="'+AmsifyHelper.base_url+'/images/arrow-up.png"></span>';
            result['sort_type']  = 'asc';
          } 
          else if(reqHtml == '<img src="'+AmsifyHelper.base_url+'/images/arrow-up.png"></span>') {
            result['insertHtml'] = ' <span class="sort-icon"><img src="'+AmsifyHelper.base_url+'/images/arrow-down.png"></span>';
            result['sort_type']  = 'desc';
          } 
          else {
            result['insertHtml'] = ' <span class="sort-icon"><img src="'+AmsifyHelper.base_url+'/images/arrow-updown.png"></span>';
            result['sort_type']  = 'default';
          }
        }
      return result;
    };

    /**
     * set default icon for sorting icons
     * @param {selector} sortSelector
     * @param {stringe]} type
     */
    AmsifyHelper.setDefaultSortIcon = function(sortSelector, type) {
      var defaultIcon = ' <span class="sort-icon"><img src="'+AmsifyHelper.base_url+'/images/arrow-updown.png"></span>';
      if(type == 'bootstrap') {
        $(sortSelector).find('.fa').remove();
        defaultIcon = ' <span class="fa fa-sort"></span>';      
      } else {
        $(sortSelector).find('.sort-icon').remove();
      }
      $(sortSelector).append(defaultIcon);
    };

    /**
     * convert bytes to file size
     * @param  {integer} bytes
     * @param  {integer} decimals
     * @return {string}
     */
    AmsifyHelper.fileSize = function(bytes, decimals) {
       if(bytes == 0) return '0 Bytes';
       var k      = 1000,
           dm     = decimals + 1 || 3,
           sizes  = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
           i      = Math.floor(Math.log(bytes) / Math.log(k));
       return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    /**
     * convert the string to short name
     * @param  {string}  name
     * @param  {integer} limit
     * @param  {string}  prefex
     * @return {string}
     */
    AmsifyHelper.shortFileName = function(name, limit, prefex) {
      var textLimit   = 15;
      var textPrefex  = '...';
      if(limit !== undefined) {
        textLimit = limit;
      }
      if(prefex !== undefined) {
        textPrefex = prefex;
      }
      if(name.length > textLimit) {
        name = textPrefex+$.trim(name).substring(name.length - textLimit).trim(this);
      }
      return name;
    };


    /**
    * set draggable sort - jquery ui id required
    * @param {selector} selector
    * @param {string}   method
    * @param {string}   idAttr
    * @param {object}   extraParams
    * @param {object}   config
    */
    AmsifyHelper.setDraggableSort = function(selector, method, idAttr, params, config) {
      var type = 'amsify'
      if(config !== undefined) {
        if(config.type !== undefined) {
            type = config.type;
        }
      }
      var childrens    = $(selector).children();
      $.each(childrens, function(index, child){
        if(!$(child).find('.refresher').length && !$(child).hasClass('unsort')){
            var tagName  = $(child).prop('tagName').toLowerCase();
            $(child).children().first().prepend(AmsifyHelper.reorderImage(type));
        }
      });

      var config = {};
      $(function() {
        $(selector).sortable({
          placeholder   : 'ui-state-highlight',
          handle        : '.refresher',
          cancel        : '.unsort',
          stop          : function(event, ui) {
            params['ids']   = [];
            var children    = $(selector).sortable('refreshPositions').children();
            $.each(children, function(index, child) {
              if($(child).attr(idAttr)) {
                params['ids'].push($(child).attr(idAttr));
              } 
              else if($(child).attr('id')) {
                params['ids'].push($(child).attr('id'));
              }
            });

            config['beforeSend']    = function() {
                $(selector).sortable('disable');
            };
            config['afterError']    = function(data) {
                $(selector).sortable('cancel');
            };
            config['complete']      = function() {
                $(selector).sortable('enable');
            };
            AmsifyHelper.callAjax(method, params, config);
          },
          helper : function(e, ui){ 
                ui.children().each(function() {  
                    $(this).width($(this).width());  
                });     
                return ui;  
            },
        });
        $(selector).disableSelection();
      });
    };

    /**
     * get reorder image
     * @param  {string} type
     * @return {string}
     */
    AmsifyHelper.reorderImage = function(type){
        var moveImage       = '<img class="refresher" src="'+AmsifyHelper.base_url+'/images/move.png"/>';
        if(type == 'bootstrap') {
            moveImage = '<a class="refresher"><span class="fa fa-arrows"></span></a>';
        } else if(type == 'materialize') {
            moveImage = '<a class="refresher"><span class="material-icons">open_with</span></a>';
        }
        return moveImage;
    };

    /**
     * call ajax and show response in flash message or iterate field errors
     * @param  {string} method
     * @param  {object} params
     * @param  {object} config
     * @param  {string} type
     */
    AmsifyHelper.callAjax = function(method, params, config, type) {

        var actionType = 'POST';
        if(type !== undefined && type != '') {
            actionType = type;
        }

        if(params._token === undefined) {
            params['_token'] = AmsifyHelper.getToken();
        }

        var ajaxFormParams = {
            type    : actionType,
            url     : AmsifyHelper.getActionURL(method),
            data    : params,
        };

        if($.trim(actionType) == 'post') {
            ajaxFormParams['processData']   = false; 
            ajaxFormParams['cache']         = false;
            if(!AmsifyHelper.detectIE()) { ajaxFormParams['contentType'] = false; }
        }

        if(config !== undefined) {
            if(config.beforeSend !== undefined && typeof config.beforeSend == "function") {
                ajaxFormParams['beforeSend'] = config.beforeSend;
            }
            if(config.xhr !== undefined && typeof config.xhr == "function") {
                ajaxFormParams['xhr'] = config.xhr;
            }
            if(config.complete !== undefined && typeof config.complete == "function") {
                ajaxFormParams['complete'] = config.complete;
            }
        };  

        ajaxFormParams['success'] = function(data) {
            if(data['status'] !== undefined) {
              if(data['status'] == 'error') {
                AmsifyHelper.showFlash(data['message'], 'error');
                if(config !== undefined) {      
                    if(config.afterError !== undefined && typeof config.afterError == "function") {
                        config.afterError(data);
                    }
                }
              } else if(data['status'] == 'errors') {
                AmsifyHelper.iterateErrors(data['message']);
              } else if(data['status'] == 'info') {
                AmsifyHelper.iterateErrors(data['message'], 'info');
              } else {
                AmsifyHelper.showFlash(data['message'], 'success');
                if(config !== undefined) {
                    if(config.afterSuccess !== undefined && typeof config.afterSuccess == "function") {
                        config.afterSuccess(data);
                    }
                }
              } 
            }
        };

        ajaxFormParams['error'] = function(data) {
            AmsifyHelper.showFlash(data.status+':'+data.statusText, 'error');
            if(config !== undefined) {
                if(config.afterResponseError !== undefined && typeof config.afterResponseError == "function") {
                    config.afterResponseError(data);
                }
            }
        };

        $.ajax(ajaxFormParams);
    };


    /**
     * transform input to uppercase
     * @param  {selector} selector
     */
    AmsifyHelper.upperCase = function(selector) {
      $(selector).on('keyup focusout',function(){
        this.value = this.value.toUpperCase();
      });    
    };

    /**
     * transform input to decimals
     * @param  {selector} selector
     */
    AmsifyHelper.onlyDecimals = function(selector) {
      $(selector).on('keyup focusout', function(event) {
        this.value = this.value.replace(/[^0-9\.]/g,'');
      });
    };

    /**
     * transform input to numerics
     * @param  {selector} selector
     */
    AmsifyHelper.onlyNumbers  = function(selector) {
     $(selector).on('keyup focusout', function(e) {
        //e.stopImmediatePropagation();
        this.value = this.value.replace(/[^0-9]/g,'');
     });
    };

    /**
     * transform input to string without special char
     * @param  {selector} selector
     */
    AmsifyHelper.noSpecialChar = function(selector) {
      $(selector).on('keyup focusout', function(e) {
       //e.stopImmediatePropagation(); 
       if(e.which === 32)
        return false;
        this.value = this.value.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ');
      });
    };
    /**
     * transform input to string with single space
     * @param  {selector} selector
     */
    AmsifyHelper.singleSpace = function(selector) {
      $(selector).on('keyup focusout', function(e) {
        //e.stopImmediatePropagation();
        this.value = this.value.replace(/\s+/g, " ");
      });
    };

    /**
     * transform input to string with no space
     * @param  {selector} selector
     */
    AmsifyHelper.noSpace = function(selector) {
      $(selector).on('keyup focusout', function(e){
        //e.stopImmediatePropagation();
        if (e.which === 32) {
          e.preventDefault();      
        }
        $(this).val(function(i,oldVal){ return oldVal.replace(/\s/g,''); });         
      }).blur(function() {
        // for variety's sake here's another way to remove the spaces:
        $(this).val(function(i,oldVal){ return oldVal.replace(/\s/g,''); });         
      });
    };

    /**
     * transform and mask the input based on pattern applied
     * @param  {selector} selector
     * @param  {string} pattern
     * @param  {string} type
     */
    AmsifyHelper.mask = function(selector, pattern, type) {
      $(selector).on('keyup focusout', function(e) {
        var key = e.charCode || e.keyCode || 0;
        // If not backspace
        if(key != 8) {

          // Setting default and assigning input type if defined
          var inputType = 'numbers';
          var types     = ['numbers', 'alphabets', 'alphanumeric'];
          if(type !== undefined) {
            if(jQuery.inArray(type, types) != -1) {
                inputType = type;
            }
          }

          // If pattern is defined
          if(pattern !== undefined) {
            var transformValue     = $.trim($(this).val());
            // Trim value if its exceeding pattern length and return 
            if(transformValue.length > pattern.length) {
              transformValue = transformValue.substr(0, pattern.length);
              $(this).val(transformValue);
              return false;
            }

            // Collect [Pattern Special Chars] and [AlphaNumeric] in arrays
            var alphaNumericPositions     = []; 
            var specialCharPositions      = [];
            for(var i = 0, len = pattern.length; i < len; i++) {
              if(pattern[i].match(/[0-9a-z]/i)) {
                alphaNumericPositions.push(i);
              } else {
                specialCharPositions.push(i);
              }
            }

            // Check for Input types
            var notAllowed = false;
            for(var i = 0, len = transformValue.length; i < len; i++) {
              if(inputType == 'numbers' && !transformValue[i].match(/[0-9]/i) && transformValue[i] != pattern[i]) {
                notAllowed = true;
              }
              else if(inputType == 'alphabets' && !transformValue[i].match(/[a-z]/i) && transformValue[i] != pattern[i]) {
                notAllowed = true;
              }
              else if(inputType == 'alphanumeric' && !transformValue[i].match(/[0-9a-z]/i) && transformValue[i] != pattern[i]) {
                notAllowed = true;
              }

              // If input is not allowed, replace it with empty value
              if(notAllowed) {
                $(this).val(replaceAt(transformValue, '', i));
                return false;
              }
            }

            // Replaced char with special chars by moving characters further
            for(var i = 0, len = pattern.length; i < len; i++) {
              if(i < transformValue.length) {
                if($.inArray(i, specialCharPositions) != -1) {
                  if(transformValue[i] != pattern[i]) {
                    var specialChars    = getPreceedingSpecialChars(i, pattern, specialCharPositions);
                    var replacedString  = specialChars+''+transformValue[i];
                    transformValue      = replaceAt(transformValue, replacedString, i);
                  }
                }
              }
            }

            // Again Check for succeeding special chars from the end
            var specialChar = getPreceedingSpecialChars(transformValue.length, pattern, specialCharPositions);
            if(specialChar != '') {
              transformValue += specialChar;
            }

            // Set Mask Transformed value
            $(this).val(transformValue);
          }
        }
      });
    };

    /**
     * check pattern and input for adding pattern characters
     * @param  {integer} position
     * @param  {string} pattern
     * @param  {array} specialCharPositions
     * @return {string}
     */
    function getPreceedingSpecialChars(position, pattern, specialCharPositions) {
      var string = '';
      for(var i = position, len = pattern.length; i < len; i++) { 
        if($.inArray(i, specialCharPositions) == -1) {
         break;
       }
       else if($.inArray(i, specialCharPositions) > -1) {
         string += pattern[i];
       }
      }
      return string;
    };

    /**
     * replace string at index position
     * @param  {string} string
     * @param  {string} replace
     * @param  {integer} index
     * @return {string}
     */
    function replaceAt(string, replace, index) {
      return string.substr(0, index) + replace + string.substr(index + 1);
    };

 }(window.AmsifyHelper = window.AmsifyHelper || {}, jQuery));
