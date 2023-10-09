
/********************************************************************************************
This function creates a rectangle from two points: 
users latitude and longitude, and sensors latitude 
and longitude Then it calculates the sides by 
subtracting latitude and latitude and longitude
and longitude that then forms a right triangle
that we can use to calculate diagonal/distance.

p2 is a sensors position and p1 is a users position.

p2 = (x1, y1) = (latitude, longitude) *position of a sensor*
   (p2)---------------|
    |  +              |
    |    +            |
    |      +          |
  h |        +  d     |
    |          +      |
    |            +    |
    |              +  |
    |_______________(p1)-> (x, y) = (latitude, longitude)
            w            *users position*
    
    h is height that is equal to |y-y1|  (absolute value of one points height minus the height of the other point)
    w is width that is equal to  |x-x1|  (same as height but with width)

    now we have formed a right triangle that we can use patagorian therum to get the distance

    w = x-x1
    h = y-y1
    d*d = w*w + h*h
    d = sqrt(  (x-x1) * (x-x1)  +  (y-y1) * (y-y1)  )

    *****************************************************
    In the code bellow i dont take the absolute value    
    when calculating height and width because they are   
    being sqared so if the result was negative sqareing  
    it will just make it positive.                       
    *****************************************************
*******************************************************************************************************/
const calculateDistance = (x, y, x1, y1) => Math.sqrt( (x-x1)*(x-x1) + (y-y1)*(y-y1) );

module.exports = calculateDistance;