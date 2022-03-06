import 'dart:io';

import 'package:area/components/toast.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuple/tuple.dart';
import 'package:url_launcher/url_launcher.dart';

const Map<String, String> urlsRegister = {
  "discord":
      "https://discord.com/api/oauth2/authorize?client_id=286959581488480267&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fdiscord%2Fauth&response_type=code&scope=identify%20email&prompt=consent",
  "googleCalendar": "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline" +
      "&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.app.created%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.calendarlist.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.owned" +
      "&response_type=code&client_id=338854183277-1u6esadfcuu84km6jvh9pd1adnq6vc9g.apps.googleusercontent.com" +
      "&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2FgoogleCalendar%2Fauth",
  "notion": "https://api.notion.com/v1/oauth/authorize?" +
      "client_id=69156507-b2a0-46ac-aea9-afe5a4227b1f" +
      "&response_type=code&owner=user"
};

Future<Tuple3<String, String, bool>> interceptToken(BuildContext context,
    String oauthName, String code, SharedPreferences prefs) async {
  var response = await Manager.of(context).api.oauthGetToken(code, oauthName);

  print("TUPLE returned ==> " + response.toString());
  prefs.setString("username", response.item1);
  prefs.setString("access_token", response.item2);
  prefs.setBool("isLogged", response.item3);

  Manager.of(context).api.updateToken();

  return response;
}

//TODO: fix close serveur

void registerOauth(BuildContext context, String serviceName) async {
  final SharedPreferences _prefs = await SharedPreferences.getInstance();

  bool urlLaunched;
  var server = await HttpServer.bind("localhost", 8080, shared: true);

  try {
    print("Serveur launch on " +
        server.address.toString() +
        server.port.toString());
    if (serviceName == "googleCalendar") {
      urlLaunched = await launch(urlsRegister[serviceName]!,
          enableJavaScript: true, enableDomStorage: true);
    } else {
      urlLaunched = await launch(urlsRegister[serviceName]!,
          enableJavaScript: true, forceWebView: true, enableDomStorage: true);
    }

    if (!urlLaunched) {
      server.close();
      throw "Could not register OAuth";
    }

    await server.forEach((HttpRequest request) {
      print(request.uri.path);
      if (request.uri.path != "/" + serviceName + "/auth") {
        request.response.statusCode = HttpStatus.notFound;
        request.response.close();
        server.close();
        return;
      }

      print("Intercepted REQUEST ==> " + request.uri.toString());
      final code = request.uri.queryParameters["code"];
      if (code == null) {
        throw "Missing code";
      }
      request.response.close();
      server.close();
      interceptToken(context, serviceName, code, _prefs).then((value) {
        if (serviceName != "googleCalendar") closeWebView();
        if (value.item3 == true) {
          print(_prefs.getString("access_token"));
          server.close();
          Navigator.pushNamed(context, '/home');
        } else {
          server.close();
          toast(context, "Can't register with " + serviceName);
          Navigator.pushNamed(context, '/login');
        }
      });
    });
  } finally {
    server.close();
  }
}
