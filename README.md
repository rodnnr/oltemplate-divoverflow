
<object data="https://github.com/rodnnr/olconnect-divoverflow/blob/master/FlowTextBetweenMultipleDiv.pdf" width="700px" height="700px">
    <embed src="https://github.com/rodnnr/olconnect-divoverflow/blob/master/FlowTextBetweenMultipleDiv.pdf">
        <p>Please download the guide in PDF format: <a href="https://github.com/rodnnr/olconnect-divoverflow/blob/master/FlowTextBetweenMultipleDiv.pdf">Download PDF</a>.</p>
    </embed>
</object>

## OL Connect Designer How to overflow text between multiple DIV objects
### Introduction

One often sought requirement is the ability to dynamically flow text from one positioned box into one or multiple other positioned boxes scattered on the same page or any other pages of the same document. In addition, it is also often required to break up a positioned **&lt;div&gt;** object, which has reached the bottom margin of a page to allow it to overflow text onto the next page.
A use case scenario would be a Christmas message spanning multiple lines where there is a requirement for it to overflow, should it not fit into the first box, into multiple positioned boxes, or columns placed at different locations or different pages of the Christmas card.
This guide highlights the simple steps a user can follow to overflow text into multiple positioned **&lt;div&gt;** objects in PrintShopMail, PlanetPress or PReS Connect.

### The method

The method consists in:

 - [ ] Placing two separate **&lt;div&gt;** objects or positioned boxes on the page and assign each a unique CSS ID.
 - [ ] Inserting a  paragraph element (**&lt;p&gt;&lt;/p&gt;**) element inside each of the **&lt;div&gt;** objects.
 - [ ] Dragging and dropping your data mapper or database field inside the main &lt;div&gt; object.
 - [ ] Adding a script in the Script pane, which targets the current section as the Selector. Example Selector: ***[section="Section 1"]***.
 - [ ] Writing a script which does the following:
 
	 - Calculate the height of the main **&lt;div&gt;** container.
	 - Calculate the height of the **&lt;p&gt;** element when content is loaded inside the main &lt;div&gt; container.
	 -  Compare the height of the **&lt;p&gt;** element to the height of the **&lt;div&gt;** container, then remove the last word from **&lt;p&gt;** and assign it to a temporary array variable until the remaining text in **&lt;p&gt;** can fit inside the **&lt;div&gt;** container.
	 - Reassemble all the words from the temporary array variable and then place the resulting text into the paragraph element of the second **&lt;div&gt;** container.
	 - If the second **&lt;div&gt;**  container contains no text, then hide or delete it.

### The Script

The above pseudo code can be translated into the following reusable JavaScript function, which of course can be modified by anyone to suit own needs.

The functions accepts three arguments:

 - ***mainDivID*** (mandatory) is the CSS ID of the main **&lt;div&gt;** element or positioned box container.
- ***overflowDivID*** (mandatory) is the CSS ID of the second **&lt;div&gt;** element which will accommodate the overflow text.
- ***overflowDivBottomPadding*** (optional) is bottom padding of the above second **&lt;div&gt;** element. It is an optional argument, which defaults to 15px if it is not specified.

>
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



### Applications

The example demonstrates how **&lt;div&gt;** overflow can be achieved for 2, 3 and even 4 **&lt;div&gt;**. There is an additional example on [Section 4], which simulates a page break within a **&lt;div&gt;** element.

#### [Section 1]: Two **&lt;div&gt;** overflow

The example in _[Section 1]_ demonstrates a how to flow text from one positioned box object to another. To replicate it:
- Add two positioned boxes with CSS IDs _#mainDiv, #overflowDiv_  on the page and format them in any way you like.
- Add an empty **&lt;p&gt;** element in each of the  **&lt;div&gt;**  elements.
- Drag and drop the field _@Message@_  into the main positioned box with ID _#mainDiv_
- Add a script in the Script pane (_2DivOverflow_), set its Selector to _[section="Section 1"]_
- Copy paste the above function in the script, preceded by the following line overflowingDiv('#mainDiv','#overflowDiv');
- Text should flow from _#mainDiv to #overflowDiv._ If you increase _#mainDiv’s_  height by dragging it_, #overflowDiv_ should gradually decrease in size and content and eventually disasappear off the page.


#### [Section 3]: Four **&lt;div&gt;** overflow

The example in [Section 3] demonstrates how to flow text into 4 different positioned boxes placed at different locations with the last positioned box being on the second page. To replicate it:

Add four positioned boxes with CSS IDs **#stDiv, #ndDiv, #rdDiv**  on the first page and **#thDiv**  on the second page.  Then  format them in any way you like.
- Add an empty **&lt;p&gt;**  element in each of the **&lt;div&gt;** elements.
- Set the maximum heights _#ndDiv_ and _#rdDiv_ positioned boxes should have. Open the content_print_styles.css  and add the following CSS code:

	> 
	  /* [Section 3] CSS */
	  #ndDiv{**max-height**: 40mm;}
	  #rdDiv{**max-height**: 30mm;}

- Drag and drop the field @Message@  into the main positioned box with ID **#stDiv**
- Add a script in the Script pane (_4DivOverflow_), set its Selector to ***[section="Section 3"]***
- Assuming that the above overflowingDiv() already exists in your template, copy and paste the following code in the new script:

	> 
	  overflowingDiv('#stDiv','#ndDiv');
	  overflowingDiv('#ndDiv','#rdDiv');
	  overflowingDiv('#rdDiv','#thDiv');
- As a result, a long enough text should overflow into all the **&lt;div&gt;** and unused **&lt;div&gt;** (except the first) should disappear off the pages if they are empty.

**[Section 4]: Simulate a Page Break within a positioned box**

The example in [Section 4] simply simulates how one could overflow a DIV object, which has reached the bottom margin of the current page, onto the next page.
The steps for replicating this example are similar to the steps used for [Section 1] except for the positions of the two positioned boxes, which need to be at the bottom margin of current page and top margin of next page.
The text should then flow automatically from the positioned box at the bottom margin of the current page to the positioned box located at the top margin of the following page.

### Notes
Applies to Connect v1.8+

