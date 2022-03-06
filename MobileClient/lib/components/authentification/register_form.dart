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
        color: theme.background,
        margin: const EdgeInsets.symmetric(
          horizontal: 10,
        ),
        child: Form(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround ,
            children: [
              TextField(
                decoration: InputDecoration(
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: theme.primaryColor, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  border: OutlineInputBorder(
                    borderSide: const BorderSide(color: theme.primaryColor, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  alignLabelWithHint: true,
                  floatingLabelAlignment: FloatingLabelAlignment.center,
                  filled: true,
                  fillColor: Colors.white,
                  labelText: 'Your Email',
                  labelStyle: const TextStyle(
                    color: Color.fromARGB(255, 122, 122, 122),
                    height: 2.5
                  ),
                  suffixIcon: const Icon(Icons.mail)
                ),
                onChanged: _getEmail,
              ),
              const SizedBox(height: 20),
              TextField(
                obscureText: _obscureText,
                decoration: InputDecoration(
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: theme.primaryColor, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  border: OutlineInputBorder(
                    borderSide: const BorderSide(color: theme.primaryColor, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                  alignLabelWithHint: true,
                  floatingLabelAlignment: FloatingLabelAlignment.center,
                  labelStyle: TextStyle(
                    color: Colors.grey[400],
                    height: 2.5
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
              const SizedBox(height: 20),
              TextField(
                obscureText: _obscureText,
                decoration: InputDecoration(
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: theme.primaryColor, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  border: OutlineInputBorder(
                    borderSide: const BorderSide(color: theme.primaryColor, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  alignLabelWithHint: true,
                  floatingLabelAlignment: FloatingLabelAlignment.center,
                  filled: true,
                  fillColor: Colors.white,
                  labelStyle: TextStyle(
                    color: Colors.grey[400],
                    height: 3
                  ),
                  labelText: 'Confirm password',
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
              const SizedBox(height: 15),
              Text("Or", style: theme.titleStyle,),
              const SizedBox(height: 15),
              DelayedAnimation(
                delay: 500,
                child: RFLargeButton(
                  backgroundColor: theme.primaryLightColor,
                  buttonIcon: Icons.arrow_back_outlined,
                  passedFunction: Navigator.pushReplacementNamed,
                  buttonText: 'Login',
                  parentContext: context,
                  passedString: "/authentification",
                  size: const Size(200, 50),
                ),
              ),
            ],
          ),
        ));
  }
}
