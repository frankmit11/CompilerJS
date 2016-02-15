/* lexer.js  */

    function lex()
    {
        // Grab the "raw" source code.
        var sourceCode = document.getElementById("taSourceCode").value;
        // Trim the leading and trailing spaces.
        sourceCode = trim(sourceCode);
        //Declare Tokens as incoming source code
        

        var code = sourceCode.split("\\s+");
        code = [].concat.apply([], code.map(function (v) {
	    return v.split(/(while|if|print|int|string|boolean|true|\s|false|[a-z]|[0-9]|\)|\(|{|}|==|=|\+|!=)/);
        })).filter(function(v) {
        return v !== "";
        });
        
        //putMessage("Lex Returned[" + code + "]");

 
           function token(value,kind)
          {
                this.val=value;
                this.kind=kind;

          }

        var instring;  
        var quote = 1;  
        var openq = /\"/;
        var linenum = 0;
        var keywords = /while|if|print|int|string|boolean|true|false/;
        var ids = /[a-z]/;
        var digits = /[0-9]/;
        var symbols = /==|\+|\)|\(|=|!=/;
        var space = /\s/;
        var line = /\n/;
        var openbrace = /{/;
        var closebrace = /}/;
        var tokenstream = [];
        console.log(code);
        var lexem = code.length;
        //putMessage("Lex Returned [" + code + "]");
        //TODO: remove all spaces in the middle; remove line breaks too.
       for (var i = 0; i < lexem; i++){
         tokenval = code[i];
         if(tokenval.match(keywords) && instring == true ){
         var x = tokenval.split("");
         for (var j = 0; j < x.length; j++){
         var string = x[j];
         if (string.match(ids)){
         putMessage("Lex found Token of kind Character [" + string + "] on Line " + linenum );
         chartoken = new token(string, "Character");
         tokenstream.push(chartoken.kind);
        }
         }
         //keywordtoken = new token(tokenval, "Keyword");
         //tokenstream.push(keywordtoken.kind);
         }
         else if(tokenval.match(keywords)){
         putMessage("Lex found Token of kind Keyword [" + tokenval + "] on Line " + linenum );
         keywordtoken = new token(tokenval, "Keyword");
         tokenstream.push(keywordtoken.kind);
         }
         else if (tokenval.match(ids) && instring == true){
         putMessage("Lex found Token of kind Character [" + tokenval + "] on Line " + linenum);
         chartoken = new token(tokenval, "Character");
         tokenstream.push(chartoken.kind);
         }
         else if (tokenval.match(ids)){
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
         else if (tokenval.match(openq) && quote == 2){
         putMessage("Lex found Token of kind CloseQuote [" + tokenval + "] on Line " + linenum);
         quote = 1;
         instring = false;
         closequotetoken = new token(tokenval, "CloseQuote");
         tokenstream.push(closequotetoken.kind);

         }
         else if (tokenval.match(openq)){
         putMessage("Lex found Token of kind OpenQuote [" + tokenval + "] on Line " + linenum);
         quote = quote + 1;
         instring = true;
         openquotetoken = new token(tokenval, "OpenQuote");
         tokenstream.push(openquotetoken.kind);
         
         }
         else if (tokenval.match(space) && quote == 2){
         putMessage("Lex found Token of kind Space [" + tokenval + "] on Line " + linenum);
         }
         else if (tokenval.match(line)){
         linenum = linenum + 1;
         }
         else
         {
         putMessage("Lex Error No Valid Tokens on Line " + linenum);
         }
       }
        putMessage("Token Stream [" + tokenstream + "]");

        
     
      
    }




        
        
        
    
        
       
        
    
    
    

