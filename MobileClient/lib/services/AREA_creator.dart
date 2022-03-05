import 'package:area/components/toast.dart';
import 'package:area/services/api.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';

createAREA(BuildContext context) {
  final manager = Manager.of(context);

  print(manager.creator);

  if (manager.creator["action_defined"] == false ||
      manager.creator["reaction_defined"] == false ||
      manager.creator["name"] == "") {
    return toast(context, "Missing informations");
  }
  print("WSH");
}
