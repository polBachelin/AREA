import 'dart:async';
import 'package:flutter/material.dart';
import 'package:area/components/delayed_animation.dart';
import 'package:area/models/user.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({Key? key}) : super(key: key);

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  Future<User>? fetchLogin;
  var _obscureText = true;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(
        horizontal: 30,
      ),
      child: Column(
        children: [
          DelayedAnimation(
            delay: 500,
            child: TextFormField(
              decoration: InputDecoration(
                labelText: 'Your Email',
                labelStyle: TextStyle(
                  color: Colors.grey[400],
                ),
              ),
              keyboardType: TextInputType.text,
              onChanged: (value) {},
              validator: (value) {
                if (value!.isEmpty) {
                  return 'Username is required';
                }
                return null;
              },
            ),
          ),
          const SizedBox(height: 30),
          DelayedAnimation(
            delay: 500,
            child: TextFormField(
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
              onSaved: (value) {},
              validator: (value) {
                if (value!.isEmpty) {
                  return 'Password is required';
                }
                return null;
              },
            ),
          ),
          const SizedBox(height: 125),
        ],
      ),
    );
  }
}
