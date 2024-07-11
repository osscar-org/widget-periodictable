import * as _ from 'underscore';
import $ from 'jquery';
import './widget.css';

const elementTable = [
  ['H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
  ['Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
  ['Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
  ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
  ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
  ['Cs', 'Ba', '*', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
  ['Fr', 'Ra', '#', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'],
  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '*', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'],
  ['', '', '#', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr']];

const tableTemplate = _.template(
  '<% for (let elementRow of elementTable) { ' +
  'print("<div class=\'periodic-table-row\'>"); ' +
  'for (let elementName of elementRow) { ' +
  'if ( (elementName === "") || (elementName == "*" ) || (elementName == "#" ) ) { %>' +
  '  <span class="periodic-table-empty noselect" style="width: <%= elementWidth %>; height: <%= elementWidth %>;"><%= elementName %></span>' +
  '<% } else { %>' +
  '  <span class="<% if (disabledElements.includes(elementName)) { print(" periodic-table-disabled"); } else { print(" periodic-table-entry"); }%> ' +
  ' noselect element-<%= elementName %><% if (selectedElements.includes(elementName) && (! disabledElements.includes(elementName)) ) { print(" elementOn"); } %>" ' +
  'style="width: <%= elementWidth %>; height: <%= elementWidth %>; ' +
  'border-color: <% if (disabled) { colors = borderColor.replace(/[^\\d,]/g, "").split(","); ' +
  'red = Math.round(255 - 0.38 * ( 255 - parseInt(colors[0], 10) )); ' +
  'green = Math.round(255 - 0.38 * ( 255 - parseInt(colors[1], 10) )); ' +
  'blue = Math.round(255 - 0.38 * ( 255 - parseInt(colors[2], 10) )); ' +
  'print("rgb(" + red.toString(10) + "," + green.toString(10) + "," + blue.toString(10) + ")"); ' +
  '} else { print(borderColor); } %>; ' +
  'background-color: <% if (disabledElements.includes(elementName)) { color = disabledColor; } ' +
  'else if (selectedElements.includes(elementName)) { ' +
  'i = selectedElements.indexOf(elementName); color = selectedColors[selectedStates[i]]; ' +
  '} else { color = unselectedColor; } ' +
  'if (disabled) { colors = color.replace(/[^\\d,]/g, "").split(","); ' +
  'red = Math.round(255 - 0.38 * ( 255 - parseInt(colors[0], 10) )); ' +
  'green = Math.round(255 - 0.38 * ( 255 - parseInt(colors[1], 10) )); ' +
  'blue = Math.round(255 - 0.38 * ( 255 - parseInt(colors[2], 10) )); ' +
  'print("rgb(" + red.toString(10) + "," + green.toString(10) + "," + blue.toString(10) + ")"); ' +
  '} else { print(color); } %>"' +
  // 'title="state: <% if (selectedElements.includes(elementName)) { i = selectedElements.indexOf(elementName); print(selectedStates[i]);} '+
  // 'else if (disabledElements.includes(elementName)){print("disabled");} else {print("unselected");} %>" ><% '+
  '><% print(displayNamesReplacements[elementName] || elementName); %></span>' +
  '<% } }; print("</div>"); } %>',
);

const elementList = [];
for (const elementRow of elementTable) {
  for (const elementName of elementRow) {
    if (elementName === '' || elementName === '*') {
      continue;
    } else {
      elementList.push(elementName);
    }
  }
}

function render({ model, el }) {
  rerenderScratch({ el, model });

  model.on('change:selected_elements', () => {
    rerenderScratch({ el, model });
  });

  model.on('change:disabled_elements', () => {
    rerenderScratch({ el, model });
  });

  model.on('change:display_names_replacements', () => {
    rerenderScratch({ el, model });
  });

  model.on('change:border_color', () => {
    renderBorder(model.get('border_color'));
  });

  model.on('change:width', () => {
    rerenderScratch({ el, model });
  });

  model.on('change:disabled', () => {
    rerenderScratch({ el, model });
  });
}

function rerenderScratch({ el, model }) {
  //         Re-render full widget when the list of selected elements
  //         changed from python
  const selectedElements = model.get('selected_elements');
  const disabledElements = model.get('disabled_elements');
  const disabledColor = model.get('disabled_color');
  const unselectedColor = model.get('unselected_color');
  const selectedColors = model.get('selected_colors');
  const newSelectedColors = selectedColors.slice();
  const elementWidth = model.get('width');
  const borderColor = model.get('border_color');

  let newSelectedElements = [];
  const newSelectedStates = [];

  if ('Du' in selectedElements) {
    return;
  }

  for (const key in selectedElements) {
    newSelectedElements.push(key);
    newSelectedStates.push(selectedElements[key]);
  }

  if (newSelectedElements.length !== newSelectedStates.length) {
    return;
  }

  //         Here I want to clean up the two elements lists, to avoid
  //         to have unknown elements in the selectedElements, and
  //         to remove disabled Elements from the selectedElements list.
  //         I use s variable to check if anything changed, so I send
  //         back the data to python only if needed

  const selectedElementsLength = newSelectedElements.length;
  //         Remove disabled elements from the selectedElements list
  newSelectedElements = _.difference(newSelectedElements, disabledElements);
  //         Remove unknown elements from the selectedElements list
  newSelectedElements = _.intersection(newSelectedElements, elementList);

  const changed = newSelectedElements.length !== selectedElementsLength;

  //         call the update (to python) only if I actually removed/changed
  //         something
  if (changed) {
    //             Make a copy before setting
    // while (newSelectedElements.length > newSelectedStates.length){
    //   newSelectedStates.push(0);
    // };

    for (const key in selectedElements) {
      if (!newSelectedElements.includes(key)) {
        delete selectedElements[key];
      }
    }

    model.set('selected_elements', selectedElements);
    model.save_changes();
  }

  //         Render the full widget using the template
  el.innerHTML =
    '<div class="periodic-table-body">' +
    tableTemplate({
      elementTable: elementTable,
      displayNamesReplacements: model.get('display_names_replacements'),
      selectedElements: newSelectedElements,
      disabledElements: disabledElements,
      disabledColor: disabledColor,
      unselectedColor: unselectedColor,
      selectedColors: newSelectedColors,
      selectedStates: newSelectedStates,
      elementWidth: elementWidth,
      borderColor: borderColor,
      disabled: model.get('disabled'),
    }) +
    '</div>';

  $(() => {
    $('.periodic-table-entry').on('click', (event) => {
      toggleElement({ el, model, event });
    });
  });
};

function toggleElement({ el, model, event }) {
  const classNames = _.map(event.target.classList, (a) => {
    return a;
  });
  const elementName = _.chain(classNames)
    .filter((a) => {
      return a.startsWith('element-');
    })
    .map((a) => {
      return a.slice('element-'.length);
    })
    .first()
    .value();

  const isOn = _.includes(classNames, 'elementOn');
  const isDisabled = _.includes(classNames, 'periodic-table-disabled');
  // If this button is disabled, do not do anything
  // (Actually, this function should not be triggered if the button
  // is disabled, this is just a safety measure)

  const states = model.get('states');
  const disabled = model.get('disabled');

  if (disabled) {
    return;
  };

  // Check if we understood which element we are
  if (typeof elementName !== 'undefined') {
    const currentList = model.get('selected_elements');
    // NOTE! it is essential to duplicate the list,
    // otherwise the value will not be updated.

    let newList = [];
    const newStatesList = [];

    for (const key in currentList) {
      newList.push(key);
      newStatesList.push(currentList[key]);
    };

    const num = newList.indexOf(elementName);

    if (isOn) {
      // remove the element from the selected_elements

      if (newStatesList[num] < states - 1) {
        newStatesList[num]++;
        currentList[elementName] = newStatesList[num];
      } else {
        newList = _.without(newList, elementName);
        newStatesList.splice(num, 1);
        delete currentList[elementName];
        // Swap CSS state
        event.target.classList.remove('elementOn');
      }
    } else if (!isDisabled) {
      // add the element from the selected_elements
      newList.push(elementName);
      newStatesList.push(0);
      currentList[elementName] = 0;
      // Swap CSS state
      event.target.classList.add('elementOn');
    } else {
      return;
    };

    // Update the model (send back data to python)
    // I have to make some changes, since there is some issue
    // for Dict in Traitlets, which cannot trigger the update
    model.set('selected_elements', { Du: 0 });
    model.set('selected_elements', currentList);
    model.save_changes();
  };
};

function renderBorder(color) {
  const a = document.getElementsByClassName('periodic-table-entry');

  for (let i = 0; i < a.length; i++) {
    a[i].style.border = '1px solid ' + color;
  }
};

export default { render };
