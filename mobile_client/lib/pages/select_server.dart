import 'package:flutter/material.dart';
import 'package:area/components/roundedFlatButton.dart';
import 'package:area/components/inputText.dart';
import 'package:area/theme.dart' as theme;
import 'package:area/service/api.dart';

class ServerPage extends StatefulWidget {
  const ServerPage({Key? key}) : super(key: key);

  @override
  ServerPageState createState() => ServerPageState();
}

class ServerPageState extends State<ServerPage> {
  String _newServer = '';

  void _getNewServer(String server) {
    setState(() {
      _newServer = server;
    });
  }

  void _connectServer(BuildContext context) {
    Manager.of(context).api.changeUrl("http://" + _newServer + ":3000");
    Navigator.pushNamed(context, '/register');
  }

  @override
  Widget build(BuildContext context) {
    return (Scaffold(
        backgroundColor: theme.background,
        body: Center(
            child: Container(
          margin: const EdgeInsets.only(
            left: 40.0,
            right: 40.0,
          ),
          child: ListView(shrinkWrap: true, children: <Widget>[
            Input(
              inputName: 'newserver',
              inputIcon: Icons.dns,
              inputHintText: '0.0.0.0',
              inputType: TextInputType.text,
              inputHidden: false,
              getInputValue: _getNewServer,
              errorText: 'Bad Ip Adress',
            ),
            Container(
              margin: const EdgeInsets.only(top: 15.0),
              child: RoundedFlatButton(
                buttonText: 'Connect to server',
                backgroundColor: theme.primaryColor,
                passedFunction: _connectServer,
                buttonIcon: Icons.connect_without_contact_outlined,
              ),
            ),
          ]),
        ))));
  }
}
