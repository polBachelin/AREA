# Area.AreaApi

All URIs are relative to */*

Method | HTTP request | Description
------------- | ------------- | -------------
[**areaAreaIdDelete**](AreaApi.md#areaAreaIdDelete) | **DELETE** /area/{areaId} | Delete an area
[**areaAreaIdGet**](AreaApi.md#areaAreaIdGet) | **GET** /area/{areaId} | Get the info of an Area
[**areaAreaIdPut**](AreaApi.md#areaAreaIdPut) | **PUT** /area/{areaId} | Update a user area
[**areaCreateGet**](AreaApi.md#areaCreateGet) | **GET** /area/create | Create an empty area
[**areaCreatePost**](AreaApi.md#areaCreatePost) | **POST** /area/create | Create an area with info
[**getAreas**](AreaApi.md#getAreas) | **GET** /area | Returns all logged in user areas

<a name="areaAreaIdDelete"></a>
# **areaAreaIdDelete**
> areaAreaIdDelete(areaId)

Delete an area

### Example
```javascript
import {Area} from 'area';

let apiInstance = new Area.AreaApi();
let areaId = 56; // Number | ID of the area to delete

apiInstance.areaAreaIdDelete(areaId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **areaId** | **Number**| ID of the area to delete | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="areaAreaIdGet"></a>
# **areaAreaIdGet**
> Area areaAreaIdGet(areaId)

Get the info of an Area

### Example
```javascript
import {Area} from 'area';

let apiInstance = new Area.AreaApi();
let areaId = 56; // Number | ID of the area to get

apiInstance.areaAreaIdGet(areaId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **areaId** | **Number**| ID of the area to get | 

### Return type

[**Area**](Area.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="areaAreaIdPut"></a>
# **areaAreaIdPut**
> areaAreaIdPut(areaId, areaObject)

Update a user area

### Example
```javascript
import {Area} from 'area';

let apiInstance = new Area.AreaApi();
let areaId = 56; // Number | Id of the area to update
let areaObject = new Area.Area(); // Area | updated area object

apiInstance.areaAreaIdPut(areaId, areaObject, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **areaId** | **Number**| Id of the area to update | 
 **areaObject** | [**Area**](.md)| updated area object | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="areaCreateGet"></a>
# **areaCreateGet**
> areaCreateGet()

Create an empty area

### Example
```javascript
import {Area} from 'area';

let apiInstance = new Area.AreaApi();
apiInstance.areaCreateGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="areaCreatePost"></a>
# **areaCreatePost**
> areaCreatePost(opts)

Create an area with info

### Example
```javascript
import {Area} from 'area';

let apiInstance = new Area.AreaApi();
let opts = { 
  'areaObject': new Area.Area() // Area | 
};
apiInstance.areaCreatePost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **areaObject** | [**Area**](.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="getAreas"></a>
# **getAreas**
> Area getAreas()

Returns all logged in user areas

Returns a map of areas

### Example
```javascript
import {Area} from 'area';

let apiInstance = new Area.AreaApi();
apiInstance.getAreas((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Area**](Area.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/plain

