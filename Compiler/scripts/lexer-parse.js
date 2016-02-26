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
        var lexerrors = 0;
        var openq = /\"/; 
        var fail = /fail/; 
        var keywords = /while|if|print|int|string|boolean|true|false/;
        var boolval = /true|false/;
        var chars = /^[a-z]$/;
        var statement = /^[a-z]$|\{|print|int|string|boolean|while|if/;
        var digits = /[0-9]/;
        var equality = /==|!=/;
        var addition = /\+/;
        var assign = /=/;
        var notchar = /=|==|!=|[0-9]|\+|{|}|\(|\)/
        var openbrace = /{/;
        var closebrace = /}/;
        var openparen = /\(/;
        var closeparen = /\)/;
        var eof = /\$/;
        var space = /\s/; //Declared to account for the space token in strings.

    
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
                    putOutput("Lex found Token of kind Character [" + letter + "] on Line " + linenum ); //Outputs token and line number.
                    chartoken = new token(letter, "Character", linenum); //Creates token useing constructor defined earlier. 
                    tokenstream.push(chartoken.val,chartoken.kind,chartoken.line); //Pushes that token's value, kind, and line number to the tokenstream array mentioned earlier.
                }   
             }
         }
         /*These statments all search for a corrosponding match to the RegExs in the language 
         and once a match is made tokenizes that RegEx useing the methods described in the last 7 lines of code*/  
         else if(tokenval.match(keywords)){
         putOutput("Lex found Token of kind Keyword [" + tokenval + "] on Line " + linenum );
         keywordtoken = new token(tokenval, "Keyword", linenum);
         tokenstream.push(keywordtoken.val,keywordtoken.kind,keywordtoken.line);
         }
         else if (tokenval.match(chars) && instring == true){
         putOutput("Lex found Token of kind Character [" + tokenval + "] on Line " + linenum);
         chartoken = new token(tokenval, "Character", linenum);
         tokenstream.push(chartoken.val,chartoken.kind,chartoken.line);
         }
         else if (tokenval.match(chars)){
         putOutput("Lex found Token of kind Identifier [" + tokenval + "] on Line " + linenum);
         idtoken = new token(tokenval, "Identifier", linenum);
         tokenstream.push(idtoken.val,idtoken.kind,idtoken.line);
         }
         else if (tokenval.match(equality)){
         putOutput("Lex found Token of kind Equality [" + tokenval + "] on Line " + linenum);
         equalitytoken = new token(tokenval, "Equality", linenum);
         tokenstream.push(equalitytoken.val,equalitytoken.kind,equalitytoken.line);
         }
         else if (tokenval.match(digits)){
         putOutput("Lex found Token of kind Digit [" + tokenval + "] on Line " + linenum);
         digittoken = new token(tokenval, "Digit", linenum);
         tokenstream.push(digittoken.val,digittoken.kind,digittoken.line);
         }
         else if (tokenval.match(openbrace)){
         putOutput("Lex found Token of kind OpenBlock [" + tokenval + "] on Line " + linenum);
         openblocktoken = new token(tokenval, "OpenBlock", linenum);
         tokenstream.push(openblocktoken.val,openblocktoken.kind,openblocktoken.line);
         }
         else if (tokenval.match(closebrace)){
         putOutput("Lex found Token of kind CloseBlock [" + tokenval + "] on Line " + linenum);
         closeblocktoken = new token(tokenval, "CloseBlock", linenum);
         tokenstream.push(closeblocktoken.val,closeblocktoken.kind,closeblocktoken.line);
         }
         else if (tokenval.match(openparen)){
         putOutput("Lex found Token of kind OpenParen [" + tokenval + "] on Line " + linenum);
         openparentoken = new token(tokenval, "OpenParen", linenum);
         tokenstream.push(openparentoken.val,openparentoken.kind,openparentoken.line);
         }
         else if (tokenval.match(closeparen)){
         putOutput("Lex found Token of kind CloseParen [" + tokenval + "] on Line " + linenum);
         closeparentoken = new token(tokenval, "CloseParen",linenum);
         tokenstream.push(closeparentoken.val,closeparentoken.kind,closeparentoken.line);
         }
         else if (tokenval.match(assign)){
         putOutput("Lex found Token of kind Assign [" + tokenval + "] on Line " + linenum);
         assigntoken = new token(tokenval, "Assign",linenum);
         tokenstream.push(assigntoken.val,assigntoken.kind,assigntoken.line);
         }
         else if (tokenval.match(addition)){
         putOutput("Lex found Token of kind Addition [" + tokenval + "] on Line " + linenum);
         additiontoken = new token(tokenval, "Addition", linenum);
         tokenstream.push(additiontoken.val,additiontoken.kind,additiontoken.line);
         }
         else if (tokenval.match(openq) && quote == 2){ //Looks to see if the quote is a closed quote.
         putOutput("Lex found Token of kind CloseQuote [" + tokenval + "] on Line " + linenum);
         quote = 1; //Once closed quote is found quote is reset to 1 in order to find other possible closed quotes.
         instring = false; //Instring set to false because we are not in a string anymore duh.
         closequotetoken = new token(tokenval, "CloseQuote", linenum);
         tokenstream.push(closequotetoken.val,closequotetoken.kind,closequotetoken.line);

         }
         else if (tokenval.match(openq)){
         putOutput("Lex found Token of kind OpenQuote [" + tokenval + "] on Line " + linenum);
         quote++;//Increases quote by 1 once an open quote is found to indicate we are in a string. 
         instring = true; //If that was not enough the boolean instring is set to true as well.
         openquotetoken = new token(tokenval, "OpenQuote",linenum);
         tokenstream.push(openquotetoken.val,openquotetoken.kind,openquotetoken.line);
         
         }
         else if (tokenval.match(space) && quote == 2){ //Checks for quote to be 2 to insure we are finsihed with the entire string and got all possible space tokens.
         putOutput("Lex found Token of kind Space [" + tokenval + "] on Line " + linenum);
         spacetoken = new token(tokenval, "Space", linenum);
         tokenstream.push(spacetoken.val,spacetoken.kind,spacetoken.line);
         }
         else if (tokenval.match(line)){
         linenum++; //Increase line number by 1 everytime there is a new line.
         }
         else if (tokenval.match(space)){
         //Ignores Space when not in a string.
         }
         else if (tokenval.match(eof)){
         //Recognizes end of file however not a token so dont tokenize.
         putOutput("End Block reached [" + tokenval + "] on Line " + linenum);
         endtoken = new token(tokenval, "EndBlock", linenum);
         tokenstream.push(endtoken.val,endtoken.kind,endtoken.line);
         }
         else
         {
         putOutput("Lex Error [" + tokenval + "] is Not a Valid Token on Line " + linenum); //Throws error with line number if none of the tokens are matched.
         lexerrors++; 
         }
       }
        putOutput("Token Stream [" + tokenstream + "]"); //Ouputs token stream so that I can visualize things this might change depedning if you like it or not.

          
    }



  var lastindex = 0
  var obracecounter = 0;
  var cbracecounter = 0;
  var tokenindex  = 0;
  var lineindex  = 2;

    function parse() {  //Function Parse Program. 
        if (tokenstream[0] == null)//Checks to see if there is any code to be parsed, if not throws Erorr.
        {  
          putOutput("Error Can't Parse You Have No Tokens!");
        }
        
        var lasttoke = getlastindex(); //Grabs last Index in the tokenstream.
        var lastvalue = tokenstream[lasttoke]; //Grabs last value in tokenstream.
        
        if (lexerrors == 0 && !lastvalue.match(eof)){  //Checks if there are any lex errors and if the last value is not an EOF.
                putMessage("Warning You Forgot a $ to end your Program!");  
                tokenstream.push("$","EndBlock","Prevent Break"); //Adds EOF to end of tokenstream.         
                // Grabs the next token in tokenstream.
                currentToken = getNextToken();
                        //Checks to See if we have an OpenBrace and the start of a block statement.
                        if(currentToken.match(openbrace)){
                               putMessage("Parsing [" + currentToken + "]");
                               //Parse will then derives the G(oal) production.
                               parseG();
                                 if (currentToken.match(fail)){  //Checks if token is equal to fail in order to stop parsing.
                                         putOutput("Parsing Stopped");  
                                    
                                 }
                          }
         else{
            currentline = getlineNum(); //Aquires line number.
            putOutput("Cannot Parse Missing an OpenBrace on line " +currentline); //If No open brace is found parse will not begin.
             }
         }

        else if (lexerrors == 0){ //Assumes EOF was included and does same thing as code above except add in EOF. 
             currentToken = getNextToken();
                 if(currentToken.match(openbrace)){
                   putMessage("Parsing [" + currentToken + "]");
                   parseG();
                        if (currentToken.match(fail)){
                            putOutput("Parsing Stopped");
                        }   
                 }  
                       else{
                       currentline = getlineNum();
                       putOutput("Cannot Parse Missing an OpenBrace on line " + currentline);
                           }
        }
        
        else{
         putOutput("Cannot Parse With Lex Errors");
            }

     }
    
    function parseG() { // Parse Goal Function. 
        parseB(); //Calls Parse Block.
        if(currentToken.match(fail)) 
          {
          return; //Returns to previous fucntion in order to stop parsing.
          }
        if (!currentToken.match(statement) && !currentToken.match(eof)){//If no EOF Checks if a statement was made. 
            currentline = getlineNum();
            putOutput("Parse Error Expecting Statement got " +currentToken+ " on line " +currentline);
            currentToken = "fail";
        }
        else if (obracecounter != cbracecounter) //Checks if number of braces is not equal, if so throws error.
        {
         putOutput("Parse Error Braces Not Matching you have " + obracecounter + " Open Brace(s) and " + cbracecounter + " Close Brace(s)!");
         currentToken = "fail"; //Sets token to fail.
        } 
        putMessage("Expecting a $"); //Once Block completes expecting EOF. 
        if (currentToken.match(eof)){//Check for EOF
              putMessage("EOF reached");
             if(tokenindex + 3 < tokenstream.length){ //Once EOF is reached checks for more programs.
                       parse(); //Recalls parse if another program is found.
                       stopsrepeatedOutPutMessage++; //Stops Ouput below from repeating.
                    
             }
             putOutput("Parse Completed No Errors");

        }
        else if(currentToken.match(fail))
        {
          return;
        }
        else 
        {
            putOutput("Parse Expecting $ got " + currentToken); //Outputs error if EOF is current token. 
        }
  }

    function parseB() { //Parse Block function
        putMessage("Expecting an OpenBrace"); 
        if (currentToken.match(openbrace)) { //Looks for { in order to start block
            putMessage("Got an OpenBrace");
            obracecounter++;//Counts Open Brace for every match.
            currentToken = getNextToken(); //Gets next token. 
        }
        else
        {
           //Do nothing.
        }
        parseSL(); //Runs Parse Statement List. 
        if(currentToken.match(fail))
        {
        return;
        }
        putMessage("Expecting a CloseBrace");
        if(currentToken.match(closebrace)){ //Checks if token has reached a closed brace.
                 cbracecounter++;//Counts CloseBrace for ever match.
                 putMessage("Got CloseBrace");
                 currentToken = getNextToken();//Gets next token.
         
         }
     }
 
 function parseSL(){//Parse Statement List
    if (currentToken.match(statement)){//Checks if token matches start of a statment in the grammer. 
        parseS();//Calls Parse Statement.
        parseSL();//Recursivly calls ParseStatement List to check for more statements.
    }
    else{
     //Do nothing if statment list is empty.

     }

 }


function parseS() {
if(currentToken.match(fail)){
return;
}
if (currentToken.match(/print/)){
putMessage("Expecting Print Statement");
parsePS();
parseS();
    
 }
else if(currentToken.match(/int|string|boolean/)){
putMessage("Expecting Type Statement");
parseVD();
parseS();

}
else if(currentToken.match(/while/))
{
putMessage("Expecting While Statement");
parseWhile();
parseS();

}
else if(currentToken.match(/if/))
{
putMessage("Expecting If Statement");
parseIf();
parseS();

}
else if(currentToken.match(chars))
{
putMessage("Got Begining of an Assignment Statement  " + currentToken);
currentToken = getNextToken();
parseAS();
parseS();
}
else if(currentToken.match(openbrace))
{
parseB();
}
else{
         
}

}


function parsePS() {
if (currentToken.match(/print/)){
    putMessage("Got Keyword print");
    putMessage("Expecting an OpenParen")
    currentToken = getNextToken();
    if(currentToken.match(openparen)){
    parsePS();
       }
     else{
        currentline = getlineNum();
        putOutput("Parse Error Need an OpenParen instead got " + currentToken + " on line " + currentline);
        currentToken = "fail";
     }
    }
else if(currentToken.match(openparen)){
    putMessage("Got OpenParen " + currentToken);
    currentToken = getNextToken();
    parseExP();
    if(currentToken.match(fail)){
        return;
    }
    putMessage("Expecting a CloseParen");
    if(currentToken.match(closeparen)){
    putMessage("Got CloseParen " + currentToken);
    currentToken = getNextToken();
     }
    else if(currentToken.match(fail)){
        return;
     }
     else{
        currentline = getlineNum();
        putOutput("Parse Error Need a CloseParen instead got " + currentToken + " on line " + currentline);
        currentToken = "fail";
    }
  }
}

function parseVD(){
parseTY();
putMessage("Expecting Identifer");
if (currentToken.match(chars)){
    putMessage("Got Identifer " + currentToken)
    currentToken = getNextToken();
    parseS();
    }
 else{
        putOutput("Parse Error Need Identifer instead got " + currentToken);
         currentToken = "fail";

 }
}
function parseTY(){
    putMessage("Expecting Name of Type");
if (currentToken.match(/int|string|boolean/)){
    putMessage("Got Type of Name " + currentToken);
    currentToken = getNextToken();
    }
else{
parseS();

}

}
function parseWhile(){
putMessage("Got While Statement");
currentToken = getNextToken();
if(currentToken.match(openparen)){
 parseExP();
 if(currentToken.match(openbrace)){
 parseB();
 }
 else if(currentToken.match(fail)){
    return;
 }
 else{
    putOutput("Parse Error Need OpenBrace got " + currentToken);
    currentToken ="fail";
 }   
}
else if(currentToken.match(boolval)){
parseExP();
if(currentToken.match(openbrace)){
parseB();
}
else if(currentToken.match(fail)){
    return;
 }
else{
    currentline = getlineNum();
    putOutput("Parse Error Need an OpenBrace on " +currentline+ "instead got " + currentToken);
    currentToken ="fail";
}
   }
else
   {
    currentline = getlineNum();
    putOutput("Parse Error Need An OpenParen or BoolVal on " +currentline+ "instead got " + currentToken);
    currentToken = "fail";
   }
}

function parseIf(){
putMessage("Got If Statement");
currentToken = getNextToken();
if(currentToken.match(openparen)){
 parseExP();
 if(currentToken.match(openbrace)){
 parseB();
 }
 else if(currentToken.match(fail)){
    return;
 }
 else{
    putOutput("Parse Error Need OpenBrace got " + currentToken);
    currentToken ="fail";
 }   
}
else if(currentToken.match(boolval)){
parseExP();
if(currentToken.match(openbrace)){
parseB();
}
else if(currentToken.match(fail)){
    return;
 }
else{
    currentline = getlineNum();
    putOutput("Parse Error Need an OpenBrace on " +currentline+ "instead got " + currentToken);
    currentToken ="fail";
}
   }
else
   {
    currentline = getlineNum();
    putOutput("Parse Error Need An OpenParen or BoolVal on " +currentline+ "instead got " + currentToken);
    currentToken = "fail";
   }
}


function parseAS(){
    putMessage("Expecting an Assignment");
    if(currentToken.match(assign)){
       putMessage("Got an Assignment " + currentToken);
       currentToken = getNextToken();
        parseExP();
        }
        else{
        currentline = getlineNum();
        putOutput("Parse Error Need Assignment instead got " +currentToken+ " on line " + currentline);
        currentToken = "fail";

        }
    }

function parseExP(){
putMessage("Expecting an Expression");
if (currentToken.match(digits)){
    putMessage("Got a Digit " + currentToken);
    currentToken = getNextToken();
    parseIntExP();
    }
else if(currentToken.match(openq)){
putMessage("Got an OpenQuote " + currentToken)
currentToken = getNextToken();
parseCharL();
if(currentToken.match(fail)){
        return;
    }
putMessage("Expecting a CloseQuote");
if(currentToken.match(openq)){
  putMessage("Got CloseQuote " +currentToken);
  currentToken = getNextToken();
}
else{
    currentline = getlineNum();
    putOutput("Error Expecting CloseQuote on line " + currentline);
    currentToken = "fail";
    return;
}
}
else if(currentToken.match(openparen)){
    putMessage("Got OpenParen " + currentToken);
    currentToken = getNextToken();
    parseExP();
    parseBoolop();
    if(currentToken.match(fail)){
        return;
    }
    parseExP();

if(currentToken.match(closeparen)){
  putMessage("Expecting a CloseParen");
  putMessage("Got a CloseParen " + currentToken);
  currentToken = getNextToken();
}
else{
    currentline = getlineNum();
    putOutput("Error Expecting CloseParen on line " + currentline);
    return;
}

}
else if(currentToken.match(boolval)){
  putMessage("Got a Boolval " + currentToken);
  currentToken = getNextToken();

}
else if(currentToken.match(chars)){
  putMessage("Got an Identifer " + currentToken);
  currentToken = getNextToken();

}
else{
currentline = getlineNum();
putOutput("Error No Expression on line " + currentline + "instead got " + currentToken);
currentToken = "fail";
}

}

function parseIntExP() {
if (currentToken.match(addition)){
    putMessage("Expecting an Operation");
    putMessage("Got Operation " + currentToken);
    currentToken = getNextToken();
    parseExP();
   }

}

function parseCharL(){
if (currentToken.match(chars)){
    putMessage("Expecting a Character");
    putMessage("Got Character " + currentToken);
    currentToken = getNextToken();
    parseCharL();
   }
else if (currentToken.match(space)){
    putMessage("Expecting a Space");
    putMessage("Got Space " + currentToken);
    currentToken = getNextToken();
    parseCharL();
}
else if (currentToken.match(notchar)){
    currentline = getlineNum();
    putOutput("Error Expecting a Char instead got " + currentToken + " on line " + currentline);
    currentToken = "fail";

}
else{
//Do Nothing
}

}

function parseBoolop(){
if (currentToken.match(fail)){
    return;
}
putMessage("Expecting an Equality");
if (currentToken.match(equality)){
   putMessage("Got Equality " + currentToken);
   currentToken = getNextToken();
}
else{
currentline = getlineNum();
putOutput("Error missing Equality Symbol on line " +currentline+ "instead got " +currentToken);
currentToken = "fail";

}


}

    function getNextToken() {
        if (tokenindex < tokenstream.length)
        {
            // If we're not at EOF, then return the next token in the stream and advance the index.
            thisToken = tokenstream[tokenindex];
            //putMessage("Current token:" + thisToken);
            tokenindex = tokenindex + 3;
            lineindex = lineindex + 3;

        }
        return thisToken;
        
    }
    
    function getlineNum() {
            // If we're not at EOF, then return the next token in the stream and advance the index.
            linenum = tokenstream[lineindex];
         
        return linenum;
        
    }
    

function getlastindex(){
lastindex = tokenstream.length - 3;
return lastindex;
}
        
        
        
    
        
       
        
    
    
    

