import json
import sys

print('Testing REGISTER ...')
f = open("test.txt","r")
lines = f.readlines()
if len(lines) == 0:
    print('Fail to connect')
    sys.exit()

for x in lines :
    if x[0] == '{':
        jsonLine = x
    if x.rfind('HTTP') != -1:
        errorCode = x.split(' ')[1]
parsed = json.loads(jsonLine)
if errorCode.rfind('201') == -1:
    print("Bad Request , error code : ", errorCode)
    sys.exit()
if not parsed["token"]["access_token"]:
    print('Fail , no acces token')
    sys.exit()

print(errorCode)
print(parsed["token"]["access_token"])
print('Succes')