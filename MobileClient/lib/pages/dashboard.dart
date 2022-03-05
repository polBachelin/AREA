import 'dart:ffi';

import 'package:area/components/delayed_animation.dart';
import 'package:area/components/dropdown_menu_actions.dart';
import 'package:area/components/dropdown_menu_reactions.dart';
import 'package:area/services/AREA_creator.dart';
import 'package:area/services/manager.dart';
import 'package:area/widgets/create_area_widget.dart';
import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;
import 'package:shared_preferences/shared_preferences.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => DashboardState();
}

class DashboardState extends State<Dashboard> {
  String? nameAREA;
  bool isValid = false;
  final _validateAREAkey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
  }

  void _getAREAName(String value) {
    setState(() {
      nameAREA = value;
    });
  }


  @override
  Widget build(BuildContext context) {
    return DelayedAnimation(
        delay: 500,
        child: SingleChildScrollView(
            child: Form(
                key: _validateAREAkey,
                autovalidateMode: AutovalidateMode.always,
                onChanged: () {
                  setState(() {
                    if (_validateAREAkey.currentState!.validate()) {
                      isValid = Manager.of(context).creator["action_defined"] ==
                              true &&
                          Manager.of(context).creator["reaction_defined"] ==
                              true;
                    } else {
                      isValid = false;
                    }
                  });
                },
                child: Column(children: [
                  TextFormField(
                    decoration: InputDecoration(
                      contentPadding: EdgeInsets.all(12),
                      labelText: 'Create an AREA',
                      filled: true,
                      fillColor: theme.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      labelStyle: TextStyle(
                        color: Colors.grey[400],
                      ),
                    ),
                    keyboardType: TextInputType.text,
                    onChanged: (value) {
                      Manager.of(context).creator["name"] = value;
                    },
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Name is required';
                      }
                      return null;
                    },
                  ),
                  const Text('When',
                      textDirection: TextDirection.ltr,
                      style: TextStyle(
                        fontSize: 15,
                        color: theme.white,
                      )),
                  const DropDownMenuActions(),
                  const Text('DO',
                      textDirection: TextDirection.ltr,
                      style: TextStyle(
                        fontSize: 30,
                        color: Colors.white,
                      )),
                  const DropDownMenuReactions(),
                  ElevatedButton(
                    child: Text("Create"),
                    onPressed: () {
                      createAREA(context);
                    },
                    style: ElevatedButton.styleFrom(
                      primary: theme.validate
                      //onPrimary: theme.githubBlack
                    ),
                  )
                ]))));
  }
}
