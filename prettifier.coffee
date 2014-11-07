# I'm using some external scripts to handle code indentation
# and beautification.  Let's wrap them in an angular module
# so they can be used cleanly by the rest of the application.
#
# The external scripts in question are
#   http://prettydiff.com/lib/markup_beauty.js
#   https://google-code-prettify.googlecode.com/svn/loader/prettify.js
angular.module 'prettifier', []
  .factory 'prettifier', ->
    class Prettifier
      prettify: (xml) ->
        return window.prettyPrintOne @escape @indent @stripComments xml

      stripComments: (xml) ->
        return xml.replace /<!--[\s\S]*?-->/g, ''

      indent: (xml) ->
        return window.markup_beauty
          source: xml
          mode: 'beautify'

      escape: (xml) ->
        angular.element('<div/>').text(xml).html()

    return new Prettifier()
