# Amsify Jquery Helper
This is the jquery helper file for amsify jquery plugins. It has a list of functions which associated with other amsify jquery plugins. This repository also contains css and image files which are necessary based on amsify jquery plugins we use.

It can also be used separately if you find the functions inside it are useful according to your requirement. Below is the information on how you can call its functions.

### Base Url 
```txt
AmsifyHelper.base_url
```
It is the only property variable in helper file and rest are functions. This will get the base url of the application. If you want to change the base url and make it available in all helper functions and amsify jquery plugins, you can simply do this

```js
AmsifyHelper.base_url = 'http://www.yoursite.com';
```
or if you just want to add something to base url
```js
AmsifyHelper.base_url = AmsifyHelper.base_url + '/myproject';
//or
AmsifyHelper.base_url += '/myproject';
```

### App Url
```txt
AmsifyHelper.AppUrl(route)
```
The only difference between base_url and AppUrl is, AppUrl check for locale in meta tag and send url along with local after base url.
<br/>
Suppose in our meta tag, the locale is **en**
```html
  <meta name="_locale" content="en"/>
```
And we are calling this method by passing route and our base url is http://site.com
```js
  AmsifyHelper.AppUrl('/contact-us');
```
Now, this will return
```txt
  http://site.com/en/contact-us
```

### Get Locale
```txt
  AmsifyHelper.getLocale();
```
It will simply return the locale name from **meta tag** having name **_locale** if exist

### Get Token
```txt
  AmsifyHelper.getToken();
```
It will simply return the csrf token from **meta tag** having name **_token** if exist

### Set Event
```txt
  AmsifyHelper.setEvent(fromDOM, event, selector, callback);
```
This will create jquery event based on event name, selector and callback function is passed.
<br/>
Let's say we want to create click event for button selector
```js
  AmsifyHelper.setEvent(false, 'click', 'button', function(e){
    alert('clicked');
  });
```
As you can see the first parameter we passed as **false**. That indicates that click event will not work for buttons which are generated in DOM after append, prepend or some other way. If you want to make this event work even for appended buttons you can pass it as **true**

### Get action URL
```txt
  AmsifyHelper.getActionURL(urlString);
```
This will simply check the parameter whether it is relative or absolute, if the parameter is relative URL then it will send the complete URL along with base url

### Detect IE
```txt
  AmsifyHelper.detectIE();
```
It will check whether the browser is IE

### Get Form Data
```txt
  AmsifyHelper.getFormData(formSelector, serialize, extraFields);
```
This is return the form data based on parameters we pass.
Three parameters are:
<br/>
formSelector - form selector 
<br/>
serialize - boolean - decides whether you want serialize or form data object
<br/>
extraFields - array/object - having key as field name and value as its field value
```js
  var extraFields = {};
  extraFields['extra_field'] = 10;
  AmsifyHelper.getFormData('form', false, extraFields);
```

### Distinct Array
```txt
  AmsifyHelper.distinctArray(array);
```
This will return unique array of array passed

### UpperCase First
```txt
  AmsifyHelper.upperCaseFirst(string);
```
First letter of the string will be uppercase

### Show url in address bar
```txt
  AmsifyHelper.showURL(path, page);
```
First parameter could be absolute or relative path. When optional second parameter **page** as number is passed it will add extra string to url. Lets say path is **http://site.com/contact** and page no. is **1** then url appear in address bar will be **http://site.com/contact?page=1**

### Show Flash Message
```txt
  AmsifyHelper.showFlash(message, type);
```
It will show flash message at top and will dissappear after couple of seconds. <br/>
Second parameter can be any one of these three values <br/>
**success** <br/>
**error** <br/>
**info** <br/>

### Iterate Errors
```txt
  AmsifyHelper.iterateErrors(fields);
```
This will show errors in multiple fields, for form field errors you can check info on my other respository **jquery.amsify.form**. IterateErrors take fields parameter as array having key as field name and value as message. Below is the example.
```js
  {
    name : 'Name is required',
    email: 'Please enter valid email'
  }
```

### Bytes to filesize
```txt
  AmsifyHelper.fileSize(bytes, decimals);
```
This will convert bytes to file size in MB, GB and so on based on its size. Second optional parameter is a decimal.

### Short Name
```txt
  AmsifyHelper.shortFileName(name, limit, prefex);
```
This will trim the string based on limit passed in second parameter. Third parameter will add prefix to the string after trimming it.

### Call Ajax
```txt
  AmsifyHelper.callAjax(method, params, config, type);
```
Here are the details of four parameters:<br/>
**method** : It is the method action url we pass to ajax, it can be absolute or relative url.<br/>
**params** : It is an object of parameters or form data.<br/>
**type** : By default it is **post** method, if you want you can pass it as **GET** or some other valid method name.<br/>
**config** : It is an object which contains multiple callback function if required.<br/>
by default this method calls **success** and **error** callbacks.<br/>
If you wish to add some other callback you can add among these name<br/>
*beforeSend* - this will run the beforeSend callback before ajax call<br/>
*xhr* - this will run the XHR callback before ajax call<br/>
*complete* - this will run the complete callback after ajax call<br/>
*afterError* - this will run in success callback after error is being responded from server<br/>
*afterResponseError* - this will run in error callback after error from server directly<br/>
*afterSuccess* - this will run in success callback after success is being responded from server<br/>
example of config you can pass
```js
{
  beforeSend : function(){
    // do something
  },
  complete : function(){
    // do something
  }
}
```

### Form field uppercase
```txt
  AmsifyHelper.upperCase(selector);
```
This will make the input of selector field to uppercase on **keyup** and **focusout**

### Form field only decimal
```txt
  AmsifyHelper.onlyDecimals(selector);
```
It will transform the input to decimals on **keyup** and **focusout**

### Form field only numbers
```txt
  AmsifyHelper.onlyNumbers(selector);
```
It will transform the input to numbers on **keyup** and **focusout**

### Form field no special char
```txt
  AmsifyHelper.noSpecialChar(selector);
```
It will transform the input and remove special chars on **keyup** and **focusout**

### Form field single space
```txt
  AmsifyHelper.singleSpace(selector);
```
It will transform the input with multiple spaces to single space on **keyup** and **focusout**

### Form field no space
```txt
  AmsifyHelper.noSpace(selector);
```
It will transform the input with no spaces on **keyup** and **focusout**

### Form field masking
```txt
  AmsifyHelper.mask(selector, pattern, type);
```
It will transform the input and mask according to the given pattern in second parameter on **keyup** and **focusout**. Third parameter **type** can be **numbers**, **alphabets**, **alphanumeric** and by default it is **numbers**. <br/>
Below is the example <br/>
```js
  AmsifyHelper.mask('.mask-date', 'MM-DD-YYYY');
```
For more information on this option go to my repository **jquery.amsify.form**.
