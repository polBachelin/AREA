import 'package:flutter/material.dart';
import 'package:material_floating_search_bar/material_floating_search_bar.dart';

class CreateAREAWidget extends StatefulWidget {
  final String hint;
  const CreateAREAWidget({Key? key, required this.hint}) : super(key: key);

  @override
    _CreateAREAWidget createState() => _CreateAREAWidget();
}

class _CreateAREAWidget extends State<CreateAREAWidget> {

  @override
  Widget build(BuildContext context) {
    return FloatingSearchBar(
      hint: widget.hint,
      builder: (context, transition) {
        return ClipRRect(
          borderRadius: BorderRadius.circular(8)
        );
      },
    );
  }
}
