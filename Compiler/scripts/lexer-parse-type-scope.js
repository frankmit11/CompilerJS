/* lexer.js  */
//Author: Frank Mitarotonda
//Date: February 16 2016

    var tokenstream = []; //This defined array will store all my created tokens and dynamic scope will let me reference it again in Parse.
    table = [];
    //Constructor that creates token by getting the tokens value and kind.
           function token(value,kind,line)
          {
                this.val=value;
                this.kind=kind;
                this.line=line;

          }
//Declares all Regexs used in our grammer so that they can be matched in Lex and Parse.
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
        var assign = /^=$/;
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
        //putOutput("Token Stream [" + tokenstream + "]"); //Ouputs token stream so that I can visualize things this might change depedning if you like it or not.

          
    }


//Declares Variables to be used when Parsing.
  var concretetree = new Tree();
  var scopevals = [];
  var staticarray = [];
  var valarray = [];
  var abstract = new Tree();
  var word = [];
  var prevscope = [];
  var trees = [];
  var array = [];
  var i = 0;
  trees.push(concretetree);
  haveabool = 0;
  var atrees = [abstract];
  var programcounter = 1;
  var lastindex = 0
  var obracecounter = 0;
  var cbracecounter = 0;
  var tokenindex  = 0;
  var lineindex  = -1; //Set to -1 in order to get linenum. Further explained in getNextToken function. 
  var increase = 0;
  var objarray = [];
  var symbarray = [];
  var boolcheck = [];
  var print = 0;


   function programscope(counter){
   this.level = counter;
   this.symbols = []; 
  } 
   
   function createScope(num){
   scope = new programscope(num);
   }

   function createScopeVal(num){
   scopeval = new programscope(num);
   }
    
    function parse() {  //Function Parse Program.
        t = false;
        programstringCST = 'Program '+programcounter;
        programstringAST = 'Program '+programcounter;
        cst = trees[0];
        ast = atrees[0];
        if (tokenstream[0] == null)//Checks to see if there is any code to be parsed, if not throws Erorr.
        {  
          putOutput("Parse Error Can't Parse You Have No Tokens!");
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
                               putOutput("Parsing Program "+programcounter);
                               putMessage("Parsing [" + currentToken + "]");
                               //Parse will then derives the G(oal) production.
                               //cst.addNode("Program", "branch");
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
                   putOutput("Parsing Program "+programcounter);
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
       cst.addNode(programstringCST, "branch");
       ast.addNode(programstringAST, "branch"); //Not a part of the AST only distinguishes between programs
        parseB(); //Calls Parse Block.
        if(currentToken.match(fail)) 
          {
          return; //Returns to previous fucntion in order to stop parsing.
          }
        if (!currentToken.match(statement) && !currentToken.match(eof)){//If no EOF Checks if a statement was made if not return. 
            currentline = getlineNum();
            putOutput("Parse Error Expecting Statement got " +currentToken+ " on line " +currentline);
            currentToken = "fail";
            return;
        }
        else if (obracecounter != cbracecounter) //Checks if number of braces is not equal, if so throws error.
        {
         putOutput("Parse Error Braces Not Matching you have " + obracecounter + " Open Brace(s) and " + cbracecounter + " Close Brace(s)!");
         currentToken = "fail"; //Sets token to fail.
         return;
        } 
        putMessage("Expecting a $"); //Once Block completes expecting EOF. 
        if (currentToken.match(eof)){//Check for EOF
            cst.addNode("$", "leaf");
            cst.endChildren();
            ast.endChildren();
            t = true;
            //var complete = table.join("\n----------------\n");
            //tableadd(complete);
            //tableadd(table);
            //tableadd(valarray);
            //tableadd(scopevals);
            //tableadd(boolcheck);
            objarray = [];
            putMessage("EOF reached");
            putOutput("Parse Completed No Errors on Program " +programcounter);
             
             if(tokenindex + 3 < tokenstream.length){ //Once EOF is reached checks for more programs.

                       programcounter++;
                       table = new Array();
                       cst.addNode("Building New CST...", "leaf");
                       ast.addNode("Building New AST...", "leaf");
                       parse(); //Recalls parse if another program is found.

                       //stopsrepeatedOutPutMessage++; //Stops Ouput below from repeating.     
             }
             //putOutput("Parse Completed No Errors on Program " +programcounter);

        }
        else if(currentToken.match(fail))
        {
          return;
        }
        else 
        {
            currentline = getlineNum();
            putOutput("Parse Error Expecting $ got " + currentToken+ " on line " +currentline); //Outputs error if EOF is current token. 
        }
        
  }
    function parseB() { //Parse Block function
        putMessage("Expecting an OpenBrace"); 
        if (currentToken.match(openbrace)) { //Looks for { in order to start block
            createScope(increase);
            createScopeVal(increase);
            x = scope.level; 
            objarray.push(x);
            cst.addNode("Block", "branch");
            ast.addNode("Block", "branch");
            cst.addNode("{", "leaf");
            putMessage("Got an OpenBrace");
            obracecounter++;//Counts Open Brace for every match.
            currentToken = getNextToken(); //Gets next token. 
        }
        else
        {
           //Do nothing.
        }
        parseSL(); //Runs Parse Statement List. 
        //tableadd(scope.symbols);
        staticarray.push(scope.symbols);
        scopevals.push(scopeval.symbols);
        if(currentToken.match(fail))
        {
        return;
        }
        putMessage("Expecting a CloseBrace");
        if(currentToken.match(closebrace)){ //Checks if token has reached a closed brace.
              ast.endChildren();
              cst.addNode("}", "leaf");
              cbracecounter++;//Counts CloseBrace for ever match.
              putMessage("Got CloseBrace");
              var checkforscope;
              checkforscope = lookahead();
              if(checkforscope.match(keywords) || checkforscope.match(chars)){
                objarray.push(0);
                createScope(0);
                //xtableadd("Scope "+ scope.level);
              }
              //table = new Array();
              currentToken = getNextToken();//Gets next token.
         }
         cst.endChildren();
        
     }
 
 function parseSL(){//Parse Statement List
    if (currentToken.match(statement)){//Checks if token matches start of a statment in the grammer. 
        parseS();//Calls Parse Statement.
        parseSL();//Recursivly calls ParseStatement List to check for more statements.
        ast.endChildren();
    }
    else{
     //Do nothing if statment list is empty.
     //cst.endChildren();
     cst.endChildren();
     cst.addNode("StatementList", "branch");
     cst.addNode("Epsilon", "leaf");
     }
 }
/*Parse Statement function. Once Detremined a token begins with a statment, looks for a match of that statement 
increments the token and then will run Parse function for said statement. Once that complete Parse Statemet is then recursivly called to 
check for more statements in the program. For Example, looking at the first match if a print is found Parse PrintStatment
will run and once that has finished the recursive call will begin to check for more statements.  
*/ 
function parseS() { //Parse Statement fucntion. 
if(currentToken.match(fail)){
return;
}
if (currentToken.match(/print/)){
cst.addNode("StatementList", "branch");
cst.addNode("Statement", "branch");
cst.addNode("PrintStatment", "branch");
ast.addNode("PrintStatment", "branch"); 
putMessage("Expecting Print Statement");
parsePS(); //Parse Print Statement function.
ast.endChildren();
parseS();
 
 }
else if(currentToken.match(/int|string|boolean/)){
cst.addNode("StatementList", "branch");
cst.addNode("Statement", "branch");
cst.addNode("VarDecl", "branch"); 
ast.addNode("VarDecl", "branch"); 
putMessage("Expecting Type Statement");
parseVD(); //Parse Variable Decleration function.
ast.endChildren();
parseS();

}
else if(currentToken.match(/while/))
{
cst.addNode("StatementList", "branch");
cst.addNode("Statement", "branch");
cst.addNode("WhileStatment", "branch");
ast.addNode("WhileStatment", "branch"); 
putMessage("Expecting While Statement");
parseWhile(); //Parse While function
parseS();

}
else if(currentToken.match(/if/))
{
cst.addNode("StatementList", "branch");
cst.addNode("Statement", "branch");
cst.addNode("IfStatment", "branch"); 
ast.addNode("IfStatment", "branch"); 
putMessage("Expecting If Statement");
parseIf(); //Parse If function 
parseS();

}
else if(currentToken.match(chars))
{
cst.addNode("StatementList", "branch");
cst.addNode("Statement", "branch");
cst.addNode("AssignmentStatment", "branch");
cst.addNode("=", "leaf"); 
ast.addNode("Assign", "branch");
putMessage("Got Begining of an Assignment Statement  " + currentToken);
cst.addNode("Identifer", "branch"); 
cst.addNode("Char", "branch"); 
cst.addNode(currentToken, "leaf");
ast.addNode(currentToken, "leaf");
if (scope.level == 0){

        valarray.push(currentToken);
         }
        if (scope.level > 0){
        scopeval.symbols.push(currentToken);
         }
currentToken = getNextToken();
parseAS(); //Parse Assignment Statement function.
//typeCheck();
//putOutput(array[0]);
ast.endChildren();
parseS();
}
else if(currentToken.match(openbrace))
{
//prevscope.push(table);
increase++;
parseB(); //If an Open Brace is found Block Statment is called.
}
else{
//Do Nothing    
}

}




function parsePS() { //Parse Print Statement function. 
if (currentToken.match(/print/)){ //Matchs Print in print statement.
    cst.addNode("print", "leaf");
    putMessage("Got Keyword print"); 
    putMessage("Expecting an OpenParen")
    currentToken = getNextToken();  
    if(currentToken.match(openparen)){ //After matching Print looks for OpenParen.
    parsePS(); //If found calls Print Statement again if not throws error.
       }
     else{
        currentline = getlineNum();
        putOutput("Parse Error Need an OpenParen instead got " + currentToken + " on line " + currentline); 
        currentToken = "fail";
        }
  }
else if(currentToken.match(openparen)){
    cst.addNode("(", "leaf");
    putMessage("Got OpenParen " + currentToken); //Checks if next token after print is OpenParen.
    currentToken = getNextToken();
    print = 1;
    parseExP(); //If so calls ParseExpression because an expression is expected next.
    print = 0;
    if(currentToken.match(fail)){
        return;
    }
    putMessage("Expecting a CloseParen"); 
    if(currentToken.match(closeparen)){ //Once Expression is finished checks for ClosedParen.
    cst.endChildren();
    cst.endChildren();
    cst.addNode(")", "leaf");
    putMessage("Got CloseParen " + currentToken);
    currentToken = getNextToken();
     }
    else if(currentToken.match(fail)){
        return;
     }
     //If CloseParen not found error is throw.
     else{
        currentline = getlineNum();
        putOutput("Parse Error Need a CloseParen instead got " + currentToken + " on line " + currentline);
        currentToken = "fail";
    }
  }
  //ast.endChildren();
}

function parseVD(){//Parse Variable Decleration fucntion.
cst.addNode("Type", "branch");
parseTY();//Once a Parse Type is matched in ParseStatement runs ParseType function.
putMessage("Expecting Identifer");
cst.addNode("Identifer", "branch");
if (currentToken.match(chars)){ //Looks for identifer after type match.
    currentline = getlineNum();
    if (scope.level == 0){

        symbarray.push(currentToken);
         }
        if (scope.level > 0){
        scope.symbols.push(currentToken);
        //tableadd(currentToken);
         }
    cst.addNode("Char", "branch");
    putMessage("Got Identifer " + currentToken)
    cst.addNode(currentToken, "leaf");
    ast.addNode(currentToken, "leaf");
    currentToken = getNextToken();
    //parseS();
    }
 /*If no identifer is found as next token in the stream error is thrown. 
 Note if entered:
 int 
 x = 5 
 The next token in this stream is an identifer so this error will not run 
 and parser will throw statement error.
 */
 else{ 
        currentline = getlineNum();
        putOutput("Parse Error Need Identifer instead got " + currentToken+ " on line " +currentline);
         currentToken = "fail";

 }
cst.endChildren();
}
function parseTY(){ //Parse Type function
    putMessage("Expecting Name of Type");
if (currentToken.match(/int|string|boolean/)){ //Checks if token matchs one of the following types
    putMessage("Got Type of Name " + currentToken);
    if (scope.level == 0){

        symbarray.push(currentToken);
         }
         if (scope.level > 0){

        scope.symbols.push(currentToken);
        //staticarray.push(scope.symbols);
        //tableadd(currentToken);
        //tableadd(staticarray);
         }
    cst.addNode(currentToken, "leaf");
    ast.addNode(currentToken, "leaf");
    currentToken = getNextToken();
    }
else{
//Do nothing because this funciton will only be reached if currentToken is of type name, as a result this else will never be reached;

}
cst.endChildren();
}
function parseWhile(){ //Parse While function. This funciton runs once currentToken has matched a "while".
cst.addNode("while", "leaf");
putMessage("Got While Statement");
currentToken = getNextToken();
if(currentToken.match(openparen)){ //Check for Open Paren and then run ParseExpression.
 parseExP();//ParseExpression  function.
 if(currentToken.match(openbrace)){ //Once Parens are satisified checks for open brace to begin block. 
 parseB();
 }
 else if(currentToken.match(fail)){
    return;
 }
 //If Open Block is missing an error is thrown.
 else{
    currentline = getlineNum();
    putOutput("Parse Error Need an OpenBrace got " + currentToken+ " on line " +currentline);
    currentToken ="fail";
 }   
}
else if(currentToken.match(boolval)){//Checks for boolval match if boolexpression is not there.
parseExP();
if(currentToken.match(openbrace)){ //If we match a boolval check if an openbrace follows.
parseB();
}
else if(currentToken.match(fail)){
    return;
 }
 //Error is thrown if no openbrace.
else{
    currentline = getlineNum();
    putOutput("Parse Error Need an OpenBrace on line " +currentline+ " instead got " + currentToken);
    currentToken ="fail";
}
   }
   //Error is thrown if proper boolean expression is not reached.
else
   {
    currentline = getlineNum();
    putOutput("Parse Error require a Valid Boolean Expression on line " +currentline+ " instead got " + currentToken);
    currentToken = "fail";
   }
   ast.endChildren();
}

//Runs exactly life Parse While function except only runs when an If begins the statement. 
function parseIf(){
cst.addNode("if", "leaf");
putMessage("Got If Statement");
currentToken = getNextToken();
if(currentToken.match(openparen)){
 parseExP();
 if(currentToken.match(openbrace)){
 increase++;
 parseB();
 }
 else if(currentToken.match(fail)){
    return;
 }
 else{
    currentline = getlineNum();
    putOutput("Parse Error Need an OpenBrace got " + currentToken+ " on line " +currentline);
    currentToken ="fail";
 }   
}
else if(currentToken.match(boolval)){
parseExP();
if(currentToken.match(openbrace)){
increase++;
parseB();
}
else if(currentToken.match(fail)){
    return;
 }
else{
    currentline = getlineNum();
    putOutput("Parse Error Need an OpenBrace on line " +currentline+ " instead got " + currentToken);
    currentToken ="fail";
}
   }
else
   {
    currentline = getlineNum();
   putOutput("Parse Error require a Valid Boolean Expression on line " +currentline+ " instead got " + currentToken);
    currentToken = "fail";
   }
   ast.endChildren();
}


function parseAS(){//Parse Assignment Statement 
    putMessage("Expecting an Assignment");
    if(currentToken.match(assign)){//Checks for assignemnt token following an identifer.
       putMessage("Got an Assignment " + currentToken);  
        currentToken = getNextToken();
        parseExP(); //Calls ParseExp if currentToken is an assignment.
        }
        //Throws an error if an assignment does not follow an identifer.
        else{
        currentline = getlineNum();
        putOutput("Parse Error Need Assignment instead got " +currentToken+ " on line " + currentline);
        currentToken = "fail";

        }
        cst.endChildren();
    }


/*Parse Expression will look at the currentToken and if that token matchs the starting token of a valid expression that specfifc expression 
will begin to be parsed*/

function parseExP(){//Parse Expression function 
cst.addNode("Expr", "branch");
putMessage("Expecting an Expression");
var next = lookahead();
if (currentToken.match(digits) && !next.match(addition)){
       cst.addNode("IntExpr", "branch");
       boolcheck.push(currentToken);
       putMessage("Got a Digit " + currentToken);
       if (scope.level == 0){

        valarray.push(currentToken);
         }
        if (scope.level > 0){
        scopeval.symbols.push(currentToken);
         }
       cst.addNode("Digit", "branch");
       cst.addNode(currentToken, "leaf");
       ast.addNode(currentToken, "leaf");
       currentToken = getNextToken();
       parseIntExP();
}
else if (currentToken.match(digits)){// Matches a digit thats begins an int expression.
    cst.addNode("IntExpr", "branch");
    putMessage("Got a Digit " + currentToken);
    cst.addNode("Digit", "branch");
    cst.addNode(currentToken, "leaf");
    currentToken = getNextToken();
    parseIntExP();//Calls Parse Integer Expression function.
    }
else if(currentToken.match(openq)){
cst.addNode("StringExpr", "branch");
putMessage("Got an OpenQuote " + currentToken)//Matches an OpenQuote that begins a character list.
cst.addNode(currentToken, "leaf");
currentToken = getNextToken();
parseCharL();//Calls Parse Character List function. 
if(currentToken.match(fail)){
        return;
    }
putMessage("Expecting a CloseQuote");//Once Parse Character List finishes looks to match with a close quote.
if(currentToken.match(openq)){
  putMessage("Got CloseQuote " +currentToken);
  boolcheck.push(currentToken);
  if (scope.level == 0){

        valarray.push(currentToken);
         }
        if (scope.level > 0){
        scopeval.symbols.push(currentToken);
         }
  cst.addNode(currentToken, "leaf");
  array.push(currentToken);
  var string = word.join("");
  ast.addNode(string, "leaf");
  word = [];
  currentToken = getNextToken();
}
/*If closequote is not matched throws an error. I dont think this else will ever be reached given the test cases
  I was able to think of however, I do not know what you have in store so just to be safe I put it in.
*/
else{
    currentline = getlineNum();
    putOutput("Parse Error Expecting CloseQuote on line " + currentline);
    currentToken = "fail";
    return;
}
}
else if(currentToken.match(openparen)){ //Looks to match an OpenParen which starts off a boolean expression.
    cst.addNode("BooleanExpr", "branch");
    haveabool = 1;
    putMessage("Got OpenParen " + currentToken);
    cst.addNode("(", "leaf");
    boolcheck.push(currentToken);
    ast.addNode("TestEquality", "branch");
    currentToken = getNextToken();
    parseExP();//Recursivly Calls Parse Exprssion looking for another expression.
    parseBoolop();//Calls Parse Boolean Operation in order to satisfy a boolean expression.
    if(currentToken.match(fail)){
        return;
    }
    parseExP();//Recursivly Calls Parse Expression function in order to satisy boolean expression.

if(currentToken.match(closeparen)){//Looks for CloseParen in order to satisy the boolean expression.
  putMessage("Expecting a CloseParen");
  putMessage("Got a CloseParen " + currentToken);
  if (scope.level == 0){

        valarray.push(currentToken);
         }
        if (scope.level > 0){
        scopeval.symbols.push(currentToken);
        var b = valarray.indexOf(currentToken);
        valarray.splice(b - 1, 1);
        valarray.splice(b - 2, 1);
         }
  cst.addNode(")", "leaf");
  ast.endChildren();
  currentToken = getNextToken();
}
//If close paren is missing throws as error. 
else{
    currentline = getlineNum();
    putOutput("Parse Error Expecting CloseParen on line " + currentline+ " instead got " +currentToken);
    currentToken = "fail";
    return;
}

}
else if(currentToken.match(boolval)){ //Checks if the expression is a boolean expresion that is a boolval.
  cst.addNode("Boolval", "branch");
  putMessage("Got a Boolval " + currentToken);
  boolcheck.push(currentToken);
  if (scope.level == 0){

        valarray.push(currentToken);
         }
        if (scope.level > 0){
        scopeval.symbols.push(currentToken);
         }
  cst.addNode(currentToken, "leaf");
  ast.addNode(currentToken, "leaf");
  currentToken = getNextToken();//If so grab next token and move on.

}
else if(currentToken.match(chars)){//Checks if current token is an identifier.
  boolcheck.push(currentToken);
  if (scope.level == 0 && print == 0){

        valarray.push(currentToken);
         }
        if (scope.level > 0 && print == 0){
        scopeval.symbols.push(currentToken);
         }
  cst.addNode("Identifer", "branch");
  cst.addNode("Char", "branch");
  putMessage("Got an Identifer " + currentToken);
  cst.addNode(currentToken, "leaf");
  ast.addNode(currentToken, "leaf");
  currentToken = getNextToken();//If so grab next token and move on.

}
//If none of these expressions are matched error is thrown.
else{
currentline = getlineNum();
putOutput("Parse Error No Expression on line " + currentline + "instead got " + currentToken);
currentToken = "fail";
}
cst.endChildren();
}

function parseIntExP() {//Parse Integer Expression function.
if (currentToken.match(addition)){//Checks if currentToken matches the only valid operation in the language.  
    cst.addNode("Intop", "branch");
    ast.addNode("Add", "branch");
    var firstnumber = getbehindToken();
    ast.addNode(firstnumber, "leaf");
    putMessage("Expecting an Operation");
    putMessage("Got Operation " + currentToken);
    cst.addNode(currentToken, "leaf");
    currentToken = getNextToken();
    parseExP();//If so calls Parse Expression to look for next expression.
    ast.endChildren();
   }
cst.endChildren();
}

function parseCharL(){//Parse Character List function.
if (currentToken.match(chars)){//Checks if currentToken matchs a character.
    word.push(currentToken);
    cst.addNode("CharList", "branch");
    putMessage("Expecting a Character");
    cst.addNode("Char", "branch");
    putMessage("Got Character " + currentToken);
    cst.addNode(currentToken, "leaf");
    currentToken = getNextToken();
    parseCharL();//If so recursivly calls character list again to search for more characters.
   }
else if (currentToken.match(space)){//Checks if currentToken matchs a space.
    cst.addNode("CharList", "branch");
    putMessage("Expecting a Space");
    cst.addNode("Char", "branch");
    putMessage("Got Space " + currentToken);
    cst.addNode(currentToken, "leaf");
    currentToken = getNextToken();
    parseCharL();//If so recursivly calls character list again to search for more characters.
}
else if (currentToken.match(notchar)){//Checks if there is not a valid char in the list. If so an Error is Thrown.
    currentline = getlineNum();
    putOutput("Parse Error Expecting a Char instead got " + currentToken + " on line " + currentline);
    currentToken = "fail";

}
else{
//Do Nothing
}
cst.endChildren();
}

function parseBoolop(){//Parse Boolean OPeration function 
if (currentToken.match(fail)){
    return;
}
cst.addNode("Boolop", "branch");
putMessage("Expecting an Equality");
if (currentToken.match(equality)){//Once inside a boolean expression that begins with OpenParen looks for equality. 
   putMessage("Got Equality " + currentToken);
   cst.addNode(currentToken, "leaf");
   currentToken = getNextToken();//Gets equality and then moves on to next token.
}
//If equality token is not found an error is thrown.
   else{
currentline = getlineNum();
putOutput("Parse Error missing Equality Symbol on line " +currentline+ " instead got " +currentToken);
currentToken = "fail";

     }
cst.endChildren();
}



    function getNextToken() { //Function gets next token in the stream.
        if (tokenindex < tokenstream.length) //Checks if token index is less than the tokenstream length.
        {
            thisToken = tokenstream[tokenindex]; //If so gets the token at that index.
            tokenindex = tokenindex + 3; //Increases tokenindex by 3 because tokenstream holds 3 values the first being token value.[value,kind,linenum]
            lineindex = lineindex + 3; //Increases line index by 3 however the lineindex is globally already set to -1 so its really going up by 2.
                                       //Thanks to dynamic scope this will change the value of my globally declared lineindex everytime I call this function.

        }
        return thisToken;//Returns the token's value.
        
    }
    
    function getlineNum() { //Function gets linenum of currentToken.  
            linenum = tokenstream[lineindex];//Gets linenumber from tokenstream. 
         
        return linenum;//Returns linenum.
        
    }

function typecheckboolean(){
testequal = [];
for (var e = 0; e < boolcheck.length; e++) {
     var types = boolcheck[e];
     if (types == "("){
   firstval = boolcheck[e+1]
   secondval = boolcheck[e+2]
   testequal.push(firstval);
   testequal.push(secondval);
     }
  var val1 = testequal[0];
  var val2 = testequal[1];
if(val1.match(digits) && val2.match(digits)){
//Do nothing

}
else if(val1 == "\"" && val2 == "\""){
//Do nothing

}
else if (val1.match(boolval) && val2.match(boolval)){

// Do nothing
}
else if(val1 == "(" && val2 == "("){
//Do nothing

}
else if (val1.match(chars) && val2.match(chars)){

// Do nothing
}
else{

putOutput("Type Error: Boolean Expresson requires matching types");
return;

    }

  }
}

function fixarray(){
scopevals.unshift(valarray);
scopevals.splice(-1,1);
for (var q = 0; q < scopevals.length; q++) {
         pos = scopevals[q]
        for (var r = 0; r < pos.length; r++) {
          var oneval = pos[r];
          if(pos[0] == ")"){ 
          //Do nothing             
       }
       else if(oneval == ")" ){
        pos.splice(r - 1, 1);
        pos.splice(r - 2, 1);


       }
     }
   }
}
    

    function type(){
      staticarray.unshift(symbarray);
      staticarray.splice(-1,1);
      tableadd("  Symbol Table");
      tableadd("-----------------");
      for (a = 0; a < staticarray.length; a++) {
         tableadd("Scope "+ a);
         tableadd("----------");
         values = staticarray[a];
         if(staticarray.length == 1 && values.length == 0){

          putOutput("Error: Must Declare Variables");
         

         }
         else if(a > 0 && values.length == 0 ){
         scopechange = staticarray[a-1];
         if(scopechange.length == 0){

          putOutput("Error: Variables in Scope " +a+ " are undeclared");
          return;

         }

         }
         for (var j = 0; j < values.length; j++) {
          types = values[j];
          tableadd(values[j]);
          if(types.match(/int/)){
             i = values[j+1];
             checkmulitple();
             checkintset(); 
             number =  1;
             checkint();
           }
           else if(types.match(/string/)){
             s = values[j+1]; 
             checkmulitple();
             checkstringset();
             number =  2;
             checkstring();
           }
           else if(types.match(/boolean/)){
             b = values[j+1];
             checkmulitple(); 
             checkboolset();
             number =  3;
             checkbool();
           }

                
         }
    }

}

function checkmulitple(){
  var count = 0;
for (var g = 0; g < values.length; g++) {
    var match = values[g];
    if(match == i){
      count++;
     }

     }
     if(count > 1){
      putOutput("Error: Variable " +match+ " has been declared more than once");
      return;
   } 
}




function checkintset(){
for (var t = 0; t < scopevals.length; t++) {
  check = scopevals[t];
if(isInArray(i,check) != true){
   check = scopevals[t+1];
   if(check == null || isInArray(i,check) != true){

   putOutput("Error: The value " +i+ " is not used and values must be declared");
   return;
   }


         }
         

    }
}

function checkstringset(){
for (var u = 0; u < scopevals.length; u++) {
  check2 = scopevals[u];
if(isInArray(s,check2) != true){
   check2 = scopevals[u+1];
   if(check2 == null || isInArray(s,check2) != true){

   putOutput("Error: The value " +s+ " is not used and other values must be declared");
   return;
   }


         }
   }
}

function checkboolset(){
for (var w = 0; w < scopevals.length; w++) {
  check3 = scopevals[w];
if(check3 == null || isInArray(b,check3) != true){
  check3 = scopevals[w+1];
 if(isInArray(b,check3) != true){

   putOutput("Error: The value " +b+ " is not used and other values must be declared");
   return;
   }

       }
   }
}



    function checkint(){
   for (var q = 0; q < scopevals.length; q++) {
         vals = scopevals[q];
        for (var r = 0; r < vals.length; r++) {
          var oneval = vals[r];
          if(oneval.match(chars)){
            var error = staticarray[q];
            if(q == 0 && isInArray(oneval, error) == false){
               putOutput("Decleration Error: " +oneval+ " has not been declared");
               return;

               }
              if(q > 0 && isInArray(oneval, error) == false){
                error = staticarray[q-1];
                 if(isInArray(oneval, error) == false){
                  putOutput("Decleration Error: " +oneval+ " has not been declared in the correct scope");
                  return;
                }


               }
              if(oneval == i){
               putMessage("Variable " +i+ " has been declared");
               var intval = vals[r+1];
               if(intval == null){
                return;
               }
               if(intval.match(digits) && number == 1){

              //Do Nothing
               }
               else{
              putOutput("Type Error: " +i+ " needs to be given valid Integer Value");
              return;

               }


              }
           
         }
       }
     }
   }



   function checkstring(){
   for (var q = 0; q < scopevals.length; q++) {
         vals = scopevals[q]
        for (var r = 0; r < vals.length; r++) {
          var oneval = vals[r];
          if(oneval.match(chars)){
            var error = staticarray[q];
            if(q == 0 && isInArray(oneval, error) == false){
               putOutput("Decleration Error: " +oneval+ " has not been declared");
               return;

               }
              if(q > 0 && isInArray(oneval, error) == false){
                error = staticarray[q-1];
                 if(isInArray(oneval, error) == false){
                  putOutput("Decleration Error: " +oneval+ " has not been declared in the correct scope");
                  return;
                }


               }
              if(oneval == s){
               putMessage("Variable " +s+ " has been declared");
               var stringval = vals[r+1];
               if(stringval == null){
                return;
               }
               if(stringval.match("\"") && number == 2){
              //Do Nothing
               }
               else{
              putOutput("Type Error: " +s+ " needs to be a String");
              return;

               }


              }   
         }
       }
     }
   }




    function checkbool(){
   for (var q = 0; q < scopevals.length; q++) {
         vals = scopevals[q]
        for (var r = 0; r < vals.length; r++) {
          var oneval = vals[r];
          if(oneval.match(chars)){
           var error = staticarray[q];
             if(q == 0 && isInArray(oneval, error) == false){
               putOutput("Decleration Error: " +oneval+ " has not been declared");
               return;

               }
              if(q > 0 && isInArray(oneval, error) == false){
                error = staticarray[q-1];
                 if(isInArray(oneval, error) == false){
                  putOutput("Decleration Error: " +oneval+ " has not been declared in the correct scope");
                  return;
                }


               }
              if(oneval == b){
               putMessage("Variable " +b+ " has been declared");
               var booleanval = vals[r+1];
               if(booleanval == null){
                return;
               }
               if(booleanval.match(boolval) && number == 3){

              //Do Nothing
               }
               else if(booleanval == ")" && number == 3){

              //Do Nothing
               }
               else{
              putOutput("Type Error: " +b+ " needs to be a boolean");

               }


              }   
         }
       }
     }
   }
    

function getlastindex(){ //Gets lastindex of something in the tokenstream.
lastindex = tokenstream.length - 3; //Subtracts length by 3 to get last token value.
return lastindex;//Returns lineindex.
}

 function getbehindToken() { 
            thatToken = tokenstream[tokenindex - 6]; 
           return thatToken;//Returns the token's value.
        
    }

function lookahead() { 
            targetToken = tokenstream[tokenindex]; 
           return targetToken;//Returns the token's value.
        
    }
       
function isInArray(value, array) {
  return array.indexOf(value) > -1;
} 
        
        
    
        
       
        
    
    
    

