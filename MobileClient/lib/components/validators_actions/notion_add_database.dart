import 'package:area/models/notion.dart';
import 'package:area/models/services.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:tuple/tuple.dart';

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
    print(Manager.of(context).api.url);
    return FutureBuilder<List>(
        future: Manager.of(context).api.notion.getDatabases(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return DropdownButtonFormField(
                icon: Icon(Icons.api),
                decoration: InputDecoration(
                  enabledBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.blue, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  border: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.blue, width: 2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                ),
                hint: Text(selectedDB == null ? "Select a service" : ""),
                validator: (value) => value == null ? "Select a service" : null,
                dropdownColor: Colors.white,
                value: selectedDB,
                isExpanded: true,
                onChanged: (String? newValue) {
                  setState(() {
                    selectedDB = newValue!;
                  });
                },
                items: snapshot.data!.map((db) {
                  var name = "Unknown";
                  try {
                    name = db["title"][0]["text"]["content"];
                  } on RangeError {
                    name = "Unknown";
                  }
                  return DropdownMenuItem(
                      child: Text(name), value: db["id"].toString());
                }).toList().sublist(0, 10));
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        });
  }
}
