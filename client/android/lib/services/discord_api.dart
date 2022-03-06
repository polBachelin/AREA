import 'dart:convert';

import 'package:area/models/discord.dart';
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
    prefs.then((p) => url = p.getString('server_url')!);
  }

  Future<List<DiscordChannel>> getChannels() async {
    updateUrl();
    final response =
        await ServerRequest.getRequest(url, '/discord/getChannels', headers);

    final List channels = json.decode(response.body);
    return channels.map((json) => DiscordChannel.fromJson(json)).toList();
  }

  Future<List<DiscordRole>> getRoles() async {
    updateUrl();
    final response =
        await ServerRequest.getRequest(url, '/discord/getRoles', headers);

    print(response.body);
    final List roles = json.decode(response.body);
    return roles.map((json) => DiscordRole.fromJson(json)).toList();
  }
}
