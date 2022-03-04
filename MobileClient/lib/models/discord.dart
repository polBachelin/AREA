class DiscordChannel {
  final String name;
  final String id;


  DiscordChannel({
    required this.name,
    required this.id,
  });

  factory DiscordChannel.fromJson(Map<String, dynamic> json) => DiscordChannel(
        name: json['name'],
        id: json['channel_id'],
      );
}