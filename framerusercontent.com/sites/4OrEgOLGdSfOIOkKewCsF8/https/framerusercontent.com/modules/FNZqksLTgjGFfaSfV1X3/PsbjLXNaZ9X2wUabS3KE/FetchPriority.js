import {
    jsx as _jsx
} from "react/jsx-runtime";
export function withFetchPriority(Component) {
    return props => {
        return /*#__PURE__*/ _jsx(Component, { ...props,
            background: { ...props.background,
                fetchPriority: "high"
            }
        });
    };
}
export const __FramerMetadata__ = {
    "exports": {
        "withFetchPriority": {
            "type": "reactHoc",
            "name": "withFetchPriority",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./FetchPriority.map