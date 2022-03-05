import 'dart:io';

import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuple/tuple.dart';
import 'package:url_launcher/url_launcher.dart';

const Map<String, String> urls = {
  "discord":
      "https://discord.com/api/oauth2/authorize?client_id=286959581488480267&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fauth&response_type=code&scope=identify%20email",
  "googleCalendar": "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline" +
      "&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.app.created%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.calendarlist.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.owned" +
      "&response_type=code&client_id=338854183277-1u6esadfcuu84km6jvh9pd1adnq6vc9g.apps.googleusercontent.com" +
      "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FgoogleCalendar%2Fauth",
  "notion": "https://api.notion.com/v1/oauth/authorize?" +
      "client_id=69156507-b2a0-46ac-aea9-afe5a4227b1f" +
      "&response_type=code&owner=user"
};

Future<Tuple3<String, String, bool>> interceptToken(BuildContext context,
    String oauthName, String code, SharedPreferences prefs) async {
  var response = await Manager.of(context).api.oauthGetToken(code, oauthName);

  prefs.setString("username", response.item1);
  prefs.setString("token_session", response.item2);
  prefs.setBool("isLogged", response.item3);

  return response;
}

//TODO: fix close serveur

void registerOauth(BuildContext context, String serviceName) async {
  final SharedPreferences _prefs = await SharedPreferences.getInstance();

  var server = await HttpServer.bind("localhost", 3000);

  try {
    print("Serveur launch on " +
        server.address.toString() +
        server.port.toString());

    if (!await launch(urls[serviceName]!,
      enableJavaScript: true,
      forceWebView: true,
      enableDomStorage: true,
    )) {
      server.close();
      throw "Could not start OAuth";
    }

    await server.forEach((HttpRequest request) {
      print(request.uri.path);
      if (request.uri.path != "/" + serviceName + "/auth") {
        request.response.statusCode = HttpStatus.notFound;
        request.response.close();
        server.close();
        return;
    }

    print("URI ==>" + request.uri.toString());
    final code = request.uri.queryParameters["code"];
    if (code == null) {
      throw "Missing code";
    }
    request.response.close();
    server.close();
    interceptToken(context, serviceName, code, _prefs).then((value) {
      closeWebView();
      if (value.item3 == true) {
        server.close();
        Navigator.pushNamed(context, '/home');
      } else {
        server.close();
        //TODO: toast System
        Navigator.pushNamed(context, '/login');
      }
    });
    });
  } finally {
    server.close();
  }
}
