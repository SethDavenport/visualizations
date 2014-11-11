describe 'Point.error tests', ->

  it 'Should type-check constructor arguments', ->
    inject (Circle, Point) ->
      expect -> new Circle 'asd', 0
        .toThrow new TypeError 'center must be a Point, was asd'
      expect -> new Circle(new Point(0, 0), 'fgh')
        .toThrow new TypeError 'radius must be a finite, positive Number, was fgh'
      expect -> new Circle(new Point(0, 0), -1)
        .toThrow new TypeError 'radius must be a finite, positive Number, was -1'
      expect -> new Circle(new Point(0, 0), 0)
        .toThrow new TypeError 'radius must be a finite, positive Number, was 0'
      expect -> new Circle()
        .toThrow new TypeError 'center must be a Point, was undefined'

  it 'Should type-check getNPointsOnPerimeter argument', ->
    inject (Circle, Point) ->
      c = new Circle(new Point(0, 0), 10);
      expect -> c.getNPointsOnPerimeter 'asd'
        .toThrow new TypeError 'n must be a finite, positive Number, was asd'
      expect -> c.getNPointsOnPerimeter()
        .toThrow new TypeError 'n must be a finite, positive Number, was undefined'

  it 'Should type-check getIntersectionPoints argument', ->
    inject (Circle, Point) ->
      c = new Circle(new Point(0, 0), 10);
      expect -> c.getIntersectionPoints 'asd'
        .toThrow new TypeError 'other must be a Circle, was asd'
      expect -> c.getIntersectionPoints()
        .toThrow new TypeError 'other must be a Circle, was undefined'
