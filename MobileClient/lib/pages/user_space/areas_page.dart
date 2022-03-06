import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;
import 'package:flutter_switch/flutter_switch.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class AreasPage extends StatefulWidget {
  const AreasPage({Key? key}) : super(key: key);

  @override
  AreasPageState createState() => AreasPageState();
}

class AreasPageState extends State<AreasPage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        body: FutureBuilder<List>(
          future: Manager.of(context).api.getAreasData(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return ListView.builder(
                  itemCount: snapshot.data![0].length,
                  itemBuilder: (_, index) => Container(
                        child: Container(
                          margin: const EdgeInsets.symmetric(
                              horizontal: 5, vertical: 5),
                          padding: const EdgeInsets.all(10.0),
                          decoration: BoxDecoration(
                              color: theme.white,
                              borderRadius: BorderRadius.circular(15.0)),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const SizedBox(width: 10),
                                    Text(
                                      snapshot.data![0][index]["name"],
                                      style: const TextStyle(
                                        fontSize: 18.0,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ]),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const SizedBox(width: 10),
                                  FlutterSwitch(
                                      width: 80.0,
                                      height: 35.0,
                                      valueFontSize: 0.0,
                                      toggleSize: 25.0,
                                      activeColor: Colors.green,
                                      inactiveColor: Colors.red,
                                      value: snapshot.data![1][index],
                                      borderRadius: 30.0,
                                      padding: 4.0,
                                      showOnOff: true,
                                      onToggle: (val) {
                                        setState(() {
                                          snapshot.data![1][index] = val;
                                          if (snapshot.data![1][index] ==
                                              true) {
                                            Manager.of(context).api.enableArea(
                                                snapshot.data![0][index]
                                                    ["name"]);
                                          } else {
                                            Manager.of(context).api.disableArea(
                                                snapshot.data![0][index]
                                                    ["name"]);
                                          }
                                        });
                                      }),
                                      const SizedBox(width: 50, height: 0),
                                      IconButton(
                                        icon: const Icon(Icons.close_rounded),
                                        color: theme.primaryColor ,
                                        tooltip: "Delete Area",
                                        iconSize: 50,
                                        onPressed: () {
                                          Manager.of(context).api.deleteArea(snapshot.data![0][index]["name"]);
                                          setState(() {});
                                        },
                                      )
                                ],
                              ),
                            ],
                          ),
                        ),
                      ));
            } else {
              return const Center(
                  child: Text("No AREAS availables",
                      style: TextStyle(
                          color: theme.white,
                          fontFamily: "Comic Sans MS",
                          fontSize: 30)));
            }
          },
        ));
  }
}
