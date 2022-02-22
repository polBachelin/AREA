import 'package:oauth2_client/github_oauth2_client.dart';
import 'package:oauth2_client/oauth2_helper.dart';

GitHubOAuth2Client ghClient = GitHubOAuth2Client(
	redirectUri: 'fr.area.mobile_client://oauth2redirect',
	customUriScheme: 'fr.area.mobile_client'
);

//Then, instantiate the helper passing the previously instantiated client
OAuth2Helper oauth2Helper = OAuth2Helper(ghClient,
	grantType: OAuth2Helper.AUTHORIZATION_CODE,
	clientId: 'your_client_id',
	clientSecret: 'your_client_secret',
	scopes: ['https://www.googleapis.com/auth/drive.readonly']);