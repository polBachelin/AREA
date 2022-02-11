class User {
  /*
    This class encapsulates the json response from the api
    {
        'userId': '1908789',
        'username': username,
        'name': 'Peter Clarke',
        'lastLogin': "23 March 2020 03:34 PM",
        'email': 'x7uytx@mundanecode.com'
    }
    */
  final String username;
  final String email;

  const User({required this.username, required this.email});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(username: json['username'], email: json['email']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['username'] = username;
    data['email'] = email;
    return data;
  }
}
