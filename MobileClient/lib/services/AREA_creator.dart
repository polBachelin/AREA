import 'package:area/components/toast.dart';
import 'package:area/services/api.dart';
import 'package:area/services/manager.dart';
import 'package:area/utils/server_requests.dart';
import 'package:flutter/material.dart';

createAREA(BuildContext context) async {
  final manager = Manager.of(context);

  print(manager.creator);

  if (manager.creator["action_defined"] == false ||
      manager.creator["reaction_defined"] == false ||
      manager.creator["name"] == "") {
    return toast(context, "Missing informations");
  }
  Manager.of(context).creator.clear();
  Manager.of(context).creator.addAll(creatorDefault);
  final response = await ServerRequest.postRequest(
      manager.api.url, "", manager.creator, manager.api.headers);
  print("Response AREA CREATION ==>" + response.body);
  toast(context, "Contragulations ! AREA Created");
  Navigator.pushReplacementNamed(context, "/home");
}
