const getTextHtml = (value: string) => {
  let parser = new DOMParser();
  const doc = parser.parseFromString(value, "text/html");
  const p = doc.getElementsByTagName("p");
  return concatHtmlText(p);
};
const concatHtmlText = (arrayHtml: HTMLCollectionOf<HTMLParagraphElement>) => {
  let result = null;
  if (arrayHtml && arrayHtml.length > 0) {
    result = Array.from(arrayHtml).map((html: any) => html.innerText);
    result = result.join(" ").trim();
  } else result = "";
  return result;
};
export { getTextHtml };
