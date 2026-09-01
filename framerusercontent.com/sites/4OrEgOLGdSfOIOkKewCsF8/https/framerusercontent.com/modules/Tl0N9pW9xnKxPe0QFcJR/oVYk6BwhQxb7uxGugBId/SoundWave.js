import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    motion
} from "framer-motion";
import {
    useEffect,
    useRef,
    useState
} from "react";
/**
 * @framerIntrinsicWidth 34
 * @framerIntrinsicHeight 18
 */
export default function SoundWave() {
    const [enabled, setEnabled] = useState(typeof window !== "undefined" && localStorage.getItem("portfolio-sound") === "on");
    const BAR_COUNT = 5;
    const [heights, setHeights] = useState(new Array(BAR_COUNT).fill(4));
    const timer = useRef();
    useEffect(() => {
        if (!enabled) {
            setHeights(new Array(BAR_COUNT).fill(4));
            return;
        }
        const animate = () => {
            setHeights(Array.from({
                length: BAR_COUNT
            }, () => 4 + Math.random() * 12));
        };
        animate();
        timer.current = window.setInterval(animate, 180 + Math.random() * 120);
        return () => {
            if (timer.current) clearInterval(timer.current);
        };
    }, [enabled]);
    const toggle = () => {
        const next = !enabled;
        setEnabled(next);
        localStorage.setItem("portfolio-sound", next ? "on" : "off");
        window.dispatchEvent(new CustomEvent("portfolio-sound-change", {
            detail: next
        }));
    };
    return /*#__PURE__*/ _jsx("div", {
        onClick: toggle,
        style: {
            width: 34,
            height: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            cursor: "pointer",
            userSelect: "none"
        },
        children: heights.map((height, i) => /*#__PURE__*/ _jsx(motion.div, {
            animate: {
                height
            },
            transition: {
                duration: .28,
                ease: [.4, 0, .2, 1]
            },
            style: {
                width: 2,
                height: 4,
                borderRadius: 999,
                background: "#E0E0E0"
            }
        }, i))
    });
}
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "SoundWave",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1",
                "framerIntrinsicWidth": "34",
                "framerIntrinsicHeight": "18"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./SoundWave.map