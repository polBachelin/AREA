// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:area/theme.dart' as theme;
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class RFLargeButton extends StatefulWidget {
  final Color backgroundColor;
  final String buttonText;
  final IconData buttonIcon;
  final Function passedFunction;
  final BuildContext parentContext;
  final String passedString;

  const RFLargeButton(
      {Key? key,
      required this.backgroundColor,
      required this.passedFunction,
      required this.buttonText,
      required this.buttonIcon,
      required this.parentContext,
      required this.passedString})
      : super(key: key);

  @override
  RFLargeButtonState createState() => RFLargeButtonState();
}

//TODO: replace with textButton

class RFLargeButtonState extends State<RFLargeButton> {
  @override
  Widget build(BuildContext context) {
    return (ButtonTheme(
      child: ElevatedButton(
        onPressed: () {
          if (widget.passedString != "") {
            print("CALLBACK ==> " +
                widget.passedFunction.toString() +
                " --> " +
                widget.passedString);
            widget.passedFunction(widget.parentContext, widget.passedString);
          } else {
            widget.passedFunction(widget.parentContext);
          }
        },
        style: ElevatedButton.styleFrom(
          shape: const StadiumBorder(),
          primary: widget.backgroundColor,
          padding: const EdgeInsets.all(13),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(widget.buttonIcon),
            const SizedBox(width: 10),
            Text(
              widget.buttonText,
              style: GoogleFonts.poppins(
                color: Colors.black,
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    ));
  }
}
