import 'dart:convert';

import 'package:area/theme.dart';
import 'package:date_field/date_field.dart';
import 'package:area/models/google.dart';
import 'package:area/services/manager.dart';
import 'package:area/theme.dart' as theme;
import 'package:flutter/material.dart';

class CreateGoogleEvent extends StatefulWidget {
  const CreateGoogleEvent();

  @override
  State<CreateGoogleEvent> createState() => CreateGoogleEventState();
}

class CreateGoogleEventState extends State<CreateGoogleEvent> {
  String? _selectedCalendar;
  String? _summary;
  DateTime? _selectedDateStart;
  DateTime? _selectedDateEnd;
  final _validateKey = GlobalKey<FormState>();
  List<DropdownMenuItem<String>>? servicesList;

  @override
  void initState() {
    super.initState();
  }

  List<DropdownMenuItem<String>>? getCalendarsList(
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

    print("TRY TO VALID GOOGLE EVENT");
    print(_summary.toString() +
        _selectedDateEnd.toString() +
        _selectedDateStart.toString() +
        _selectedCalendar.toString());
    if (_summary == null ||
        _selectedCalendar == null ||
        _selectedDateEnd == null ||
        _selectedDateStart == null) {
      Manager.of(context).creator["reaction_defined"] = false;
      return;
    }
    print("IS VALID ==> " + isValid.toString());
    if (isValid) {
      Manager.of(context).creator["reaction_defined"] = true;
      Manager.of(context).creator["reactionData"] = {
        "calendar_id": _selectedCalendar,
        "event": {
          "summary": _summary,
          "start": {
            "dateTime": _selectedDateStart!.toIso8601String(),
            "timeZone": "Europe/Paris",
          },
          "end": {
            "dateTime": _selectedDateEnd!.toIso8601String(),
            "timeZone": "Europe/Paris"
          }
        },
        "guild_id": _selectedCalendar
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
        child: FutureBuilder<List<GoogleCalendar>>(
            future: Manager.of(context).api.google.getCalendars(),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    DropdownButtonFormField(
                        decoration: decorationInput,
                        hint: Text(_selectedCalendar == null
                            ? "Select a Calendar"
                            : ""),
                        validator: (value) =>
                            value == null ? "Select a Calendar" : null,
                        dropdownColor: Colors.white,
                        onChanged: (String? newValue) {
                          setState(() {
                            _selectedCalendar = newValue!;
                            validateStep();
                          });
                        },
                        items: getCalendarsList(snapshot)),
                    TextFormField(
                      decoration: InputDecoration(
                        enabledBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.blue, width: 2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        border: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.blue, width: 2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        labelText: 'Event summary',
                        filled: true,
                        fillColor: theme.white,
                        labelStyle: TextStyle(
                          color: Colors.grey[400],
                        ),
                      ),
                      keyboardType: TextInputType.text,
                      onChanged: (value) {
                        setState(() {
                          _summary = value;
                          validateStep();
                        });
                      },
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Text is required';
                        }
                        return null;
                      },
                    ),
                    DateTimeFormField(
                      decoration: InputDecoration(
                          enabledBorder: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Colors.blue, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          border: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Colors.blue, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          labelText: 'Select a start date',
                          filled: true,
                          fillColor: theme.white,
                          labelStyle: TextStyle(
                            color: Colors.grey[400],
                          )),
                      mode: DateTimeFieldPickerMode.dateAndTime,
                      autovalidateMode: AutovalidateMode.onUserInteraction,
                      validator: (e) => (e?.day ?? 0) == 1
                          ? 'Please not the first day'
                          : null,
                      onDateSelected: (DateTime value) {
                        setState(() {
                          _selectedDateStart = value;
                        });
                      },
                    ),
                    DateTimeFormField(
                      decoration: InputDecoration(
                          enabledBorder: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Colors.blue, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          border: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Colors.blue, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          labelText: 'Select a end date',
                          filled: true,
                          fillColor: theme.white,
                          labelStyle: TextStyle(
                            color: Colors.grey[400],
                          )),
                      mode: DateTimeFieldPickerMode.dateAndTime,
                      autovalidateMode: AutovalidateMode.always,
                      onDateSelected: (DateTime value) {
                        setState(() {
                          _selectedDateEnd = value;
                          validateStep();
                        });
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
