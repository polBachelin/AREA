import 'package:area/components/dropdown_menu_actions.dart';
import 'package:area/components/dropdown_menu_reactions.dart';
import 'package:area/services/AREA_creator.dart';
import 'package:area/services/manager.dart';
import 'package:area/widgets/create_area_widget.dart';
import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => DashboardState();
}

class DashboardState extends State<Dashboard> {
  @override
  void initState() {
    super.initState();
  }

  Widget showValueValidator(BuildContext context) {
    if (Manager.of(context).creator["action_defined"] == true &&
        Manager.of(context).creator["reaction_defined"] == true) {
      return ElevatedButton(
        child: Text("Create"),
        onPressed:
            createAREA(Manager.of(context).creator, Manager.of(context).api),
      );
    }
    return Text("Not Ready");
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      const Text('Create an AREA',
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontSize: 32,
            color: theme.white,
          )),
      const Text('When',
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontSize: 15,
            color: theme.white,
          )),
      const DropDownMenuActions(),
      //CreateAREAWidget(hint: "Search for actions..."),
      const Text('do',
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontSize: 30,
            color: Colors.white,
          )),
      const DropDownMenuReactions(),
      showValueValidator(context)
      // CreateAREAWidget(hint: "Search for reactions..."),
    ]);
  }
}
