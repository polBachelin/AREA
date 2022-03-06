import 'package:area/components/authentification/register_form.dart';
import 'package:area/pages/user_space/settings.dart';
import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;
import '../../components/animations/delayed_animation.dart';

// ignore: constant_identifier_names
const d_red = Color(0xFFE9717D);

class RegisterEmailScreen extends StatelessWidget {
  const RegisterEmailScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: theme.background,
        appBar: AppBar(
          elevation: 0,
          centerTitle: true,
          title: Image.asset("./images/AREA.png", scale: 1.5),
          backgroundColor: theme.background,
          leading: IconButton(
            icon: const Icon(
              Icons.close,
              color: Colors.white,
              size: 30,
            ),
            onPressed: () {
              SettingsScreenState.clearSharedPrefs();
              Navigator.pushReplacementNamed(context, "/authentification");
            },
          ),
        ),
        body: SingleChildScrollView(
            child: Container(
                margin: const EdgeInsets.symmetric(
                  vertical: 40,
                  horizontal: 30,
                ),
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 50),
                      DelayedAnimation(
                        delay: 500,
                        child: Text(
                          "Register you with email address",
                          style: theme.titleStyle,
                        ),
                      ),
                      const SizedBox(height: 22),
                      const RegisterForm(),
                      const SizedBox(height: 30),
                    ]))));
  }
}
