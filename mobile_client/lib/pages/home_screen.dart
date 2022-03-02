import 'package:area/pages/Services.dart';
import 'package:area/pages/dashboard.dart';
import 'package:area/pages/settings.dart';
import 'package:flutter/material.dart';
import 'package:area/widgets/create_area_widget.dart';
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
    Text(
      'Areas',
      style: optionStyle,
    ),
    ServicesPage(),
    SettingsScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AREA'),
        backgroundColor: theme.primaryColor,
        leading: IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pop(context);
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
            icon: Icon(Icons.business),
            label: 'Areas',
            backgroundColor: theme.primaryLightColor,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
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
