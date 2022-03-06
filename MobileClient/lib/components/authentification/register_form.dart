import 'package:area/components/buttons/roundedFlatButtonLarge.dart';
import 'package:area/components/animations/toast.dart';
import 'package:area/services/manager.dart';
import 'package:area/theme.dart' as theme;
import 'package:flutter/material.dart';
import '../animations/delayed_animation.dart';

class RegisterForm extends StatefulWidget {
  const RegisterForm({Key? key}) : super(key: key);

  @override
  _RegisterFormState createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  var _obscureText = true;
  String? _email;
  String? _password;
  String? _confirmedPassword;

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

  void _getPasswordConfirmed(String password) {
    setState(() {
      _confirmedPassword = password;
    });
  }

  void register(BuildContext context) {
    if (_password != _confirmedPassword) {
      return toast(context, "Passwords differ");
    }
    print("Try Register IP : " + Manager.of(context).api.url);
    Manager.of(context).api.register({
      "email": _email,
      "password": _password,
    }).then((success) {
      if (!success) {
        return toast(context, 'User already exists');
      }
      Navigator.pushReplacementNamed(context, "/home");
    }).catchError((msg) {
      print(msg);
      toast(context, 'Login Error ! Retry');
    });
  }

//TODO: check email + password

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.symmetric(
          horizontal: 20,
        ),
        child: Form(
          child: Column(
            children: [
              TextField(
                decoration: InputDecoration(
                  labelText: 'Your Email',
                  labelStyle: TextStyle(
                    color: Colors.grey[400],
                  ),
                ),
                onChanged: _getEmail,
              ),
              const SizedBox(height: 30),
              TextField(
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
              TextField(
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
                onChanged: _getPasswordConfirmed,
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
                  passedString: "",
                ),
              ),
            ],
          ),
        ));
  }
}
