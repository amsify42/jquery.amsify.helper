# Amsify Jquery Helper
This is the jquery helper file for amsify jquery plugins. It has a list of functions which associated with other amsify jquery plugins. This repository also contains css and image files which are necessary based on amsify jquery plugins we use.

It can also be used separately if you find the functions inside it are useful according to your requirement. Below is the information on how you can call its functions.

1. AmsifyHelper.base_url
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
