import 'package:area/models/discord.dart';
import 'package:area/services/manager.dart';
import 'package:area/theme.dart' as theme;
import 'package:flutter/material.dart';

class DiscordSendMessageForm extends StatefulWidget {
  final String _action_string;
  const DiscordSendMessageForm(this._action_string);

  @override
  State<DiscordSendMessageForm> createState() => DiscordSendMessageFormState();
}

class DiscordSendMessageFormState extends State<DiscordSendMessageForm> {
  String? _selectedChannel;
  String? _text;
  final _validateKey = GlobalKey<FormState>();
  List<DropdownMenuItem<String>>? servicesList;
  Future<List<DiscordChannel>>? _futureChannels;

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
          value: item.id,
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
        widget._action_string: _text,
        "guild_id": _selectedChannel
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
        child: FutureBuilder<List<DiscordChannel>>(
            future: Manager.of(context).api.discord.getChannels(),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    DropdownButtonFormField(
                        icon: const Icon(Icons.api),
                        decoration: InputDecoration(
                          enabledBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: theme.primaryColor, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          border: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: theme.primaryColor, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          filled: true,
                          fillColor: Colors.white,
                        ),
                        hint: Text(
                            _selectedChannel == null ? "Select a channel" : ""),
                        validator: (value) =>
                            value == null ? "Select a channel" : null,
                        dropdownColor: Colors.white,
                        value: _selectedChannel,
                        onChanged: (String? newValue) {
                          setState(() {
                            _selectedChannel = newValue!;
                          });
                        },
                        items: getChannelsList(snapshot)),
                    TextFormField(
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.all(12),
                        labelText: widget._action_string == "message_content"
                            ? 'Type your message'
                            : "Rename your channel",
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
                          _text = value;
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
