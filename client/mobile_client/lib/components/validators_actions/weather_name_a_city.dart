
import 'package:area/services/manager.dart';
import 'package:area/theme.dart' as theme;
import 'package:flutter/material.dart';

class WeatherSelectCity extends StatefulWidget {
  const WeatherSelectCity({Key? key}) : super(key: key);

  @override
  State<WeatherSelectCity> createState() => WheatherSelectCity();
}

class WheatherSelectCity extends State<WeatherSelectCity> {
  String? _selectedCity;
  final _validateKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
  }

  void validateStep() {
    final isValid = _validateKey.currentState!.validate();
    if (isValid) {
      Manager.of(context).creator["action_defined"] = true;
      Manager.of(context).creator["actionData"] = {"city": _selectedCity};
    } else {
      Manager.of(context).creator["action_defined"] = false;
      Manager.of(context).creator["actionData"] = "";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
        autovalidateMode: AutovalidateMode.always,
        key: _validateKey,
        onChanged: () => validateStep(),
        child: TextFormField(
          decoration: InputDecoration(
            contentPadding: EdgeInsets.all(12),
            labelText: 'Type a city name',
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
              _selectedCity = value;
              //validateStep();
            });
          },
          validator: (value) {
            if (value!.isEmpty) {
              return 'Text is required';
            }
            return null;
          },
        ));
  }
}
