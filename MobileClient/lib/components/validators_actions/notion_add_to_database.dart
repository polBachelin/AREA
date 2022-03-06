import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;

class NotionAddDatabaseForm extends StatefulWidget {
  const NotionAddDatabaseForm({Key? key}) : super(key: key);

  @override
  State<NotionAddDatabaseForm> createState() => NotionAddDatabaseState();
}

class NotionAddDatabaseState extends State<NotionAddDatabaseForm> {
  String? selectedDB;
  List<DropdownMenuItem<String>>? servicesList;
  List<DropdownMenuItem<String>>? actionsList;
  bool showValidator = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List>(
        future: Manager.of(context).api.notion.getDatabases(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return DropdownButtonFormField(
                icon: const Icon(Icons.api),
                decoration: InputDecoration(
                  enabledBorder: OutlineInputBorder(
                    borderSide:
                        const BorderSide(color: theme.primaryColor, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  border: OutlineInputBorder(
                    borderSide:
                        const BorderSide(color: theme.primaryColor, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                ),
                hint: Text(selectedDB == null ? "Select a database" : ""),
                validator: (value) =>
                    value == null ? "Select a database" : null,
                dropdownColor: Colors.white,
                value: selectedDB,
                isExpanded: true,
                onChanged: (String? newValue) {
                  setState(() {
                    selectedDB = newValue!;
                    if (selectedDB != null) {
                      Manager.of(context).creator["action_defined"] = true;
                      Manager.of(context).creator["actionData"] = selectedDB;
                    }
                  });
                },
                items: snapshot.data!
                    .map((db) {
                      var name = "Unknown";
                      try {
                        name = db["title"][0]["text"]["content"];
                      } on RangeError {
                        name = "Unknown";
                      }
                      return DropdownMenuItem(
                          child: Text(name), value: db["id"].toString());
                    })
                    .toList());
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        });
  }
}
