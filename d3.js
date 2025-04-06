/*
D3 
    Data-Driven Documents
    JavaScript library for visualizing data.
    bind data to HTML, SVG, and CSS elements
    then manipulate those elements based on the data.
    SVGs - Scalable Vector Graphics 
        draw shapes with code 
        rectangles, circles, ellipses, lines, texts, paths 
        small file size, does not loose quality if resized
        ex: <svg width="400" height="60">
                <rect x="0" y="0" width="100" height="30" fill="blue"></rect>
            </svg> 
    shapes 
        rect
            draws rectangles
            x, y coordinates and width and height 
            fill 
                fills the rectangle with given color 
            stroke 
                border color 
            stroke-width 
                border width 
            ex: <rect x="0" y="0" width="100" height="30" fill="blue" 
                    stroke="grey" stroke-width="2px">
                </rect>
        circle 
            draws circle
            cx, cy coordinates and r (radius)
            ex: <circle cx="90" cy="30" r="23" fill="orange"></circle>
        ellipse 
            draws ellipse
            cx, cy coordinates and rx, ry (radius)
            ex: <ellipse cx="90" cy="30" rx="23" ry="40" fill="orange"></ellipse>
        line 
            draws line 
            x1,y1,x2,y2 coordinates
            ex: <line x1="1" y1="20" x2="30" y2="10" stroke="blue">
                </line>   
        text 
            draws text 
            x,y coordinates and text-anchor etc 
            text-anchor 
                specifies what position coordinates are for 
                by default, it is start 
                end=> coordinates match top right cornor of text 
            ex: <text x="80" y="10" font-size="20px" fill="orange">Hello
                </text> 
        path 
            can draw line, curves, arcs and other complex paths  
            ex: <path d="M150 5 L75 200 L225 200 Z"></path
    d3 methods
        select()
            select element by tag or id or class
            ex: d3.select('rect')
        selectAll()
            selects all elements that matches
        append()
            add svg onto the selected element
            ex: d3.select('svg').append('rect')
        attr()
            set attributes on svg 
        d3 supports method chaining 
            ex: d3.select('rect').attr('x',20);
    Data loading
        d3.csv()
            returns promise 
            loads csv (comma separated values) file
        d3.tsv()
            returns promise 
            loads tsv (tab separated values) file
        d3.json()
            returns promise 
            loads json file
    d3.min()
        takes array and returns min value 
        takes array and access function for value 
        ex: d3.min(data, d=>d.value)
    d3.max()
        takes array and returns max value
        ex: d3.max(data, d=>d.value)
    d3.extent()
        takes array & returns array with min and max values 
        ex: d3.extent(data, d=>d.value)
    d3.interval()
        similar to JavaScript setInterval 
        runs a function on every interval 
    Scales 
        functions that map input domain to an output range 
        like scaling input values to fit inside SVG canvas 
        domain 
            raw data we want to put into the scale 
        range 
            value we want from the scale 
        linear scale 
            map a continuous, quantitative input domain to a continuous output range 
            using a linear transformation.
            preserves proportional differences
            rgb values are used if colors given in range - for heatmaps
            ex: d3.scaleLinear([10, 130], [0, 960])
            ex: d3.scaleLinear([10, 100], ["brown", "steelblue"]);
            invert()
                used to find the domain value for given range 
                ex: x= d3.scaleLinear([0, 828], [0, 400])
                    x(100) // 48.3
                    x.invert(48.3) // 100
        logarithmic scales 
            used for data that is changing exponentialy 
            log base value is passed 
            ex: d3.scaleLog().domain([300,10000000]).range([0,300]).base(10)
        time scales 
            special type of linear scale 
            takes Javascript date objects in domain 
            ex: d3.scaleTime().domain([new Date(2000,0,1),new Date(2001,0,1)])
                    .range([0,400])
        ordinal scales 
            for assigning color schemes to categorical data 
            maps strings/categories with colors 
            d3 has some default color schemes like d3.schemaCategory10
            ex: d3.scaleOrdinal().domain(["India","Ireland","Greenland"])
                    .range(["red","orange","green"])
        band scales 
            to space out different categories in bar chart 
            padding inner (0-1)
                space btw bars 
            padding outer (0-1)
                space before 1st bar and after last bar 
            ex: d3.scaleBand().domain(["india","africa"]).range([0,100])
                    .paddingInner(0.3).paddingOuter(0.2)
            bandwidth()
                returns width of rectangles
    SVG Groups 
        invisible containers for structuring SVGs 
        have transformations attributes for moving multiple SVGs at once 
        ex: <svg>
                <g transform="translate(200,0)">
                    <rect></rect>
                    <rect></rect>
                </g>
            </svg>
    Margin Conventions 
        1. define margin object with top, right, bottom and left values 
        2. define width and height as inner dimensions of chart 
            width = 800 - margin.left - margin.right 
            height = 500 - margin.top - margin.bottom 
        3. define svg as a G (group element) that translates origin to top-left corner
            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);  
        4. all subsequent code can ignore margins. 
            x_scale = d3.scaleBand().domain(data,d=>d.name).range([0,width])
                    .paddingInner(0.3).paddingOuter(0.2)
            y_scale = d3.scale.linear().domain([0,d3.max(data,d=>d.value)])
                    .range([0, height]); 
    Axis
        axis generators to show scale of chart 
        axis labels to tell about scale 
        axisLeft(), axisTop(), axisBottom(), axisRight()
        ex: leftAxis = d3.axisLeft(y_scale)
            g.append("g").attr("class","left axis").call(leftAxis)
        tickSizeOuter() 
            size for ticks at the edges 
        tickSizeInner()
            size for ticks except at the edges 
        tickSize()
            size for all ticks 
    d3 update pattern 
        data join 
            select all matching elements on screen with selectAll 
            and update the data we are using
            ex: text = svg.selectAll('text').data(data) 
        exit()
            to remove elements that don't exist in our new array of data
            ex: text.exit().remove()
        update
            set attributes for elements on existing elements on screen 
            ex: text.attr("fill","green")
        enter()
            set attributes for new elements in our data array 
            ex: rects.enter().append("text")
                    .attr("x",(d,i)=> i*32)
                    .attr("y",0)
                    .attr("fill","green")
                    .text(d=>d)
    d3 transitions 
        must set before applying the data 
        ex: rect.transition(d3.transition().duration(500))
                .attr("y",d=>y(d.revenue))
    legend 
        a visual key that explains the meaning of different colors, shapes, or patterns
        used in a chart or graph, making it easier for viewers to understand the data.
        can be created with g (group tag) 
    legend group 
        to group multiple legends 
        ex: india red_rect
            china orange_rect etc beside chart 
    Time formating 
        d3.timeFormat(), d3.timeParse() for strings and date object
        takes format as input and returns a function 
    Tooltips 
        on hover we can display some info 
    layouts 
        take in data, add new fields to each item in our data array 
        use these fields to draw our visualizations 
        ex: d3.pie(data) 
        automatically adds padAngle, startAngle, endAngle attributes
    nesting data 
        for easy access of data, we can create new data object 
        with keys as value we are searching 
        ex: d3.nest()
*/
