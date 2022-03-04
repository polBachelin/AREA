import 'dart:convert';

import 'package:area/utils/server_requests.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DiscordAPI {
  DiscordAPI({required this.prefs});
  Future<SharedPreferences> prefs;
  String url = "";
  Map<String, String> headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  };

  void updateUrl() {
    prefs.then((p) => url = "http://" + p.getString('server_ip')! + ":3000");
  }

  Future<List> getChannels() async {
    updateUrl();
    final response =
        await ServerRequest.getRequest(url, '/discord/getChannels', headers);

    final List dbs = json.decode(response.body);
    print(dbs);

    return dbs;
    //   print(item);
    //   ret[item["title"]["text"]["content"].toString()] = item["id"].toString();
    //   print("RET" + ret.toString());
    // }
    //return ret;
  }
}
