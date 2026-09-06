import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    forwardRef
} from "react";
let audio = null;

function getAudio() {
    if (typeof window === "undefined") return null;
    if (!audio) {
        audio = new window.Audio("/hover.mp3");
        audio.preload = "auto";
        audio.volume = .4;
    }
    return audio;
}
export function withHoverSound(Component) {
    return /*#__PURE__*/ forwardRef((props, ref) => {
        return /*#__PURE__*/ _jsx(Component, {
            ref: ref,
            ...props,
            onMouseEnter: e => {
                const sound = getAudio();
                if (sound) {
                    sound.pause();
                    sound.currentTime = 0;
                    sound.play().catch(() => {});
                }
                props.onMouseEnter ? .(e);
            }
        });
    });
}
export const __FramerMetadata__ = {
    "exports": {
        "withHoverSound": {
            "type": "reactHoc",
            "name": "withHoverSound",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./HoverSound.map