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
    disabled_color = Unicode('gray').tag(sync=True)
    states = Int(1).tag(sync=True)
    selected_states = List([]).tag(sync=True)
    selected_colors = List([]).tag(sync=True)

    def __init__(self, states = 1, disabled_color = 'gray', selected_colors = ["#a6cee3", "#b2df8a", "#fdbf6f", "#6a3d9a", "#b15928", "#e31a1c", "#1f78b4", "#33a02c", "#ff7f00", "#cab2d6", "#ffff99"]):
        super(PTableWidget, self).__init__()
        self.states = states
        self.disabled_color = disabled_color
        self.selected_colors = selected_colors

        if len(selected_colors) < states:
            self.selected_colors = selected_colors + ["#a6cee3", "#b2df8a", "#fdbf6f", "#6a3d9a", "#b15928", "#e31a1c", "#1f78b4", "#33a02c", "#ff7f00", "#cab2d6", "#ffff99"]

    def get_elements_by_state(self, state):
        x = [];
        for i, j in enumerate(self.selected_states):
            if j == state:
                x.append(self.selected_elements[i])
        return x
