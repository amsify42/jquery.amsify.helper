# Amsify Jquery Helper
This is the jquery helper file for amsify jquery plugins. It has a list of functions which associated with other amsify jquery plugins. This repository also contains css and image files which are necessary based on amsify jquery plugins we use.

It can also be used separately if you find the functions inside it are useful according to your requirement. Below is the information on how you can call its functions.

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
