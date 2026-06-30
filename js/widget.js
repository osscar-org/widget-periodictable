import "./widget.css";

// ============================================================
// Element classification data (from ptable_data.js)
// Index = atomic number
// ============================================================
const elementsInfo = [
  null, // index 0, unused
  { sym: "H", cls: "H" },
  { sym: "He", cls: "noble" },
  { sym: "Li", cls: "alkali" },
  { sym: "Be", cls: "alkaline_earth" },
  { sym: "B", cls: "semimetal" },
  { sym: "C", cls: "nonmetal" },
  { sym: "N", cls: "nonmetal" },
  { sym: "O", cls: "nonmetal" },
  { sym: "F", cls: "halogen" },
  { sym: "Ne", cls: "noble" },
  { sym: "Na", cls: "alkali" },
  { sym: "Mg", cls: "alkaline_earth" },
  { sym: "Al", cls: "post_transition" },
  { sym: "Si", cls: "semimetal" },
  { sym: "P", cls: "nonmetal" },
  { sym: "S", cls: "nonmetal" },
  { sym: "Cl", cls: "halogen" },
  { sym: "Ar", cls: "noble" },
  { sym: "K", cls: "alkali" },
  { sym: "Ca", cls: "alkaline_earth" },
  { sym: "Sc", cls: "transition" },
  { sym: "Ti", cls: "transition" },
  { sym: "V", cls: "transition" },
  { sym: "Cr", cls: "transition" },
  { sym: "Mn", cls: "transition" },
  { sym: "Fe", cls: "transition" },
  { sym: "Co", cls: "transition" },
  { sym: "Ni", cls: "transition" },
  { sym: "Cu", cls: "transition" },
  { sym: "Zn", cls: "transition" },
  { sym: "Ga", cls: "post_transition" },
  { sym: "Ge", cls: "semimetal" },
  { sym: "As", cls: "semimetal" },
  { sym: "Se", cls: "nonmetal" },
  { sym: "Br", cls: "halogen" },
  { sym: "Kr", cls: "noble" },
  { sym: "Rb", cls: "alkali" },
  { sym: "Sr", cls: "alkaline_earth" },
  { sym: "Y", cls: "transition" },
  { sym: "Zr", cls: "transition" },
  { sym: "Nb", cls: "transition" },
  { sym: "Mo", cls: "transition" },
  { sym: "Tc", cls: "transition" },
  { sym: "Ru", cls: "transition" },
  { sym: "Rh", cls: "transition" },
  { sym: "Pd", cls: "transition" },
  { sym: "Ag", cls: "transition" },
  { sym: "Cd", cls: "transition" },
  { sym: "In", cls: "post_transition" },
  { sym: "Sn", cls: "post_transition" },
  { sym: "Sb", cls: "semimetal" },
  { sym: "Te", cls: "semimetal" },
  { sym: "I", cls: "halogen" },
  { sym: "Xe", cls: "noble" },
  { sym: "Cs", cls: "alkali" },
  { sym: "Ba", cls: "alkaline_earth" },
  { sym: "La", cls: "lanthanoid" },
  { sym: "Ce", cls: "lanthanoid" },
  { sym: "Pr", cls: "lanthanoid" },
  { sym: "Nd", cls: "lanthanoid" },
  { sym: "Pm", cls: "lanthanoid" },
  { sym: "Sm", cls: "lanthanoid" },
  { sym: "Eu", cls: "lanthanoid" },
  { sym: "Gd", cls: "lanthanoid" },
  { sym: "Tb", cls: "lanthanoid" },
  { sym: "Dy", cls: "lanthanoid" },
  { sym: "Ho", cls: "lanthanoid" },
  { sym: "Er", cls: "lanthanoid" },
  { sym: "Tm", cls: "lanthanoid" },
  { sym: "Yb", cls: "lanthanoid" },
  { sym: "Lu", cls: "lanthanoid" },
  { sym: "Hf", cls: "transition" },
  { sym: "Ta", cls: "transition" },
  { sym: "W", cls: "transition" },
  { sym: "Re", cls: "transition" },
  { sym: "Os", cls: "transition" },
  { sym: "Ir", cls: "transition" },
  { sym: "Pt", cls: "transition" },
  { sym: "Au", cls: "transition" },
  { sym: "Hg", cls: "transition" },
  { sym: "Tl", cls: "post_transition" },
  { sym: "Pb", cls: "post_transition" },
  { sym: "Bi", cls: "post_transition" },
  { sym: "Po", cls: "post_transition" },
  { sym: "At", cls: "halogen" },
  { sym: "Rn", cls: "noble" },
  { sym: "Fr", cls: "alkali" },
  { sym: "Ra", cls: "alkaline_earth" },
  { sym: "Ac", cls: "actinoid" },
  { sym: "Th", cls: "actinoid" },
  { sym: "Pa", cls: "actinoid" },
  { sym: "U", cls: "actinoid" },
  { sym: "Np", cls: "actinoid" },
  { sym: "Pu", cls: "actinoid" },
  { sym: "Am", cls: "actinoid" },
  { sym: "Cm", cls: "actinoid" },
  { sym: "Bk", cls: "actinoid" },
  { sym: "Cf", cls: "actinoid" },
  { sym: "Es", cls: "actinoid" },
  { sym: "Fm", cls: "actinoid" },
  { sym: "Md", cls: "actinoid" },
  { sym: "No", cls: "actinoid" },
  { sym: "Lr", cls: "actinoid" },
  { sym: "Rf", cls: "transition" },
  { sym: "Db", cls: "transition" },
  { sym: "Sg", cls: "transition" },
  { sym: "Bh", cls: "transition" },
  { sym: "Hs", cls: "transition" },
  { sym: "Mt", cls: "X" },
  { sym: "Ds", cls: "X" },
  { sym: "Rg", cls: "X" },
  { sym: "Cn", cls: "X" },
  { sym: "Nh", cls: "X" },
  { sym: "Fl", cls: "X" },
  { sym: "Mc", cls: "X" },
  { sym: "Lv", cls: "X" },
  { sym: "Ts", cls: "X" },
  { sym: "Og", cls: "X" },
];

// ============================================================
// Element class colors (from ptable_data.js)
// ============================================================
const elementClassColors = {
  X: "rgb(220, 220, 220)",
  H: "rgb(220, 105, 105)",
  noble: "rgb(196, 205, 255)",
  alkali: "rgb(209, 146, 146)",
  alkaline_earth: "rgb(209, 189, 146)",
  semimetal: "rgb(189, 214, 163)",
  nonmetal: "rgb(214, 163, 190)",
  halogen: "rgb(210, 214, 163)",
  post_transition: "rgb(163, 178, 214)",
  transition: "rgb(169, 196, 212)",
  lanthanoid: "rgb(237, 184, 255)",
  actinoid: "rgb(191, 150, 255)",
};

// ============================================================
// RGB blending utility (from utils.js)
// Logarithmic blend between two rgb(a) color strings
// ============================================================
function RGB_Log_Blend(p, c0, c1) {
  const i = parseInt,
    r = Math.round,
    P = 1 - p;
  const [a, b, c, d] = c0.split(",");
  const [e, f, g, h] = c1.split(",");
  const x = d || h;
  const j = x
    ? "," +
      (!d
        ? h
        : !h
          ? d
          : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ")")
    : ")";
  return (
    "rgb" +
    (x ? "a(" : "(") +
    r(
      (P * i(a[3] === "a" ? a.slice(5) : a.slice(4)) ** 2 +
        p * i(e[3] === "a" ? e.slice(5) : e.slice(4)) ** 2) **
        0.5,
    ) +
    "," +
    r((P * i(b) ** 2 + p * i(f) ** 2) ** 0.5) +
    "," +
    r((P * i(c) ** 2 + p * i(g) ** 2) ** 0.5) +
    j
  );
}

// ============================================================
// All known element symbols (for validation)
// ============================================================
const allElementSymbols = [];
for (let i = 1; i < elementsInfo.length; i++) {
  allElementSymbols.push(elementsInfo[i].sym);
}

// ============================================================
// Rendering order for proper CSS Grid auto-placement.
// Elements placed into the grid in this order so that main
// body rows fill first, then lanthanides/actinides below.
// ============================================================
const renderOrder = [
  // Main body: periods 1-6 (H through Ba), elements 1-56
  ...Array.from({ length: 56 }, (_, i) => i + 1),
  // Skip lanthanides (57-71), continue with Hf-Ra (72-88)
  ...Array.from({ length: 17 }, (_, i) => i + 72),
  // Skip actinides (89-103), continue with Rf-Og (104-118)
  ...Array.from({ length: 15 }, (_, i) => i + 104),
  // Lanthanides (57-71)
  ...Array.from({ length: 15 }, (_, i) => i + 57),
  // Actinides (89-103)
  ...Array.from({ length: 15 }, (_, i) => i + 89),
];

// ============================================================
// Build the full table HTML and attach event listeners
// ============================================================
function render({ model, el }) {
  // ---- Re-render when model changes ----
  function fullRender() {
    rerender({ el, model });
  }

  model.on("change:selected_elements", fullRender);
  model.on("change:disabled_elements", fullRender);
  model.on("change:display_names_replacements", fullRender);
  model.on("change:unselected_color", fullRender);
  model.on("change:selected_colors", fullRender);
  model.on("change:width", fullRender);
  model.on("change:disabled", fullRender);

  model.on("change:border_color", () => {
    const color = model.get("border_color");
    const entries = el.querySelectorAll(".pt-element");
    for (const entry of entries) {
      entry.style.borderColor = color;
    }
  });

  // Initial render
  fullRender();
}

// ============================================================
// Re-render the entire widget
// ============================================================
function rerender({ el, model }) {
  const selectedElements = model.get("selected_elements");
  const disabledElements = model.get("disabled_elements");
  const disabledColor = model.get("disabled_color");
  const unselectedColor = model.get("unselected_color");
  const selectedColors = model.get("selected_colors");
  const elementWidth = model.get("width");
  const borderColor = model.get("border_color");
  const displayNamesReplacements = model.get("display_names_replacements");
  const states = model.get("states");
  const disabled = model.get("disabled");

  // ---- Clean up selected_elements ----
  const newSelectedElements = {};
  for (const key in selectedElements) {
    newSelectedElements[key] = selectedElements[key];
  }

  const elemKeys = Object.keys(newSelectedElements);
  let changed = false;

  // Remove disabled elements from selection
  for (const de of disabledElements) {
    if (de in newSelectedElements) {
      delete newSelectedElements[de];
      changed = true;
    }
  }

  // Remove unknown elements from selection
  for (const key of elemKeys) {
    if (!allElementSymbols.includes(key)) {
      delete newSelectedElements[key];
      changed = true;
    }
  }

  if (changed) {
    model.set("selected_elements", newSelectedElements);
    model.save_changes();
  }

  // ---- Build the DOM ----
  // Clear existing content
  el.innerHTML = "";

  const container = document.createElement("div");
  container.className = "periodic-table-body";
  container.style.setProperty("--element-box-size", elementWidth);

  // Create all 118 element cells in render order
  for (const num of renderOrder) {
    const info = elementsInfo[num];
    const symbol = info.sym;
    const elClass = info.cls;

    const cell = document.createElement("div");
    cell.className = `pt-element pt-elem-${num}`;

    // Add lanthanide/actinide class for margin spacing
    if (num >= 57 && num <= 71) {
      cell.classList.add("pt-lanthanide");
    } else if (num >= 89 && num <= 103) {
      cell.classList.add("pt-actinide");
    }

    // ---- Determine selection state ----
    const isSelected = symbol in newSelectedElements;
    const isDisabled =
      disabledElements.includes(symbol) || disabled;

    if (isDisabled && !isSelected) {
      cell.classList.add("pt-element-disabled");
    }

    if (isSelected) {
      const state = newSelectedElements[symbol];
      cell.classList.add(`pt-element-state${state}`);
    }

    // ---- Compute background color ----
    // Default unselected_color is '' (empty), meaning: use class-based coloring.
    // If the user sets a non-empty unselected_color, use it uniformly.
    let bgColor;
    if (isSelected) {
      bgColor = selectedColors[newSelectedElements[symbol]] || selectedColors[0];
    } else if (unselectedColor) {
      // User set a custom unselected color — use it uniformly
      bgColor = unselectedColor;
    } else {
      // Default: class-based color blended toward neutral grey
      const classColor = elementClassColors[elClass] || elementClassColors["X"];
      bgColor = RGB_Log_Blend(0.5, classColor, "rgb(220, 220, 220)");
    }
    cell.style.backgroundColor = bgColor;
    cell.style.borderColor = borderColor;

    // ---- Build cell content ----
    // Atomic number
    const numDiv = document.createElement("div");
    numDiv.className = "elem_num";
    numDiv.textContent = num;
    cell.appendChild(numDiv);

    // Symbol (or replacement)
    const symDiv = document.createElement("div");
    symDiv.className = "elem_sym";
    if (symbol in displayNamesReplacements) {
      symDiv.innerHTML = displayNamesReplacements[symbol];
    } else {
      symDiv.textContent = symbol;
    }
    cell.appendChild(symDiv);

    // ---- Click handler (ignore disabled elements) ----
    if (!disabled) {
      cell.addEventListener("click", () => {
        if (disabledElements.includes(symbol)) return;

        const currentList = model.get("selected_elements");
        const newList = {};

        // Copy current selection
        for (const k in currentList) {
          newList[k] = currentList[k];
        }

        if (symbol in newList) {
          // Cycle state: increment or remove
          const currentState = newList[symbol];
          if (currentState < states - 1) {
            newList[symbol] = currentState + 1;
          } else {
            delete newList[symbol];
          }
        } else {
          // Add with state 0
          newList[symbol] = 0;
        }

        model.set("selected_elements", newList);
        model.save_changes();
      });
    }

    container.appendChild(cell);
  }

  el.appendChild(container);
}

export default { render };
