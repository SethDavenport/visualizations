define ['prettify', 'markupmin', 'markup_beauty'], (prettify, markupmin, markup_beauty) ->
  class Prettifier
    prettify: (xml) ->
      return prettify @escape @indent @stripComments xml

    stripComments: (xml) ->
      return xml.replace /<!--[\s\S]*?-->/g, ''

    indent: (xml) ->
      return markup_beauty
        source: xml
        mode: 'beautify'

    escape: (xml) ->
      angular.element('<div/>').text(xml).html()

  return new Prettifier();
