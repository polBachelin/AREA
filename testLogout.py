import json
import sys

print('Testing LOGOUT ...')
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
if errorCode.rfind('200') == -1:
    print("Bad Request , error code : ", errorCode)
    sys.exit()

print('Succes')