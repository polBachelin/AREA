import 'dart:convert';

import 'package:area/models/notion.dart';
import 'package:area/utils/server_requests.dart';
import 'package:shared_preferences/shared_preferences.dart';

class NotionAPI {
  NotionAPI({required this.prefs});
  Future<SharedPreferences> prefs;
  String url = "";
  Map<String, String> headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  };

  Future<List> getDatabases() async {
    var ret = <String, String>{};
    final response =
        await ServerRequest.getRequest(url, '/notion/databases', headers);

    final List dbs = json.decode(response.body)["results"];

    print(dbs);
    return dbs;
    //   print(item);
    //   ret[item["title"]["text"]["content"].toString()] = item["id"].toString();
    //   print("RET" + ret.toString());
    // }
    //return ret;
  }
}
