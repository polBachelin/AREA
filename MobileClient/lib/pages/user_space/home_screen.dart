import 'package:area/pages/user_space/areas_page.dart';
import 'package:area/pages/user_space/services_screen.dart';
import 'package:area/pages/user_space/dashboard.dart';
import 'package:area/pages/user_space/settings.dart';
import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => HomeScreenState();
}

class HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: theme.white);
  static const List<Widget> _widgetOptions = <Widget>[
    Dashboard(),
    AreasPage(),
    ServicesPage(),
    SettingsScreen(),
  ];

  final List<String> _widgetNames = <String>[
    "Dashboard",
    "Areas",
    "My Services",
    "Settings",
  ];

  var titleCurrentWidget = "Dashboard";

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      titleCurrentWidget = _widgetNames[index];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(titleCurrentWidget),
        backgroundColor: theme.primaryColor,
        leading: IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              SettingsScreenState.clearSharedPrefs();
              Navigator.popAndPushNamed(context, "/authentification");
            }),
      ),
      backgroundColor: theme.background,
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Dashboard',
            backgroundColor: theme.primaryColor,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.api),
            label: 'Areas',
            backgroundColor: theme.primaryLightColor,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.apps),
            label: 'Services',
            backgroundColor: theme.primaryColor,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
            backgroundColor: theme.primaryLightColor,
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: theme.githubBlack,
        onTap: _onItemTapped,
      ),
    );
  }
}
