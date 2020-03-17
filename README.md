# widget-periodictable

![Build](https://github.com/osscar-org/widget-periodictable/workflows/Build/badge.svg)

A jupyter widget to select chemical elements from the periodic table. This is a update version of the
widget from:

https://github.com/aiidalab/aiidalab-widget-periodictable

,which support both Jupyter notebook and JupyterLab.


![periodic table](./periodictable.png)

## Usage and try it on Binder

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/osscar-org/widget-periodictable/master?urlpath=%2Flab%2Ftree%2Fexamples%2Fintroduction.ipynb)

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
# Acknowlegements

We acknowledge support from:
* EPFL Open Science Fund

<img src='./OSSCAR-logo.png' width='300'>
