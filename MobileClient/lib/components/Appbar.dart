import 'package:area/theme.dart' as theme;
import 'package:flutter/material.dart';

AppBar drawAppBar(BuildContext context) {
  return AppBar(
      elevation: 0,
      backgroundColor: theme.background,
      leading: IconButton(
        icon: const Icon(
          Icons.close,
          color: Colors.white,
          size: 30,
        ),
        onPressed: () {
          Navigator.pop(context);
        },
      ));
  //return SizedBox(height: 180, child: Image.asset('./images/AREA.png'));
}
