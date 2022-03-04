import 'package:area/models/services.dart';
import 'package:area/services/notion_api.dart';
import 'package:area/utils/server_requests.dart';
import 'package:flutter/foundation.dart';

import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuple/tuple.dart';

class Server {
  Server({required this.url});
  final Future<SharedPreferences> prefs = SharedPreferences.getInstance();
  String url;

  final notion = NotionAPI(prefs: SharedPreferences.getInstance());

  Map<String, String> headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  };

  void updateToken() {
    prefs.then((SharedPreferences p) =>
        headers["Authorization"] = "Bearer " + p.getString("token_session")!);
    notion.headers = headers;
  }

  void changeUrl(newUrl) {
    url = newUrl;
    notion.url = newUrl;
  }

  Future<bool> register(dynamic data) async {
    final response =
        await ServerRequest.postRequest(url, '/auth/register', data, headers);
    if (response.statusCode >= 300) {
      print(response.body.toString());
      final error = json.decode(response.body.toString())['message'];
      return false;
    }
    prefs.then((SharedPreferences p) {
      p.setString(
          "username", json.decode(response.body.toString())['user']['email']);
      p.setString("token_session",
          json.decode(response.body.toString())['token']['access_token']);
    });
    return true;
  }

  Future<bool> postIntraRequest(dynamic data) async {
    final response = await ServerRequest.postRequest(
        url, '/intra/token', {"link": data}, headers);
    if (response.statusCode >= 300) {
      final error = json.decode(response.body.toString())['message'];
      return false;
    }
    print(response.body.toString());
    prefs.then((SharedPreferences p) {
      p.setString("username", json.decode(response.body.toString())['email']);
      p.setString("token_session",
          json.decode(response.body.toString())['token']['access_token']);
    });
    return true;
  }

  Future<Tuple3<String, String, bool>> oauthGetToken(
      dynamic code, String serviceName) async {
    final response = await ServerRequest.getRequest(
        url, '/' + serviceName + '/auth_mobile?code=$code', headers);
    var ret = const Tuple3<String, String, bool>("", "", false);

    if (response.statusCode >= 300) {
      print(response.body.toString());
      final error = json.decode(response.body.toString())['error'];
      return ret;
    }
    if (response.statusCode == 200) {
      print("Body ==> " + response.body);
      final uri = Uri.parse(json.decode(response.body.toString())['url']);
      ret = ret.withItem1(uri.queryParameters["email"]!);
      ret = ret.withItem2(uri.queryParameters["token"]!);
      ret = ret.withItem3(true);
    }
    print("TUPLE returned ==> " + ret.toString());
    return ret;
  }

  Future<List<Service>> getServices() async {
    final response = await ServerRequest.getRequest(url, '/services', headers);
    updateToken();
    final loggedServices =
        await ServerRequest.getRequest(url, "/services/logged", headers);
    var joe = List<String>.from(json.decode(loggedServices.body));
    print("Logged Services ==> " + joe.toString());

    if (response.statusCode == 200) {
      final List services = json.decode(response.body);

      return services.map((json) => Service.fromJson(json)).where((service) {
        final nameService = service.name.toLowerCase();
        if (joe.contains(nameService)) {
          service.connected = true;
        }

        return true;
      }).toList();
    } else {
      throw Exception();
    }
  }
}
