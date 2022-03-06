import 'package:area/services/manager.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:area/theme.dart' as theme;

class TimerTimeForm extends StatefulWidget {
  const TimerTimeForm({Key? key}) : super(key: key);

  @override
  State<TimerTimeForm> createState() => TimerTimeState();
}

class TimerTimeState extends State<TimerTimeForm> {
  int timeToWait = 0;

  void validateStep(String value) {
    timeToWait = int.parse(value);
    Manager.of(context).creator["action_defined"] = true;
    Manager.of(context).creator["actionData"] = {"time_s": timeToWait};
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      onSubmitted: (value) => validateStep(value),
      decoration: const InputDecoration(
          fillColor: theme.white,
          labelText: "Enter your number",
          labelStyle: TextStyle(color: theme.white),
          hintStyle: TextStyle(color: theme.white)),
      style: TextStyle(color: theme.white),
      keyboardType: TextInputType.number,
      inputFormatters: <TextInputFormatter>[
        FilteringTextInputFormatter.digitsOnly
      ],
      onChanged: (value) {
        setState(() {
          validateStep(value);
        });
      },
    );
  }
}
