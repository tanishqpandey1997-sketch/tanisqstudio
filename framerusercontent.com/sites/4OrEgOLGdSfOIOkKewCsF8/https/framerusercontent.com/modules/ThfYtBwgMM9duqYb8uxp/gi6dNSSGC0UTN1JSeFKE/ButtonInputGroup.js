import {
    jsx as _jsx,
    jsxs as _jsxs
} from "react/jsx-runtime";
import {
    useState,
    useEffect,
    useCallback,
    useMemo,
    startTransition
} from "react";
import {
    addPropertyControls,
    ControlType
} from "framer";
/**
 * Button Group
 * 
 * A form field component that displays a group of selectable buttons.
 * 
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function ButtonGroup(props) {
    const {
        options,
        multiSelect,
        required,
        layout,
        buttonFont,
        buttonRadius,
        buttonPadding,
        buttonBorder,
        buttonBorderColor,
        buttonBackground,
        selectedBackground,
        selectedTextColor,
        selectedBorderColor,
        name,
        label,
        style,
        onValueChange
    } = props;
    const [selectedValues, setSelectedValues] = useState([]);
    const handleButtonClick = useCallback(value => {
        startTransition(() => {
            if (multiSelect) {
                setSelectedValues(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
            } else {
                setSelectedValues(prev => prev.includes(value) && prev.length === 1 ? [] : [value]);
            }
        });
    }, [multiSelect]);
    useEffect(() => {
        if (onValueChange) {
            onValueChange(multiSelect ? selectedValues : selectedValues[0] || "");
        }
    }, [selectedValues, multiSelect, onValueChange]);
    const containerStyle = useMemo(() => {
        const {
            columns,
            horizontalAlign,
            verticalAlign,
            gapH,
            gapV,
            height
        } = layout;
        return {
            display: "flex",
            flexWrap: "wrap",
            gap: `${gapV}px ${gapH}px`,
            width: "100%",
            justifyContent: horizontalAlign === "start" ? "flex-start" : horizontalAlign === "end" ? "flex-end" : "center",
            alignItems: verticalAlign === "top" ? "flex-start" : verticalAlign === "bottom" ? "flex-end" : "center",
            ...style
        };
    }, [layout, style]);
    const formValue = multiSelect ? selectedValues.join(",") : selectedValues[0] || "";
    return /*#__PURE__*/ _jsxs("div", {
        style: {
            width: "100%"
        },
        children: [label && /*#__PURE__*/ _jsxs("label", {
            style: {
                display: "block",
                marginBottom: "8px",
                color: "#8A8A8A",
                fontSize: "13px",
                fontWeight: 500
            },
            children: [label, required && /*#__PURE__*/ _jsx("span", {
                style: {
                    color: "#FF4A4A"
                },
                children: " *"
            })]
        }), /*#__PURE__*/ _jsx("div", {
            style: containerStyle,
            children: options.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);
                return /*#__PURE__*/ _jsx("button", {
                    type: "button",
                    onClick: () => handleButtonClick(option.value),
                    style: {
                        paddingTop: `${buttonPadding.top}px`,
                        paddingRight: `${buttonPadding.right}px`,
                        paddingBottom: `${buttonPadding.bottom}px`,
                        paddingLeft: `${buttonPadding.left}px`,
                        borderTopLeftRadius: `${buttonRadius.topLeft}px`,
                        borderTopRightRadius: `${buttonRadius.topRight}px`,
                        borderBottomRightRadius: `${buttonRadius.bottomRight}px`,
                        borderBottomLeftRadius: `${buttonRadius.bottomLeft}px`,
                        borderTopWidth: `${buttonBorder.top}px`,
                        borderRightWidth: `${buttonBorder.right}px`,
                        borderBottomWidth: `${buttonBorder.bottom}px`,
                        borderLeftWidth: `${buttonBorder.left}px`,
                        borderStyle: "solid",
                        borderColor: isSelected ? selectedBorderColor : buttonBorderColor,
                        background: isSelected ? selectedBackground : buttonBackground,
                        color: isSelected ? selectedTextColor : "#999999",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        minHeight: "36px",
                        minWidth: "36px",
                        outline: "none",
                        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                        fontSize: "14px",
                        fontWeight: 400,
                        width: "auto",
                        position: "relative",
                        zIndex: isSelected ? 2 : 1,
                        ...buttonFont
                    },
                    "aria-pressed": isSelected,
                    onMouseEnter: e => {
                        e.currentTarget.style.zIndex = "3";
                    },
                    onMouseLeave: e => {
                        e.currentTarget.style.zIndex = isSelected ? "2" : "1";
                    },
                    children: option.label
                }, index);
            })
        }), /*#__PURE__*/ _jsx("input", {
            type: "hidden",
            name: name,
            value: formValue,
            required: required,
            "data-framer-name": name,
            "data-framer-form-input-type": "button-group"
        })]
    });
}
addPropertyControls(ButtonGroup, {
    name: {
        type: ControlType.String,
        title: "Field Name",
        defaultValue: "buttonGroup"
    },
    options: {
        type: ControlType.Array,
        title: "Options",
        control: {
            type: ControlType.Object,
            controls: {
                label: {
                    type: ControlType.String,
                    title: "Label",
                    defaultValue: "Option"
                },
                value: {
                    type: ControlType.String,
                    title: "Value",
                    defaultValue: ""
                }
            }
        },
        defaultValue: [{
            label: "Option 1",
            value: "option1"
        }, {
            label: "Option 2",
            value: "option2"
        }, {
            label: "Option 3",
            value: "option3"
        }]
    },
    multiSelect: {
        type: ControlType.Boolean,
        title: "Multi-select",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No"
    },
    required: {
        type: ControlType.Boolean,
        title: "Required",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No"
    },
    layout: {
        type: ControlType.Object,
        title: "Layout",
        controls: {
            columns: {
                type: ControlType.Number,
                title: "Columns",
                defaultValue: 3,
                min: 1,
                max: 12,
                displayStepper: true
            },
            height: {
                type: ControlType.Enum,
                title: "Height",
                options: ["fit", "fill"],
                optionTitles: ["Fit", "Fill"],
                defaultValue: "fit",
                displaySegmentedControl: true
            },
            horizontalAlign: {
                type: ControlType.Enum,
                title: "Align",
                options: ["start", "center", "end"],
                optionTitles: ["Left", "Center", "Right"],
                defaultValue: "start",
                displaySegmentedControl: true
            },
            verticalAlign: {
                type: ControlType.Enum,
                title: "Align",
                options: ["top", "center", "bottom"],
                optionTitles: ["Top", "Center", "Bottom"],
                defaultValue: "top",
                displaySegmentedControl: true
            },
            gapH: {
                type: ControlType.Number,
                title: "Gap H",
                defaultValue: 10,
                min: 0,
                max: 100,
                step: 1
            },
            gapV: {
                type: ControlType.Number,
                title: "Gap V",
                defaultValue: 10,
                min: 0,
                max: 100,
                step: 1
            }
        }
    },
    buttonFont: {
        type: ControlType.Font,
        title: "Button Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: "14px",
            variant: "Regular",
            lineHeight: "1.2em"
        }
    },
    buttonRadius: {
        type: ControlType.Object,
        title: "Radius",
        controls: {
            mixed: {
                type: ControlType.Boolean,
                title: "Individual Corners",
                defaultValue: false,
                enabledTitle: "On",
                disabledTitle: "Off"
            },
            topLeft: {
                type: ControlType.Number,
                title: "Top Left",
                defaultValue: 10,
                min: 0,
                max: 50,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            },
            topRight: {
                type: ControlType.Number,
                title: "Top Right",
                defaultValue: 10,
                min: 0,
                max: 50,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            },
            bottomRight: {
                type: ControlType.Number,
                title: "Bottom Right",
                defaultValue: 10,
                min: 0,
                max: 50,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            },
            bottomLeft: {
                type: ControlType.Number,
                title: "Bottom Left",
                defaultValue: 10,
                min: 0,
                max: 50,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            }
        },
        defaultValue: {
            topLeft: 10,
            topRight: 10,
            bottomRight: 10,
            bottomLeft: 10,
            mixed: false
        }
    },
    buttonPadding: {
        type: ControlType.Object,
        title: "Padding",
        controls: {
            mixed: {
                type: ControlType.Boolean,
                title: "Individual Sides",
                defaultValue: false,
                enabledTitle: "On",
                disabledTitle: "Off"
            },
            top: {
                type: ControlType.Number,
                title: "Top",
                defaultValue: 10,
                min: 0,
                max: 50,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            },
            right: {
                type: ControlType.Number,
                title: "Right",
                defaultValue: 10,
                min: 0,
                max: 50,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            },
            bottom: {
                type: ControlType.Number,
                title: "Bottom",
                defaultValue: 10,
                min: 0,
                max: 50,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            },
            left: {
                type: ControlType.Number,
                title: "Left",
                defaultValue: 10,
                min: 0,
                max: 50,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            }
        },
        defaultValue: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
            mixed: false
        }
    },
    buttonBorder: {
        type: ControlType.Object,
        title: "Border Width",
        controls: {
            mixed: {
                type: ControlType.Boolean,
                title: "Individual Sides",
                defaultValue: false,
                enabledTitle: "On",
                disabledTitle: "Off"
            },
            top: {
                type: ControlType.Number,
                title: "Top",
                defaultValue: 1,
                min: 0,
                max: 10,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            },
            right: {
                type: ControlType.Number,
                title: "Right",
                defaultValue: 1,
                min: 0,
                max: 10,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            },
            bottom: {
                type: ControlType.Number,
                title: "Bottom",
                defaultValue: 1,
                min: 0,
                max: 10,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            },
            left: {
                type: ControlType.Number,
                title: "Left",
                defaultValue: 1,
                min: 0,
                max: 10,
                step: 1,
                hidden: ({
                    mixed
                }) => !mixed
            }
        },
        defaultValue: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
            mixed: false
        }
    },
    buttonBorderColor: {
        type: ControlType.Color,
        title: "Border Color",
        defaultValue: "rgba(136, 136, 136, 0.1)"
    },
    buttonBackground: {
        type: ControlType.Color,
        title: "Button Background",
        defaultValue: "rgba(187, 187, 187, 0.15)"
    },
    selectedBackground: {
        type: ControlType.Color,
        title: "Selected Background",
        defaultValue: "#0055FF"
    },
    selectedTextColor: {
        type: ControlType.Color,
        title: "Selected Text Color",
        defaultValue: "#FFFFFF"
    },
    selectedBorderColor: {
        type: ControlType.Color,
        title: "Selected Border",
        defaultValue: "#0099FF"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "ButtonGroup",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1",
                "framerSupportedLayoutWidth": "any",
                "framerSupportedLayoutHeight": "auto"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./ButtonInputGroup.map