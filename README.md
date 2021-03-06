# widget-periodictable

![Build](https://github.com/osscar-org/widget-periodictable/workflows/Build/badge.svg?branch=develop)
[![Documentation Status](https://readthedocs.org/projects/widget-periodictable/badge/?version=develop)](https://widget-periodictable.readthedocs.io/en/develop/?badge=develop)



A jupyter widget for a interactive periodic table. This is a update version of the
widget from:

https://github.com/aiidalab/aiidalab-widget-periodictable

,which support both Jupyter notebook and JupyterLab (2.x).

<img src="./periodictable.png" alt="periodic table" width="600"/>

## Usage and try it on Binder

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/osscar-org/widget-periodictable/develop?urlpath=%2Fvoila%2Frender%2Fexamples%2Fintroduction.ipynb)

## Installation

You can install using `pip`:

```bash
pip install widget_periodictable
```

Or if you use jupyterlab:

```bash
pip install widget_periodictable
jupyter lab build
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:

```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] widget_periodictable
```

## Selection and disable

By clicking on the elements, one can select and disable the elements. The selected elements can be divided into different states with custom colors.
One can obtain the element list by state.

```bash
PTable.get_elements_by_state(1)
```

# Acknowledgements

We acknowledge support from the EPFL Open Science Fund via the [OSSCAR](http://www.osscar.org) project.

<img src='http://www.osscar.org/wp-content/uploads/2019/03/OSSCAR-logo.png' width='230'>
