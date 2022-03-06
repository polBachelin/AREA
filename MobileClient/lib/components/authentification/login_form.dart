import 'package:area/components/buttons/roundedFlatButtonLarge.dart';
import 'package:area/components/animations/toast.dart';
import 'package:area/services/manager.dart';
import 'package:area/theme.dart' as theme;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import '../animations/delayed_animation.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({Key? key}) : super(key: key);

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  var _obscureText = true;
  String _email = "";
  String _password = "";

  void _getEmail(String email) {
    setState(() {
      _email = email;
    });
  }

  void _getPassword(String password) {
    setState(() {
      _password = password;
    });
  }

  void login(BuildContext context) {
    Manager.of(context).api.login({
      "email": _email,
      "password": _password,
    }).then((success) {
      if (success)
        Navigator.pushReplacementNamed(context, "/home");
      else
        toast(context, 'Login Error');
    }).catchError((msg) {
      toast(context, 'Server Error');
      if (kDebugMode) {
        print(msg.toString());
      }
    });
  }

//TODO: check email + password

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(
        horizontal: 30,
      ),
      child: Column(
        children: [
          DelayedAnimation(
            delay: 300,
            child: TextField(
              decoration: InputDecoration(
                labelText: 'Your Email',
                labelStyle: TextStyle(
                  color: Colors.grey[400],
                ),
              ),
              onChanged: _getEmail,
            ),
          ),
          const SizedBox(height: 30),
          DelayedAnimation(
            delay: 400,
            child: TextField(
              obscureText: _obscureText,
              decoration: InputDecoration(
                
                labelStyle: TextStyle(
                  color: Colors.grey[400],
                ),
                labelText: 'Password',
                suffixIcon: IconButton(
                  icon: const Icon(
                    Icons.visibility,
                    color: Colors.black,
                  ),
                  onPressed: () {
                    setState(() {
                      _obscureText = !_obscureText;
                    });
                  },
                ),
              ),
              onChanged: _getPassword,
            ),
          ),
          const SizedBox(height: 30),
          DelayedAnimation(
            delay: 500,
            child: RFLargeButton(
              backgroundColor: theme.primaryColor,
              buttonIcon: Icons.login,
              passedFunction: login,
              buttonText: 'Login',
              parentContext: context,
              passedString: "",
              ),
          ),
        ],
      ),
    );
  }
}
