
//FILE
fs			= require('fs');
jsonf		= require('fs');

/***********************************************************************************************************
Mat Mar Luk Joh Act Rom 1Co 2Co Gal Eph Phi Col 1Th 2Th 1Ti 2Ti Tit Phm Heb Jam 1Pe 2Pe 1Jo 2Jo 3Jo Jud Rev
************************************************************************************************************/
livres = {
"Mat":1,
"Mar":2,
"Luk":3,
"Joh":4,
"Act":5,
"Rom":6,
"1Co":7,
"2Co":8,
"Gal":9,
"Eph":10,
"Phi":11,
"Col":12,
"1Th":13,
"2Th":14,
"1Ti":15,
"2Ti":16,
"Tit":17,
"Phm":18,
"Heb":19,
"Jam":20,
"1Pe":21,
"2Pe":22,
"1Jo":23,
"2Jo":24,
"3Jo":25,
"Jud":26,
"Rev":27
}


getlivre = {
1:'MATTHIEU',
2:'MARC',
3:'LUC',
4:'JEAN',
5:'ACTES',
6:'ROMAINS',
7:'1 CORINTHIENS',
8:'2 CORINTHIENS',
9:'GALATES',
10:'EPHESIENS',
11:'PHILIPPIENS',
12:'COLOSSIENS',
13:'1 THESSALONICIENS',
14:'2 THESSALONICIENS',
15:'1 TIMOTHEE',
16:'2 TIMOTHEE',
17:'TITE',
18:'PHILEMON',
19:'HEBREUX',
20:'JACQUES',
21:'1 PIERRE',
22:'2 PIERRE',
23:'1 JEAN',
24:'2 JEAN',
25:'3 JEAN',
26:'JUDAS',
27:'APOCALYPSE' }


xlivre = {
'MATTHIEU':'1',
'MARC':'2',
'LUC':'3',
'JEAN':'4',
'ACTES':'5',
'ROMAINS':'6',
'1CORINTHIENS':'7',
'2CORINTHIENS':'8',
'GALATES':'9',
'EPHESIENS':'10',
'PHILIPPIENS':'11',
'COLOSSIENS':'12',
'1THESSALONICIENS':'13',
'2THESSALONICIENS':'14',
'1TIMOTHEE':'15',
'2TIMOTHEE':'16',
'TITE':'17',
'PHILEMON':'18',
'HEBREUX':'19',
'JACQUES':'20',
'1PIERRE':'21',
'2PIERRE':'22',
'1JEAN':'23',
'2JEAN':'24',
'3JEAN':'25',
'JUDE':'26',
'APOCALYPSE':'27', }


//ARRAY
livre_a=[];
chapitre_a=[];
verset_a=[];





ver_avant	= 1;
chap_avant	= 1;
livre_avant	= 1;


chap		= 1;


biblename = "erasme_1527"



result		= fs.readFileSync('erasme_1527.txt', 'utf8');




line = result.match(/^.*$/mg);


for (nb=0;nb!=line.length;nb++)
{
	if (line[nb] != '')
	{

		//separer par espace
		//word_space = line[nb].match(/\S+/g);
		//if (word_space.length > 1)
		//{

		/***
				1:1:1:MATTHIEU:1:1986:NOVA_VULGATA Liber generationis Iesu Christi filii David filii Abraham.
				0 1 2 3        4 5    6            7
		***/


			if (line[nb].indexOf("LIVRE") != -1)
			{
				
				livre = line[nb].match(/:([0-9]+)-/)[1].replace(/^0/,"")
				
				
				
			}
			
			else if (line[nb].indexOf("CHAPITRE") != -1)
			{
				
				
				chap = line[nb].split(':')[1]
				//console.log(chap)
				
			}

			else
			{
				phrase	= line[nb]
			}
			
			/*
			//LIVRE CHAP VER
			livreinfo	= word_space[0].split(':');
			texte		= line[nb].replace(word_space[0]+' ',"");

			
			livre		= livreinfo[0]
			chap		= livreinfo[1];
			ver			= livreinfo[2];
			
			livre		= parseInt(livre);
			chap		= parseInt(chap);
			ver			= parseInt(ver);
			*/
			
			
			livre		= parseInt(livre);
			chap		= parseInt(chap);
			
			


			//console.log(phrase)
			//ancienplusun=ver_avant+1
			//console.log(ver_avant+' '+ver+' '+nver)

			//CHECK
			/*
			if (ver != 1 && ver != ancienplusun)
			{
				console.log(livre+':'+chap+':'+ver+' => DEPASS '+ver_avant+' '+ver)


			}
			*/



			if (chap_avant != chap)
			{

				//verset_a[0] = livre_avant+':'+chap_avant+':'+ver_avant;
				chapitre_a[chap_avant] = phrase
				phrase = ""
				//verset_a = []
			}

			if (livre_avant != livre)
			{

				//console.log(livre_avant+" "+livre)
				//console.log(phrase)
				/*
					if (chap_avant == 1)
					{
						//verset_a[0] = livre_avant+':'+chap_avant+':'+ver_avant;
						//chapitre_a[chap_avant] = phrase;
						//phrase = ""
					}
				*/
					//console.log(chapitre_a.length)
					
					chapitre_a[chap_avant] = phrase;
					tchap = chapitre_a.length-1;
					chapitre_a[0] = livre_avant+'-'+getlivre[livre_avant]+' - '+tchap+' chapitres';
					livre_a[livre_avant] = chapitre_a;
					chapitre_a = []
					phrase = ""
					chap = 1;
			}

			//verset_a[ver]	= phrase;

			livre_avant	= livre;
			chap_avant	= chap;
			//ver_avant	= ver;

	//}


 }

}


//verset_a[0] = livre_avant+':'+chap_avant+':'+ver_avant;
//verset_a[ver_avant] = phrase;

chapitre_a[chap_avant] = phrase;
tchap = chapitre_a.length-1;
chapitre_a[0] = livre_avant+'-'+getlivre[livre_avant]+' - '+tchap+' chapitres';
livre_a[livre_avant] = chapitre_a;

tlivre = livre_a.length-1;
livre_a[0]="BIBLE "+biblename.toUpperCase()+' - '+tlivre+' livres';


//FILE_JSON_TISCH
jsonf.writeFileSync(biblename.toLowerCase()+'.js', biblename.toLowerCase().replace('-',"_")+'='+JSON.stringify(livre_a, null, 1), 'utf8');
