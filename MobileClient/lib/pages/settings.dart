import 'package:area/components/delayed_animation.dart';
import 'package:area/components/roundedFlatButton.dart';
import 'package:area/theme.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:area/theme.dart' as theme;

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  SettingsScreenState createState() => SettingsScreenState();
}

class SettingsScreenState extends State<SettingsScreen> {
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
  late Future<String> _username;

  @override
  void initState() {
    super.initState();
    _username = _prefs.then((SharedPreferences prefs) {
      return prefs.getString('username') ?? '';
    });
  }

  Future<void> clearSharedPrefs() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if (prefs.get('username') != null) {
      prefs.remove('username');
    }
    if (prefs.get('server_url') != null) {
      prefs.remove('server_url');
    }
    if (prefs.get('server_url') != null) {
      prefs.remove('token_session');
    }
    prefs.remove('token_session');
    prefs.setBool('isLogged', false);

    Navigator.popAndPushNamed(context, "/");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        body: SingleChildScrollView(
            child: Column(children: [
          DelayedAnimation(
            delay: 500,
            child: SizedBox(
              height: 180,
              child: Image.asset('./images/AREA.png'),
            ),
          ),
          DelayedAnimation(
              delay: 500,
              child: ElevatedButton(
                  onPressed: () {
                    clearSharedPrefs();
                  },
                  style: ElevatedButton.styleFrom(
                    shape: const StadiumBorder(),
                    primary: theme.primaryColor,
                    padding: const EdgeInsets.all(13),
                  ),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.settings),
                        const SizedBox(width: 10),
                        Text(
                          'Reset',
                          style: GoogleFonts.poppins(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ]))),
          const SizedBox(height: 20),
          FutureBuilder<String>(
              future: _username,
              builder: (BuildContext context, AsyncSnapshot<String> snapshot) {
                switch (snapshot.connectionState) {
                  case ConnectionState.waiting:
                    return const CircularProgressIndicator();
                  default:
                    if (snapshot.hasError) {
                      return Text('Error: ${snapshot.error}');
                    } else {
                      return Text('Profile Name ${snapshot.data}}.',
                          style: GoogleFonts.poppins(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ));
                    }
                }
              })
        ])));
  }
}
