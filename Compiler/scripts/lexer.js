/* lexer.js  */

    function lex()
    {
        // Grab the "raw" source code.
        var sourceCode = document.getElementById("taSourceCode").value;
        // Trim the leading and trailing spaces.
        sourceCode = trim(sourceCode);
        //Declare Tokens as incoming source code
        

        var code = sourceCode.split(" ");
        code = [].concat.apply([], code.map(function (v) {
	    return v.split(/(while|if|print|int|string|boolean|true|false|[a-z]|[0-9]|\)|\(|{|}|==|\+|!=)/);
        })).filter(function(v) {
        return v !== "";
        });
        


        var keywords = /while|if|print|int|string|boolean|true|false/;
        var ids = /[a-z]/;
        var digits = /[0-9]/;
        var symbols = /==|\+|\)|\(|=|!=/;
        var openbrace = /{/;
        var closebrace = /}/;
        var tokens = [];
        console.log(code);
        //putMessage("Lex Returned [" + code + "]");
        //TODO: remove all spaces in the middle; remove line breaks too.
     var lexem = code.length;
       for (var i = 0; i < lexem; i++){
         tokenval = code[i];
         if(tokenval.match(keywords)){
         putMessage("Lex found Token of kind Keyword [" + tokenval + "]");
         tokens.push(tokenval)
         }
         else if (tokenval.match(ids)){
         putMessage("Lex found Token of kind Identifier [" + tokenval + "]");
         tokens.push(tokenval)
         }
         else if (tokenval.match(symbols)){
         putMessage("Lex found Token of kind Symbol [" + tokenval + "]");
         tokens.push(tokenval)
         }
         else if (tokenval.match(digits)){
         putMessage("Lex found Token of kind Digit [" + tokenval + "]");
         tokens.push(tokenval)
         }
         else if (tokenval.match(openbrace)){
         putMessage("Lex found Token of kind OpenBlock [" + tokenval + "]");
         tokens.push(tokenval)
         }
         else if (tokenval.match(closebrace)){
         putMessage("Lex found Token of kind CloseBlock [" + tokenval + "]");
         tokens.push(tokenval)
         }
         else{
         putMessage("Lex Error No Valid Tokens");
         }
       }
        putMessage("Token Stream [" + tokens + "]");
        
    }




        
        
        
    
        
       
        
    
    
    

