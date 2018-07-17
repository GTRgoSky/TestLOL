#create by Jason @2017.9.18
import re,os  


def replace_content(filename,pre,now):
	f=open(filename,'r')  
	alllines=f.readlines()  
	f.close()  
	f=open(filename,'w+')  
	for eachline in alllines:  
		a=re.sub(pre,now,eachline)  
		f.writelines(a)  
	f.close() 
	
def replace_string(filename,pre,now):
	with open(filename,'r+') as f:
		t = f.read()
		t = t.replace(pre,now) 
		f.seek(0, 0)    
		f.write(t)

for root, dirs, files in os.walk('./dist/static/css'):
	for name in files:
		end = name[-4:]
		if end == '.css':
			fullname = './dist/static/css/'+name
			print(fullname)
			replace_string(fullname,'url(/static','url(../../static')
			replace_string(fullname,'url(static','url(../../static')
			
						
for root, dirs, files in os.walk('./dist/static/js'):
	for name in files:
		start = name[0:3]
		end = name[-3:]
		if end == '.js' and start == 'app':
			fullname = './dist/static/js/'+name
			print(fullname)
			replace_string(fullname,'/static','static')
			

			
#replace_content('a.txt','hello','cctv')
#replace_string('a.txt','hello','cctv')