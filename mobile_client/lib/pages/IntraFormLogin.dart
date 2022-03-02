import 'package:flutter/material.dart';
import 'package:area/components/roundedFlatButton.dart';
import 'package:area/components/inputText.dart';
import 'package:area/theme.dart' as theme;
import 'package:area/services/manager.dart';
import 'package:shared_preferences/shared_preferences.dart';

class IntraFromLogin extends StatefulWidget {
  const IntraFromLogin({Key? key}) : super(key: key);

  @override
  IntraFormLoginState createState() => IntraFormLoginState();
}

class IntraFormLoginState extends State<IntraFromLogin> {
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  void _getNewServer(String server) {
    setState(() {
      _prefs.then((SharedPreferences prefs) {
        print("Base IP : " + prefs.getString('server_ip')!);
        prefs.setString('server_ip', server);
        Manager.of(context).api.changeUrl("http://" + prefs.getString('server_ip')! + ":3000");
        print("Update IP : " + Manager.of(context).api.url);
      });
    });
  }

  @override
  void initState() {
    super.initState();
    _prefs.then((SharedPreferences prefs) {
      return prefs.getString('server_ip') ??
          prefs.setString('server_ip', '192.168.43.15');
    });
  }

  void _connectServer(BuildContext context) async {
    final SharedPreferences prefs = await _prefs;
    final String server = prefs.getString('server_ip') ?? "";
    Manager.of(context).api.changeUrl("http://" + server + ":3000");
    print("Connect to server IP : " + Manager.of(context).api.url);
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
