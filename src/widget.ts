// Copyright (c) Dou Du
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView, ISerializers
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

import * as _ from 'underscore'; 

// Import the CSS
import '../css/ptable.css'; 

// List of lists of elements, used to render the periodic table
// Only values accepted: 
// - strings (should be valid elements, not checked);
// - empty strings (empty space, nothing rendered);
// - '*' character (printed as a disabled element).
// These assumptions are used both in the generation of the elementList
// and in the template.
var elementTable: string[][] = [
    ["H", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "He"],
    ["Li", "Be", "", "", "", "", "", "", "","", "", "", "B", "C", "N", "O", "F", "Ne"],
    ["Na", "Mg", "", "", "", "", "", "", "","", "", "", "Al", "Si", "P", "S", "Cl", "Ar"],
    ["K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co","Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"],
    ["Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh","Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe"],
    ["Cs", "Ba", "*", "Hf", "Ta", "W", "Re", "Os", "Ir","Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"],
    ["Fr", "Ra", "*", "Rf", "Db", "Sg", "Bh", "Hs", "Mt","Ds", "Rg", "Cn", "Nh", "Fi", "Mc", "Lv", "Ts", "Og"],
    ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", ""],
    ["", "", "*", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu","Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu"],
    ["", "", "*", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am","Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"]    
];

// Flat list of elements, used for validation and cleaning up of the
// selectedElements list.
let elementList: string[] = [];
for (let elementRow of elementTable) {
    for (let elementName of elementRow) {
        if ( (elementName === "") || (elementName == "*" ) ) {
        }
        else {
            elementList.push(elementName);
        }
    }
}

export
class MCPTableModel extends DOMWidgetModel {
  defaults() {
    return {...super.defaults(),
      _model_name: MCPTableModel.model_name, 
      _model_module: MCPTableModel.model_module,
      _model_module_version: MCPTableModel.model_module_version,
      _view_name: MCPTableModel.view_name,
      _view_module: MCPTableModel.view_module,
      _view_module_version: MCPTableModel.view_module_version,
      value : 'Hello World'
    };
  }

  static serializers: ISerializers = {
      ...DOMWidgetModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'MCPTableModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'MCPTableView';   // Set to null if no view
  static view_module = MODULE_NAME;   // Set to null if no view
  static view_module_version = MODULE_VERSION;
}


export
class MCPTableView extends DOMWidgetView {
    // TODO: move template to external file to make it more readable, see
    // http://codebeerstartups.com/2012/12/how-to-improve-templates-in-backbone-js-learning-backbone-js/
    tableTemplate =  _.template( '<% for (let elementRow of elementTable) { print("<div class=\'periodic-table-row\'>"); for (let elementName of elementRow) { if ( (elementName === "") || (elementName == "*" ) ) { %>' + '  <span class="periodic-table-empty noselect"><%= elementName %></span>' + '<% } else { %>' + '  <span class="<% if (disabledElements.includes(elementName)) { print(" periodic-table-disabled"); } else { print(" periodic-table-entry"); }%> noselect element-<%= elementName %><% if (selectedElements.includes(elementName) && (! disabledElements.includes(elementName)) ) { print(" elementOn"); } %>"><% print(displayNamesReplacements[elementName] || elementName); %></span>' + '<% } }; print("</div>"); } %>'); 

    render() {
        // I render the widget
        this.rerenderScratch();
        // I bind on_change events
        this.model.on('change:selected_elements', this.rerenderScratch, this);
        this.model.on('change:disabled_elements', this.rerenderScratch, this);
        this.model.on('change:display_names_replacements', this.rerenderScratch, this);
    } 

    events(): {[e: string]: string} {
        return {"click .periodic-table-entry": "toggleElement"};
}

    toggleElement(event: any) {
        let classNames: object = _.map(event.target.classList, function(a){return a});
        let tempName: string = _.chain(classNames)
            .last()
            .value();
        var elementName = tempName.slice(8);

        var isOn = _.includes(classNames, 'elementOn');
        var isDisabled = _.includes(classNames, "periodic-table-disabled");
        // If this button is disabled, do not do anything
        // (Actually, this function should not be triggered if the button 
        // is disabled, this is just a safety measure)
        if (isDisabled) return;

        // Check if we understood which element we are
        if (typeof elementName !== 'undefined') {
            var currentList = this.model.get('selected_elements');
            // NOTE! it is essential to duplicate the list,
            // otherwise the value will not be updated.
            var newList = currentList.slice();

            if (isOn) {
                // remove the element from the selected_elements
                newList = _.without(newList, elementName);
                // Swap CSS state
                event.target.classList.remove('elementOn');
            } else {
                // add the element from the selected_elements
                newList.push(elementName);
                // Swap CSS state
                event.target.classList.add('elementOn');
            }

            // Update the model (send back data to python)
            this.model.set('selected_elements', newList);
            this.touch();
        }
    }
    
    rerenderScratch() {
//         Re-render full widget when the list of selected elements
//         changed from python
        var selectedElements = this.model.get('selected_elements');
        var disabledElements = this.model.get('disabled_elements');
        var newSelectedElements = selectedElements.slice();

//         Here I want to clean up the two elements lists, to avoid
//         to have unknown elements in the selectedElements, and
//         to remove disabledElements from the selectedElements list.
//         I use s variable to check if anything changed, so I send
//         back the data to python only if needed

        var selectedElementsLength = newSelectedElements.length;
//         Remove disabled elements from the selectedElements list
//         newSelectedElements = _.difference(newSelectedElements, disabledElements);
//         Remove unknown elements from the selectedElements list
//         newSelectedElements = _.intersection(newSelectedElements, elementList);
        var changed = newSelectedElements.length != selectedElementsLength;

//         call the update (to python) only if I actually removed/changed
//         something
        if (changed) {
//             Make a copy before setting
            this.model.set('selected_elements', newSelectedElements);
            this.touch();
        }
        
//         Render the full widget using the template
        this.el.innerHTML = '<div class="periodic-table-body">' +
            this.tableTemplate({
                elementTable: elementTable, 
                displayNamesReplacements: this.model.get('display_names_replacements'),
                selectedElements: newSelectedElements,
                disabledElements: disabledElements
            }) +
            '</div>';
    }

}
