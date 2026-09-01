// Text opacity letters component that changes color on scroll
import {
    jsx as _jsx,
    jsxs as _jsxs
} from "react/jsx-runtime";
import {
    useScroll,
    useTransform,
    motion
} from "framer-motion";
import {
    useRef
} from "react";
import {
    addPropertyControls,
    ControlType
} from "framer";
/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function ScrollColorChangeText(props) {
    const {
        text = "Scroll to see the magic", startColor = "#CCCCCC", endColor = "#000000", font, textBalance = false
    } = props;
    const containerRef = useRef(null);
    const {
        scrollYProgress
    } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "start 0.2"]
    });
    const words = text.split(" ");
    const totalLetters = text.replace(/ /g, "").length;
    return /*#__PURE__*/ _jsx("div", {
        ref: containerRef,
        style: { ...props.style,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%"
        },
        children: /*#__PURE__*/ _jsx("span", {
            style: {
                display: "inline",
                ...font,
                ...textBalance && {
                    textWrap: "balance"
                }
            },
            children: words.map((word, wordIndex) => {
                const lettersBefore = words.slice(0, wordIndex).join("").length;
                return /*#__PURE__*/ _jsx(Word, {
                    word: word,
                    scrollYProgress: scrollYProgress,
                    lettersBefore: lettersBefore,
                    totalLetters: totalLetters,
                    startColor: startColor,
                    endColor: endColor,
                    isLastWord: wordIndex === words.length - 1
                }, wordIndex);
            })
        })
    });
}

function Word({
    word,
    scrollYProgress,
    lettersBefore,
    totalLetters,
    startColor,
    endColor,
    isLastWord
}) {
    const letters = word.split("");
    return /*#__PURE__*/ _jsxs("span", {
        style: {
            display: "inline-block",
            whiteSpace: "nowrap"
        },
        children: [letters.map((letter, index) => {
            const absoluteIndex = lettersBefore + index;
            const start = absoluteIndex / totalLetters;
            const end = start + 1 / totalLetters;
            return /*#__PURE__*/ _jsx(Letter, {
                letter: letter,
                scrollYProgress: scrollYProgress,
                start: start,
                end: end,
                startColor: startColor,
                endColor: endColor
            }, index);
        }), !isLastWord && /*#__PURE__*/ _jsx("span", {
            style: {
                display: "inline"
            },
            children: "\xa0"
        })]
    });
}

function Letter({
    letter,
    scrollYProgress,
    start,
    end,
    startColor,
    endColor
}) {
    const opacity = useTransform(scrollYProgress, [start, end], [.2, 1]);
    const color = useTransform(scrollYProgress, [start, end], [startColor, endColor]);
    return /*#__PURE__*/ _jsx(motion.span, {
        style: {
            opacity,
            color,
            display: letter === " " ? "inline" : "inline-block"
        },
        children: letter === " " ? "\xa0" : letter
    });
}
addPropertyControls(ScrollColorChangeText, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Scroll to see the magic",
        displayTextArea: true
    },
    textBalance: {
        type: ControlType.Boolean,
        title: "Text Balance",
        defaultValue: false,
        enabledTitle: "On",
        disabledTitle: "Off"
    },
    startColor: {
        type: ControlType.Color,
        title: "Start Color",
        defaultValue: "#CCCCCC"
    },
    endColor: {
        type: ControlType.Color,
        title: "End Color",
        defaultValue: "#000000"
    },
    font: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: "40px",
            variant: "Bold",
            letterSpacing: "-0.04em",
            lineHeight: "1em"
        }
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "ScrollColorChangeText",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1",
                "framerSupportedLayoutWidth": "any",
                "framerSupportedLayoutHeight": "any"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./ScrollColorChangeText.map