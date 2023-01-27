/**
 * @param {Element} rootElement
 * @param {string} tagName
 * @return {Array<Element>}
 */
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
  
  const traverse = (elem, tagName) => {
    if(!elem) return;
  
    return [...(elem.tagName === tagName ? [elem] : []), ...Array.from(elem.children).reduce((acc, child) => {
      const trav = traverse(child, tagName);
      return (trav?.length) ? acc.concat(trav) : acc;
    }, [])];
  }
  export default function getElementsByTagName(rootElement, tagNameParam) {
    const tagName = tagNameParam.toUpperCase();
    return !rootElement?.children?.length ? [] : Array.from(rootElement.children).reduce((acc, child) => {
      const trav = traverse(child, tagName);
      return (trav?.length) ? acc.concat(trav) : acc;
    }, []);
  }
  
  console.log(getElementsByTagName(document.body, 'div'));
  // [div#foo, div#bar] <-- This is an array of elements.