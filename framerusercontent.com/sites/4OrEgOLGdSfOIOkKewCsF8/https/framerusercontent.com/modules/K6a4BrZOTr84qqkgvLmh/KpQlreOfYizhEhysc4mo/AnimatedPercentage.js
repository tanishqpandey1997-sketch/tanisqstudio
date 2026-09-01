// Animated percentage counter from 0% to 100% with customizable duration, delay, and animation effects
import {
    jsx as _jsx,
    jsxs as _jsxs
} from "react/jsx-runtime";
import {
    useEffect,
    useState,
    useRef,
    startTransition,
    useMemo
} from "react";
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    useInView
} from "framer-motion";
/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function AnimatedPercentage(props) {
    const {
        duration = 4, delay = 0, startOnAppear = true, easingType = "easeOut", stiffness = 100, damping = 30, prefix = "", suffix = "%", textColor = "#000000", font, style
    } = props;
    const [currentValue, setCurrentValue] = useState(0);
    const [hasStarted, setHasStarted] = useState(!startOnAppear);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, {
        once: true,
        amount: .5
    });
    const animationFrameRef = useRef(null);
    const startTimeRef = useRef(null);
    useEffect(() => {
        if (startOnAppear && isInView && !hasStarted) {
            const timer = setTimeout(() => {
                startTransition(() => setHasStarted(true));
            }, delay * 1e3);
            return () => clearTimeout(timer);
        }
    }, [isInView, startOnAppear, delay, hasStarted]);
    const easingFunctions = useMemo(() => ({
        linear: t => t,
        easeIn: t => t * t,
        easeOut: t => t * (2 - t),
        easeInOut: t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        spring: t => {
            const normalizedStiffness = stiffness / 100;
            const normalizedDamping = damping / 100;
            const p = normalizedDamping;
            const s = normalizedStiffness;
            return 1 - Math.pow(Math.E, -p * s * t) * Math.cos(s * t);
        }
    }), [stiffness, damping]);
    useEffect(() => {
        if (!hasStarted) {
            setCurrentValue(0);
            return;
        }
        const animate = timestamp => {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp;
            }
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / (duration * 1e3), 1);
            const easedProgress = easingFunctions[easingType](progress);
            const value = Math.round(easedProgress * 100);
            startTransition(() => setCurrentValue(value));
            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };
        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            startTimeRef.current = null;
        };
    }, [hasStarted, duration, easingType, easingFunctions]);
    const isCanvas = RenderTarget.current() === RenderTarget.canvas;
    return /*#__PURE__*/ _jsx("div", {
        ref: containerRef,
        style: { ...style,
            position: "relative",
            display: "inline-block",
            width: "max-content"
        },
        children: /*#__PURE__*/ _jsxs("span", {
            style: {
                color: textColor,
                ...font,
                display: "inline-block",
                whiteSpace: "nowrap"
            },
            children: [prefix, isCanvas ? "100" : currentValue, suffix]
        })
    });
}
addPropertyControls(AnimatedPercentage, {
    duration: {
        type: ControlType.Number,
        title: "Duration",
        defaultValue: 4,
        min: .1,
        max: 20,
        step: .1,
        unit: "s",
        displayStepper: true
    },
    delay: {
        type: ControlType.Number,
        title: "Delay",
        defaultValue: 0,
        min: 0,
        max: 10,
        step: .1,
        unit: "s",
        displayStepper: true
    },
    startOnAppear: {
        type: ControlType.Boolean,
        title: "Start On",
        defaultValue: true,
        enabledTitle: "Appear",
        disabledTitle: "Load"
    },
    easingType: {
        type: ControlType.Enum,
        title: "Easing",
        options: ["linear", "easeIn", "easeOut", "easeInOut", "spring"],
        optionTitles: ["Linear", "Ease In", "Ease Out", "Ease In Out", "Spring"],
        defaultValue: "easeOut",
        displaySegmentedControl: false
    },
    stiffness: {
        type: ControlType.Number,
        title: "Stiffness",
        defaultValue: 100,
        min: 1,
        max: 500,
        step: 1,
        hidden: ({
            easingType
        }) => easingType !== "spring"
    },
    damping: {
        type: ControlType.Number,
        title: "Damping",
        defaultValue: 30,
        min: 1,
        max: 100,
        step: 1,
        hidden: ({
            easingType
        }) => easingType !== "spring"
    },
    prefix: {
        type: ControlType.String,
        title: "Prefix",
        defaultValue: "",
        placeholder: "e.g., $"
    },
    suffix: {
        type: ControlType.String,
        title: "Suffix",
        defaultValue: "%",
        placeholder: "e.g., %"
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
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
            "name": "AnimatedPercentage",
            "slots": [],
            "annotations": {
                "framerSupportedLayoutWidth": "auto",
                "framerSupportedLayoutHeight": "auto",
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./AnimatedPercentage.map