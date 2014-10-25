# It Started with the Mosta Dome...

While on a trip to [Malta](https://www.google.ca/maps/place/Malta/@35.9440174,14.3795242,11z/data=!3m1!4b1!4m2!3m1!1s0x130e45281d8647c5:0xf582d86136be4239) several years ago, I took a look inside a wild and wonderful church to see what is one of the largest domes in Europe.  I was struck by the geometric pattern of the inside of the dome, which I found mesmerizing.

This pattern has apparently wormed its way inside my brain, even showing up in my abstract paintings:

![The Mosta Dome, Malta](img/mosta.jpg)
![Oberon (detail)](img/oberon-detail.jpg)

I wanted to explore further how to manipulate this type of geometry to produce compelling armatures for future paintings.  Of course, constructing geometry this complex with pencil and compass is time-consuming.  I needed a test bed to experiment with the forms and colours prior to committing lots of expensive materials.

# AngularJS + SVG == [Amaazing!](http://rawgit.com/DietCokeOfEvil/visualizations/master/rosette.html)

JavaScript and SVG give me the ability to quickly prototype variations on this pattern, as long as I can crack the geometry.  Angular's data-binding, while a bit slow, makes it easy to express repetitive geometries using a declarative syntax.  What I wanted to do was get some code to generate the pattern seen in the dome as SVG.

## First Attempt

The 'rosette' pattern above can be easily expressed as a set of circles whose centres lie at regular intervals around the perimeter of a 'guide circle'.  The figure below is an SVG render of 32 such overlapping circles, each with partial opacity so the overlapping areas appear as distinct cells in the pattern.

![Rosette as a Set of 32 Overlapping Circles](img/circles.png)

This is cheap to render, and shows the pattern in a basic way quite easily.  However, in order to draw something more like the Mosta dome or painting images above, I need to be able to manipulate the pattern cells individually; this means that I need a way to compute the location of each 3-or-4-sided cell.

## Towards a Cell-Based Render

The first step is to compute the vertices that define each cell.  This can be thought of as computing all the points where the circles intersect each other.

Fortunately the formula for the instersection points of two circles is pretty easy to derive with [some basic algebra](http://mathforum.org/library/drmath/view/51836.html).  I just had to code it up and compute each circle's intersection with the other (n-1) circles.

Having a set of intersection points is all fine and dandy, but I need to identify the subsets of these points that define each cell.  First, this means logically assigning some kind of ordering to the set of points.  I chose to think of the points in terms of a warped grid, in which the points form radials away from the centre of the rosette.  In this way, 'x' can be defined as the radial upon which the point lies, and 'y' can be defined as the distance from the centre.

I can use trigonometry to calculate each vertex's angle and distance with respect to the centre, and then organize the set of vertices according to discrete increments of these two parameters.  The following image shows the same points labeled with their coordinates in this new system.

![10-Sample Rosette as Overlapping Circles with Vertices](img/vertices.png)
![10-Sample Rosette as Overlapping Circles with Labeled Vertices](img/vertices2.png)

Once this is done, it becomes fairly trivial to organize the points into groups and render them as SVG paths, either as polygons or using arc segments with the same radius as the original overlapping circles.  At this point, I can dispense with the circle render completely, since I have a reasonable approximation made up of individual cells.

![10-Sample Rosette as Polygon Cells with Labeled Vertices](img/polygons.png)
![10-Sample Rosette as Arc Cells with Labeled Vertices](img/arcs.png)

## Centroid Central

In the original photograph of the dome, the actual pattern comes about as the arrangement of polygonal inlays to each cell.  So in my code, I need a way to render these as well.  Effectively, this means drawing a smaller version of each cell at the center of each cell.  This means we need to compute the centroid of each cell.  Once again, the formula for this turns out to be fairly simple.

Once this is done, I can draw cell inlays by moving the vertices towards the centroid by an amount of my choosing.

![10-Sample Rosette as Polygon Cells with Centroids](img/centroids.png)
![10-Sample Rosette as Polygon Cells with Inlays](img/inlays.png)

I can even adjust the inlays to be rendered with arcs or bezier curves for a variety of effects:

![10-Sample Rosette as Arc Cells with Inlays](img/inlays-arc.png)
![10-Sample Rosette as Polygon Cells with Bezier Inlays](img/inlays-bezier.png)

## Final Renders

At this point, I have a robust test platform for experimenting with rosette geometry compositions.  You can play with a live version [here](http://rawgit.com/DietCokeOfEvil/visualizations/master/rosette.html).

I certainly have all the tools I need to duplicate the original patterns that inpired this effort:
