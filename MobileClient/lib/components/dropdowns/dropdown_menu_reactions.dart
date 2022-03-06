import 'package:area/components/validators_actions/notion_add_to_database.dart';
import 'package:area/components/validators_reactions/discord/discord_role_inputs.dart';
import 'package:area/components/validators_reactions/discord/discord_send_message_rename_channel.dart';
import 'package:area/components/validators_reactions/google/create_google_event.dart';
import 'package:area/components/validators_reactions/notion/notion_create_page.dart';
import 'package:area/models/services.dart';
import 'package:area/services/manager.dart';
import 'package:area/theme.dart';
import 'package:flutter/material.dart';

class DropDownMenuReactions extends StatefulWidget {
  const DropDownMenuReactions({Key? key}) : super(key: key);

  @override
  State<DropDownMenuReactions> createState() => DropDownMenuReactionsState();
}

class DropDownMenuReactionsState extends State<DropDownMenuReactions> {
  String? selectedService;
  String? selectedReaction;
  final _dropdownFormKey = GlobalKey<FormState>();
  List<DropdownMenuItem<String>>? servicesList;
  List<DropdownMenuItem<String>>? reactionsList;

  @override
  void initState() {
    super.initState();
  }

  List<DropdownMenuItem<String>>? getActionsList(
      AsyncSnapshot<List<Service>> snapshot) {
    if (selectedService != null) {
      return snapshot.data
          ?.firstWhere((element) => element.name == selectedService)
          .reactions
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

  Widget setConfigReaction(BuildContext context) {
    //TODO : check si ce if est utile
    if (selectedService == "Timer" || selectedService == "Weather") {
      Manager.of(context).creator["reaction_defined"] = false;
    } else {
      Manager.of(context).creator["reactionName"] = selectedReaction.toString();
    }
    switch (selectedReaction) {
      case "Update Page":
        return Builder(builder: (context) => const NotionAddDatabaseForm());
      case "Send a message":
        return Builder(
            builder: (context) =>
                const DiscordSendMessageForm("message_content"));
      case "Rename channel":
        return Builder(
            builder: (context) => const DiscordSendMessageForm("channel_name"));
      case "Remove role from channel":
        return Builder(builder: (context) => const DiscordRolesForm("remove"));
      case "Add role to channel":
        return Builder(builder: (context) => const DiscordRolesForm("add"));
      case "Create an event":
        return Builder(builder: (context) => const CreateGoogleEvent());
      case "Create page":
        return Builder(builder: (context) => const NotionCreatePage());
      default:
        return const Text("");
    }
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
                            selectedReaction = null;
                          });
                        },
                        items: getServicesList(snapshot)),
                    const SizedBox(height: 5),
                    DropdownButtonFormField(
                        icon: const Icon(Icons.attractions),
                        decoration: decorationInput,
                        hint: Text(selectedReaction == null
                            ? "Select a reaction"
                            : ""),
                        validator: (value) =>
                            value == null ? "Select a reaction" : null,
                        dropdownColor: Colors.white,
                        value: selectedReaction,
                        onChanged: (String? newValue) {
                          setState(() {
                            selectedReaction = newValue!;
                          });
                        },
                        items: getActionsList(snapshot)),
                    const SizedBox(height: 5),
                    setConfigReaction(context),
                  ],
                );
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            }));
  }
}
