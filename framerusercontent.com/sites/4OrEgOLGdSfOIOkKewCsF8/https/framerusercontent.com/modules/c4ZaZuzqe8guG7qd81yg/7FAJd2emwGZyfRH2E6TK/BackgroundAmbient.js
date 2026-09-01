import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    forwardRef,
    useEffect
} from "react";
const AUDIO_URL = "https://gross-red-8ytsy57m.edgeone.dev/nastelbom-relax-463106.mp3";
const TARGET_VOLUME = .5;
export function withBackgroundAmbient(Component) {
    return /*#__PURE__*/ forwardRef((props, ref) => {
        useEffect(() => {
            if (!window.portfolioAmbient) {
                const audio = new Audio(AUDIO_URL);
                audio.loop = true;
                audio.preload = "auto";
                window.portfolioAmbient = audio;
            }
            const audio = window.portfolioAmbient;
            const playAudio = () => {
                audio.volume = 0;
                audio.play().catch(() => {});
                let volume = 0;
                const fade = setInterval(() => {
                    volume += .02;
                    if (volume >= TARGET_VOLUME) {
                        volume = TARGET_VOLUME;
                        clearInterval(fade);
                    }
                    audio.volume = volume;
                }, 30);
            };
            const pauseAudio = () => {
                let volume = audio.volume;
                const fade = setInterval(() => {
                    volume -= .02;
                    if (volume <= 0) {
                        volume = 0;
                        clearInterval(fade);
                        audio.pause();
                    }
                    audio.volume = volume;
                }, 30);
            };
            const enabled = localStorage.getItem("portfolio-sound") === "on";
            if (enabled) {
                playAudio();
            }
            const handler = e => {
                if (e.detail) {
                    playAudio();
                } else {
                    pauseAudio();
                }
            };
            window.addEventListener("portfolio-sound-change", handler);
            return () => window.removeEventListener("portfolio-sound-change", handler);
        }, []);
        return /*#__PURE__*/ _jsx(Component, {
            ref: ref,
            ...props
        });
    });
}
export const __FramerMetadata__ = {
    "exports": {
        "withBackgroundAmbient": {
            "type": "reactHoc",
            "name": "withBackgroundAmbient",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./BackgroundAmbient.map