import Point from '../geometry/point.js';

describe('Point.angle tests', () => {
  it('Should compute -pi/2 when dx is 0 and dy is negative', () => {
    var underTest = new Point(0, -325.3),
      reference = new Point(0, 0);
    expect(underTest.angle(reference)).to.equal(-Math.PI/2);
  });

  it('Should compute pi/2 when dx is 0 and dy is positive', () => {
    var underTest = new Point(0, 325.3),
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).to.equal(Math.PI/2);
  });

  it('Should compute pi when dx is negative and dy is 0', () => {
    var underTest = new Point(-325.3, 0),
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).to.equal(Math.PI);
  });

  it('Should compute 0 when dx is positive and dy is 0', () => {
    var underTest = new Point(325.3, 0),
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).to.equal(0);
  });

  it('Should compute 0 when dx is positive and dy is 0', () => {
    var underTest = new Point(0, 0),
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).to.equal(0);
  });

  it('Should compute -3pi/4 when dx is negative and dx === dy is 0', () => {
    var underTest = new Point(-100, -100),
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).to.equal(-3*Math.PI/4);
  });

  it('Should compute -pi/4 when dx is positive and dx === -dy', () => {
    var underTest = new Point(100, -100),
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).to.equal(-Math.PI/4);
  });

  it('Should compute pi/4 when dx is positive and dx === dy', () => {
    var underTest = new Point(100, 100),
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).to.be.equal(Math.PI/4);
  });

  it('Should compute 3*pi/4 when dx is negative and dx === -dy', () => {
    var underTest = new Point(-100, 100),
    reference = new Point(0, 0);
    expect(underTest.angle(reference)).to.equal(3*Math.PI/4);
  });
});
