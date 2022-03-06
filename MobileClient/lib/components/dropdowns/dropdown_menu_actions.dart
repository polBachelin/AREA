import 'package:area/components/validators_actions/notion_add_to_database.dart';
import 'package:area/components/validators_actions/weather_name_a_city.dart';
import 'package:area/components/validators_actions/timer_time.dart';
import 'package:area/models/services.dart';
import 'package:area/services/manager.dart';
import 'package:area/theme.dart';
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
    Manager.of(context).creator["actionName"] = selectedAction.toString();
    switch (selectedAction) {
      case "Add to database":
        return Builder(builder: (context) => const NotionAddDatabaseForm());
      case "Start timer":
        Manager.of(context).creator["action_defined"] = true;
        return Builder(builder: (context) => const TimerTimeForm());
      case "City's weather change":
        return Builder(builder: (context) => const WeatherSelectCity());
      case "Receive a message":
        Manager.of(context).creator["action_defined"] = true;
        break;
      case "GPA changes":
        Manager.of(context).creator["action_defined"] = true;
        break;
      case "New notification":
        Manager.of(context).creator["action_defined"] = true;
        break;
      default:
        Manager.of(context).creator["action_defined"] = false;
        return const Text("");
    }
    return const Text("");
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
                        icon: const Icon(Icons.api),
                        decoration: decorationInput,
                        hint: Text(
                            selectedService == null ? "Select a service" : ""),
                        validator: (value) =>
                            value == null ? "Select a service" : null,
                        dropdownColor: Colors.white,
                        value: selectedService,
                        onChanged: (String? newValue) {
                          setState(() {
                            selectedService = newValue!;
                            selectedAction = null;
                          });
                        },
                        items: getServicesList(snapshot)),
                    const SizedBox(height: 5),
                    DropdownButtonFormField(
                        icon: const Icon(Icons.attractions),
                        decoration: decorationInput,
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
                    const SizedBox(height: 5),
                    setConfigAction(context),
                  ],
                );
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            }));
  }
}
