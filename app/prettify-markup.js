import { $, prettyPrintOne, markupmin, markup_beauty } from 'shim';

export const SVG_DOCTYPE = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ' +
  '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'

export const HTML5_DOCTYPE = '<!DOCTYPE html>'

export function prettifyMarkup(
  xml:string,
  doctype:string,
  cssdefs:string):string {

  return prettyPrintOne(
    escape(
      indent(
        stripComments(
          injectCssDefs(
            doctype + xml,
            doctype,
            cssdefs)))));
}

function injectCssDefs(
  xml:string,
  doctype:string,
  cssdefs:string):string {

  if (!cssdefs) {
    return xml;
  }

  // Regex with markup? Oh noes!!
  // In this case it's fine because I'm only looking for
  // the first start tag.
  if (SVG_DOCTYPE === doctype) {
    xml = xml.replace(/(<svg.*?>)/i, '$1<defs>' +
      '<style type="text/css"><![CDATA[' +
      cssdefs +
      ']]></style>' +
      '</defs>');
  }
  else if (HTML5_DOCTYPE === doctype) {
    xml = xml.replace(/<head.*?>/i, '$1' +
      '<style type="text/css">' +
      cssdefs +
      '</style>');
  }

  return xml;
}

function stripComments(xml:string):string {
  // Regex with markup? Oh noes!!
  // In this case it's fine because nested XML comments
  // are illegal.
  return xml.replace(/<!--[\s\S]*?-->/g, '');
}

function indent(xml:string):string {
  return markup_beauty({
    source: xml,
    mode: 'beautify'
    });
}

function escape(xml:string):string {
  // Abusing jquery to escape a markup string.
  return $('<div/>').text(xml).html();
}
