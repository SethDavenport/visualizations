describe 'Point.error tests', ->
  beforeEach(module 'geometry')

  it 'Should type-check constructor arguments', ->
    inject (Point) ->
      expect -> new Point 'asd', 0
        .toThrow new TypeError 'x must be a finite Number, was asd'
      expect -> new Point 0, 'fgh'
        .toThrow new TypeError 'y must be a finite Number, was fgh'
      expect -> new Point()
        .toThrow new TypeError 'x must be a finite Number, was undefined'

  it 'Should type-check add argument', ->
    inject (Point) ->
      p = new Point 0, 0;
      expect -> p.add 'asd'
        .toThrow new TypeError 'point must be a Point, was asd'
      expect -> p.add()
        .toThrow new TypeError 'point must be a Point, was undefined'

  it 'Should type-check distance argument', ->
    inject (Point) ->
      p = new Point 0, 0;
      expect -> p.distance 'asd'
        .toThrow new TypeError 'other must be a Point, was asd'
      expect -> p.distance()
        .toThrow new TypeError 'other must be a Point, was undefined'

  it 'Should type-check angle argument', ->
    inject (Point) ->
      p = new Point 0, 0;
      expect -> p.angle 'asd'
        .toThrow new TypeError 'other must be a Point, was asd'
      expect -> p.angle()
        .toThrow new TypeError 'other must be a Point, was undefined'
