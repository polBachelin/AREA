import 'dart:io';

import 'package:oauth2_client/github_oauth2_client.dart';
import 'package:oauth2_client/access_token_response.dart';
import 'package:oauth2_client/oauth2_client.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter/material.dart';
import 'package:oauth2_client/access_token_response.dart';
import 'dart:convert';
import 'package:url_launcher/url_launcher.dart';

class DiscordOauthClient extends OAuth2Client {
  DiscordOauthClient(
      {required String redirectUri, required String customUriScheme})
      : super(
            authorizeUrl: 'https://discordapp.com/oauth2/authorize?',
            tokenUrl: 'https://discord.com/api/oauth2/token',
            redirectUri: redirectUri,
            scopeSeparator: ',',
            customUriScheme: customUriScheme) {
    this.accessTokenRequestHeaders = {'Accept': 'application/json'};
  }
}

class RootPage extends StatefulWidget {
  RootPage();

  @override
  State<StatefulWidget> createState() => _RootPageState();
}

class _RootPageState extends State<RootPage> {
  bool failed = false;
  bool logged = false;
  bool loading = false;

  @override
  void initState() {
    super.initState();
  }

  /// Perform the OAuth process.
  void _doOAuth() async {
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
      request.response.write(code);
      request.response.close();
      logged = true;
      print("Let's GO");
      server.close();
      closeWebView();
    });
  }

  Widget getBody() {
    if (!logged) {
      return ElevatedButton(
          onPressed: () {
            _doOAuth();
          },
          child: Text(!failed
              ? 'Connexion avec Imgur'
              : 'Echec de la connexion. Cliquez pour réessayer'));
    } else {
      Navigator.pushNamed(context, '/home');
      return Text('Donnnnee...');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: new AppBar(title: new Text('Imgur App')),
        body: Center(child: getBody()));
  }
}
