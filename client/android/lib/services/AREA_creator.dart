import 'package:area/components/toast.dart';
import 'package:area/services/api.dart';
import 'package:area/services/manager.dart';
import 'package:area/utils/server_requests.dart';
import 'package:flutter/material.dart';

createAREA(BuildContext context) async {
  final manager = Manager.of(context);

  if (manager.creator["action_defined"] == false ||
      manager.creator["reaction_defined"] == false ||
      manager.creator["name"] == "") {
    return toast(context, "Missing informations");
  }
  final response = await ServerRequest.postRequest(
      manager.api.url, "/area/create", manager.creator, manager.api.headers);
  toast(context, "Contragulations ! AREA Created");
  Manager.of(context).creator.clear();
  Manager.of(context).creator.addAll(creatorDefault);
  Navigator.pushReplacementNamed(context, "/home");
}
