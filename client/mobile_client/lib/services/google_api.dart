import 'dart:convert';

import 'package:area/models/google.dart';
import 'package:area/utils/server_requests.dart';
import 'package:shared_preferences/shared_preferences.dart';

class GoogleAPI {
  GoogleAPI({required this.prefs});
  Future<SharedPreferences> prefs;
  String url = "";
  Map<String, String> headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  };

  void updateUrl() {
    prefs.then((p) => url = p.getString('server_url')!);
  }

  Future<List<GoogleCalendar>> getCalendars() async {
    updateUrl();
    final response =
        await ServerRequest.getRequest(url, '/googleCalendar/listCalendars', headers);

    final List calendars = json.decode(response.body);
    print("CALENDARS => " + calendars.toString());
    return calendars.map((json) => GoogleCalendar.fromJson(json)).toList();
  }
}