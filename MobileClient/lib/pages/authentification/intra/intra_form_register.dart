import 'package:flutter/material.dart';
import 'package:area/components/buttons/roundedFlatButton.dart';
import 'package:area/components/buttons/inputText.dart';
import 'package:area/theme.dart' as theme;
import 'package:area/services/manager.dart';
import 'package:shared_preferences/shared_preferences.dart';

class IntraFormRegister extends StatefulWidget {
  const IntraFormRegister({Key? key}) : super(key: key);

  @override
  IntraFormRegisterState createState() => IntraFormRegisterState();
}

class IntraFormRegisterState extends State<IntraFormRegister> {
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
    final reponse =
        Manager.of(context).api.postIntraRequest(_autologinLink, false);

    reponse.then((value) {
      if (value == true) {
        Navigator.pushReplacementNamed(context, '/home');
      } else {
        Navigator.pop(context);
        Navigator.pushReplacementNamed(context, '/authentification');
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
