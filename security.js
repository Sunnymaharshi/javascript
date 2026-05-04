/* 
    'use strict';
        usage 
            for total script
                add 'use strict'; at top of script
            for a function
                add 'use strict'; at top of function body
        ES6 modules 
            are automatically in strict mode
            no statement needed to initiate it.
        changes in strict mode 
            converting mistakes into errors (as syntax errors or at runtime)
            simplifying how variable references are resolved
            simplifying eval and arguments
            making it easier to write "secure" JavaScript
            anticipating future ECMAScript evolution.
        examples
            modifying not writable property
                TypeError: cannot assign to read only property 
            forces to declare variable
                x = 1;
                x is not defined 
    
    Authentication
        act of knowing who the current client is 
            human 
                real user 
            device
                mobile or desktop computer
            piece software
                web browser
    login 
        act of identifying a client based on 1 or more secrets and traits
        after login, session is created 
        methods 
            shared secret (not recomended)
            username/password (hash the password)
            One-Time-Password OTP (rely on third party if u can)
            Third-party login
        Session authentication  
            it happens at each HTTP request
            methods 
                Cookies (httpOnly)
                JSON web token or JWT
                Random token (can be signed)
            best practices 
                only do this over HTTPS 
                expire sessions 
                Invalidate sessions
    logout
        closing the session 
        session must be invalidated 
    Authorization
        it happens when a client tries to access a resource
        server ensures the client has the right to access this resource
        this can be done at different levels 
            is the client is authenticated?
            does client has sufficient credentials for this resource? are they admin?
            does the resource contain data the client MUST NOT Know about?
        Content-based Access 
            when fetching a resource, one MUST know if Personal Identifiable Information(PII)
            of an individual can be accessed by this client
    Hashing functions 
        check the secret without knowing it 
        password hashing functions are used to not store password but still check their validity
        returns fixed length string from any string and gaurantee that it is very hard to find 
        two inputs with same output
        use a salt to avoid rainbow table attacks 
        ex: bcrypt package 
    Symmetric cryptography
        single private key known by both parties
        it can be used to cipher and decipher a message 
        quite fast in terms of performance
    Asymmetric cryptography
        secret private key and publicly-known public key 
        private key remains secret and owned by one entity 
        public key can be known by whole world 
        cipher a message with public key, only the owner of private key will be able 
        to decipher it 
        Sign a message with private key. everyone knowing public key will be able to ensure 
        who signed the message 
        RSA is public-key cryptosystem.
    XSS 
        Attacker injects malicious scripts executed in victim's browser.
        Three variants
            Stored (persisted in DB)
            Reflected (URL-based)
            DOM-based (client-side JS manipulations).
        Stored XSS
            Malicious script saved to DB (comments, profiles).
            Executes for every user who views it. 
            requires backend sanitization at both input and output.
            Stored XSS are persistent
            ex:
                storing js code into database via form 
        Reflected XSS 
            when XSS payload is present in an HTTP request to which response is issued 
            containing exploited webpage
            crafting a link or an action that sends a malicious payload that will exploit 
            something in response
            not persistent, only happens when user clicks on link or a button
            examples
                adding js code in url query strings 
                    when url is opened, js code is executed
                adding js code in form input 
                    when form is submitted, code is executed
            fix 
                use libraries that escapes html code
                like < to &lt 
        DOM based XSS 
            when XSS payload is made executable through a DOM change 
            can be persistent or not, may also stored in browser memory
            adding js code in html like onerror event
            Dangerous sinks are JavaScript functions or DOM objects that can execute or render untrusted input as active content (like HTML or scripts)
                ex: innerHTML, eval, document.write(), setAttribute() etc 
            Use trusted types API to block dangerous sinks usage at runtime.
                ex: if (window.trustedTypes) {
                        const policy = trustedTypes.createPolicy('myApp', {
                            createHTML: (dirty) => DOMPurify.sanitize(dirty),
                            createScriptURL: (url) => validateUrl(url),
                        });
                        el.innerHTML = policy.createHTML(userInput); // enforced at runtime
                    }
            vulnerable code
                el.innerHTML = userInput;
                document.write(data);
                eval(userCode);
            safe code 
                el.textContent = userInput;
                el.setAttribute('data', v);
        Self XSS 
            when victim is tricked into running the XSS payload 
            only happens through social engineering

    Content Security Policy
        HTTP header that restricts what resources the browser can load.
        Primary mitigation layer against XSS
        even if injection occurs, scripts can't execute without a valid source.
        ex: Content-Security-Policy:
                default-src 'none';
                script-src 'nonce-{RANDOM}' 'strict-dynamic';
                style-src 'nonce-{RANDOM}' 'self';
                img-src 'self' data: https://cdn.example.com;
                font-src 'self' https://fonts.gstatic.com;
                connect-src 'self' https://api.example.com;
    Trusted Types
        A browser security mechanism that locks down dangerous sinks to prevent DOM-based XSS.
        policies can be created to do something or throw error before certain things run
        like creating htmlElement, running eval, changing source in script tag etc 
        so we can escape html code before they run 
        Trusted Type policies can't be modified after they've been defined 
    Cross-Site Request Forgery (CSRF)
        Attacker tricks a user's browser into making authenticated requests 
        to your site from a malicious origin. 
        Exploits trust the server has in the browser's cookies
        Common methods of attack include:
            Hidden Forms
                An attacker hosts a webpage with a <form> that auto-submits via JavaScript, 
                pointing to the target site (e.g., <form action="https://bank.com/transfer" ...>).
            Malicious link
               If the target action is a GET request, attackers use tags like 
               <img src="https://bank.com/transfer?amount=1000..."> 
               to trigger the request when the page loads.
            iFrame
                A malicious website can contain a hidden <iframe> pointing to the target application
                forcing the user's browser to send requests without the user knowing
        browsers automatically send cookies cross-origin, 
        but Same-Origin Policy blocks cross-origin reads of page content.
        The CSRF token exploits this asymmetry — it lives in the page (HTML or JS-readable cookie), 
        not in a cookie, so the attacker can never obtain it.
        prevent by 
            Synchronizer Token Pattern (CSRF Tokens)
                Server generates token, stores in session
                Embed token in every form or meta tag
                JS reads meta, attaches to every state-mutating request
                Server validates token matches session
            SameSite Cookies
                SameSite=Strict refuses to send the cookie cross-site at all
                which is why modern apps often don't need explicit CSRF tokens anymore.
            Double Submit Cookie
    regular expressions
        bad regular expression will take so much time 
        causing regular expression denial of service
    prototype pollution
        JSON.parse("__proto__:malicious_js_code")
        this will add or remove methods to prototype
        which will cause app to crash
    CORS (cross-origin resource sharing)
        Browser mechanism controlling cross-origin HTTP requests.
        it can expose sensitive APIs to unauthorized origins.
        when origin A is requesting a resource in origin B 
        it is handled by CORS
        1. preflight request (options request) is made to origin B 
            preflight request below tells the server that we want to 
            send a CORS GET request 
            OPTIONS /resource/foo
            Access-Control-Request-Method: GET
            Access-Control-Request-Headers: content-type,x-requested-with
            Origin: https://foo.bar.org
        2. origin B verifies if that call is valid or not 
        3. origin B sends additional headers which will be used in actual call 
            Access-Control-Allow-Origin:* 
                star(*) means any origin can access it 
            Access-Control-Allow-Origin: https://foo.bar.org
            Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
            Access-Control-Allow-Headers: Content-Type, x-requested-with
            Access-Control-Max-Age: 86400
        4. actual request call is made 
        Fixing CORS error 
            we need to set headers in server 
            allow requests from that origin 
*/
