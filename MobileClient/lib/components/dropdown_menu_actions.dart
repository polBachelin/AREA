import 'package:area/components/validators_actions/notion_add_database.dart';
import 'package:area/models/services.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';

class DropDownMenuActions extends StatefulWidget {
  const DropDownMenuActions({Key? key}) : super(key: key);

  @override
  State<DropDownMenuActions> createState() => DropDownMenuState();
}

class DropDownMenuState extends State<DropDownMenuActions> {
  String? selectedService;
  String? selectedAction;
  final _dropdownFormKey = GlobalKey<FormState>();
  List<DropdownMenuItem<String>>? servicesList;
  List<DropdownMenuItem<String>>? actionsList;

  @override
  void initState() {
    super.initState();
  }

  List<DropdownMenuItem<String>>? getActionsList(
      AsyncSnapshot<List<Service>> snapshot) {
    if (selectedService != null) {
      return snapshot.data
          ?.firstWhere((element) => element.name == selectedService)
          .actions
          .map((item) {
        return DropdownMenuItem<String>(
          child: Text(item),
          value: item,
        );
      }).toList();
    }
    return List<DropdownMenuItem<String>>.from(
        {const DropdownMenuItem<String>(child: Text("None"), value: "None")});
  }

  List<DropdownMenuItem<String>>? getServicesList(
      AsyncSnapshot<List<Service>> snapshot) {
    if (snapshot.hasData) {
      return snapshot.data
          ?.where((element) => element.connected == true)
          .map((item) {
        return DropdownMenuItem<String>(
          child: Row(
            children: [
              Image.network(item.icon, height: 24),
              const SizedBox(width: 30),
              Text(item.name),
            ],
          ),
          value: item.name,
        );
      }).toList();
    }
    return List<DropdownMenuItem<String>>.from(
        {const DropdownMenuItem<String>(child: Text("None"), value: "None")});
  }

  Widget setConfigAction(BuildContext context) {
    Manager.of(context).creator["action_defined"] = false;
    Manager.of(context).creator["actionName"] = selectedAction.toString();
    switch (selectedAction) {
      case "Add to database":
        return Builder(builder: (context) => NotionAddDatabaseForm());
      case "Start timer":
        break;
      case "City's weather change":
        return Builder(builder: (context) => NotionAddDatabaseForm());
        break;
      case "Receive a message":
        Manager.of(context).creator["action_defined"] = true;
        break;
      default:
        return const Text("Setup Action");
    }
    return const Text("Setup Action");
  }

  @override
  Widget build(BuildContext context) {
    return Form(
        key: _dropdownFormKey,
        child: FutureBuilder<List<Service>>(
            future: Manager.of(context).api.getServices(),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    DropdownButtonFormField(
                        icon: Icon(Icons.api),
                        decoration: InputDecoration(
                          enabledBorder: OutlineInputBorder(
                            borderSide:
                                BorderSide(color: Colors.blue, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          border: OutlineInputBorder(
                            borderSide:
                                BorderSide(color: Colors.blue, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          filled: true,
                          fillColor: Colors.white,
                        ),
                        hint: Text(
                            selectedService == null ? "Select a service" : ""),
                        validator: (value) =>
                            value == null ? "Select a service" : null,
                        dropdownColor: Colors.white,
                        value: selectedService,
                        onChanged: (String? newValue) {
                          setState(() {
                            selectedService = newValue!;
                          });
                        },
                        items: getServicesList(snapshot)),
                    DropdownButtonFormField(
                        icon: Icon(Icons.attractions),
                        decoration: InputDecoration(
                          enabledBorder: OutlineInputBorder(
                            borderSide:
                                BorderSide(color: Colors.blue, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          border: OutlineInputBorder(
                            borderSide:
                                BorderSide(color: Colors.blue, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          filled: true,
                          fillColor: Colors.white,
                        ),
                        hint: Text(
                            selectedAction == null ? "Select an action" : ""),
                        validator: (value) =>
                            value == null ? "Select an action" : null,
                        dropdownColor: Colors.white,
                        value: selectedAction,
                        onChanged: (String? newValue) {
                          setState(() {
                            selectedAction = newValue!;
                          });
                        },
                        items: getActionsList(snapshot)),
                    setConfigAction(context),
                  ],
                );
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            }));
  }
}
