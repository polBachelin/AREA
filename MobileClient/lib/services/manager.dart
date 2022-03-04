// ignore_for_file: avoid_print

import 'package:area/services/api.dart';
import 'package:flutter/material.dart';

class _Manager extends InheritedWidget {
  const _Manager({
    required Widget child,
    required this.data,
    Key? key,
  }) : super(key: key, child: child);

  final ManagerState data;

  @override
  bool updateShouldNotify(_Manager oldWidget) => true;
}

class Manager extends StatefulWidget {
  const Manager({
    Key? key,
    required this.child,
  }) : super(key: key);

  final Widget child;

  @override
  ManagerState createState() => ManagerState();

  static ManagerState of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<_Manager>()!.data;
}

class ManagerState extends State<Manager> {
  final api = Server(url: 'http://192.168.43.15:3000');
  var creator = {
    "action_defined": false,
    "reaction_defined": false,
    "actions": {
      "Add to Database" : {
        "database_id": null
      }

    }
  };

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) => _Manager(
        data: this,
        child: widget.child,
      );
}