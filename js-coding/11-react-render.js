// How does the renderDom function create and append DOM elements based on the dom object structure
const renderDOM = (domStructure, container = null) => {
  // handle text nodes
  if (typeof domStructure === "string" || typeof domStructure === "number") {
    const textNode = document.createTextNode(domStructure);
    if (container) {
      container.appendChild(textNode);
    }
    return textNode;
  }

  // handle null and undefined
  if (!domStructure) return null;

  const { type, props = {}, children = [] } = domStructure;

  // create DOM element
  const element = document.createElement(type);

  // handle props
  Object.entries(props).forEach(([key, val]) => {
    if (key === "style") {
      element.style.cssText = val;
    } else if (key !== "children") {
      element.setAttribute(key, val);
    }
  });

  // handle children
  const childrenArray = Array.isArray(children) ? children : [children];
  childrenArray.forEach((child) => element.appendChild(renderDOM(child)));

  if (container) {
    container.appendChild(element);
  }
  return element;
};
const dom = {
  type: "section",
  props: {
    id: "section-1",
    class: "main-section",
    style: "background-color: whitesmoke; padding: 20px; border-radius: 5px;",
  },
  children: [
    {
      type: "header",
      children: "React component",
      props: {
        style: "font-size: 24px; color: black; text-align: center;",
      },
    },
    {
      type: "article",
      children: [
        {
          type: "h2",
          children: "React DOM render",
          props: { style: "color: black;" },
        },
        {
          type: "p",
          children: "Try youself first then look for solution",
          props: { style: "font-size: 16px; color: grey;" },
        },
      ],
    },
    {
      type: "footer",
      children: "footer",
      props: {
        style: "text-align: center; font-size: 14px; color: black;",
      },
    },
  ],
};
renderDOM(dom, document.getElementById("root"));
