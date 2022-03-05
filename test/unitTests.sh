curl -s -i -X 'POST' 'http://localhost:8080/auth/login' -H 'accept: */*' -H 'Content-Type: application/json' \
  -d '{
  "email": "toto@gmail.com",
  "password": "toto123"
}' > test.txt
python testLogin.py
curl -s -i -X 'POST' \
  'http://localhost:8080/auth/logout' \
  -H 'accept: */*' \
  -d '' > test.txt
python testLogout.py
curl -s -i -X 'POST' \
  'http://localhost:8080/auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "totou@gmail.com",
  "password": "toto123"
}' > test.txt
python testRegister.py