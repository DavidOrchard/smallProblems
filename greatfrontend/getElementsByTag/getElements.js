import './style.css'

/**
 * @param {Element} rootElement
 * @param {string} tagName
 * @return {Array<Element>}
 */
 const document = new DOMParser().parseFromString(
  `<div id="foo">
    <span>Span</span>
    <p>Paragraph</p>
    <div id="bar">Div</div>
  </div>`,
  'text/html',
);

export default function getElementsByTagName(rootElement, tagName) {
  if(!rootElement.childElementCount) return rootElement;
  const children = rootElement.childNodes;
  console.log('children', children);
  for (const node of children) {
    console.log('node', node);
  }

  if (!children?.length) return children;
  return [...children].map((child) => getElementsByTagName(children, tagName));
}

console.log(getElementsByTagName(document.body, 'div'));
// [div#foo, div#bar] <-- This is an array of elements.