import 'dart:async';
import 'package:area/components/delayed_animation.dart';
import 'package:area/components/roundedFlatButtonLarge.dart';
import 'package:area/models/area.dart';
import 'package:area/models/services.dart';
import 'package:area/services/api_login.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;
import 'package:flutter_switch/flutter_switch.dart';

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
                itemBuilder : (_, index) => Container(
                  child: Container(
                    margin: const EdgeInsets.symmetric(
                      horizontal: 10, vertical: 5),
                    padding: const EdgeInsets.all(20.0),
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
                            const SizedBox(width: 160),
                            FlutterSwitch(
                              width: 80.0,
                              height: 35.0,
                              valueFontSize: 0.0,
                              toggleSize: 25.0,
                              value: snapshot.data![1][index],
                              borderRadius: 30.0,
                              padding: 4.0,
                              showOnOff: true,
                              onToggle: (val) {
                                setState(() {
                                  snapshot.data![1][index] = val;
                                  if (snapshot.data![1][index] == true) {
                                    Manager.of(context).api.enableArea(snapshot.data![0][index]["name"]);
                                  } else {
                                    Manager.of(context).api.disableArea(snapshot.data![0][index]["name"]);
                                  }
                                });
                              })
                          ],
                        ),
                      ],
                    ),
                  ),
                ));
            } else {
              return const Center(child: Text("No AREAS availables", style: TextStyle(color: theme.white, fontFamily: "Comic Sans MS", fontSize: 30)));
            }
          },
      ));
  }
}