/*
    Regular expressions
        can be used in search, replace, split etc 
        RegExp class
            used to build regular expression pattern
        syntax
            /<pattern>/modifier
            or 
            RegExp("pattern", "modifier")
        modifiers
            u can use multiple modifiers
            /i
                case-insensitive search
            /g 
                global match, searches all matches 
            /m 
                multi-line search
            /s 
                allow (.) to match new line characters
            /u 
                switches on unicode pattern matching 
                makes use of property class \p 
                \p
                    takes unicode property or symbol as argument
                    /\p{unicode_property}/
                unicode properties
                    L 
                        letters 
                    N 
                        numbers
                    S 
                        Symbol
                        like symbols, emojis etc
                ex: /\p{S}/gu - searches all symbols
            /y 
                switches on sticky mode 
                when we want the search to begin from certain position
                to start the search from lastIndex specified
        Character classes or metacharacters
            .
                matches any character except a new line (\n or \r)
            \w
                match all word characters (a-z, A-Z, 0-9, and _)
                /\w+/ to search a word
            \W 
                reverse of \w
                it matches all characters other than \w
            \d 
                matches any digit 0-9
            \D 
                matches non-digit characters
            \s 
                matches white space
                space(" "), tab(\t), carriage return(\r) 
                new line(\n), vertical tab(\v), form feed (\f)
            \S 
                reverse of \s 
                matches non-white space characters        
            [] - character sets & range
                character set
                    set of characters you want to match.
                    [abc] matches a, b or c
                range
                    range u want to match
                    [a-c0-3] matches any character in these ranges 
            \m 
                multiline search, searches every line 
                affects the behavior of start ^ and end $
                With the "m" set, ^ and $ also match at the beginning and end of each line.
        quantifiers 
            * 
                0 or more 
            + 
                1 or more 
            ? 
                0 or 1
            {n}
                n times 
            {n1,n2}
                in range of n1-n2 times 
                {1-4} 1 to 4 times
            {n,}
                >=n times
        greedy behaviour 
            /'.+'/g for string "x 'h' 'g' z" is "'h' 'g'"
            it went upto last "'" character
        lazy behaviour
            use of ? makes quantifier lazy
            /'.+?'/g for string "x 'h' 'g' z" is ["'h'", "'g'"]
        Assertions 
            forces RegExp pattern
            Anchors 
                ^ 
                    start of a string.
                $ 
                    end of a string.
            \b - word boundaries
                used match starting or ending or both for a word
                /\btest\b/g matches exact word test 
            lookahead (?=)
                followed by
                /\w+(?=,)/ matches any word followed by ,
            negative lookahead (?!)
                not followed by
                /\w+(?!,)/ matches any word not followed by ,
            lookbehind (?<=)
                preceeded by 
                /(?<=\$)\d+/ matches any number preceeded by $
            negative lookbehind (?<!)
                not preceeded by 
                /\b(?<!\$)\d+\b/ matches any number not preceeded by $
        exec() 
            tests for a match in a string.
            returns array containing the matched text if it finds a match, 
            otherwise it returns null
            syntax: pattern.exec(string)
            when there is a /g modifier it searches first match
            stores next index in lastIndex property
            when we run it again it starts searching from lastIndex
            lastIndex property
                can specify from which index u want to start the search
        match()
            return array containing the matches or null if no match is found.
        matchAll()
            returns an iterator containing the results of matching a string 
            against a string (or a regular expression).
        search()
            matches string or regular expression
            returns index or -1
        split()
            splits a string into an array of substrings.
            can take regular expression as separator.
            string.split(separator, limit)
        replace()
            returns a new string with the value(s) replaced.
            string.replace(searchValue, newValue)
            can take a function which returns new value to replace
        test()
            returns true or false
            syntax: pattern.test(string)
        Capturing groups
            () creates groups
            result will have full match, and each group match
            groups can be access like $0, $1, $2 so on 
            $0 will have entire pattern match
            ex: firstName, surName
                /(\w+), (\w+)/g to swap them 
                str.replace(pattern,'$2 $1') => surName firstName
            named groups 
                we can give names to the groups
                (?<name>)
                ex: firstName, surName
                    /(?<fname>\w+), (?<sname>\w+)/g
                    str.replace(pattern,'$sname $fname')
            ?:
                is used at start to not capturing the group
        Back Reference 
            to access captured group in pattern
            ex: /(\d+)-\1/ => 123-123
                matches where digits before and after '-' are same 
                for named group
                    /(?<num>\d+)-\k<num>/     
*/