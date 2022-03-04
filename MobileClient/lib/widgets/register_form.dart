import 'package:area/components/roundedFlatButtonLarge.dart';
import 'package:area/components/toast.dart';
import 'package:area/services/manager.dart';
import 'package:area/theme.dart' as theme;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../components/delayed_animation.dart';

class RegisterForm extends StatefulWidget {
  const RegisterForm({Key? key}) : super(key: key);

  @override
  _RegisterFormState createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
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

  void register(BuildContext context) {
    print("Try Register IP : " + Manager.of(context).api.url);
    Manager.of(context).api.register({
      "email": _email,
      "password": _password,
    }).then((success) {
      print("Logged in! :D " + success.toString());
      Navigator.of(context)
          .pushNamedAndRemoveUntil("/home", (Route<dynamic> route) => false);
    }).catchError((msg) {
      toast(context, 'Error while registering');
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
              passedFunction: register,
              buttonText: 'Register',
              parentContext: context,
              ),
          ),
        ],
      ),
    );
  }
}
