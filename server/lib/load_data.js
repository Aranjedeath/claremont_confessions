filter_flagged_words = function (text) {
	var banWords = ["2g1c","2 girls 1 cup","acrotomophilia","anal","anilingus","anus","arsehole","ass","asshole","assmunch","auto erotic","autoerotic","babeland","baby batter","ball gag","ball gravy","ball kicking","ball licking","ball sack","ball sucking","bangbros","bareback","barely legal","barenaked","bastardo","bastinado","bbw","bdsm","beaver cleaver","beaver lips","bestiality","bi curious","big black","big breasts","big knockers","big tits","bimbos","birdlock","bitch","black cock","blonde action","blonde on blonde action","blow j","blow your l","blue waffle","blumpkin","bollocks","bondage","boner","boob","boobs","booty call","brown showers","brunette action","bukkake","bulldyke","bullet vibe","bung hole","bunghole","busty","butt","buttcheeks","butthole","camel toe","camgirl","camslut","camwhore","carpet muncher","carpetmuncher","chocolate rosebuds","circlejerk","cleveland steamer","clit","clitoris","clover clamps","clusterfuck","cock","cocks","coprolagnia","coprophilia","cornhole","cum","cumming","cunnilingus","cunt","darkie","date rape","daterape","deep throat","deepthroat","dick","dildo","dirty pillows","dirty sanchez","doggie style","doggiestyle","doggy style","doggystyle","dog style","dolcett","domination","dominatrix","dommes","donkey punch","double dong","double penetration","dp action","eat my ass","ecchi","ejaculation","erotic","erotism","escort","ethical slut","eunuch", "fag", "faggot","fecal","felch","fellatio","feltch","female squirting","femdom","figging","fingering","fisting","foot fetish","footjob","frotting","fuck","fuck buttons","fudge packer","fudgepacker","futanari","gang bang","gay sex","genitals","giant cock","girl on","girl on top","girls gone wild","goatcx","goatse","gokkun","golden shower","goodpoop","goo girl","goregasm","grope","group sex","g-spot","guro","hand job","handjob","hard core","hardcore","hentai","homoerotic","honkey","hooker","hot chick","how to kill","how to murder","huge fat","humping","incest","intercourse","jack off","jail bait","jailbait","jerk off","jigaboo","jiggaboo","jiggerboo","jizz","juggs","kike","kinbaku","kinkster","kinky","knobbing","leather restraint","leather straight jacket","lemon party","lolita","lovemaking","make me come","male squirting","masturbate","menage a trois","milf","missionary position","motherfucker","mound of venus","mr hands","muff diver","muffdiving","nambla","nawashi","negro","neonazi","nigga","nigger","nig nog","nimphomania","nipple","nipples","nsfw images","nude","nudity","nympho","nymphomania","octopussy","omorashi","one cup two girls","one guy one jar","orgasm","orgy","paedophile","panties","panty","pedobear","pedophile","pegging","penis","phone sex","piece of shit","pissing","piss pig","pisspig","playboy","pleasure chest","pole smoker","ponyplay","poof","poop chute","poopchute","porn","porno","pornography","prince albert piercing","pthc","pubes","pussy","queaf","raghead","raging boner","rape","raping","rapist","rectum","reverse cowgirl","rimjob","rimming","rosy palm","rosy palm and her 5 sisters","rusty trombone","sadism","scat","schlong","scissoring","semen","sex","sexo","sexy","shaved beaver","shaved pussy","shemale","shibari","shit","shota","shrimping","slanteye","slut","s&m","smut","snatch","snowballing","sodomize","sodomy","spic","spooge","spread legs","strap on","strapon","strappado","strip club","style doggy","suck","sucks","suicide girls","sultry women","swastika","swinger","tainted love","taste my","tea bagging","threesome","throating","tied up","tight white","tit","tits","titties","titty","tongue in a","topless","tosser","towelhead","tranny","tribadism","tub girl","tubgirl","tushy","twat","twink","twinkie","two girls one cup","undressing","upskirt","urethra play","urophilia","vagina","venus mound","vibrator","violet blue","violet wand","vorarephilia","voyeur","vulva","wank","wetback","wet dream","white power","women rapping","wrapping men","wrinkled starfish","xx","xxx","yaoi","yellow showers","yiffy","zoophilia" ];
	var flagged_words = [];
	var textSplit = text.split(" ");

	for (var i = 0; i < textSplit.length; i++) {
		looper:
		for (var c = 0; c < banWords.length; c++) {
			if (textSplit[i] == banWords[c]) {
				for (var d = 0; d < flagged_words.length; d++) {
					if (flagged_words[d] != textSplit[i]) {
						continue;
					}
					else {
						break looper;
					}
				}
				flagged_words.push(textSplit[i]);
			}
		}
	}
	return flagged_words;
};

load_data = function () {
	var data = JSON.parse(Assets.getText('fb_data_fixture_4-11-14.json'));
	for (var i = 0; i < 100; i++) {
		var current_comments = [];
		if (data.data[i].comments) {
			for (var j = 0; j < data.data[i].comments.data.length; j++) {
				current_comments.push({
					username: data.data[i].comments.data[j].from.name,
					body: data.data[i].comments.data[j].message,
					timestamp: new Date(data.data[i].comments.data[j].created_time).toString().substring(0, 21)
				});
			}
		}
		var numLikes;
		if (data.data[i].likes) {
			numLikes = data.data[i].likes.data.length;
		}
		else {
			numLikes = 0;
		}
		Posts.insert({
			body: data.data[i].message,
			timestamp: new Date(data.data[i].created_time).toString().substring(0, 21),
			comments: current_comments,
			post_number: 100 - i,
			likes: numLikes,
			flagged_words: filter_flagged_words(data.data[i].message),
			is_approved: true,
			was_starred_by: []
		});

	}
};