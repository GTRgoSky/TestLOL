#hashlib
import hashlib, json, os
###如果文件过大会占用内存资源
def get_md5(s):
    return hashlib.md5(s.encode('utf-8')).hexdigest()

json_str = {"age": '20', "score": 88, "name": "Bob"}
json_str['age'] = get_md5(json_str['age'])
print(json_str['age'])
# jsonRes = dict()
# with open('./login.json', 'r') as f:
#     m = json.load(f)
#     jsonRes = dict(m, **json_str)
    
# with open('./login.json', 'w') as f:
#     f.write(json.dumps(jsonRes))
