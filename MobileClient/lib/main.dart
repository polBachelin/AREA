import 'package:area/pages/intra_form_login.dart';
import 'package:area/pages/register_email_screen.dart';
import 'package:area/pages/select_server.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'pages/home_screen.dart';
import 'pages/auth_screen.dart';
import 'pages/login_screen.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Manager(
        child: MaterialApp(
            title: 'AREA',
            // Start the app with the "/" named route. In this case, the app starts
            // on the RegisterScreen widget.
            initialRoute: '/',
            debugShowCheckedModeBanner: false,
            routes: {
          // When navigating to the "/" route, build the RegisterScreen widget.
          '/': (context) => const ServerPage(),
          // When navigating to the "/second" route, build the HomeScreen widget.
          '/register': (context) => const AuthScreen(),
          '/register_email': (context) => const RegisterEmailScreen(),
          '/home': (context) => const HomeScreen(),
          '/login': (context) => const LoginScreen(),
          '/register_epitech' : (context) => const IntraFormLogin(),
        }));
  }
}
