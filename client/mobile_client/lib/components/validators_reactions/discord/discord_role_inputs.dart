import 'package:area/models/discord.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;

class DiscordRolesForm extends StatefulWidget {
  final String _reaction_string;
  const DiscordRolesForm(this._reaction_string);

  @override
  State<DiscordRolesForm> createState() => DiscordRolesFormState();
}

class DiscordRolesFormState extends State<DiscordRolesForm> {
  String? _selectedChannel;
  String? _selectedRole;
  final _validateKey = GlobalKey<FormState>();
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
          value: item.id,
        );
      }).toList();
    }
    return List<DropdownMenuItem<String>>.from(
        {const DropdownMenuItem<String>(child: Text("None"), value: "None")});
  }

  List<DropdownMenuItem<String>>? getRolesList(AsyncSnapshot<List> snapshot) {
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
        "role_id": _selectedRole,
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
                            validateStep();
                          });
                        },
                        items: getChannelsList(snapshot)),
                        const SizedBox(height: 5),
                    FutureBuilder<List<DiscordRole>>(
                        future: Manager.of(context).api.discord.getRoles(),
                        builder: (context, snapshot) {
                          return DropdownButtonFormField(
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
                            hint: Text(_selectedRole == null
                                ? "Select a Role to " + widget._reaction_string
                                : ""),
                            validator: (value) => value == null
                                ? "Select a Role to" + widget._reaction_string
                                : null,
                            dropdownColor: Colors.white,
                            value: _selectedRole,
                            onChanged: (String? newValue) {
                              setState(() {
                                _selectedRole = newValue!;
                                validateStep();
                              });
                            },
                            items: getRolesList(snapshot),
                          );
                        })
                  ],
                );
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            }));
  }
}
