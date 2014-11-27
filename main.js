import Controller from 'app/controller';
import viewSourceDirective from 'app/view-source-directive';
import { angular } from 'shim';

// Expose all these non-angular modules to the angular dependency injector.
angular.module('app', [])
  .controller('Controller', Controller)
  .directive('vsViewSource', viewSourceDirective);

angular.bootstrap(document, ['app']);
