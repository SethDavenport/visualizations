describe 'Point.angle tests', ->
  beforeEach(module 'geometry')

  it('Should compute pi/2 when dx is 0 and dy is negative', inject (Point) ->
    underTest = new Point(0, -325.3);
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).toBe Math.PI/2
  )

  it('Should compute 3pi/2 when dx is 0 and dy is positive', inject (Point) ->
    underTest = new Point(0, 325.3);
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).toBe 3*Math.PI/2
  )

  it('Should compute 0 when dx is negative and dy is 0', inject (Point) ->
    underTest = new Point(-325.3, 0);
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).toBe 0
  )

  it('Should compute pi when dx is positive and dy is 0', inject (Point) ->
    underTest = new Point(325.3, 0);
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).toBe Math.PI
  )

  it('Should compute 0 when dx is positive and dy is 0', inject (Point) ->
    underTest = new Point(0, 0);
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).toBe 0
  )

  it('Should compute pi/4 when dx is negative and dx === dy is 0', inject (Point) ->
    underTest = new Point(-100, -100);
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).toBe Math.PI/4
  )

  it('Should compute 3pi/4 when dx is positive and dx === -dy', inject (Point) ->
    underTest = new Point(100, -100);
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).toBe 3*Math.PI/4
  )

  it('Should compute 5pi/4 when dx is positive and dx === dy', inject (Point) ->
    underTest = new Point(100, 100);
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).toBe 5*Math.PI/4
  )

  it('Should compute 7pi/4 when dx is negative and dx === -dy', inject (Point) ->
    underTest = new Point(-100, 100);
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).toBe 7*Math.PI/4
  )
