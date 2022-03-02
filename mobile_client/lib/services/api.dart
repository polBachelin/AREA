import 'package:area/models/services.dart';
import 'package:area/services/discord_api.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class Server {
  Server({required this.url});
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  String url;
  Map<String, String> headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  };

  void updateToken() {
    _prefs.then((SharedPreferences prefs) =>
        headers["Authorization"] = prefs.getString("session_token")!);
  }

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
    });
    return true;
  }

  Future<bool> oauthGetToken(dynamic code, String serviceName) async {
    final response = await getRequest('/' + serviceName + '/auth_mobile?code=$code');

    if (response.statusCode >= 300) {
      print(response.body.toString());
      final error = json.decode(response.body.toString())['error'];
      return false;
    }
    return true;
  }

  Future<List<Service>> getServices() async {
    final response = await getRequest('/services');

    if (response.statusCode == 200) {
      final List services = json.decode(response.body);

      return services.map((json) => Service.fromJson(json)).where((service) {
        final nameService = service.name.toLowerCase();
        final icon = service.icon.toLowerCase();

        return true;
      }).toList();
    } else {
      throw Exception();
    }
  }
}
