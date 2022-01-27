import 'package:flutter/material.dart';

import 'pages/home_screen.dart';
import 'pages/register_screen.dart';
import 'pages/login_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AREA',
      // Start the app with the "/" named route. In this case, the app starts
      // on the RegisterScreen widget.
      initialRoute: '/home',
      debugShowCheckedModeBanner: false,
      routes: {
        // When navigating to the "/" route, build the RegisterScreen widget.
        '/': (context) => const RegisterScreen(),
        // When navigating to the "/second" route, build the HomeScreen widget.
        '/home': (context) => const HomeScreen(),
        '/login': (context) => const LoginScreen(),
      }
    );
  }
}
