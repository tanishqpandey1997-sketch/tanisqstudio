import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    forwardRef,
    useEffect,
    useRef
} from "react";
export function withUppercase(Component) {
    return /*#__PURE__*/ forwardRef((props, ref) => {
        const wrapperRef = useRef(null);
        useEffect(() => {
            const container = wrapperRef.current;
            if (!container) return;
            const input = container.querySelector("input, textarea");
            if (!input) return;
            input.style.textTransform = "uppercase";
            const handler = () => {
                const start = input.selectionStart;
                const end = input.selectionEnd;
                input.value = input.value.toUpperCase();
                input.setSelectionRange(start, end);
            };
            input.addEventListener("input", handler);
            return () => input.removeEventListener("input", handler);
        }, []);
        return /*#__PURE__*/ _jsx("div", {
            ref: wrapperRef,
            style: {
                display: "contents"
            },
            children: /*#__PURE__*/ _jsx(Component, {
                ref: ref,
                ...props
            })
        });
    });
}
export const __FramerMetadata__ = {
    "exports": {
        "withUppercase": {
            "type": "reactHoc",
            "name": "withUppercase",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Uppercase.map