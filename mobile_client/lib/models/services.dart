class Service {
  final String name;
  final String icon;
  final List<dynamic> actions;
  final List<dynamic> reactions;

  const Service({
    required this.name,
    required this.icon,
    required this.actions,
    required this.reactions,
  });

  factory Service.fromJson(Map<String, dynamic> json) => Service(
        name: json['name'],
        icon: json['icon'],
        actions: json['actions'],
        reactions: json['reactions'],
      );

  Map<String, dynamic> toJson() => {
        'name': name,
        'icon': icon,
        'actions': actions,
        'reactions': reactions,
      };
}