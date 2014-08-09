describe 'Point.error tests', ->
  beforeEach(module 'geometry')

  it 'Should type-check constructor arguments', ->
    inject (Rosette, Circle, Point) ->
      c = new Circle(new Point(0, 0), 5)
      expect -> new Rosette 'asd', 1, 1
        .toThrow new TypeError 'guideCircle must be a Circle, was asd'
      expect -> new Rosette(c, 'fgh', 1)
        .toThrow new TypeError 'radius must be a finite, positive Number, was fgh'
      expect -> new Rosette(c, -1, 1)
        .toThrow new TypeError 'radius must be a finite, positive Number, was -1'
      expect -> new Rosette(c, 0, 1)
        .toThrow new TypeError 'radius must be a finite, positive Number, was 0'
      expect -> new Rosette(c, 1, -1)
        .toThrow new TypeError 'numCircles must be a finite, positive Number, was -1'
      expect -> new Rosette(c, 1, 0)
        .toThrow new TypeError 'numCircles must be a finite, positive Number, was 0'
      expect -> new Rosette()
        .toThrow new TypeError 'guideCircle must be a Circle, was undefined'
