=============
Introduction
=============

.. todo::

    add prose explaining project purpose and usage here

This is a Jupyter extension to create a interactive periodic table widget inside
the notebooks. Users can select elements by clicking on the elements inside the
periodic table. The selected elements can be divided into different states.
Besides, elements can be disabled by calling the Python variable
**disabled_elements** from the widget class.

Traitlets
************

* **selected_element** : The dictionary of the selected elements with their states.
* **states** : The number of states for the periodic table.
* **selected_colors** : The colors of the selected elements.
* **selected_disabled** : The list of the disabled elements.

Acknowledges
*************

This work has been done with the support of the EPFL Open Science Fund **OSSCAR**.

.. image:: images/OSSCAR-logo.png
   :target: http://www.osscar.org
   :width: 200px
