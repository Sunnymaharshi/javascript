/*
    Web Accessibility
        use semantic html tags whenever possible
        color accessible
            make website accessible for colorblind people
            good contrast between colors like background and text color 
            site should look good in grayscale 
            so it will be accessible for all types of colorblind
            icons 
                try to include warning icons for error messages not just red color 
                so it will have meaning in grayscale also
        ARIA attributes - Accessibility Rich Internet Applications
            aria-*
            aria-label
                to give label to any element
                screen readers will read out this name when focused 
                ex: aria-label="home"
            aria-labelledby
                can provide 'id' of element which contains the label value
            aria-expanded
                should have true or false depending on content expanded or not 
                must change attribute value through js 
                usecase: hamburger menu button
            aria-hidden
                hide element to screen readers 
                <label>Your Name<span aria-hidden="true">*</span></label>
                here screen reader won't read * after Your Name
        role
            used to make any element behave like different element
            ex: <a role="button"></a> 
        tabindex 
            tabindex="0"
                to make any element focusable like focus with tab
            tabindex="-1"
                to make any element non focusable
                can be used of hidden modal/popup
            u can give more than 0 value to specify next element to focus
            but mostly it is not recommended
            default focusable and tabbable elements
                form controls, links, and buttons
        Bypass Blocks
            skip links like navigation links
            used to reach main content with fewer tabs 
            hide it & show when user clicks on tab 
            when user clicks on enter it goes to main content
            ex: <a href="#main">Skip to main content</a>
        alt 
            must have alt value for images
            or use aria-label/labelledby
        keyboard focused elements
            u can add outline for all elements when focused 
            so it can highlight focused element
            must remove outline when clicked on element
        inputs 
            add label element for input element
*/