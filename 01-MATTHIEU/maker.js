
fs				= require("fs")

allt			= ""
textepage		= ""

back_ligne_end	= ""







for (picture = 55 ; picture <= 120 ; picture++)
{



	name_txt		= './vuler/'+picture+'_vuler.txt';
	result			= fs.readFileSync(name_txt, 'utf8');


	lignes		= result.match(/^.*$/mg);
	textepage	= ""
	
	
	
	
	
	
	for (ligne = 0 ; ligne != lignes.length ; ligne++)
	{
		if (lignes[ligne] != "")
		{
			
			
			
			//RECTIF LIGNE / ---> ¬
			if (lignes[ligne].match(/\/$/))
			{
				lignes[ligne] = lignes[ligne].replace(/\/$/,"¬")
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
					//allt += "\n>> NEW2 <<\n"
				}
				
			}
			
			
			//CHAPITRE
			if (lignes[ligne].indexOf("---CH") != -1)
			{
				//console.log(allt)
				chapitre = lignes[ligne].replace("---CH","")
				textepage += "\n\n\n"+"CHAPITRE:"+chapitre+"\n"
				
				
			}
			
			else
			{
				textepage += " "+lignes[ligne]
			}
			
			
			/*
			else if (lignes[ligne].match(/\¬/))
			{
				//console.log(lignes[ligne])
				lignes[ligne] = lignes[ligne].replace("¬","")
				allt += lignes[ligne]
				
			}
			*/
			
			//console.log("-D>>"+lignes[ligne]+"<<E-")
			//console.log("-D>>"+allt+"<<E-")
			
			//REMOVE ERASMVS.  ||  MATTHAEVS.
			if (ligne >= 0 && ligne <= 7 && lignes[ligne].match(/ERASMVS\.|MATTHAEVS\.|ERASMVS,/))
				textepage = ""
			
			
			back_ligne = lignes[ligne]
			
		}
		
	}
	
	
	
	
	back_ligne_end = back_ligne;
	
	
	//REMOVE END ONE WORD
	if (back_ligne_end.replace(/^ +| +$/,"").split(" ").length == 1)
	{
		//console.log(picture+" "+back_ligne_end)
		
		reg_replace = back_ligne_end+"$";
		reg = new RegExp(reg_replace);
		
		//console.log(textepage+"--")
		
		textepage = textepage.replace(reg, "")
		//textepage += "\n>> NEW <<\n"

	}
	
	
	//console.log(textepage)
	allt += textepage
	
}


allt = allt.replace(/¬ +/g,"")
console.log(allt)


