# `widget-periodictable`: A Interactive Perodic Table in Jupyter

[![PyPI version](https://badge.fury.io/py/widget-periodictable.svg)](https://badge.fury.io/py/widget-periodictable)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/osscar-org/widget-periodictable/main?urlpath=%2Fvoila%2Frender%2Fexamples%2Fintroduction.ipynb)
[![widget test](https://github.com/osscar-org/widget-periodictable/actions/workflows/widget-test.yml/badge.svg)](https://github.com/osscar-org/widget-periodictable/actions/workflows/widget-test.yml)
[![screenshot comparison](https://github.com/osscar-org/widget-periodictable/actions/workflows/screenshot-comparison.yml/badge.svg)](https://github.com/osscar-org/widget-periodictable/actions/workflows/screenshot-comparison.yml)

![demo](https://raw.githubusercontent.com/osscar-org/widget-periodictable/main/example/demo.gif)

## Installation & usage

```sh
pip install widget-periodictable
```

For usage examples, see `examples/`.

## Development

Install the python code:

```sh
pip install -e .[dev]
```

You then need to install the JavaScript dependencies and run the development server.

```sh
npm install
npm run dev
```

Open the example notebook in JupyterLab, VS Code, or your favorite editor to start developing. Changes made in `js/` will be reflected in the notebook.

### Releasing and publishing a new version

In order to make a new release of the library and publish to PYPI, run

```bash
bumpver update --major/--minor/--patch
```

This will

- update version numbers, make a corresponding `git commit` and a `git tag`;
- push this commit and tag to Github, which triggers the Github Action that makes a new Github Release and publishes the package to PYPI.


### Github workflow testing

[![widget test](https://github.com/osscar-org/widget-periodictable/actions/workflows/widget-test.yml/badge.svg)](https://github.com/osscar-org/widget-periodictable/actions/workflows/widget-test.yml)

If the `widget test` failed, it means there is sometime wrong with the code and the widget is NOT
showing in the test.


[![screenshot comparison](https://github.com/osscar-org/widget-periodictable/actions/workflows/screenshot-comparison.yml/badge.svg)](https://github.com/osscar-org/widget-periodictable/actions/workflows/screenshot-comparison.yml)

If the `widget test` passed but the `screenshot comparsion` failed, it means the appearance of the widget
is different from previous version. One need manually download the artfact from `widget test` and use it 
replace the figure `widget-sample.png` in the `test` folder.

## Acknowledgements

We acknowledge support from the EPFL Open Science Fund via the [OSSCAR](http://www.osscar.org) project.

<img src='https://www.osscar.org/_images/logos.png' width='700'>
