import 'dart:async';
import 'package:area/components/animations/delayed_animation.dart';
import 'package:area/components/buttons/roundedFlatButtonLarge.dart';
import 'package:area/models/services.dart';
import 'package:area/services/api_login.dart';
import 'package:area/services/api_register.dart';
import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;

class ServicesPage extends StatefulWidget {
  const ServicesPage({Key? key}) : super(key: key);

  @override
  ServicePageState createState() => ServicePageState();
}

class ServicePageState extends State<ServicesPage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        body: FutureBuilder<List<Service>>(
          future: Manager.of(context).api.getServices(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return ListView.builder(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (_, index) => Container(
                        child: Container(
                          margin: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 5),
                          padding: const EdgeInsets.all(20.0),
                          decoration: BoxDecoration(
                            color: theme.white,
                            borderRadius: BorderRadius.circular(15.0),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Image.network(snapshot.data![index].icon,
                                      height: 24),
                                  const SizedBox(width: 10),
                                  Text(
                                    snapshot.data![index].name,
                                    style: const TextStyle(
                                      fontSize: 18.0,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(width: 10),
                                  if (snapshot.data![index].connected == true)
                                    RFLargeButton(
                                      backgroundColor: Color.fromARGB(255, 41, 194, 27),
                                      buttonIcon: Icons.api,
                                      passedFunction: loginOauth,
                                      buttonText: 'Connected',
                                      parentContext: context,
                                      passedString: snapshot.data![index].name.toLowerCase() == "google" ? "googleCalendar" : snapshot.data![index].name.toLowerCase()
                                    )
                                  else
                                    RFLargeButton(
                                      backgroundColor: Color.fromARGB(255, 190, 39, 13),
                                      buttonIcon: Icons.login,
                                      passedFunction: loginOauth,
                                      buttonText: 'Disconnected',
                                      parentContext: context,
                                      passedString: snapshot.data![index].name.toLowerCase() == "google" ? "googleCalendar" : snapshot.data![index].name.toLowerCase()
                                    )
                                  ])
                            ],
                          ),
                        ),
                      ));
            } else {
              return const Center(child: CircularProgressIndicator());
            }
          },
        ));
  }
}
