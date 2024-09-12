# `widget-periodictable`: A Interactive Perodic Table in Jupyter

[![PyPI version](https://badge.fury.io/py/widget-periodictable.svg)](https://badge.fury.io/py/widget-periodictable)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/osscar-org/widget-periodictable/main?urlpath=%2Fvoila%2Frender%2Fexamples%2Fintroduction.ipynb)
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

[![screenshot comparison](https://github.com/osscar-org/widget-periodictable/actions/workflows/screenshot-comparison.yml/badge.svg)](https://github.com/osscar-org/widget-periodictable/actions/workflows/screenshot-comparison.yml)

The `screenshot comparison` test will generate images of the widget using `selenium` and `chrome-driver`, and compares them to the reference image in `test/widget-sample.png`.

To update the reference image: download the generated image from the Github Workflow step called "Upload screenshots".

## How to cite

When using the content of this repository, please cite the following two articles:

1. D. Du, T. J. Baird, S. Bonella and G. Pizzi, OSSCAR, an open platform for collaborative development of computational tools for education in science, *Computer Physics Communications*, **282**, 108546 (2023).
https://doi.org/10.1016/j.cpc.2022.108546

2. D. Du, T. J. Baird, K. Eimre, S. Bonella, G. Pizzi, Jupyter widgets and extensions for education and research in computational physics and chemistry, *Computer Physics Communications*, **305**, 109353 (2024).
https://doi.org/10.1016/j.cpc.2024.109353

## Acknowledgements

We acknowledge support from the EPFL Open Science Fund via the [OSSCAR](http://www.osscar.org) project.

<img src='https://www.osscar.org/_images/logos.png' width='1200'>
