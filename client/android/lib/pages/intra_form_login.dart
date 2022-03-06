import 'package:flutter/material.dart';
import 'package:area/components/roundedFlatButton.dart';
import 'package:area/components/inputText.dart';
import 'package:area/theme.dart' as theme;
import 'package:area/services/manager.dart';
import 'package:shared_preferences/shared_preferences.dart';

class IntraFormLogin extends StatefulWidget {
  const IntraFormLogin({Key? key}) : super(key: key);

  @override
  IntraFormLoginState createState() => IntraFormLoginState();
}

class IntraFormLoginState extends State<IntraFormLogin> {
  String _autologinLink = "";

  void _getNewLink(String autologin) {
    setState(() {
      _autologinLink = autologin;
    });
  }

  @override
  void initState() {
    super.initState();
  }

  void _connectServer(BuildContext context) async {
    print("LOGIN -=>");
    final reponse = Manager.of(context).api.postIntraRequest(_autologinLink, true);

    reponse.then((value) {
      if (value == true) {
        Navigator.pushNamed(context, '/home');
      } else {
        Navigator.pop(context);
        Navigator.pushNamed(context, '/register');
      }
    });
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
              inputName: 'Autologin Link',
              inputIcon: Icons.link,
              inputHintText: 'Link auto login intra',
              inputType: TextInputType.text,
              inputHidden: false,
              getInputValue: _getNewLink,
              errorText: '',
            ),
            Container(
              margin: const EdgeInsets.only(top: 15.0),
              child: RoundedFlatButton(
                buttonText: 'Connect to intra',
                backgroundColor: theme.primaryColor,
                passedFunction: _connectServer,
                buttonIcon: Icons.connect_without_contact_outlined,
              ),
            ),
          ]),
        ))));
  }
}
