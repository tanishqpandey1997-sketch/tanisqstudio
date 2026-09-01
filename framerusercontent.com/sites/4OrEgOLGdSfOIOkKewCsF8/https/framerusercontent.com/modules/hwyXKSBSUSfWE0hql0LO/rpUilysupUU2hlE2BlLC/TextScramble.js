// Text scramble hover effect with random character animation
import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    useState,
    useEffect,
    useRef,
    startTransition
} from "react";
import {
    addPropertyControls,
    ControlType
} from "framer";
/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function TextScramble(props) {
    const {
        text = "Hover Me", duration = 1e3, characters = "!@#$%^&*()_+-=[]{}|;:,.<>?", scrambleIntensity = 100, textColor, font, triggerMode = "hover", appearDelay = 0, style
    } = props;
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [hasAppeared, setHasAppeared] = useState(false);
    const frameRef = useRef(0);
    const startTimeRef = useRef(0);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [minWidth, setMinWidth] = useState(undefined); // Detect if width/height are set to fill (100%)
    const isFixedWidth = style ? .width === "100%";
    const isFixedHeight = style ? .height === "100%"; // Measure initial text width
    useEffect(() => {
        if (textRef.current && !isFixedWidth) {
            const width = textRef.current.offsetWidth;
            startTransition(() => setMinWidth(width));
        }
    }, [text, font, isFixedWidth]); // Handle appear mode with Intersection Observer
    useEffect(() => {
        if (triggerMode !== "appear" || hasAppeared) return;
        let timeoutId;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timeoutId = setTimeout(() => {
                        startTransition(() => setHasAppeared(true));
                    }, appearDelay);
                }
            });
        }, {
            threshold: .1
        });
        const currentContainer = containerRef.current;
        if (currentContainer) {
            observer.observe(currentContainer);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, [triggerMode, appearDelay, hasAppeared]);
    useEffect(() => {
        const shouldAnimate = triggerMode === "hover" ? isHovering : hasAppeared;
        if (!shouldAnimate) {
            startTransition(() => setDisplayText(text));
            return;
        }
        startTimeRef.current = Date.now();
        let lastFrameTime = 0;
        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            if (progress >= 1) {
                startTransition(() => setDisplayText(text));
                return;
            } // Add a minimum delay between frames to make scrambling more visible
            if (now - lastFrameTime < 50) {
                frameRef.current = requestAnimationFrame(animate);
                return;
            }
            lastFrameTime = now; // Easing function for smoother animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const scrambled = text.split("").map((char, index) => {
                if (char === " ") return " "; // Use scrambleIntensity to control how many characters scramble
                const shouldScramble = Math.random() * 100 < scrambleIntensity;
                if (shouldScramble && Math.random() > easeProgress) {
                    return characters[Math.floor(Math.random() * characters.length)];
                }
                return text[index];
            }).join("");
            startTransition(() => setDisplayText(scrambled));
            frameRef.current = requestAnimationFrame(animate);
        };
        frameRef.current = requestAnimationFrame(animate);
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [isHovering, text, duration, characters, scrambleIntensity, triggerMode, hasAppeared]);
    const handleMouseEnter = () => {
        if (triggerMode === "hover") {
            startTransition(() => setIsHovering(true));
        }
    };
    const handleMouseLeave = () => {
        if (triggerMode === "hover") {
            startTransition(() => setIsHovering(false));
        }
    };
    const shouldAnimate = triggerMode === "hover" ? isHovering : hasAppeared;
    return /*#__PURE__*/ _jsx("div", {
        ref: containerRef,
        style: { ...style,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            cursor: triggerMode === "hover" ? "pointer" : "default",
            userSelect: "none",
            width: isFixedWidth ? "100%" : "fit-content",
            height: isFixedHeight ? "100%" : "fit-content"
        },
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        children: /*#__PURE__*/ _jsx("span", {
            ref: textRef,
            style: { ...font,
                color: textColor,
                fontFamily: font.fontFamily || "monospace",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                width: isFixedWidth ? "100%" : "max-content",
                minWidth: !isFixedWidth && minWidth ? `${minWidth}px` : undefined
            },
            children: displayText
        })
    });
}
addPropertyControls(TextScramble, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Hover Me"
    },
    triggerMode: {
        type: ControlType.Enum,
        title: "Trigger",
        options: ["hover", "appear"],
        optionTitles: ["Hover", "Appear"],
        defaultValue: "hover",
        displaySegmentedControl: true
    },
    appearDelay: {
        type: ControlType.Number,
        title: "Appear Delay",
        defaultValue: 0,
        min: 0,
        max: 5e3,
        step: 100,
        unit: "ms",
        displayStepper: true,
        hidden: props => props.triggerMode !== "appear"
    },
    duration: {
        type: ControlType.Number,
        title: "Duration",
        defaultValue: 2e3,
        min: 100,
        max: 5e3,
        step: 100,
        unit: "ms",
        displayStepper: true
    },
    scrambleIntensity: {
        type: ControlType.Number,
        title: "Intensity",
        defaultValue: 100,
        min: 0,
        max: 100,
        step: 5,
        unit: "%",
        displayStepper: true
    },
    characters: {
        type: ControlType.String,
        title: "Characters",
        defaultValue: "!@#$%^&*()_+-=[]{}|;:,.<>?",
        displayTextArea: true
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#00FF00"
    },
    font: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended",
        defaultFontType: "monospace",
        defaultValue: {
            fontSize: "32px",
            letterSpacing: "0em",
            lineHeight: "1.2em"
        }
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "TextScramble",
            "slots": [],
            "annotations": {
                "framerSupportedLayoutHeight": "any",
                "framerContractVersion": "1",
                "framerSupportedLayoutWidth": "any"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./TextScramble.map