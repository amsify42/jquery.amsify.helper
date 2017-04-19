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
First parameter could be absolute or relative path. When second parameter **page** as number is passed it will add extra string to url. Lets say path is **http://site.com/contact** and page no. is **1** then url appear in address bar will be **http://site.com/contact?page=1**
