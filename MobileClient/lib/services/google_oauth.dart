import 'package:flutter/material.dart';
import 'package:visa/auth-data.dart';
import 'package:visa/google.dart';

class GoogleAuthPage extends StatelessWidget {
  const GoogleAuthPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      /// Simply Provide all the necessary credentials
      body: GoogleAuth().visa.authenticate(
          clientID: '338854183277-1u6esadfcuu84km6jvh9pd1adnq6vc9g.apps.googleusercontent.com',
          redirectUri: 'http%3A%2F%2Flocalhost%3A8080%2FgoogleCalendar%2Fauth',
          scope: "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.app.created%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.calendarlist.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.owned",
          state: 'googleAuth',
          onDone: done,
      )
    );
  }

  void done(AuthData authData, BuildContext context){
    print(authData);
    /// You can pass the [AuthData] object to a 
    /// post-authentication screen. It contaions 
    /// all the user and OAuth data collected during
    /// the authentication process. In this example,
    /// our post-authentication screen is "complete-profile".
    Navigator.pushReplacementNamed(
        context, '/complete-profile', arguments: authData
    );
  }
}