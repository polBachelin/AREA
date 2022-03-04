import 'package:area/components/validators_actions/notion_add_database.dart';
import 'package:area/models/discord.dart';
import 'package:area/models/services.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';

class DiscordSendMessageForm extends StatefulWidget {
  const DiscordSendMessageForm({Key? key}) : super(key: key);

  @override
  State<DiscordSendMessageForm> createState() => DiscordSendMessageFormState();
}

class DiscordSendMessageFormState extends State<DiscordSendMessageForm> {
  String? selectedChannel;
  String? selectedAction;
  final _dropdownFormKey = GlobalKey<FormState>();
  List<DropdownMenuItem<String>>? servicesList;

  @override
  void initState() {
    super.initState();
  }

  List<DropdownMenuItem<String>>? getChannelsList(
      AsyncSnapshot<List> snapshot) {
    if (snapshot.hasData) {
      return snapshot.data?.map((item) {
        return DropdownMenuItem<String>(
          child: Text(item.name),
          value: item.name,
        );
      }).toList();
    }
    return List<DropdownMenuItem<String>>.from(
        {const DropdownMenuItem<String>(child: Text("None"), value: "None")});
  }


  @override
  Widget build(BuildContext context) {
    return Form(
        key: _dropdownFormKey,
        child: FutureBuilder<List<DiscordChannel>>(
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
                        hint: Text(
                            selectedChannel == null ? "Select a service" : ""),
                        validator: (value) =>
                            value == null ? "Select a service" : null,
                        dropdownColor: Colors.white,
                        value: selectedChannel,
                        onChanged: (String? newValue) {
                          setState(() {
                            selectedChannel = newValue!;
                          });
                        },
                        items: getChannelsList(snapshot)),
                      ],
                );
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            }));
  }
}
