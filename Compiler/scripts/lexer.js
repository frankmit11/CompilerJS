/* lexer.js  */

    function lex()
    {
        // Grab the "raw" source code.
        var sourceCode = document.getElementById("taSourceCode").value;
        // Trim the leading and trailing spaces.
        sourceCode = trim(sourceCode);
        //Declare Tokens as incoming source code
        var tokens = sourceCode.split("");
        //TODO: remove all spaces in the middle; remove line breaks too.
        //var keywords = ["while", "if", "print", "int","string","boolean"];
        //var pattern = /^[a-zA-Z]*$/
        //var pattern = /^[while if]*$/
        var lexem = tokens.length;
        for (var i = 0; i < lexem; i++) {
        var tokenval = tokens[i];
        putMessage("Lex returned [" + tokenval + "]");
           }
    }

