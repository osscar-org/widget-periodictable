#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Dou Du.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from traitlets import Unicode, Int, List, Dict 
from ._frontend import module_name, module_version


class PTableWidget(DOMWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('MCPTableModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('MCPTableView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    selected_elements = List([]).tag(sync=True)
    disabled_elements = List([]).tag(sync=True)
    display_names_replacements = Dict({}).tag(sync=True)

