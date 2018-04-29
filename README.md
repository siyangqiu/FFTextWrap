# Fennec TextWrap
Personal project for adding textwrap to Firefox on Android. Compared to other text wrap/reflow add-ons on AMO, this reflows the entire page based on touch events - the page will reflow as soon as you finish your pinch to zoom! No more clicking on text elements! Source code at: https://github.com/siyangqiu/FFTextWrap

Note: to sideload this webextension, you will need to add the following into manifest.json with something in the id field:

<pre>"applications": {
    "gecko": {
    "id": "<some sort of id>"
    }
}</pre>
