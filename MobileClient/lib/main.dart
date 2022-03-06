import 'package:area/pages/authentification/intra/intra_form_login.dart';
import 'package:area/pages/authentification/intra/intra_form_register.dart';
import 'package:area/pages/authentification/register_email_screen.dart';
import 'package:area/pages/authentification/select_server.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'pages/user_space/home_screen.dart';
import 'pages/authentification/auth_screen.dart';
import 'pages/authentification/login_screen.dart';

Future main() async {
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences prefs = await SharedPreferences.getInstance();
  //FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  runApp(MyApp(prefs: prefs));
}

class MyApp extends StatelessWidget {
  SharedPreferences prefs;

  MyApp({Key? key, required this.prefs}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    //FlutterNativeSplash.remove();
    return Manager(
        child: MaterialApp(
            title: 'AREA',
            // Start the app with the "/" named route. In this case, the app starts
            // on the RegisterScreen widget.
            initialRoute: prefs.getBool("isLogged")! ? '/home' : '/',
            debugShowCheckedModeBanner: false,
            checkerboardOffscreenLayers: false,
            routes: {
          '/': (context) => const ServerPage(),
          '/authentification': (context) => const AuthScreen(),
          '/register_email': (context) => const RegisterEmailScreen(),
          '/home': (context) => const HomeScreen(),
          '/login_email': (context) => const LoginScreen(),
          '/register_epitech': (context) => const IntraFormRegister(),
          '/login_epitech': (context) => const IntraFormLogin(),
        }));
  }
}
