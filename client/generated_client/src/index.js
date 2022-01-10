/*
 * AREA
 * Area for epitech
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.30
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from './ApiClient';
import {Action} from './model/Action';
import {ApiResponse} from './model/ApiResponse';
import {Area} from './model/Area';
import {Component} from './model/Component';
import {Reaction} from './model/Reaction';
import {Service} from './model/Service';
import {Token} from './model/Token';
import {User} from './model/User';
import {AreaApi} from './api/AreaApi';
import {ServicesApi} from './api/ServicesApi';
import {UserApi} from './api/UserApi';

/**
* Area_for_epitech.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var Area = require('index'); // See note below*.
* var xxxSvc = new Area.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new Area.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new Area.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new Area.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.0
*/

var Area = require('area');

var api = new Area.AreaApi()
var areaId = 56; // {Number} ID of the area to delete

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
api.areaAreaIdDelete(areaId, callback);

export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The Action model constructor.
     * @property {module:model/Action}
     */
    Action,

    /**
     * The ApiResponse model constructor.
     * @property {module:model/ApiResponse}
     */
    ApiResponse,

    /**
     * The Area model constructor.
     * @property {module:model/Area}
     */
    Area,

    /**
     * The Component model constructor.
     * @property {module:model/Component}
     */
    Component,

    /**
     * The Reaction model constructor.
     * @property {module:model/Reaction}
     */
    Reaction,

    /**
     * The Service model constructor.
     * @property {module:model/Service}
     */
    Service,

    /**
     * The Token model constructor.
     * @property {module:model/Token}
     */
    Token,

    /**
     * The User model constructor.
     * @property {module:model/User}
     */
    User,

    /**
    * The AreaApi service constructor.
    * @property {module:api/AreaApi}
    */
    AreaApi,

    /**
    * The ServicesApi service constructor.
    * @property {module:api/ServicesApi}
    */
    ServicesApi,

    /**
    * The UserApi service constructor.
    * @property {module:api/UserApi}
    */
    UserApi
};
