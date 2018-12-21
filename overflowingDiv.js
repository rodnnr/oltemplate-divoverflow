function overflowingDiv(mainDivID,overflowDivID,overflowDivBottomPadding){

	var mainDivHeight, p1Height, p2Height;
	var p1, p2, overflowDiv;
	var p1Text, p2Text;
	var lastWord, p1Temp;

	overflowDivBottomPadding = overflowDivBottomPadding || 15;
	mainDivHeight = parseInt(query(mainDivID).css("height"));
	overflowDiv = query(overflowDivID);

	p1 = query(mainDivID + ' p');
	p2 = query(overflowDivID + ' p');
	p1Height = parseInt(p1.css('height'));
	p1Text= p1.text().split(' ');
	p2Text = [];

	while(p1Height && p1Height > mainDivHeight){
		//remove last word from Paragraph1 in main Div
		lastWord = p1Text.pop();

		//prepend the above last word to Parapagh2 in overflow Div
		p2Text.unshift(lastWord + ' ');

		//reassemble Paragrah1 text
		p1Temp = p1Text.join(' ');

		// reassign Paragrah1 text to p1 (minus last word of previous iteration)
		p1.text(p1Temp);
		//recalculate Paragraph1 height
		p1Height = parseInt(p1.css('height'));
	}
	//Assemble Paragraph2 in overflow Div
	p2.text(p2Text.join(''));

	//hide oveflow Div if it is empty
	p2Height = parseInt(p2.css('height'));
	if(p2Height ==0){
		overflowDiv.css('display','none');
	}else{
		p2Height+=overflowDivBottomPadding;
		overflowDiv.css('height', p2Height + 'px');
	}
}
