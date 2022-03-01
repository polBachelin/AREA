// ignore_for_file: avoid_print

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Server {
  Server({required this.url});
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  String url;
  Map<String, String> headers = {"Content-Type": "application/json"};

  void changeUrl(newUrl) {
    url = newUrl;
  }

  Future<http.Response> getRequest(String route) async {
    if (kDebugMode) {
      print("GET - $route");
    }
    final response = await http.get(Uri.parse(url + route), headers: headers);
    if (kDebugMode) {
      print("Response payload : ${response.body}");
    }
    updateCookie(response);
    return response;
  }

  Future<http.Response> postRequest(String route, dynamic data) async {
    if (kDebugMode) {
      print("POST - $route");
      print("Payload : $data");
    }
    final response = await http.post(Uri.parse(url + route),
        headers: headers, body: json.encode(data));
    if (kDebugMode) {
      print("Response payload : ${response.body}");
    }
    updateCookie(response);
    return response;
  }

  Future<http.Response> putRequest(String route,
      {dynamic data = const {}}) async {
    print("PUT - $route");
    print("Payload : $data");
    final response = await http.put(Uri.dataFromString(url + route),
        headers: headers, body: json.encode(data));
    print("Response payload : ${response.body}");
    updateCookie(response);
    return response;
  }

  Future<http.Response> deleteRequest(String route,
      {dynamic data = const {}}) async {
    print("DELETE - $route");
    print("Payload : $data");
    final response =
        await http.delete(Uri.dataFromString(url + route), headers: headers);
    updateCookie(response);
    return response;
  }

  void updateCookie(http.Response response) {
    if (kDebugMode) {
      print(response.headers);
    }
    String? rawCookie = response.headers['set-cookie'];

    if (rawCookie == null) return;
    int index = rawCookie.indexOf(';');
    headers['cookie'] =
        (index == -1) ? rawCookie : rawCookie.substring(0, index);
  }

  Future<bool> register(dynamic data) async {
    final response = await postRequest('/auth/register', data);
    if (response.statusCode >= 300) {
      print(response.body.toString());
      final error = json.decode(response.body.toString())['message'];
      return false;
    }
    _prefs.then((SharedPreferences prefs) {
      prefs.setString(
          "username", json.decode(response.body.toString())['user']['email']);
      prefs.setString("token_session",
          json.decode(response.body.toString())['token']['access_token']);
      //print("JSON = " + json.decode(response.body.toString()));
      print(prefs.getString("username"));
    });
    return true;
  }

  Future<bool> oauthPOSTCode(dynamic data, String serviceName) async {
    final response = await postRequest('/' + serviceName + '/auth', data);
    if (response.statusCode >= 300) {
      print(response.body.toString());
      final error = json.decode(response.body.toString())['error'];
      return false;
    }
    return true;
  }
}

class _Manager extends InheritedWidget {
  const _Manager({
    required Widget child,
    required this.data,
    Key? key,
  }) : super(key: key, child: child);

  final ManagerState data;

  @override
  bool updateShouldNotify(_Manager oldWidget) => true;
}

class Manager extends StatefulWidget {
  const Manager({
    Key? key,
    required this.child,
  }) : super(key: key);

  final Widget child;

  @override
  ManagerState createState() => ManagerState();

  static ManagerState of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<_Manager>()!.data;
}

class ManagerState extends State<Manager> {
  final api = Server(url: '192.168.43.15');

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) => _Manager(
        data: this,
        child: widget.child,
      );
}
