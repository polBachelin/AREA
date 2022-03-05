import 'package:area/services/manager.dart';
import 'package:area/theme.dart' as theme;
import 'package:flutter/material.dart';

class NotionCreatePage extends StatefulWidget {
  const NotionCreatePage();

  @override
  State<NotionCreatePage> createState() => NotionCreatePageState();
}

class NotionCreatePageState extends State<NotionCreatePage> {
  String? _selectedDatabase;
  String? _newPageName;
  final _validateKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
  }

  List<DropdownMenuItem<String>>? getDatabasesList(
      AsyncSnapshot<List> snapshot) {
    if (snapshot.hasData) {
      return snapshot.data?.map((item) {
        return DropdownMenuItem<String>(
          child: item["title"][0]["text"]["content"],
          value: item["id"],
        );
      }).toList();
    }
    return List<DropdownMenuItem<String>>.from(
        {const DropdownMenuItem<String>(child: Text("None"), value: "None")});
  }

  void validateStep() {
    final isValid = _validateKey.currentState!.validate();
    if (isValid) {
      Manager.of(context).creator["reaction_defined"] = true;
      Manager.of(context).creator["reactionData"] = {
        "page_name": _newPageName,
        "database_id": _selectedDatabase
      };
    } else {
      Manager.of(context).creator["reaction_defined"] = false;
      Manager.of(context).creator["reactionData"] = "";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
        autovalidateMode: AutovalidateMode.onUserInteraction,
        key: _validateKey,
        onChanged: () => validateStep(),
        child: FutureBuilder<List>(
            future: Manager.of(context).api.discord.getChannels(),
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
                        hint: Text(_selectedDatabase == null
                            ? "Select a database"
                            : ""),
                        validator: (value) =>
                            value == null ? "Select a database" : null,
                        dropdownColor: Colors.white,
                        onChanged: (String? newValue) {
                          setState(() {
                            _selectedDatabase = newValue!;
                          });
                        },
                        items: getDatabasesList(snapshot)),
                    TextFormField(
                      decoration: InputDecoration(
                        contentPadding: EdgeInsets.all(12),
                        labelText: "Name your page",
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
                        setState(() {
                          _newPageName = value;
                        });
                      },
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Text is required';
                        }
                        return null;
                      },
                    ),
                  ],
                );
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            }));
  }
}
