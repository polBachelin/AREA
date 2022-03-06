import 'package:area/components/animations/delayed_animation.dart';
import 'package:area/components/buttons/roundedFlatButton.dart';
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
  @override
  void initState() {
    super.initState();
  }

  Future<SharedPreferences> getSharedPrefs() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs;
  }

  static Future<void> clearSharedPrefs() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove('username');
    prefs.remove('access_token');
    prefs.setBool('isLogged', false);
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
                    Navigator.popAndPushNamed(context, "/");
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
          FutureBuilder<SharedPreferences>(
              future: getSharedPrefs(),
              builder: (BuildContext context,
                  AsyncSnapshot<SharedPreferences> snapshot) {
                switch (snapshot.connectionState) {
                  case ConnectionState.waiting:
                    return const CircularProgressIndicator();
                  default:
                    if (snapshot.hasError) {
                      return Text('Error: ${snapshot.error}');
                    } else {
                      return Column(
                        children: [
                          Text(
                              'Profile Name ${snapshot.data!.getString("username")}.',
                              style: GoogleFonts.poppins(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                              )),
                          Text(
                              'Access Token ${snapshot.data!.getString("access_token")}',
                              style: GoogleFonts.poppins(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                              )),
                        ],
                      );
                    }
                }
              })
        ])));
  }
}
