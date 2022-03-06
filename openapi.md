---
title: AREA v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="area">AREA v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Area for epitech

Base URLs:

* <a href="/">/</a>

<h1 id="area-user">user</h1>

Operations about user

<a href="http://swagger.io">Find out more about our store</a>

## post__user_email

`POST /user/email`

*Update user email*

This can only be done by logged in user

> Body parameter

```json
{
  "email": "string",
  "userEmail": "string"
}
```

<h3 id="post__user_email-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» email|body|string|false|none|
|» userEmail|body|string|false|none|

<h3 id="post__user_email-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__user_username

`POST /user/username`

*Update username*

This can only be done by logged in user

> Body parameter

```json
{
  "email": "string",
  "username": "string"
}
```

<h3 id="post__user_username-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» email|body|string|false|none|
|» username|body|string|false|none|

<h3 id="post__user_username-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__user_password

`POST /user/password`

*Update user email*

This can only be done by logged in user

> Body parameter

```json
{
  "email": "string",
  "userEmail": "string"
}
```

<h3 id="post__user_password-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» email|body|string|false|none|
|» userEmail|body|string|false|none|

<h3 id="post__user_password-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|None|

<aside class="success">
This operation does not require authentication
</aside>

## updateUser

<a id="opIdupdateUser"></a>

`PUT /user`

*Update user*

This can only be done by the logged in user.

> Body parameter

```json
{
  "services": [
    {
      "serviceId": 0,
      "token": "string",
      "refreshToken": "string",
      "expirationDate": "2019-08-24"
    }
  ],
  "email": "string",
  "password": "pa$$word"
}
```

<h3 id="updateuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[User](#schemauser)|false|none|

<h3 id="updateuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid user supplied|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## createUser

<a id="opIdcreateUser"></a>

`POST /user`

*Create user*

This can only be done once at the registration page

> Body parameter

```json
{
  "services": [
    {
      "serviceId": 0,
      "token": "string",
      "refreshToken": "string",
      "expirationDate": "2019-08-24"
    }
  ],
  "email": "string",
  "password": "pa$$word"
}
```

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[User](#schemauser)|false|none|

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation, user is logged in|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid email supplied|None|
|413|[Payload Too Large](https://tools.ietf.org/html/rfc7231#section-6.5.11)|Invalid password supplied|None|

<aside class="success">
This operation does not require authentication
</aside>

## deleteUser

<a id="opIddeleteUser"></a>

`DELETE /user`

*Delete user*

This can only be done by the logged in user. Delete user from database and log him out

<h3 id="deleteuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User has been deleted|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|User not logged in|None|

<aside class="success">
This operation does not require authentication
</aside>

## loginUser

<a id="opIdloginUser"></a>

`GET /user/login`

*Logs user into the system*

<h3 id="loginuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|username|query|string|true|The user name for login|
|password|query|string|true|The password for login in clear text|

<h3 id="loginuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid username/password supplied|None|

<aside class="success">
This operation does not require authentication
</aside>

## logoutUser

<a id="opIdlogoutUser"></a>

`GET /user/logout`

*Logs out current logged in user session*

<h3 id="logoutuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|default|Default|successful operation|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="area-area">area</h1>

Access to User Areas

## getAreas

<a id="opIdgetAreas"></a>

`GET /area`

*Returns all logged in user areas*

Returns a map of areas

> Example responses

> 200 Response

```json
{
  "name": "string",
  "status": false,
  "action": [
    {
      "name": "string",
      "serviceId": 0
    }
  ],
  "reaction": [
    {
      "name": "string",
      "serviceId": 0
    }
  ]
}
```

```
"string"
```

<h3 id="getareas-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|string|

<aside class="success">
This operation does not require authentication
</aside>

## areaAreaIdGET

<a id="opIdareaAreaIdGET"></a>

`GET /area/{areaId}`

*Get the info of an Area*

<h3 id="areaareaidget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|areaId|path|integer|true|ID of the area to get|

> Example responses

> 200 Response

```json
{
  "name": "string",
  "status": false,
  "action": [
    {
      "name": "string",
      "serviceId": 0
    }
  ],
  "reaction": [
    {
      "name": "string",
      "serviceId": 0
    }
  ]
}
```

<h3 id="areaareaidget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[Area](#schemaarea)|

<aside class="success">
This operation does not require authentication
</aside>

## areaAreaIdPUT

<a id="opIdareaAreaIdPUT"></a>

`PUT /area/{areaId}`

*Update a user area*

> Body parameter

```json
{
  "name": "string",
  "status": false,
  "action": [
    {
      "name": "string",
      "serviceId": 0
    }
  ],
  "reaction": [
    {
      "name": "string",
      "serviceId": 0
    }
  ]
}
```

<h3 id="areaareaidput-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|areaId|path|integer|true|Id of the area to update|
|body|body|[Area](#schemaarea)|false|none|

<h3 id="areaareaidput-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid Area object|None|

<aside class="success">
This operation does not require authentication
</aside>

## areaAreaIdDELETE

<a id="opIdareaAreaIdDELETE"></a>

`DELETE /area/{areaId}`

*Delete an area*

<h3 id="areaareaiddelete-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|areaId|path|integer|true|ID of the area to delete|

<h3 id="areaareaiddelete-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|None|

<aside class="success">
This operation does not require authentication
</aside>

## areaCreatePOST

<a id="opIdareaCreatePOST"></a>

`POST /area/create`

*Create an area with info*

<h3 id="areacreatepost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|areaObject|header|[Area](#schemaarea)|false|none|

<h3 id="areacreatepost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Name already exists|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="area-services">services</h1>

Access possible services

## servicesGET

<a id="opIdservicesGET"></a>

`GET /services`

*Retrieves all services*

> Example responses

> 200 Response

```json
[
  {
    "name": "string",
    "url": "string"
  }
]
```

<h3 id="servicesget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|operation successful|Inline|

<h3 id="servicesget-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[allOf]|false|none|none|

*allOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Component](#schemacomponent)|false|none|none|
|»» name|string|false|none|none|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» url|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## servicesServiceIdActionsGET

<a id="opIdservicesServiceIdActionsGET"></a>

`GET /services/{serviceId}/actions`

*Retrieves actions of a service*

<h3 id="servicesserviceidactionsget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|serviceId|path|string|true|the id of the service|

> Example responses

> 200 Response

```json
[
  {
    "name": "string",
    "serviceId": 0
  }
]
```

<h3 id="servicesserviceidactionsget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|operation successful|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|no known service with this id|None|

<h3 id="servicesserviceidactionsget-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[allOf]|false|none|none|

*allOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Component](#schemacomponent)|false|none|none|
|»» name|string|false|none|none|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» serviceId|integer|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## servicesServiceIdReactionsGET

<a id="opIdservicesServiceIdReactionsGET"></a>

`GET /services/{serviceId}/reactions`

*Retrieves reactions of a service*

<h3 id="servicesserviceidreactionsget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|serviceId|path|string|true|the id of the service|

> Example responses

> 200 Response

```json
[
  {
    "name": "string",
    "serviceId": 0
  }
]
```

<h3 id="servicesserviceidreactionsget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|operation successful|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|no known service with this id|None|

<h3 id="servicesserviceidreactionsget-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[allOf]|false|none|none|

*allOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Component](#schemacomponent)|false|none|none|
|»» name|string|false|none|none|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» serviceId|integer|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "services": [
    {
      "serviceId": 0,
      "token": "string",
      "refreshToken": "string",
      "expirationDate": "2019-08-24"
    }
  ],
  "email": "string",
  "password": "pa$$word"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|services|[[Oauth](#schemaoauth)]|false|none|none|
|email|string|false|none|none|
|password|string(password)|false|none|none|

<h2 id="tocS_Component">Component</h2>
<!-- backwards compatibility -->
<a id="schemacomponent"></a>
<a id="schema_Component"></a>
<a id="tocScomponent"></a>
<a id="tocscomponent"></a>

```json
{
  "name": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|

<h2 id="tocS_Service">Service</h2>
<!-- backwards compatibility -->
<a id="schemaservice"></a>
<a id="schema_Service"></a>
<a id="tocSservice"></a>
<a id="tocsservice"></a>

```json
{
  "name": "string",
  "url": "string"
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Component](#schemacomponent)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» url|string|false|none|none|

<h2 id="tocS_Action">Action</h2>
<!-- backwards compatibility -->
<a id="schemaaction"></a>
<a id="schema_Action"></a>
<a id="tocSaction"></a>
<a id="tocsaction"></a>

```json
{
  "name": "string",
  "serviceId": 0
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Component](#schemacomponent)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» serviceId|integer|false|none|none|

<h2 id="tocS_Reaction">Reaction</h2>
<!-- backwards compatibility -->
<a id="schemareaction"></a>
<a id="schema_Reaction"></a>
<a id="tocSreaction"></a>
<a id="tocsreaction"></a>

```json
{
  "name": "string",
  "serviceId": 0
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Component](#schemacomponent)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» serviceId|integer|false|none|none|

<h2 id="tocS_Area">Area</h2>
<!-- backwards compatibility -->
<a id="schemaarea"></a>
<a id="schema_Area"></a>
<a id="tocSarea"></a>
<a id="tocsarea"></a>

```json
{
  "name": "string",
  "status": false,
  "action": [
    {
      "name": "string",
      "serviceId": 0
    }
  ],
  "reaction": [
    {
      "name": "string",
      "serviceId": 0
    }
  ]
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Component](#schemacomponent)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» status|boolean|false|none|none|
|» action|[[Action](#schemaaction)]|false|none|none|
|» reaction|[[Reaction](#schemareaction)]|false|none|none|

<h2 id="tocS_Oauth">Oauth</h2>
<!-- backwards compatibility -->
<a id="schemaoauth"></a>
<a id="schema_Oauth"></a>
<a id="tocSoauth"></a>
<a id="tocsoauth"></a>

```json
{
  "serviceId": 0,
  "token": "string",
  "refreshToken": "string",
  "expirationDate": "2019-08-24"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|serviceId|number|false|none|none|
|token|string|false|none|none|
|refreshToken|string|false|none|none|
|expirationDate|string(date)|false|none|none|

<h2 id="tocS_ApiResponse">ApiResponse</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponse"></a>
<a id="schema_ApiResponse"></a>
<a id="tocSapiresponse"></a>
<a id="tocsapiresponse"></a>

```json
{
  "code": 0,
  "type": "string",
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer(int32)|false|none|none|
|type|string|false|none|none|
|message|string|false|none|none|

