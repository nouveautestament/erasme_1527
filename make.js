
fs		= require('fs')
allf	= fs.readFileSync('./all.txt','UTF8').split(/\n/)
b		= ""
all_l	= []



for (l=0; l!=allf.length; l++) 
{
	
	sallf = allf[l].split('/')
	
	if (b != sallf[1] && l!=0) 
	{
		
		deb = all_l[0].match(/\/([0-9]+)\.jpg/)[1]
		end = all_l[all_l.length-1].match(/\/([0-9]+)\.jpg/)[1]
		
		
		console.log 
					(
						`if ( pic >= `+deb+` && pic <= `+end+` ) rep="`+b+`"`
					)
		
		
		all_l = []
		
		
	}
	
	all_l.push(allf[l])
	b = sallf[1]
}
