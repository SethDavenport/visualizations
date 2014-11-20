import { prettifyMarkup } from './prettify-markup';

// Use this directive on a block element, and it will be decorated
// with a little icon in the top-left corner.  Click the icon to get
// an overlay showing the prettified markup source of the element's
// contents.
export default function($window) {
  return {
    restrict: 'A',
    templateUrl: 'templates/view-source-directive.html',
    scope: {
      doctype: '=',
      cssdefs: '='
    },
    transclude: true,
    link: function(scope, element, attrs) {

      scope.showSource = function showSource() {
        var sourceParent = element.find('.vs-transclude');
        var source = sourceParent.html();

        element.find('code').html(
          prettifyMarkup(
            source,
            scope.doctype,
            scope.cssdefs));

        this.srcVisible = true;
      };

      scope.hideSource = function hideSource() {
        this.srcVisible = false;
      };

      scope.selectSource = function selectSource() {
        var selection = $window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element.find('code')[0]);
        selection.removeAllRanges();
        selection.addRange(range);
      };
    }
  }
}
