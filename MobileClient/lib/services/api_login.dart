import 'dart:io';

import 'package:area/components/toast.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:oauth2_client/google_oauth2_client.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuple/tuple.dart';
import 'package:url_launcher/url_launcher.dart';

const Map<String, String> urls = {
  "discord":
      "https://discord.com/api/oauth2/authorize?client_id=286959581488480267&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fdiscord%2Fauth&response_type=code&scope=identify%20email",
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

  prefs.setString("username", response.item1);
  prefs.setString("access_token", response.item2);
  prefs.setBool("isLogged", response.item3);

  return response;
}

void loginOauth(BuildContext context, String serviceName) async {
  if (serviceName == "Intra") {
    Navigator.pushNamed(context, '/login_epitech');
    return;
  }
  final SharedPreferences _prefs = await SharedPreferences.getInstance();
  var server = await HttpServer.bind("localhost", 8080, shared: true);
  
  print("Serveur launch on " +
      server.address.toString() +
      server.port.toString());
  try {
    var l = await launch(
      urls[serviceName]! + "&state=" + _prefs.getString("access_token")!,
      enableJavaScript: true,
      forceWebView: true,
      enableDomStorage: true,
      universalLinksOnly: true,
    );
    if (l == false) {
      server.close();
      throw "Could not start OAuth";
    }
  } catch (err) {
    server.close(force: true);
    throw 'Could not launch oauth';
  }

  await server.forEach((HttpRequest request) {
    if (request.uri.path != "/" + serviceName + "/auth") {
      request.response.statusCode = HttpStatus.notFound;
      request.response.close();
      server.close();
      return;
    }

    final code = request.uri.queryParameters["code"];
    if (code == null) {
      server.close();
      throw "Missing code";
    }
    request.response.close();
    server.close();
    interceptToken(context, serviceName, code, _prefs).then((value) {
      closeWebView();
      if (value.item3 == true) {
        Navigator.pushNamed(context, '/home');
      } else {
        toast(context, "Can't login to " + serviceName);
        Navigator.pushNamed(context, '/login');
      }
    });
    // else:
  });
}
