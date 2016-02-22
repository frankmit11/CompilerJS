/* lexer.js  */
//Author: Frank Mitarotonda
//Date: February 16 2016
    
    var tokenstream = []; //This array will store all my created tokens.

    //Constructor that creates token by getting the tokens value and kind.
           function token(value,kind,line)
          {
                this.val=value;
                this.kind=kind;
                this.line=line;

          }
//Declares all Regexs used in our grammer so that they can be matched in the list of if statements im sure is bad coding practice.
        var openq = /\"/; 
        var keywords = /while|if|print|int|string|boolean|true|false/;
        var chars = /[a-z]/;
        var digits = /[0-9]/;
        var equality = /==|!=/;
        var addition = /\+/;
        var assign = /=/;
        var openbrace = /{/;
        var closebrace = /}/;
        var openparen = /\(/;
        var closeparen = /\)/;
        var endblock = /\$/;
    
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
	    return v.split(/(while|if|print|int|string|boolean|true|\s|false|[a-z]|[0-9]|\)|\(|{|}|!=|==|=|\W|\+|\$)/);
        //Filters out "" once split is made.
        })).filter(function(v) {
        return v !== "";
        });
        
        

    
        var instring;  //Declares Boolean used to determine if strings are used.
        var quote = 1; //Used to count number of quotes to differentiate between an opened and closed quote. 
        var linenum = 0; //Sets linenum to 0 because all computer programmers count from 0.
        
   

        var space = /\s/; //Declared to account for the space token in strings.
        var line = /\n/; //Used to count line number.
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
                    chartoken = new token(letter, "Character", linenum); //Creates token useing constructor defined earlier. 
                    tokenstream.push(chartoken.val,chartoken.kind,chartoken.line); //Pushes that token's value, kind, and line number to the tokenstream array mentioned earlier.
                }   
             }
         }
         /*These statments all search for a corrosponding match to the RegExs in the language 
         and once a match is made tokenizes that RegEx useing the methods described in the last 7 lines of code*/  
         else if(tokenval.match(keywords)){
         putMessage("Lex found Token of kind Keyword [" + tokenval + "] on Line " + linenum );
         keywordtoken = new token(tokenval, "Keyword", linenum);
         tokenstream.push(keywordtoken.val,keywordtoken.kind,keywordtoken.line);
         }
         else if (tokenval.match(chars) && instring == true){
         putMessage("Lex found Token of kind Character [" + tokenval + "] on Line " + linenum);
         chartoken = new token(tokenval, "Character", linenum);
         tokenstream.push(chartoken.val,chartoken.kind,chartoken.line);
         }
         else if (tokenval.match(chars)){
         putMessage("Lex found Token of kind Identifier [" + tokenval + "] on Line " + linenum);
         idtoken = new token(tokenval, "Identifier", linenum);
         tokenstream.push(idtoken.val,idtoken.kind,idtoken.line);
         }
         else if (tokenval.match(equality)){
         putMessage("Lex found Token of kind Equality [" + tokenval + "] on Line " + linenum);
         equalitytoken = new token(tokenval, "Equality", linenum);
         tokenstream.push(equalitytoken.val,equalitytoken.kind,equalitytoken.line);
         }
         else if (tokenval.match(digits)){
         putMessage("Lex found Token of kind Digit [" + tokenval + "] on Line " + linenum);
         digittoken = new token(tokenval, "Digit", linenum);
         tokenstream.push(digittoken.val,digittoken.kind,digittoken.line);
         }
         else if (tokenval.match(openbrace)){
         putMessage("Lex found Token of kind OpenBlock [" + tokenval + "] on Line " + linenum);
         openblocktoken = new token(tokenval, "OpenBlock", linenum);
         tokenstream.push(openblocktoken.val,openblocktoken.kind,openblocktoken.line);
         }
         else if (tokenval.match(closebrace)){
         putMessage("Lex found Token of kind CloseBlock [" + tokenval + "] on Line " + linenum);
         closeblocktoken = new token(tokenval, "CloseBlock", linenum);
         tokenstream.push(closeblocktoken.val,closeblocktoken.kind,closeblocktoken.line);
         }
         else if (tokenval.match(openparen)){
         putMessage("Lex found Token of kind OpenParen [" + tokenval + "] on Line " + linenum);
         openparentoken = new token(tokenval, "OpenParen", linenum);
         tokenstream.push(openparentoken.val,openparentoken.kind,openparentoken.line);
         }
         else if (tokenval.match(closeparen)){
         putMessage("Lex found Token of kind CloseParen [" + tokenval + "] on Line " + linenum);
         closeparentoken = new token(tokenval, "CloseParen",linenum);
         tokenstream.push(closeparentoken.val,closeparentoken.kind,closeparentoken.line);
         }
         else if (tokenval.match(assign)){
         putMessage("Lex found Token of kind Assign [" + tokenval + "] on Line " + linenum);
         assigntoken = new token(tokenval, "Assign",linenum);
         tokenstream.push(assigntoken.val,assigntoken.kind,assigntoken.line);
         }
         else if (tokenval.match(addition)){
         putMessage("Lex found Token of kind Addition [" + tokenval + "] on Line " + linenum);
         additiontoken = new token(tokenval, "Addition", linenum);
         tokenstream.push(additiontoken.val,additiontoken.kind,additiontoken.line);
         }
         else if (tokenval.match(openq) && quote == 2){ //Looks to see if the quote is a closed quote.
         putMessage("Lex found Token of kind CloseQuote [" + tokenval + "] on Line " + linenum);
         quote = 1; //Once closed quote is found quote is reset to 1 in order to find other possible closed quotes.
         instring = false; //Instring set to false because we are not in a string anymore duh.
         closequotetoken = new token(tokenval, "CloseQuote", linenum);
         tokenstream.push(closequotetoken.val,closequotetoken.kind,closequotetoken.line);

         }
         else if (tokenval.match(openq)){
         putMessage("Lex found Token of kind OpenQuote [" + tokenval + "] on Line " + linenum);
         quote++;//Increases quote by 1 once an open quote is found to indicate we are in a string. 
         instring = true; //If that was not enough the boolean instring is set to true as well.
         openquotetoken = new token(tokenval, "OpenQuote",linenum);
         tokenstream.push(openquotetoken.val,openquotetoken.kind,openquotetoken.line);
         
         }
         else if (tokenval.match(space) && quote == 2){ //Checks for quote to be 2 to insure we are finsihed with the entire string and got all possible space tokens.
         putMessage("Lex found Token of kind Space [" + tokenval + "] on Line " + linenum);
         spacetoken = new token(tokenval, "Space", linenum);
         tokenstream.push(spacetoken.val,spacetoken.kind,spacetoken.line);
         }
         else if (tokenval.match(line)){
         linenum++; //Increase line number by 1 everytime there is a new line.
         }
         else if (tokenval.match(space)){
         //Ignores Space when not in a string.
         }
         else if (tokenval.match(endblock)){
         //Recognizes endblock however not a token so dont tokenize.
         putMessage("End Block reached [" + tokenval + "] on Line " + linenum);
         endtoken = new token(tokenval, "EndBlock", linenum);
         tokenstream.push(endtoken.val,endtoken.kind,endtoken.line);
         }
         else
         {
         putMessage("Lex Error [" + tokenval + "] is Not a Valid Token on Line " + linenum); //Throws error with line number if none of the tokens are matched. 
         }
       }
        putMessage("Token Stream [" + tokenstream + "]"); //Ouputs token stream so that I can visualize things this might change depedning if you like it or not.

          
    }

    




  var tokenindex  = 0;
  var lineindex  = 0;

    function parse() {

        // Grab the next token.
        currentToken = getNextToken();
        putMessage("Parsing [" + currentToken + "]");
        // A valid parse derives the G(oal) production, so begin there.
        parseG();
        // Report the results.
        putMessage("Parsing found " + errorCount + " error(s).");        
    }
    
    function parseG() {
        // A G(oal) production can only be an E(xpression), so parse the E production.
        parseB();
        currentToken = getNextToken();
        putMessage("Expecting a $");
        if (currentToken.match(endblock)) {
            // We're not done, we we expect to have an op.
            putMessage("EOF reached");
        } else {
            // There is nothing else in the token stream, 
            // and that's cool since E --> digit is valid.
            putMessage("Parse Error Expecting $ got " + currentToken);
        }
    }

    function parseB() {
        
        putMessage("Expecting an OpenBrace");
        if (currentToken.match(openbrace)) {
            // We're not done, we we expect to have an op.
            putMessage("Got OpenBrace");
            currentToken = getNextToken();
        } else {
            // There is nothing else in the token stream, 
            // and that's cool since E --> digit is valid.
            putMessage("Parse Error Expecting {");
            return;
        }
        parseSL();
        if (currentToken.match(closebrace)) {
            putMessage("Expecting a CloseBrace");
            putMessage("Got CloseBrace");
            currentToken = getNextToken();
            parseSL();
        } 
        else if (currentToken.match(endblock)){
         //Do nothing
         }
        else {
            // There is nothing else in the token stream, 
            // and that's cool since E --> digit is valid.
            putMessage("Parse Error Expecting }");
        }


        
        
    }

function parseSL() {
putMessage("Expecting a Statement");
if (currentToken.match(keywords)){
    putMessage("Got Statement");
    parsePS();
    parseSL();
    
 }
else if(currentToken.match(chars)){
  putMessage("Got Statement");
    }
else if(currentToken.match(openbrace)){
  putMessage("Got Statement");
  currentToken = getNextToken();
  parseSL();
    }
 else if(currentToken.match(closebrace)){
  putMessage("Got Statement");
  currentToken = getNextToken();
    }


}

function parsePS() {
if (currentToken.match(/print/)){
    putMessage("Expecting Keyword");
    putMessage("Got keyword print");
    putMessage("Expecting an OpenParen")
    currentToken = getNextToken();
    parsePS();
    }
else if(currentToken.match(openparen)){
    putMessage("Got OpenParen");
    currentToken = getNextToken();
    parseExP();
    putMessage("Expecting a CloseParen");
    if(currentToken.match(closeparen))
    putMessage("Got CloseParen");
    currentToken = getNextToken();
  }
}

function parseExP(){
putMessage("Expecting an Expression");
if (currentToken.match(digits)){
    putMessage("Expecting a Digit");
    putMessage("Got a Digit");
    currentToken = getNextToken();
    parseIntExP();
    }
else if(currentToken.match(openq)){
putMessage("Expecting an OpenQuote")
currentToken = getNextToken();
parseCharL();
putMessage("Expecting a CloseQuote")
if(currentToken.match(openq)){
  putMessage("Got a CloseQuote");
  currentToken = getNextToken();
}
}
else if(currentToken.match(openparen)){
    putMessage("Got OpenParen");
    currentToken = getNextToken();
    parseExP();
    parseBoolop();
    parseExP();

if(currentToken.match(closeparen)){
  putMessage("Expecting a CloseParen")
  putMessage("Got a CloseParen");
  currentToken = getNextToken();
}

}
else if(currentToken.match(chars)){
  putMessage("Expecting an Identifer")
  putMessage("Got an Identifer");
  currentToken = getNextToken();

}
else{
currentline = getlineNum();
putMessage("Critical Error No Expression on line " + currentline);
//parseBooVal();
}

}

function parseIntExP() {
if (currentToken.match(addition)){
    putMessage("Expecting Operation");
    putMessage("Got Operation");
    currentToken = getNextToken();
    parseExP();
   }

}



    function getNextToken() {
        if (tokenindex < tokenstream.length)
        {
            // If we're not at EOF, then return the next token in the stream and advance the index.
            thisToken = tokenstream[tokenindex];
            putMessage("Current token:" + thisToken);
            tokenindex = tokenindex + 3;
        }
        return thisToken;
        
    }
    
    function getlineNum() {
        if (lineindex < tokenstream.length)
        {
            // If we're not at EOF, then return the next token in the stream and advance the index.
            lineindex = tokenindex - 1;
            linenum = tokenstream[lineindex];
        }
        return linenum;
        
    }




        
        
        
    
        
       
        
    
    
    

