===========
SVG Sandbox
===========

`ACE editor <https://github.com/ajaxorg/ace>`_ + `sprintf <http://www.diveintojavascript.com/projects/javascript-sprintf>`_

Simple sandbox for creating SVG images depending on input parameters.

Example
-------

JS:

::

    var p = {
        width: 200,
        height: 200,
        color: '#9c0'
    };
    p.size = p.width/2;
    p.x = (p.width - p.size) / 2;
    p.y = (p.height - p.size) / 2;
    p;

SVG:

::

    <?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
      "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
        width="%(width)f" height="%(height)f">

        <rect fill="%(color)s"
            x="%(x)f"
            y="%(y)f"
            width="%(size)f"
            height="%(size)f"/>
    </svg>

TODO
----

#. Save rendered SVG markup
#. Save images/parameters in localStorage
#. color picker
