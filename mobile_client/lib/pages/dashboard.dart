import 'package:AREA/widgets/create_area_widget.dart';
import 'package:flutter/material.dart';
import 'package:material_floating_search_bar/material_floating_search_bar.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => DashboardState();
}

class DashboardState extends State<Dashboard> {
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      const Text('Create an AREA',
          textDirection: TextDirection.ltr,
          style: const TextStyle(
            fontSize: 32,
            color: Colors.black87,
          )),
      const Text('When',
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontSize: 15,
            color: Colors.black87,
          )),
      buildFloatingSearchBar(),
      //CreateAREAWidget(hint: "Search for actions..."),
      const Text('do',
          textDirection: TextDirection.ltr,
          style: const TextStyle(
            fontSize: 15,
            color: Colors.black87,
          )),
      buildFloatingSearchBar(),
      // CreateAREAWidget(hint: "Search for reactions..."),
    ]);
  }
}

Widget buildFloatingSearchBar() {
  return Container(
    height: 70.0,
    child: Card(
      margin: const EdgeInsets.all(8.0),
      child: Row(
        children: <Widget>[
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: const Icon(Icons.search),
          ),
          const Expanded(
            child: TextField(
              decoration: InputDecoration(
                  hintText: 'Search for actions', border: InputBorder.none),
            ),
            flex: 1,
          ),
          IconButton(
            icon: const Icon(Icons.cancel),
            onPressed: () {},
          )
        ],
      ),
    ),
  );
}
