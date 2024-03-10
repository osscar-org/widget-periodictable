import re


HTML_COLOR_MAP = {
    "white": (255,) * 3,
    "silver": tuple(round(0.75 * i) for i in (255,) * 3),
    "gray": tuple(round(0.5 * i) for i in (255,) * 3),
    "grey": tuple(round(0.5 * i) for i in (255,) * 3),
    "black": (0,) * 3,
    "red": (255, 0, 0),
    "maroon": (round(0.5 * 255), 0, 0),
    "yellow": (255, 255, 0),
    "olive": tuple(round(0.5 * i) for i in (255, 255, 0)),
    "lime": (0, 255, 0),
    "green": (0, round(0.5 * 255), 0),
    "aqua": (0, 255, 255),
    "teal": tuple(round(0.5 * i) for i in (0, 255, 255)),
    "blue": (0, 0, 255),
    "navy": (0, 0, round(0.5 * 255)),
    "fuchsia": (255, 0, 255),
    "purple": tuple(round(0.5 * i) for i in (255, 0, 255)),
    "pink": (255, 192, 203),
}


def color_as_rgb(color: str) -> str:
    """Convert hex and named color to rgb formatting"""
    if not color:
        return ""

    if re.match(r"#[a-fA-F0-9]{6}", color):
        # Hex color
        color = color.lstrip("#")
        color = tuple(int(color[i : i + 2], 16) for i in (0, 2, 4))
    elif re.match(r"rgb\([0-9]+,[0-9]+,[0-9]+\)", color):
        # RGB color
        return color
    else:
        # Color name
        color = HTML_COLOR_MAP.get(color)

    if color is None:
        return ""
    return "".join(f"rgb{color!r}".split(" "))


CHEMICAL_ELEMENTS = [
    "H",
    "He",
    "Li",
    "Be",
    "B",
    "C",
    "N",
    "O",
    "F",
    "Ne",
    "Na",
    "Mg",
    "Al",
    "Si",
    "P",
    "S",
    "Cl",
    "Ar",
    "K",
    "Ca",
    "Sc",
    "Ti",
    "V",
    "Cr",
    "Mn",
    "Fe",
    "Co",
    "Ni",
    "Cu",
    "Zn",
    "Ga",
    "Ge",
    "As",
    "Se",
    "Br",
    "Kr",
    "Rb",
    "Sr",
    "Y",
    "Zr",
    "Nb",
    "Mo",
    "Tc",
    "Ru",
    "Rh",
    "Pd",
    "Ag",
    "Cd",
    "In",
    "Sn",
    "Sb",
    "Te",
    "I",
    "Xe",
    "Cs",
    "Ba",
    "Hf",
    "Ta",
    "W",
    "Re",
    "Os",
    "Ir",
    "Pt",
    "Au",
    "Hg",
    "Tl",
    "Pb",
    "Bi",
    "Po",
    "At",
    "Rn",
    "Fr",
    "Ra",
    "Rf",
    "Db",
    "Sg",
    "Bh",
    "Hs",
    "Mt",
    "Ds",
    "Rg",
    "Cn",
    "Nh",
    "Fi",
    "Mc",
    "Lv",
    "Ts",
    "Og",
    "La",
    "Ce",
    "Pr",
    "Nd",
    "Pm",
    "Sm",
    "Eu",
    "Gd",
    "Tb",
    "Dy",
    "Ho",
    "Er",
    "Tm",
    "Yb",
    "Lu",
    "Ac",
    "Th",
    "Pa",
    "U",
    "Np",
    "Pu",
    "Am",
    "Cm",
    "Bk",
    "Cf",
    "Es",
    "Fm",
    "Md",
    "No",
    "Lr",
]