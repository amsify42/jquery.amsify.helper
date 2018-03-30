 // Amsify42 Helper 2.0.0
 // http://www.amsify42.com
 (function(AmsifyHelper, $, undefined) {
    /**
     * Global variable for this object context
     */
    var _self;
    /**
     * initialization begins from here
     * @type {Object}
     */
    var Helper  = function () {
        /**
         * Assigning this context to _self
         * @type {object}
         */
        _self               = this;
        /**
         * assign the base url to public property which is accessible from outside
         * @type {string}
         */
        this.baseURL        = window.location.protocol+'//'+window.location.host;
        /**
         * assign the token url to public property which refresh token
         * @type {string}
         */
        this.tokenURL       = this.baseURL+'/refresh/token';
        /**
         * Token meta name
         * @type {string}
         */
        this.tokenMetaName  = '_token';
        /**
         * Locale meta name
         * @type {string}
         */
        this.localeMetaName = '_locale';
        /**
         * assets urls
         * @type {Object}
         */
        this.assets         = {
            move        : 'images/move.png',
            arrowUp     : 'images/arrow-up.png',
            arrowDown   : 'images/arrow-down.png',
            arrowUpDown : 'images/arrow-updown.png',
        };
        /**
         * flash message info
         * @type {Object}
         */
        this.flashMessage   = {
            class : '.amsify-fixed-message',
            close : '.amsify-message-close',
        };
        /**
         * loader classes
         * @type {Object}
         */
        this.loaders        = {
            modal   : '.modal-body-loader',
            section : '.section-body-loader',
        };
        /**
         * reorder info
         * @type {Object}
         */
        this.reorder        = {
            class   : '.refresher',
            unsort  : '.unsort',
        };
    };

    /**
     * collection of prototypes
     * @type {Object}
     */
    Helper.prototype = {
        /**
         * this function is called by default to add flash errors to html body at top
         */
        _init : function() {
            this.setFlashMessage();
        },

        /**
         * set base url
         * @param  {string} urlString
         * @return {string}
         */
        setBaseURL : function(urlString) {
            if(this.isAbsoluteURL(urlString)) {
                this.baseURL  = urlString;
            } else {
                this.baseURL += '/'+this.trimPath(urlString);
            }
        },

        /**
         * set token meta tag name
         * @param  {string} name
         */
        setTokenMetaName : function(name) {
            this.tokenMetaName = name;
        },

        /**
         * set locale meta tag name
         * @param  {string} name
         */
        setLocaleMetaName : function(name) {
            this.localeMetaName = name;
        },

        /**
         * set token url
         * @param  {string} urlString
         * @return {string}
         */
        setTokenURL : function(urlString) {
            if(this.isAbsoluteURL(urlString)) {
                this.tokenURL  = urlString;
            } else {
                this.tokenURL  = this.baseURL+'/'+this.trimPath(urlString);
            }
            this.setRefreshToken();
        },

        /**
         * set refresh token
         */    
        setRefreshToken : function() {
            window.setInterval(function(){
                var $metaToken = $('meta[name="'+_self.tokenMetaName+'"]');
                $.post(this.tokenURL, {_token:$metaToken.attr('content')})
                .done(function(data) {
                    if(data.status) {
                        $metaToken.attr('content', data._token);
                    }
                });
            }, 7000);
        },

        /**
         * create path based on base url
         * @param  {string} path
         * @return {string}
         */
        AppUrl : function(path) {
            var appUrl = this.baseURL;
            if(this.getLocale()) {
                appUrl += '/'+this.getLocale();    
            }
            appUrl += '/'+this.trimPath(path);;
            return appUrl;
        },

        /**
         * remove first forward slash from string
         * @param  {string} path
         * @return {string}
         */
        trimPath : function(path) {
            return path.replace(/^\/|\/$/g, '');
        },

        /**
         * get Locale from meta tag
         * @return {string}
         */
        getLocale : function(path) {
            return $('meta[name="'+this.localeMetaName+'"]').attr('content')
        },

        /**
         * get unique token from meta tag if it is set
         * @return {string}
         */
        getToken : function() {
            return $('meta[name="'+this.tokenMetaName+'"]').attr('content');
        },

        /**
         * add event either directly to selector or from DOM
         * @param {boolean}  fromDOM
         * @param {string}   event
         * @param {selector} selector
         * @param {function} callback
         */
        setEvent : function(fromDOM, event, selector, callback) {
            if(fromDOM) {
              $(document).on(event, selector, callback);
            } else {
              $(selector).on(event, callback);
            }
        },

        /**
         * get selector of input by name
         * @param  {string} name
         * @return {string}
         */
        fieldByName : function(name) {
            return '*[name="'+name+'"]';
        },

        /**
         * get absolute/relative url based on value passed
         * @param  {string} urlString
         * @return {string}
         */
        getActionURL : function(urlString) {
            var URL = this.baseURL;
            if(this.isAbsoluteURL(urlString)) {
                URL = urlString;
            } else {
                URL = this.AppUrl(urlString);
            }
            return URL;
        },

        /**
         * check if the string is absolute URL
         * @param  {string}  urlString
         * @return {Boolean}
         */
        isAbsoluteURL : function(urlString) {
            var regexURL  = new RegExp('^(?:[a-z]+:)?//', 'i');
            return (regexURL.test(urlString))? true: false;
        },

        /**
         * Set Asset URL
         * @param {string} name
         * @param {string} value
         */
        setAssetURL : function(name, value) {
            this.assets[name] = value;
        },

        /**
         * Get Asset URL
         * @param  {string} name
         * @return {string}
         */
        getAssetURL : function(name) {
            return (this.assets[name])? this.AppUrl(this.assets[name]): this.baseURL;
        },

        /**
         * stop form submit
         * @param  {event}    e
         * @param  {selector} submitSelector
         * @param  {string}   defaultText
         * @param  {boolean}  ret
         * @return {boolean}
         */
        stopSubmit : function(e, submitSelector, defaultText, ret) {
            e.preventDefault(); 
            if(submitSelector !== undefined && defaultText !== undefined) {
                $submitSelector.prop('disabled', false).html(defaultText); 
            }
            if(ret !== undefined) return ret;
        },

        /**
         * detect IE browser
         * @return {integer}
         */
        detectIE : function() {
            var ua      = window.navigator.userAgent;
            var msie    = ua.indexOf('MSIE ');
            if(msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }
            var trident = ua.indexOf('Trident/');
            if(trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }
            var edge = ua.indexOf('Edge/');
            if(edge > 0) {
               // IE 12 => return version number
               return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }
            // other browser
            return false;
        },

        /**
         * based on browser formdata will be created
         * @param  {selector} formSelector
         * @param  {boolean}  serialize
         * @param  {object}   extraFields
         * @return {object}
         */
        getFormData : function(formSelector, serialize, extraFields) {
            var formData;
            if(!this.detectIE() && !serialize) {
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
        },

        /**
         * get object size
         * @param  {object} object
         * @param  {string} key
         * @return {integer}
         */
        getObjectSize : function(object, key) {
            var count = 0;
            var key;
            for(key in object) {
                if(object.hasOwnProperty(key)) {
                    count++;
                }
            }
            return count;
        },

        /**
         * make the array distinct
         * @param  {array} array
         * @return {array}
         */
        distinctArray : function(array) {
           var result = [];
           $.each(array, function(index,value){
               if($.inArray(value, result) == -1) {
                   result.push(value); 
               } 
           });
           return result;
        },

        /**
         * uppercase the text
         * @param  {string} string
         * @return {string}
         */
        upperCaseFirst : function(string) {
            return string.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        },

        /**
         * show url on browser address bar
         * @param  {string}  path
         * @param  {integer} page
         */
        showURL : function(path, page) {
            if(this.detectIE() == false) {
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
        },

        /**
         * show flash message
         * @param  {string} message
         * @param  {string} type
         */
        showFlash : function(message, type) {
            if(message !== undefined) {
                if($(_self.flashMessage.class).length && $(_self.flashMessage.class).css('display') == 'block') {
                    $(_self.flashMessage.class).slideUp('fast', function(){
                        _self.checkMessage(message, type);
                        $(_self.flashMessage.class).slideDown();
                        setTimeout(function(){ $(_self.flashMessage.class).slideUp();}, 5000);
                    });
                } else {
                    this.checkMessage(message, type);
                    $(_self.flashMessage.class).slideDown();
                    setTimeout(function(){ $(_self.flashMessage.class).slideUp();}, 5000);
                }
            }
        },

        /**
         * check whether message is appended in html
         * @param  {string} message
         * @param  {string} type
         */
        checkMessage : function(message, type) {
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
            if(this.detectIE()) {
               if($(_self.flashMessage.class).html() === undefined) {
                    appendMessages = true;
               }     
            } else {
                if(!$(_self.flashMessage.class).length) {
                    appendMessages = true;
                }    
            }

            if(appendMessages) {
                var structure =  [
                  {'<div/>': { 'class':_self.flashMessage.class.substring(1)+' '+msgClass, text:message }, 'prependTo': 'body'},
                  {'<span/>': { 'class':_self.flashMessage.close.substring(1), 'text':'\u2716'}, 'appendTo': _self.flashMessage.class},
                ];
                this.addHTML(structure);
            } else {
                $(_self.flashMessage.class).attr('class', _self.flashMessage.class.substring(1)+' '+msgClass).html(message+'<span class="'+_self.flashMessage.close.substring(1)+'">X</span>');
            }
        },

        /**
         * convert object to html tags
         * @param {object}
         */
        addHTML : function(htmlStructure) {
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
        },

        /**
         * create click hide message event
         */
        setFlashMessage : function() {
            $(document).on('click', _self.flashMessage.close, function(){
                $(this).parent(_self.flashMessage.class).slideUp();
            });
        },


        /**
         * invoke callback based on config or element attribute
         * @param  {object}   config
         * @param  {string}   key      
         * @param  {selector} selector
         * @param  {string}   attr
         */
        callback : function(config, key, selector, attr) {
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
        },

        /**
         * fix IE for body loader
         * @param  {string} type
         */
        bodyLoaderIEfix : function(type) {
            if(this.detectIE()) {
                if(type !== undefined && type == 'modal') {
                    $(this.loaders.modal).css({'top':'0', 'left':'0'});
                } else {
                    $(this.loaders.section).css({'top':'0', 'left':'0'});
                }
            }
        },

        /**
         * add sort icon wherever required
         * @param  {string} rowHtml       
         * @param  {string} type          
         * @param  {string} rowSearchInput
         * @return {string}
         */
        getSortIcon : function(rowHtml, type, rowSearchInput) {
            var result = [];
            // If css is bootstrap  
            if(type == 'bootstrap') {
                result['basic'] = ' <span class="fa fa-sort"></span>';
                var htmlArray   = rowHtml.split('class=');
                var reqHtml     = $.trim(htmlArray[1]);

                if(rowSearchInput) {
                    result['insertHtml'] = ' <span class="fa fa-sort"></span>';
                    result['sort_type']  = 'default';
                }
                else if(reqHtml == '' || reqHtml == '"fa fa-sort"></span>') {
                    result['insertHtml'] = ' <span class="fa fa-sort-asc"></span>';
                    result['sort_type']  = 'asc';
                } 
                else if(reqHtml == '"fa fa-sort-asc"></span>') {
                    result['insertHtml'] = ' <span class="fa fa-sort-desc"></span>';
                    result['sort_type']  = 'desc';
                } else {
                    result['insertHtml'] = ' <span class="fa fa-sort"></span>';
                    result['sort_type']  = 'default';
                } 
            }
            // If css is simple or default
            else {
              result['basic'] = ' <span class="sort-icon"><img src="'+this.getAssetURL('arrowUpDown')+'"></span>';
              var htmlArray   = rowHtml.split('class="sort-icon">');
              var reqHtml     = $.trim(htmlArray[1]);
                if(rowSearchInput) {
                    result['insertHtml'] = ' <span class="sort-icon"><img src="'+this.getAssetURL('arrowUpDown')+'"></span>';
                    result['sort_type']  = 'default';
                }
                else if(reqHtml == '' || reqHtml == '<img src="'+this.getAssetURL('arrowUpDown')+'"></span>') {
                    result['insertHtml'] = ' <span class="sort-icon"><img src="'+this.getAssetURL('arrowUp')+'"></span>';
                    result['sort_type']  = 'asc';
                } 
                else if(reqHtml == '<img src="'+this.getAssetURL('arrowUp')+'"></span>') {
                    result['insertHtml'] = ' <span class="sort-icon"><img src="'+this.getAssetURL('arrowDown')+'"></span>';
                    result['sort_type']  = 'desc';
                } else {
                    result['insertHtml'] = ' <span class="sort-icon"><img src="'+this.getAssetURL('arrowUpDown')+'"></span>';
                    result['sort_type']  = 'default';   
                } 
            }
            return result;
        },

        /**
         * set default icon for sorting icons
         * @param {selector} sortSelector
         * @param {stringe]} type
         */
        setDefaultSortIcon : function(sortSelector, type) {
            var defaultIcon = ' <span class="sort-icon"><img src="'+this.getAssetURL('arrowUpDown')+'"></span>';
            if(type == 'bootstrap') {
                $(sortSelector).find('.fa').remove();
                defaultIcon = ' <span class="fa fa-sort"></span>';      
            } else {
                $(sortSelector).find('.sort-icon').remove();
            }
            $(sortSelector).append(defaultIcon);
        },

        /**
         * convert bytes to file size
         * @param  {integer} bytes
         * @param  {integer} decimals
         * @return {string}
         */
        fileSize : function(bytes, decimals) {
            if(bytes == 0) return '0 Bytes';
            var k   = 1000,
            dm      = decimals + 1 || 3,
            sizes   = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i       = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },

        /**
         * convert the string to short name
         * @param  {string}  name
         * @param  {integer} limit
         * @param  {string}  prefex
         * @return {string}
         */
        shortFileName : function(name, limit, prefex) {
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
        },

        /**
        * set draggable sort - jquery ui id required
        * @param {selector} selector
        * @param {string}   method
        * @param {string}   idAttr
        * @param {object}   extraParams
        * @param {object}   config
        */
        setDraggableSort : function(selector, method, idAttr, params, config) {
          var type  = 'amsify';
          var flash = false;
          if(config !== undefined) {
            type    = (config.type)? config.type: type;
            flash   = (config.flash)? config.flash: flash;
          }
          var childrens     = $(selector).children();
          $.each(childrens, function(index, child){
            if(!$(child).find(_self.reorder.class).length && !$(child).hasClass(_self.reorder.unsort.substring(1))){
                var tagName  = $(child).prop('tagName').toLowerCase();
                $(child).children().first().prepend(_self.reorderImage(type));
            }
          });
          var config = {};
          $(function() {
            $(selector).sortable({
              placeholder   : 'ui-state-highlight',
              handle        : _self.reorder.class,
              cancel        : _self.reorder.unsort,
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
                config['beforeSend']    = function(){ $(selector).sortable('disable'); };
                config['afterError']    = function(data){ $(selector).sortable('cancel'); };
                config['complete']      = function(){ $(selector).sortable('enable'); };
                _self.callAjax(method, params, config, 'POST', flash);
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
        },

        /**
         * get reorder image
         * @param  {string} type
         * @return {string}
         */
        reorderImage : function(type){
            if(type == 'bootstrap') {
                return '<a class="'+_self.reorder.class.substring(1)+'"><span class="fa fa-arrows"></span></a>';
            } else if(type == 'materialize') {
                return '<a class="'+_self.reorder.class.substring(1)+'"><span class="material-icons">open_with</span></a>';
            } else {
                return '<img class="'+_self.reorder.class.substring(1)+'" src="'+this.getAssetURL('move')+'"/>';
            }
        },

        /**
         * call ajax and show response in flash message or iterate field errors
         * @param  {string} method
         * @param  {object} params
         * @param  {object} config
         * @param  {string} type
         */
        callAjax : function(method, params, config, type, flash) {
            var actionType  = (type)? type : 'POST';
            var isFlash     = (flash)? flash : false;

            if(!params.hasOwnProperty('_token')) {
                if(params instanceof FormData) {
                    params.append('_token', this.getToken());
                } else {
                    params['_token'] = this.getToken();
                }
            }

            var ajaxFormParams = {
                type    : actionType,
                url     : this.getActionURL(method),
                data    : params,
            };

            if(params instanceof FormData && $.trim(actionType).toLowerCase() == 'post' && !this.detectIE()) {
                ajaxFormParams['processData']   = false; 
                ajaxFormParams['cache']         = false;
                ajaxFormParams['contentType']   = false;
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
            }  

            ajaxFormParams['success'] = (function(data) {
                if(data.status !== undefined) {
                  if(data.status == 'error') {
                    if(isFlash) _self.showFlash(data.message, 'error');
                    if(config !== undefined) {      
                        if(config.afterError !== undefined && typeof config.afterError == "function") {
                            config.afterError(data);
                        }
                    }
                  } else if(data.status == 'info') {
                    if(isFlash) _self.showFlash(data.message, 'info');
                  } else {
                    if(isFlash) _self.showFlash(data.message, 'success');
                    if(config !== undefined) {
                        if(config.afterSuccess !== undefined && typeof config.afterSuccess == "function") {
                            config.afterSuccess(data);
                        }
                    }
                  } 
                }
            }).bind(_self);

            ajaxFormParams['error'] = (function(data) {
                _self.showFlash(data.status+':'+data.statusText, 'error');
                if(config !== undefined) {
                    if(config.afterServerError !== undefined && typeof config.afterServerError == "function") {
                        config.afterServerError(data);
                    }
                }
            }).bind(_self);

            $.ajax(ajaxFormParams);
        },

        /**
         * transform input to uppercase
         * @param  {selector} selector
         */
        upperCase : function(selector) {
          $(selector).on('keyup focusout',function(){
            this.value = this.value.toUpperCase();
          });    
        },

        /**
         * transform input to decimals
         * @param  {selector} selector
         */
        onlyDecimals : function(selector) {
          $(selector).on('keyup focusout', function(event) {
            this.value = this.value.replace(/[^0-9\.]/g,'');
          });
        },

        /**
         * transform input to numerics
         * @param  {selector} selector
         */
        onlyNumbers  : function(selector) {
         $(selector).on('keyup focusout', function(e) {
            this.value = this.value.replace(/[^0-9]/g,'');
         });
        },

        /**
         * transform input to string without special char
         * @param  {selector} selector
         */
        noSpecialChar : function(selector) {
          $(selector).on('keyup focusout', function(e) {
            if(e.which === 32)
            return false;
            this.value = this.value.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ');
          });
        },

        /**
         * transform input to string with single space
         * @param  {selector} selector
         */
        singleSpace : function(selector) {
            $(selector).on('keyup focusout', function(e) {
                this.value = this.value.replace(/\s+/g, " ");
            });
        },

        /**
         * transform input to string with no space
         * @param  {selector} selector
         */
        noSpace : function(selector) {
            $(selector).on('keyup focusout', function(e){
                if (e.which === 32) {
                    e.preventDefault();    
                }
                $(this).val(function(i,oldVal){ return oldVal.replace(/\s/g,''); });         
            }).blur(function(){
                // for variety's sake here's another way to remove the spaces:
                $(this).val(function(i,oldVal){ return oldVal.replace(/\s/g,''); });         
            });
        },

        /**
         * transform and mask the input based on pattern applied
         * @param  {selector} selector
         * @param  {string} pattern
         * @param  {string} type
         */
        mask : function(selector, pattern, type) {
            $(selector).on('keyup focusout', function(e){
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
                        if(transformValue == '') return;
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
                                $(this).val(_self.replaceAt(transformValue, '', i));
                                return false;
                            }
                        }

                        // Replaced char with special chars by moving characters further
                        for(var i = 0, len = pattern.length; i < len; i++) {
                            if(i < transformValue.length) {
                                if($.inArray(i, specialCharPositions) != -1) {
                                    if(transformValue[i] != pattern[i]) {
                                        var specialChars    = _self.getPreceedingSpecialChars(i, pattern, specialCharPositions);
                                        var replacedString  = specialChars+''+transformValue[i];
                                        transformValue      = _self.replaceAt(transformValue, replacedString, i);
                                    }
                                }
                            }
                        }

                        // Again Check for succeeding special chars from the end
                        var specialChar = _self.getPreceedingSpecialChars(transformValue.length, pattern, specialCharPositions);
                        if(specialChar != '') {
                            transformValue += specialChar;
                        }

                        // Set Mask Transformed value
                        $(this).val(transformValue);
                    }
                }
            });
        },

        /**
         * check pattern and input for adding pattern characters
         * @param  {integer} position
         * @param  {string} pattern
         * @param  {array} specialCharPositions
         * @return {string}
         */
        getPreceedingSpecialChars : function(position, pattern, specialCharPositions) {
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
        },

        /**
         * replace string at index position
         * @param  {string} string
         * @param  {string} replace
         * @param  {integer} index
         * @return {string}
         */
        replaceAt : function(string, replace, index) {
            return string.substr(0, index) + replace + string.substr(index + 1);
        },

    };

    /**
     * Initializing the helper
     */
    window.AmsifyHelper = new Helper();
    window.AmsifyHelper._init();

 }(window.AmsifyHelper = window.AmsifyHelper || {}, jQuery));
