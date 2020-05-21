#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Dou Du.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from traitlets import Unicode, Int, List, Dict, observe, validate, TraitError
from ._frontend import module_name, module_version
from copy import deepcopy

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
    unselected_color = Unicode('pink').tag(sync=True)
    states = Int(1).tag(sync=True)
    selected_states = List([]).tag(sync=True)
    selected_colors = List([]).tag(sync=True)


    def __init__(self, states = 1, disabled_color = 'gray', unselected_color = 'pink', selected_colors = ["#a6cee3", "#b2df8a", "#fdbf6f", "#6a3d9a", "#b15928", "#e31a1c", "#1f78b4", "#33a02c", "#ff7f00", "#cab2d6", "#ffff99"]):
        super(PTableWidget, self).__init__()
        self.states = states
        self.disabled_color = disabled_color
        self.unselected_color = unselected_color
        self.selected_colors = selected_colors

        if len(selected_colors) < states:
            additional_colors = ["#a6cee3", "#b2df8a", "#fdbf6f", "#6a3d9a", "#b15928", "#e31a1c", "#1f78b4", "#33a02c", "#ff7f00", "#cab2d6", "#ffff99"]
            self.selected_colors = selected_colors + additional_colors * (1 + (states - len(selected_colors)) // len(additional_colors))

    def get_elements_by_state(self, state):
        if state >= self.states:
            raise ValueError("The state is larger than the maxmum value.")
        return [element for element, element_state in zip(self.selected_elements, self.selected_states) if element_state==state]

    def set_element_state(self, elementName, state):
        if state < self.states:
            if elementName in self.selected_elements:
                i = self.selected_elements.index(elementName);
                states = deepcopy(self.selected_states);
                states[i] = state;
                self.selected_states = states;
            else:
                self.selected_elements = self.selected_elements + [elementName]
                self.set_element_state(elementName, state)

    @observe('selected_elements')
    def _selected_elements_changed(self, change):
        x = [];
        y = [];
        for i in change["new"]:
            if i in change["old"]:
                x.append(i)
                y.append(self.selected_states[change["old"].index(i)])
            else:
                x.append(i)
                y.append(0)
        self.selected_states = y

    @validate('selected_states')
    def _valid_states(self, proposal):
        if len(proposal['value']) > len(self.selected_elements):
            raise TraitError('The selected_states length is wrong')
        elif len(proposal['value']) < len(self.selected_elements):
            return proposal['value'] + [0 for i in range(len(self.selected_elements)-len(proposal['value']))]
        else:
            return proposal['value']
