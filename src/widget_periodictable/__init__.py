import importlib.metadata
import pathlib

import anywidget
import traitlets
from traitlets import validate, observe, TraitError

from .utils import color_as_rgb, CHEMICAL_ELEMENTS
from copy import deepcopy

try:
    __version__ = importlib.metadata.version("widget_periodictable")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


class PTableWidget(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    _css = pathlib.Path(__file__).parent / "static" / "widget.css"

    selected_elements = traitlets.Dict({}).tag(sync=True)
    disabled_elements = traitlets.List([]).tag(sync=True)
    display_names_replacements = traitlets.Dict({}).tag(sync=True)
    disabled_color = traitlets.Unicode('gray').tag(sync=True)
    unselected_color = traitlets.Unicode('pink').tag(sync=True)
    states = traitlets.Int(1).tag(sync=True)
    selected_colors = traitlets.List([]).tag(sync=True)
    border_color = traitlets.Unicode('#cc7777').tag(sync=True)
    disabled = traitlets.Bool(False, help="Enable or disable user changes.").tag(sync=True)
    width = traitlets.Unicode('38px').tag(sync=True)
    allElements = traitlets.List(CHEMICAL_ELEMENTS).tag(sync=True)

    _STANDARD_COLORS = [
        "#a6cee3",
        "#b2df8a",
        "#fdbf6f",
        "#6a3d9a",
        "#b15928",
        "#e31a1c",
        "#1f78b4",
        "#33a02c",
        "#ff7f00",
        "#cab2d6",
        "#ffff99",
    ]

    def __init__(
        self,
        states=1,
        selected_elements=None,
        disabled_elements=None,
        disabled_color=None,
        unselected_color=None,
        selected_colors=[],
        border_color=None,
        width=None,
        layout=None,
    ):
        super(PTableWidget, self).__init__()
        self.states = states if states else 1
        self.selected_elements = selected_elements if selected_elements else {}
        self.disabled_elements = disabled_elements if disabled_elements else []
        self.disabled_color = disabled_color if disabled_color else 'gray'
        self.unselected_color = unselected_color if unselected_color else 'pink'
        self.selected_colors = (
            selected_colors if selected_colors else self._STANDARD_COLORS
        )
        self.border_color = border_color if border_color else '#cc7777'
        self.width = width if width else '38px'

        if layout is not None:
            self.layout = layout

        if len(selected_colors) < states:
            self.selected_colors = selected_colors + self._STANDARD_COLORS * (
                1 + (states - len(selected_colors)) // len(self._STANDARD_COLORS)
            )
            self.selected_colors = self.selected_colors[:states]

    def set_element_state(self, elementName, state):
        if elementName not in self.allElements:
            raise TraitError('Element not found')
        if state not in range(self.states):
            raise TraitError('State value is wrong')
        x = deepcopy(self.selected_elements)
        x[elementName] = state
        self.selected_elements = x

    @validate('disabled_color', 'unselected_color', 'border_color')
    def _color_change(self, proposal):
        """Convert to rgb(X, Y, Z) type color"""
        return color_as_rgb(proposal['value'])

    @validate('selected_colors')
    def _selectedColors_change(self, proposal):
        """Convert to rgb(X, Y, Z) type color"""
        res = []
        for color in proposal['value']:
            res.append(color_as_rgb(color))
        return res

    @validate('selected_elements')
    def _selectedElements_change(self, proposal):
        for x, y in proposal['value'].items():
            if x not in self.allElements and x != 'Du':
                raise TraitError('Element not found')
            if not isinstance(y, int) or y not in range(self.states):
                raise TraitError('State value is wrong')
        return proposal['value']

    @observe('disabled_elements')
    def _disabledList_change(self, change):
        for i in change['new']:
            if i in self.selected_elements:
                del self.selected_elements[i]

    @observe('states')
    def _states_change(self, change):
        if change['new'] < 1:
            raise TraitError('State value cannot smaller than 1')
        else:
            if len(self.selected_colors) < change["new"]:
                self.selected_colors = self.selected_colors + self._STANDARD_COLORS * (
                    1
                    + (change["new"] - len(self.selected_colors))
                    // len(self._STANDARD_COLORS)
                )
                self.selected_colors = self.selected_colors[: change["new"]]
            elif len(self.selected_colors) > change["new"]:
                self.selected_colors = self.selected_colors[: change["new"]]

    def get_elements_by_state(self, state):
        if state not in range(self.states):
            raise TraitError("State value is wrong")
        else:
            return [
                i for i in self.selected_elements if self.selected_elements[i] == state
            ]
            
