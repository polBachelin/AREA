class GoogleCalendar {
  final String name;
  final String id;


  GoogleCalendar({
    required this.name,
    required this.id,
    
  });

  factory GoogleCalendar.fromJson(Map<String, dynamic> json) => GoogleCalendar(
        name: json['summary'],
        id: json['id'],
      );
}