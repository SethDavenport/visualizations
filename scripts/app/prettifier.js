import { angular, prettyPrintOne, markupmin, markup_beauty } from 'shim';

class Prettifier {
  prettify(xml:string):string {
    return prettify(escape(indent(stripComment(xml))));
  }

  stripComments(xml:string):string {
    return xml.replace(/<!--[\s\S]*?-->/g, '');
  }

  indent(xml:string):string {
    return markup_beauty({
      source: xml,
      mode: 'beautify'
      });
  }

  escape(xml:string):string {
    return angular.element('<div/>').text(xml).html();
  }
}

export default Prettifier;
