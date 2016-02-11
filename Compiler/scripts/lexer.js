/* lexer.js  */

    function lex()
    {
        // Grab the "raw" source code.
        var sourceCode = document.getElementById("taSourceCode").value;
        // Trim the leading and trailing spaces.
        sourceCode = trim(sourceCode);
        //Declare Tokens as incoming source code
        putMessage("Lex returned [" +sourceCode+ "]");
           
    }

