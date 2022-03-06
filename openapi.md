## About

<a id="opIdAppController_About"></a>

`GET /about.json`

<h3 id="appcontroller_about-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

<h1 id="area-area">area</h1>

## Area: createArea

<a id="opIdAreaController_createArea"></a>

`POST /area/create`

*Create an area*

<h3 id="areacontroller_createarea-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
</aside>

## Area: enableArea

<a id="opIdAreaController_enableArea"></a>

`GET /area/{name}/enable`

*Enable an area with name for logged in user*

<h3 id="areacontroller_enablearea-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|none|

<h3 id="areacontroller_enablearea-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Area: disableArea

<a id="opIdAreaController_disableArea"></a>

`GET /area/{name}/disable`

*Disable an area with name for logged in user*

<h3 id="areacontroller_disablearea-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|none|

<h3 id="areacontroller_disablearea-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Area: getAllAreas

<a id="opIdAreaController_getAllAreas"></a>

`GET /area`

*Get logged in user areas*

<h3 id="areacontroller_getallareas-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Area: getArea

<a id="opIdAreaController_getArea"></a>

`GET /area/{name}`

*Get an area information*

<h3 id="areacontroller_getarea-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|none|

<h3 id="areacontroller_getarea-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Area: deleteArea

<a id="opIdAreaController_deleteArea"></a>

`DELETE /area/{name}`

*Delete an area with name*

<h3 id="areacontroller_deletearea-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|none|

<h3 id="areacontroller_deletearea-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Area: isEnabled

<a id="opIdAreaController_isEnabled"></a>

`GET /area/{name}/isEnabled`

*Checks if area is enabled*

<h3 id="areacontroller_isenabled-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|none|

<h3 id="areacontroller_isenabled-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

<h1 id="area-auth">auth</h1>

## Auth: login

<a id="opIdAuthController_login"></a>

`POST /auth/login`

*Login to the server*

> Body parameter

```json
{
  "email": "toto@gmail.com",
  "password": "toto123"
}
```

<h3 id="authcontroller_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginApiDTO](#schemaloginapidto)|true|Your credential|

<h3 id="authcontroller_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
</aside>

## Auth: getCurrentUser

<a id="opIdAuthController_getCurrentUser"></a>

`GET /auth/profile`

*Get the current user*

<h3 id="authcontroller_getcurrentuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Auth: register

<a id="opIdAuthController_register"></a>

`POST /auth/register`

*Register to the server*

> Body parameter

```json
{
  "email": "toto@gmail.com",
  "password": "toto123"
}
```

<h3 id="authcontroller_register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginApiDTO](#schemaloginapidto)|true|Your credential|

<h3 id="authcontroller_register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
</aside>

## Auth: logout

<a id="opIdAuthController_logout"></a>

`POST /auth/logout`

*Logout user*

<h3 id="authcontroller_logout-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
</aside>

<h1 id="area-services">services</h1>

## Services: getServices

<a id="opIdServicesController_getServices"></a>

`GET /services`

*Get all services*

<h3 id="servicescontroller_getservices-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Services: getActions

<a id="opIdServicesController_getActions"></a>

`GET /services/{id}/actions`

*Get certain service actions*

<h3 id="servicescontroller_getactions-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="servicescontroller_getactions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Services: getReactions

<a id="opIdServicesController_getReactions"></a>

`GET /services/{id}/reactions`

*Get certain service reactions*

<h3 id="servicescontroller_getreactions-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="servicescontroller_getreactions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Services: getLoggedServices

<a id="opIdServicesController_getLoggedServices"></a>

`GET /services/logged`

*Get all logged in services*

<h3 id="servicescontroller_getloggedservices-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

<h1 id="area-notion">notion</h1>

## Notion: notionCallback

<a id="opIdNotionController_notionCallback"></a>

`GET /notion/auth`

*Get the access token from the authorization code*

<h3 id="notioncontroller_notioncallback-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Notion: getNotionToken

<a id="opIdNotionController_getNotionToken"></a>

`GET /notion/token`

*Retrieve the notion token from the db*

<h3 id="notioncontroller_getnotiontoken-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Notion: getNotionDatabases

<a id="opIdNotionController_getNotionDatabases"></a>

`GET /notion/databases`

*Retrieve notion user databases*

<h3 id="notioncontroller_getnotiondatabases-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">

</aside>

## Notion: getNotionDatabaseTitle

<a id="opIdNotionController_getNotionDatabaseTitle"></a>

`GET /notion/databases/title`

*Retrieve notion user databases titles*

<h3 id="notioncontroller_getnotiondatabasetitle-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Notion: notionMobileCallback

<a id="opIdNotionController_notionMobileCallback"></a>

`GET /notion/auth_mobile`

*Get the access token from the authorization code*

<h3 id="notioncontroller_notionmobilecallback-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

<h1 id="area-discord">discord</h1>

## Discord: discordCallback

<a id="opIdDiscordController_discordCallback"></a>

`GET /discord/auth`

*Get the access from the authorization*

<h3 id="discordcontroller_discordcallback-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Discord: getChannels

<a id="opIdDiscordController_getChannels"></a>

`GET /discord/getChannels`

*Get the channels of the bot*

<h3 id="discordcontroller_getchannels-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Discord: runBotMessage

<a id="opIdDiscordController_runBotMessage"></a>

`GET /discord/run`

<h3 id="discordcontroller_runbotmessage-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Discord: getRoles

<a id="opIdDiscordController_getRoles"></a>

`GET /discord/getRoles`

*Get the roles of servers*

<h3 id="discordcontroller_getroles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## Discord: discordMobileCallback

<a id="opIdDiscordController_discordMobileCallback"></a>

`GET /discord/auth_mobile`

*Get the access from the authorization*

<h3 id="discordcontroller_discordmobilecallback-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

<h1 id="area-intra-epitech">Intra Epitech</h1>

## Intra: intraPostToken

<a id="opIdIntraController_intraPostToken"></a>

`POST /intra/token`

*Post the intra's access token for request*

> Body parameter

```json
{
  "link": ""
}
```

<h3 id="intracontroller_intraposttoken-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[IntraTokenDTO](#schemaintratokendto)|true|Your intra autologin, get one at https://intra.epitech.eu/admin/autolog|

<h3 id="intracontroller_intraposttoken-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
</aside>

## Intra: changeGPA

<a id="opIdIntraController_changeGPA"></a>

`POST /intra/change_gpa`

<h3 id="intracontroller_changegpa-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
</aside>

## Intra: changeLNotif

<a id="opIdIntraController_changeLNotif"></a>

`POST /intra/change_lnotif`

<h3 id="intracontroller_changelnotif-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
</aside>

<h1 id="area-google">google</h1>

## GoogleCalendar: googleCalendarCallback

<a id="opIdGoogleCalendarController_googleCalendarCallback"></a>

`GET /googleCalendar/auth`

*Get the access token from google*

<h3 id="googlecalendarcontroller_googlecalendarcallback-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## GoogleCalendar: googleCalendarCallbackMobile

<a id="opIdGoogleCalendarController_googleCalendarCallbackMobile"></a>

`GET /googleCalendar/auth_mobile`

*Get the access token from google*

<h3 id="googlecalendarcontroller_googlecalendarcallbackmobile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## GoogleCalendar: createGoogleEvent

<a id="opIdGoogleCalendarController_createGoogleEvent"></a>

`GET /googleCalendar/createEvent`

<h3 id="googlecalendarcontroller_creategoogleevent-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

## GoogleCalendar: listCalendars

<a id="opIdGoogleCalendarController_listCalendars"></a>

`GET /googleCalendar/listCalendars`

*Get all calendars from user*

<h3 id="googlecalendarcontroller_listcalendars-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
</aside>

# Schemas

<h2 id="tocS_LoginApiDTO">LoginApiDTO</h2>
<!-- backwards compatibility -->
<a id="schemaloginapidto"></a>
<a id="schema_LoginApiDTO"></a>
<a id="tocSloginapidto"></a>
<a id="tocsloginapidto"></a>

```json
{
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|Email|
|password|string|true|none|Password|

<h2 id="tocS_IntraTokenDTO">IntraTokenDTO</h2>
<!-- backwards compatibility -->
<a id="schemaintratokendto"></a>
<a id="schema_IntraTokenDTO"></a>
<a id="tocSintratokendto"></a>
<a id="tocsintratokendto"></a>

```json
{
  "link": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|link|string|true|none|Autologin link|

