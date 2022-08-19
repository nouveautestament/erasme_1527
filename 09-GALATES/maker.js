





fs				= require("fs")
allt			= ""
textepage		= ""
back_ligne_end	= ""



all_txt = []










for (picture = 418 ; picture <= 426; picture++)
{




	name_txt		= './vuler/'+picture+'_vuler.txt';
	result			= fs.readFileSync(name_txt, 'utf8');


	lignes		= result.match(/^.*$/mg);
	textepage	= ""
	
	all_txt[picture] = ""
	
	
	
	
	
	
	
	for (ligne = 0 ; ligne != lignes.length ; ligne++)
	{
		
		
		if (lignes[ligne] != "")
		{
			
			
			
			//RECTIF LIGNE / ---> ¬
			if (lignes[ligne].match(/\/$/))
			{
				lignes[ligne] = lignes[ligne].replace(/\/$/,"¬")
			}
			
			//RECTIF LIGNE - ---> -
			if (lignes[ligne].match(/\-$/))
			{
				lignes[ligne] = lignes[ligne].replace(/\-$/,"¬")
			}
			
			
			
			//REMOVE SAME BACK WORD
			if (ligne >= 0 && ligne <= 7 && textepage == "")
			{
				
				reg_start	= "^"+back_ligne_end;
				regs		= new RegExp(reg_start);
				
				
				if (lignes[ligne].match(regs))
				{
					
					
					
					reg_replace = back_ligne_end+"$";
					reg = new RegExp(reg_replace);
					
					allt =  allt.replace(reg,"")
					
					
					
					reg_replace2 = back_ligne_end+"\\n$";
					reg2 = new RegExp(reg_replace2);
					
					
					if (all_txt[picture-1])
						all_txt[picture-1] = all_txt[picture-1].replace(reg2,"")



				}
				
			}
			
			
			//CHAPITRE
			if (lignes[ligne].indexOf("---CH") != -1)
			{

				chapitre = lignes[ligne].replace("---CH","")
				
				textepage += "\n\n\n"+"CHAPITRE:"+chapitre+"\n"
				all_txt[picture] += lignes[ligne]+"\n"
			}
			
			else
			{
				textepage += " "+lignes[ligne]
				all_txt[picture] += lignes[ligne]+"\n"
			}
			




			
			//REMOVE ERASMVS.  ||  MATTHAEVS.
			if (ligne >= 0 && ligne <= 7)
			{
				
				if (lignes[ligne].match(/ERASMVS\.|MATTHAEVS\.|ERASMVS,/))
				{
					textepage = ""
					all_txt[picture] = ""
				}
				
				
				if (lignes[ligne] == "ERASMVS" || lignes[ligne] == "ERASMI" || lignes[ligne] == "VERSIO.")
				{
					textepage = ""
					all_txt[picture] = ""
				}
				
				
				
			}
			
			
			
			
			
			back_ligne = lignes[ligne]
			
		}
		
	}
	
	
	
	
	back_ligne_end = back_ligne;
	
	
	//REMOVE END ONE WORD
	if (back_ligne_end.replace(/^ +| +$/,"").split(" ").length == 1)
	{

		
		reg_replace = back_ligne_end+"$";
		reg = new RegExp(reg_replace);
		
		textepage = textepage.replace(reg, "")


		
		reg_replace2 = back_ligne_end+"\\n$";
		reg2 = new RegExp(reg_replace2);
		
		all_txt[picture] = all_txt[picture].replace(reg2,"")

	}
	
	
	//console.log(textepage)
	allt += textepage
	
}




allt = allt.replace(/¬ +/g,"")



if (process.argv[2] == "page")
	console.log("\n\n\n"+all_txt[parseInt(process.argv[3])])

if (process.argv[2] == "all")
	console.log(allt)






