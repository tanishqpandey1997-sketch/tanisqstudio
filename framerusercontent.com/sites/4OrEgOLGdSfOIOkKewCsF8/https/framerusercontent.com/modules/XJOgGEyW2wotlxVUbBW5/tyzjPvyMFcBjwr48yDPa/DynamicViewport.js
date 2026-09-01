import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    forwardRef
} from "react"; // -------------------------------------------------- //
// DVH OVERRIDE
// -------------------------------------------------- //
export function withDvh(Component) {
    return /*#__PURE__*/ forwardRef((props, ref) => {
        const {
            style,
            ...restProps
        } = props;
        return /*#__PURE__*/ _jsx(Component, {
            ref: ref,
            ...restProps,
            style: { ...style,
                height: "100dvh"
            }
        });
    });
} // -------------------------------------------------- //
// SVH OVERRIDE
// -------------------------------------------------- //
export function withSvh(Component) {
    return /*#__PURE__*/ forwardRef((props, ref) => {
        const {
            style,
            ...restProps
        } = props;
        return /*#__PURE__*/ _jsx(Component, {
            ref: ref,
            ...restProps,
            style: { ...style,
                height: "100svh"
            }
        });
    });
}
export const __FramerMetadata__ = {
    "exports": {
        "withSvh": {
            "type": "reactHoc",
            "name": "withSvh",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "withDvh": {
            "type": "reactHoc",
            "name": "withDvh",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./DynamicViewport.map