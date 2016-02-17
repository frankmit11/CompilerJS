/* lexer.js  */
//Author: Frank Mitarotonda
//Date: February 16 2016
    
    function lex()
    {
        // Grabs the "raw" source code.
        var sourceCode = document.getElementById("taSourceCode").value;
        // Trims the leading and trailing spaces.
        sourceCode = trim(sourceCode);
        
        //Splits incoming source code into an array by word and spaces. (Example Input: whilea the    Array Result:[whilea, ,the]) 
        var code = sourceCode.split("\\s+");
        
        //Splits previously made array by mapping the declared regular expressions to the current arrays values and then concatenating that array to an empty array. 
        code = [].concat.apply([], code.map(function (v) {
        //RegExs (Regualr Expressions) used in langauage.
	    return v.split(/(while|if|print|int|string|boolean|true|\s|false|[a-z]|[0-9]|\)|\(|{|}|==|=|\W|\+|!=)/);
        //Filters out "" once split is made.
        })).filter(function(v) {
        return v !== "";
        });
        
        //putMessage("Lex Returned[" + code + "]");

        

        //Constructor that creates token by getting the tokens value and kind.
           function token(value,kind)
          {
                this.val=value;
                this.kind=kind;

          }
        

        
        var instring;  //Declares Boolean used to determine if strings are used.
        var quote = 1; //Used to count number of quotes to differentiate between an opened and closed quote. 
        var linenum = 0; //Sets linenum to 0 because all computer programmers count from 0.
        
        //Declares all Regexs used in our grammer so that they can be matched in the list of if statements im sure is bad coding practice.
        var openq = /\"/; 
        var keywords = /while|if|print|int|string|boolean|true|false/;
        var chars = /[a-z]/;
        var digits = /[0-9]/;
        var symbols = /==|\+|\)|\(|=|!=/;
        var openbrace = /{/;
        var closebrace = /}/;
        var endblock = /$/;

        var space = /\s/; //Declared to account for the space token in strings.
        var line = /\n/; //Used to count line number.
        var tokenstream = []; //This array will store all my created tokens. 
        console.log(code);
        var lexem = code.length; //Gets the length of my code array so I can loop through it in my next line.
        
       //Loop that goes through each index of code array and if finds a match with previously defined Regexs, outputs a result.
       for (var i = 0; i < lexem; i++){
         tokenval = code[i]; //Extracts the value at location i in the array.
         
         if(tokenval.match(keywords) && instring == true ){ //Checks if instring and a keyword is in that string.
         var string = tokenval.split("");  //Looks at that keyword value and splits it up by letter.
            for (var j = 0; j < string.length; j++){ //Loops through keyword that was split up by letter.
            var letter = string[j]; //Gets the value of that letter in the keyword.
                if (letter.match(chars)){
                    putMessage("Lex found Token of kind Character [" + letter + "] on Line " + linenum ); //Outputs token and line number.
                    chartoken = new token(letter, "Character"); //Creates character useing token constructor. 
                    tokenstream.push(chartoken.kind); //Pushes that character token to the tokenstream array mentioned earlier.
                }   
             }
         }
         /*These statments all search for a corrosponding match to the RegExs in the language 
         and once a match is made tokenizes that RegEx useing the method outlined in the last 3 lines of code*/  
         else if(tokenval.match(keywords)){
         putMessage("Lex found Token of kind Keyword [" + tokenval + "] on Line " + linenum );
         keywordtoken = new token(tokenval, "Keyword");
         tokenstream.push(keywordtoken.kind);
         }
         else if (tokenval.match(chars) && instring == true){
         putMessage("Lex found Token of kind Character [" + tokenval + "] on Line " + linenum);
         chartoken = new token(tokenval, "Character");
         tokenstream.push(chartoken.kind);
         }
         else if (tokenval.match(chars)){
         putMessage("Lex found Token of kind Identifier [" + tokenval + "] on Line " + linenum);
         idtoken = new token(tokenval, "Identifier");
         tokenstream.push(idtoken.kind);
         }
         else if (tokenval.match(symbols)){
         putMessage("Lex found Token of kind Symbol [" + tokenval + "] on Line " + linenum);
         symboltoken = new token(tokenval, "Symbol");
         tokenstream.push(symboltoken.kind);
         }
         else if (tokenval.match(digits)){
         putMessage("Lex found Token of kind Digit [" + tokenval + "] on Line " + linenum);
         digittoken = new token(tokenval, "Digit");
         tokenstream.push(digittoken.kind);
         }
         else if (tokenval.match(openbrace)){
         putMessage("Lex found Token of kind OpenBlock [" + tokenval + "] on Line " + linenum);
         openblocktoken = new token(tokenval, "OpenBlock");
         tokenstream.push(openblocktoken.kind);
         }
         else if (tokenval.match(closebrace)){
         putMessage("Lex found Token of kind CloseBlock [" + tokenval + "] on Line " + linenum);
         closeblocktoken = new token(tokenval, "CloseBlock");
         tokenstream.push(closeblocktoken.kind);
         }
         else if (tokenval.match(openq) && quote == 2){ //Looks to see if the quote is a closed quote.
         putMessage("Lex found Token of kind CloseQuote [" + tokenval + "] on Line " + linenum);
         quote = 1; //Once closed quote is found quote is reset to 1 in order to find other possible closed quotes.
         instring = false; //Instring set to false because we are not in a string anymore duh.
         closequotetoken = new token(tokenval, "CloseQuote");
         tokenstream.push(closequotetoken.kind);

         }
         else if (tokenval.match(openq)){
         putMessage("Lex found Token of kind OpenQuote [" + tokenval + "] on Line " + linenum);
         quote++;//Increases quote by 1 once an open quote is found to indicate we are in a string. 
         instring = true; //If that was not enough the boolean instring is set to true as well.
         openquotetoken = new token(tokenval, "OpenQuote");
         tokenstream.push(openquotetoken.kind);
         
         }
         else if (tokenval.match(space) && quote == 2){ //Checks for quote to be 2 to insure we are finsihed with the entire string and got all possible space tokens.
         putMessage("Lex found Token of kind Space [" + tokenval + "] on Line " + linenum);
         spacetoken = new token(tokenval, "Space");
         tokenstream.push(spacetoken.kind);
         }
         else if (tokenval.match(line)){
         linenum++; //Increase line number by 1 everytime there is a new line.
         }
         else if (tokenval.match(space)){
         //Ignores Space when not in a string.
         }
         else if (tokenval.match(endblock)){
         //Recognize endblock however not a token so dont tokenize.
         putMessage("End Block reached [" + tokenval + "] on Line " + linenum);
         }
         else
         {
         putMessage("Lex Error [" + tokenval + "] is Not a Valid Token on Line " + linenum); //Throws error with line number if none of the tokens are matched. 
         }
       }
        putMessage("Token Stream [" + tokenstream + "]"); //Ouputs token stream so that I can visualize things this might change depedning if you like it or not.

          
    }




        
        
        
    
        
       
        
    
    
    

