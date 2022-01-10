# Area.ServicesApi

All URIs are relative to */*

Method | HTTP request | Description
------------- | ------------- | -------------
[**servicesGet**](ServicesApi.md#servicesGet) | **GET** /services | Retrieves all services
[**servicesServiceIdActionsGet**](ServicesApi.md#servicesServiceIdActionsGet) | **GET** /services/{serviceId}/actions | Retrieves actions of a service
[**servicesServiceIdReactionsGet**](ServicesApi.md#servicesServiceIdReactionsGet) | **GET** /services/{serviceId}/reactions | Retrieves reactions of a service

<a name="servicesGet"></a>
# **servicesGet**
> [Service] servicesGet()

Retrieves all services

### Example
```javascript
import {Area} from 'area';

let apiInstance = new Area.ServicesApi();
apiInstance.servicesGet((error, data, response) => {
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

[**[Service]**](Service.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="servicesServiceIdActionsGet"></a>
# **servicesServiceIdActionsGet**
> [Action] servicesServiceIdActionsGet(serviceId)

Retrieves actions of a service

### Example
```javascript
import {Area} from 'area';

let apiInstance = new Area.ServicesApi();
let serviceId = "serviceId_example"; // String | the id of the service

apiInstance.servicesServiceIdActionsGet(serviceId, (error, data, response) => {
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
 **serviceId** | **String**| the id of the service | 

### Return type

[**[Action]**](Action.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="servicesServiceIdReactionsGet"></a>
# **servicesServiceIdReactionsGet**
> [Reaction] servicesServiceIdReactionsGet(serviceId)

Retrieves reactions of a service

### Example
```javascript
import {Area} from 'area';

let apiInstance = new Area.ServicesApi();
let serviceId = "serviceId_example"; // String | the id of the service

apiInstance.servicesServiceIdReactionsGet(serviceId, (error, data, response) => {
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
 **serviceId** | **String**| the id of the service | 

### Return type

[**[Reaction]**](Reaction.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

