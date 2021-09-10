
# widget-periodictable

[![Build](https://github.com/osscar-org/widget-periodictable/actions/workflows/build.yml/badge.svg?branch=develop)](https://github.com/osscar-org/widget-periodictable/actions/workflows/build.yml)
[![PyPI version](https://badge.fury.io/py/widget-periodictable.svg)](https://badge.fury.io/py/widget-periodictable)

A jupyter widget for a interactive periodic table.

![demo](binder/demo.gif)

## Try it with Binder

You can try the interactive periodic table
and check the usage through the Binder link:
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/osscar-org/widget-periodictable/develop?urlpath=%2Fvoila%2Frender%2Fexamples%2Fintroduction.ipynb)

## Installation

You can install using `pip`:

```bash
pip install widget_periodictable
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] widget_periodictable
```

## Development Installation

Create a dev environment:
```bash
conda create -n widget_periodictable-dev -c conda-forge nodejs yarn python jupyterlab
conda activate widget_periodictable-dev
```

Install the python. This will also build the TS package.
```bash
pip install -e ".[test, examples]"
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension develop --overwrite .
yarn run build
```

For classic notebook, you need to run:

```
jupyter nbextension install --sys-prefix --symlink --overwrite --py widget_periodictable
jupyter nbextension enable --sys-prefix --py widget_periodictable
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes
#### Typescript:
If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
yarn run watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:
If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.

## Acknowledgements

We acknowledge support from the EPFL Open Science Fund via the [OSSCAR](http://www.osscar.org) project.

<img src='http://www.osscar.org/wp-content/uploads/2019/03/OSSCAR-logo.png' width='230'>
