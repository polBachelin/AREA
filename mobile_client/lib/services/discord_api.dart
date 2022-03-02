import 'dart:io';

import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

Future<bool> interceptToken(
    BuildContext context, String oauthName, String code) async {
  var postRequest = await Manager.of(context).api.oauthGetToken(code, "discord");
  return true;
}

void doDiscordOAuth(BuildContext context) async {
  var server = await HttpServer.bind("localhost", 1234);
  print("Serveur launch on " +
      server.address.toString() +
      server.port.toString());
  const _oAuthUrl =
      "https://discord.com/api/oauth2/authorize?client_id=946046123288694844&redirect_uri=http%3A%2F%2F127.0.0.1%3A1234%2Fredirect&response_type=code&scope=identify%20email";
  if (!await launch(_oAuthUrl,
      enableJavaScript: true,
      forceSafariVC: true,
      forceWebView: true,
      enableDomStorage: true)) {
    throw "Could not start OAuth";
  }
  await server.forEach((HttpRequest request) {
    print(request.uri.path);
    if (request.uri.path != "/redirect") {
      request.response.statusCode = HttpStatus.notFound;
      request.response.close();
      return;
    }

    print(request.uri);
    final code = request.uri.queryParameters["code"];
    if (code == null) {
      throw "Missing code";
    }
    print(code);
    request.response.close();
    server.close();
    interceptToken(context, "discord", code).then((value) {
      closeWebView();
      if (value == true) {
        Navigator.pushNamed(context, '/home');
      } else {
        Navigator.pushNamed(context, '/login');
      }
    });
    // else:
  });
}
