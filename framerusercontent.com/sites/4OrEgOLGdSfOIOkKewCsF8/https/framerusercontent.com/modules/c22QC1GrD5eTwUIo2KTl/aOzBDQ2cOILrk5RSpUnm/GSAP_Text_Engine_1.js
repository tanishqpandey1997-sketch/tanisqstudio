/**
 * GSAP Text Engine for Framer — v5.2
 * 41 animation presets · SplitType · gsap.from() pattern
 * Install: npm i gsap split-type
 */
import {
    jsx as _jsx
} from "react/jsx-runtime";
import * as React from "react";
import {
    addPropertyControls,
    ControlType
} from "framer";
import gsap from "gsap";
import {
    ScrollTrigger
} from "gsap/ScrollTrigger";
import SplitType from "split-type";
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const prefersRM = () => typeof window !== "undefined" && (window.matchMedia ? .("(prefers-reduced-motion: reduce)") ? .matches ? ? false);

function resolveSplit(preset, chosen) {
    if (preset === "Typewriter" || preset === "ScrambleReveal" || preset === "SweepClip") return "none";
    const chars = ["WaveChars", "CharsStaggerUp", "GlitchSlice", "NeonFlicker", "ExplodeIn", "CylinderRoll", "FlipCascade", "ElasticPull", "GravityDrop", "ZipperStagger", "KineticBlur", "StampPress", "SpringWobble", "PixelateIn", "SpiralIn", "MagneticPull", "ShutterReveal"];
    if (chars.includes(preset)) return "chars";
    const words = ["WordsStaggerUp", "SpinBounce", "SoftBounce", "LiquidSkew", "StretchSnap", "InkBleed"];
    if (words.includes(preset)) return "words";
    const lines = ["MaskRevealUp", "MaskRevealDown", "RisingReveal", "PerspectiveTilt", "VenetianBlinds", "CascadeFall"];
    if (lines.includes(preset)) return chosen === "none" ? "lines" : chosen;
    return chosen;
}

function pickTargets(root, split, mode) {
    if (!split) return [root];
    if (mode === "chars" && split.chars ? .length) return split.chars;
    if (mode === "words" && split.words ? .length) return split.words;
    if (mode === "lines" && split.lines ? .length) return split.lines;
    return [root];
}

function scrambleStr(target, progress, alphabet) {
    const p = clamp(progress, 0, 1);
    const revealed = Math.floor(target.length * p);
    let out = "";
    for (let i = 0; i < target.length; i++) {
        if (i < revealed) {
            out += target[i];
            continue;
        }
        if (" \n	".includes(target[i])) {
            out += target[i];
            continue;
        }
        out += alphabet[Math.floor(Math.random() * alphabet.length)] ? ? target[i];
    }
    return out;
}
/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function GSAPTextEngine(props) {
    const {
        text,
        preset,
        triggerSettings,
        typography,
        timing,
        motion,
        stagger,
        scroll,
        hover,
        scramble,
        typewriter,
        fx,
        style
    } = props;
    const trigger = triggerSettings.mode;
    const rootRef = React.useRef(null);
    const textRef = React.useRef(null);
    React.useLayoutEffect(() => {
        const root = rootRef.current;
        const el = textRef.current;
        if (!root || !el) return;
        el.textContent = text ? ? "";
        if (prefersRM() && triggerSettings.reducedMotion) {
            gsap.set(el, {
                clearProps: "all"
            });
            return;
        }
        let splitInstance = null;
        const ctx = gsap.context(() => {
            el.style.textShadow = "";
            el.style.perspective = "";
            el.style.clipPath = "";
            el.textContent = text ? ? "";
            const sm = resolveSplit(preset, triggerSettings.splitMode);
            if (sm !== "none") {
                splitInstance = new SplitType(el, {
                    types: sm,
                    tagName: "span"
                });
                el.querySelectorAll("span").forEach(s => {
                    s.style.display = "inline-block";
                    s.style.willChange = "transform, opacity, filter";
                });
            }
            const tgts = pickTargets(el, splitInstance, sm);
            if (!tgts.length) return;
            const dur = clamp(timing.duration, .05, 10);
            const del = clamp(timing.delay, 0, 10);
            const ease = timing.ease;
            const opF = clamp(motion.opacityFrom, 0, 1);
            const blur = clamp(motion.blur, 0, 80);
            const persp = clamp(motion.perspective, 200, 4e3);
            const stg = tgts.length > 1 ? clamp(stagger.amount, 0, 3) : 0;
            const stgObj = stg > 0 ? {
                amount: stg,
                from: stagger.from
            } : undefined;
            const maskP = ["MaskRevealUp", "MaskRevealDown", "RisingReveal", "VenetianBlinds", "CascadeFall"];
            if (maskP.includes(preset) && splitInstance ? .lines) {
                splitInstance.lines.forEach(l => {
                    l.style.overflow = "hidden";
                });
            }
            const need3D = ["RotateIn", "SpinBounce", "CylinderRoll", "FlipCascade", "PerspectiveTilt"];
            if (need3D.includes(preset)) el.style.perspective = `${persp}px`;
            let trigEl = root;
            if (trigger === "element" && triggerSettings.elementId) {
                const ext = document.getElementById(triggerSettings.elementId);
                if (ext) trigEl = ext;
            }
            const buildST = () => {
                if (trigger === "scroll") {
                    return {
                        trigger: trigEl,
                        start: scroll.start,
                        end: scroll.end,
                        scrub: scroll.scrub ? scroll.scrubAmount : false,
                        markers: triggerSettings.debugMarkers,
                        toggleActions: scroll.scrub ? undefined : `play ${scroll.resetOnLeave?"reset":"none"} ${scroll.replayOnEnterBack?"play":"none"} ${scroll.resetOnLeaveBack?"reset":"none"}`
                    };
                }
                if (trigger === "viewport" || trigger === "element") {
                    return {
                        trigger: trigEl,
                        start: scroll.start || "top 85%",
                        toggleActions: triggerSettings.once ? "play none none none" : "play none play none"
                    };
                }
                return undefined;
            };
            const scrollTrigger = ["scroll", "viewport", "element"].includes(trigger) ? buildST() : undefined;
            const base = {
                duration: dur,
                delay: del,
                ease,
                stagger: stgObj,
                scrollTrigger
            };
            let tween = null;
            switch (preset) {
                case "FadeIn":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        ...base
                    });
                    break;
                case "FadeUp":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        y: motion.y || 30,
                        ...base
                    });
                    break;
                case "FadeDown":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        y: motion.y || -30,
                        ...base
                    });
                    break;
                case "SlideLeft":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        x: motion.x || 60,
                        ...base
                    });
                    break;
                case "SlideRight":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        x: motion.x || -60,
                        ...base
                    });
                    break;
                case "BlurUp":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        y: motion.y || 24,
                        filter: `blur(${blur||12}px)`,
                        ...base
                    });
                    break;
                case "BlurIn":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        filter: `blur(${blur||16}px)`,
                        ...base
                    });
                    break;
                case "ScalePop":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        scale: motion.scale !== 1 ? motion.scale : .8,
                        y: motion.y || 10,
                        ...base,
                        ease: "back.out(1.7)"
                    });
                    break;
                case "RotateIn":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        rotateX: motion.rotateX || 90,
                        rotateY: motion.rotateY,
                        y: motion.y || 20,
                        transformOrigin: motion.transformOrigin || "50% 100%",
                        ...base
                    });
                    break;
                case "MaskRevealUp":
                    tween = gsap.from(tgts, {
                        yPercent: 110,
                        ...base
                    });
                    break;
                case "MaskRevealDown":
                    tween = gsap.from(tgts, {
                        yPercent: -110,
                        ...base
                    });
                    break;
                case "CharsStaggerUp":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        y: motion.y || 24,
                        filter: blur > 0 ? `blur(${blur*.5}px)` : undefined,
                        ...base,
                        ease: "expo.out"
                    });
                    break;
                case "WordsStaggerUp":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        y: motion.y || 20,
                        ...base
                    });
                    break;
                case "WaveChars":
                    {
                        const amp = clamp(motion.waveAmplitude, 1, 120);
                        const reps = motion.waveRepeats === 0 ? -1 : Math.max(0, motion.waveRepeats || 1);tween = gsap.fromTo(tgts, {
                            y: 0
                        }, {
                            y: i => Math.sin(i * .65) * amp,
                            duration: clamp(motion.waveDuration, .1, 10),
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: reps,
                            stagger: stgObj,
                            delay: del,
                            scrollTrigger
                        });
                        break;
                    }
                case "Typewriter":
                    {
                        const full = text ? ? "";
                        const cur = typewriter.cursorEnabled ? typewriter.cursorChar : "";
                        const d = clamp(full.length / clamp(typewriter.charsPerSecond, 1, 240), .05, 12);el.textContent = cur || "";
                        const st = {
                            p: 0
                        };tween = gsap.to(st, {
                            p: 1,
                            duration: d,
                            delay: del,
                            ease: "none",
                            scrollTrigger,
                            onUpdate: () => {
                                el.textContent = full.slice(0, Math.floor(full.length * st.p)) + (cur && st.p < 1 ? cur : "");
                            },
                            onComplete: () => {
                                el.textContent = full;
                            }
                        });
                        break;
                    }
                case "ScrambleReveal":
                    {
                        const full = text ? ? "";el.textContent = scrambleStr(full, 0, scramble.alphabet);
                        const st = {
                            p: 0
                        };tween = gsap.to(st, {
                            p: 1,
                            duration: clamp(scramble.duration, .05, 12),
                            delay: del,
                            ease: "none",
                            scrollTrigger,
                            onUpdate: () => {
                                el.textContent = scrambleStr(full, st.p, scramble.alphabet);
                            },
                            onComplete: () => {
                                el.textContent = full;
                            }
                        });
                        break;
                    }
                case "GlitchSlice":
                    {
                        const jit = clamp(fx.glitchJitter, 1, 40);
                        const sk = clamp(fx.glitchSkew, 1, 40);
                        const tl = gsap.timeline({
                            delay: del,
                            scrollTrigger
                        });tl.from(tgts, {
                            autoAlpha: 0,
                            x: () => gsap.utils.random(-jit, jit),
                            y: () => gsap.utils.random(-jit * .5, jit * .5),
                            skewX: () => gsap.utils.random(-sk, sk),
                            filter: `blur(${blur*.5}px)`,
                            duration: dur * .5,
                            ease: "steps(8)",
                            stagger: stgObj
                        }, 0);tl.to(tgts, {
                            x: 0,
                            y: 0,
                            skewX: 0,
                            filter: "blur(0px)",
                            duration: dur * .5,
                            ease: "power2.out",
                            stagger: stgObj
                        }, dur * .4);tween = tl;
                        break;
                    }
                case "NeonFlicker":
                    {
                        const ct = clamp(fx.neonFlickerCount, 2, 12);
                        const spd = clamp(fx.neonFlickerSpeed, .03, .3);
                        if (fx.useGlow) {
                            el.style.textShadow = `0 0 ${clamp(fx.glowRadius,1,120)}px rgba(255,255,255,${clamp(fx.glowAlpha,0,1)})`;
                        }
                        const tl = gsap.timeline({
                            delay: del,
                            scrollTrigger
                        });tl.set(tgts, {
                            autoAlpha: 0,
                            filter: `blur(${blur}px)`
                        });tl.to(tgts, {
                            keyframes: Array.from({
                                length: ct
                            }, (_, i) => ({
                                autoAlpha: i % 2 === 0 ? 1 : gsap.utils.random(.1, .4),
                                duration: spd
                            })).concat([{
                                autoAlpha: 1,
                                duration: spd
                            }]),
                            stagger: stgObj
                        }, 0);tl.to(tgts, {
                            filter: "blur(0px)",
                            duration: ct * spd,
                            ease: "power2.out"
                        }, 0);tween = tl;
                        break;
                    }
                case "SpinBounce":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        rotation: clamp(fx.spinDegrees, 30, 1440),
                        y: clamp(fx.spinLift, 10, 220),
                        scale: .6,
                        filter: `blur(${blur}px)`,
                        transformOrigin: "50% 50%",
                        ...base,
                        ease: "back.out(2.5)"
                    });
                    break;
                case "LiquidSkew":
                    tween = gsap.from(tgts, {
                        autoAlpha: opF,
                        x: motion.x || 40,
                        skewX: clamp(fx.liquidSkew, 5, 60),
                        scaleX: 1.2,
                        filter: `blur(${Math.max(clamp(fx.liquidSmearBlur,2,80),blur)}px)`,
                        ...base,
                        ease: "expo.out"
                    });
                    break;
                case "ExplodeIn":
                    {
                        const sp = clamp(fx.explodeSpread, 20, 240);
                        const rt = clamp(fx.explodeRotate, 10, 360);tween = gsap.from(tgts, {
                            autoAlpha: 0,
                            x: () => gsap.utils.random(-sp, sp),
                            y: () => gsap.utils.random(-sp, sp),
                            rotation: () => gsap.utils.random(-rt, rt),
                            scale: () => gsap.utils.random(.3, .7),
                            filter: `blur(${blur}px)`,
                            ...base,
                            ease: "expo.out"
                        });
                        break;
                    }
                case "CylinderRoll":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        rotateX: -90,
                        transformOrigin: `50% 100% -${clamp(fx.cylinderDepth,10,200)}px`,
                        ...base,
                        ease: "expo.out"
                    });
                    break;
                case "FlipCascade":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        rotateY: -90,
                        scaleX: .85,
                        transformOrigin: "0% 50%",
                        ...base,
                        ease: "power3.out"
                    });
                    break;
                case "ElasticPull":
                    {
                        const pull = clamp(fx.elasticPull, 20, 200);tween = gsap.from(tgts, {
                            autoAlpha: 0,
                            x: () => gsap.utils.random(-pull, pull),
                            y: () => gsap.utils.random(-pull * .6, pull * .6),
                            scale: .5,
                            ...base,
                            ease: "elastic.out(1, 0.4)"
                        });
                        break;
                    }
                case "GravityDrop":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        y: -clamp(fx.gravityDropHeight, 30, 300),
                        rotation: () => gsap.utils.random(-15, 15),
                        ...base,
                        ease: "bounce.out"
                    });
                    break;
                case "RisingReveal":
                    tween = gsap.from(tgts, {
                        yPercent: 120,
                        autoAlpha: .3,
                        scale: 1.03,
                        filter: `blur(${Math.max(blur*.3,2)}px)`,
                        ...base,
                        ease: "expo.out"
                    });
                    break;
                case "SweepClip":
                    {
                        const dir = fx.sweepDirection;
                        const fc = dir === "right" ? "inset(0 0 0 100%)" : dir === "center" ? "inset(0 50% 0 50%)" : "inset(0 100% 0 0)";tween = gsap.fromTo(el, {
                            clipPath: fc,
                            autoAlpha: 1
                        }, {
                            clipPath: "inset(0 0% 0 0%)",
                            duration: dur,
                            delay: del,
                            ease,
                            scrollTrigger
                        });
                        break;
                    }
                case "ZipperStagger":
                    {
                        const dist = clamp(fx.zipperDistance, 10, 150);tween = gsap.from(tgts, {
                            autoAlpha: 0,
                            y: gsap.utils.wrap([-dist, dist]),
                            rotation: gsap.utils.wrap([-8, 8]),
                            ...base,
                            ease: "back.out(1.4)"
                        });
                        break;
                    }
                case "SoftBounce":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        y: motion.y || 40,
                        scale: .92,
                        ...base,
                        ease: "back.out(1.2)"
                    });
                    break;
                case "KineticBlur":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        x: clamp(fx.kineticDistance, 30, 300),
                        skewX: -12,
                        filter: `blur(${clamp(fx.kineticBlurAmount,4,50)}px)`,
                        ...base,
                        ease: "expo.out"
                    });
                    break;
                case "StampPress":
                    {
                        const ss = clamp(fx.stampScale, 1.5, 6);
                        const tl = gsap.timeline({
                            delay: del,
                            scrollTrigger
                        });tl.from(tgts, {
                            autoAlpha: 0,
                            scale: ss,
                            filter: `blur(${blur*.4}px)`,
                            duration: dur * .65,
                            ease: "power4.in",
                            stagger: stgObj
                        }, 0);tl.to(tgts, {
                            scaleY: .88,
                            scaleX: 1.08,
                            duration: dur * .12,
                            ease: "power2.out",
                            stagger: stgObj
                        }, dur * .6);tl.to(tgts, {
                            scaleY: 1,
                            scaleX: 1,
                            filter: "blur(0px)",
                            duration: dur * .25,
                            ease: "elastic.out(1, 0.6)",
                            stagger: stgObj
                        }, dur * .72);tween = tl;
                        break;
                    }
                case "PerspectiveTilt":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        rotateX: clamp(fx.perspectiveTiltAngle, 15, 120),
                        y: motion.y || -15,
                        transformOrigin: "50% 0%",
                        ...base,
                        ease: "expo.out"
                    });
                    break;
                case "VenetianBlinds":
                    {
                        const tl = gsap.timeline({
                            delay: del,
                            scrollTrigger
                        });tgts.forEach((t, i) => {
                            tl.fromTo(t, {
                                scaleY: 0,
                                autoAlpha: 0
                            }, {
                                scaleY: 1,
                                autoAlpha: 1,
                                duration: dur,
                                ease: "expo.out",
                                transformOrigin: "50% 50%"
                            }, i * (stg / Math.max(tgts.length, 1)));
                        });tween = tl;
                        break;
                    }
                case "SpringWobble":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        y: clamp(fx.springWobbleIntensity, 10, 120),
                        rotation: () => gsap.utils.random(-12, 12),
                        ...base,
                        ease: "elastic.out(1.2, 0.3)"
                    });
                    break;
                case "PixelateIn":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        scale: .92,
                        filter: `blur(${clamp(blur*.3,1,8)}px)`,
                        duration: dur,
                        delay: del,
                        ease: `steps(${clamp(fx.pixelateSteps,3,20)})`,
                        stagger: stgObj,
                        scrollTrigger
                    });
                    break;
                case "SpiralIn":
                    {
                        const rad = clamp(fx.spiralRadius, 30, 300);tween = gsap.from(tgts, {
                            autoAlpha: 0,
                            x: i => Math.cos(i * .8) * rad,
                            y: i => Math.sin(i * .8) * rad,
                            rotation: i => (i % 2 === 0 ? 1 : -1) * gsap.utils.random(60, 180),
                            scale: .4,
                            ...base,
                            ease: "expo.out"
                        });
                        break;
                    }
                case "StretchSnap":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        scaleX: clamp(fx.stretchAmount, 1.2, 3),
                        x: motion.x || 30,
                        filter: `blur(${clamp(blur*.4,1,12)}px)`,
                        transformOrigin: "0% 50%",
                        ...base,
                        ease: "back.out(1.6)"
                    });
                    break;
                case "CascadeFall":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        y: -clamp(fx.cascadeDistance, 20, 200),
                        rotation: () => gsap.utils.random(-3, 3),
                        filter: `blur(${clamp(blur*.2,0,6)}px)`,
                        ...base,
                        ease: "power3.out"
                    });
                    break;
                case "MagneticPull":
                    {
                        const sc = clamp(fx.magneticScatter, 30, 250);
                        const tl = gsap.timeline({
                            delay: del,
                            scrollTrigger
                        });tl.from(tgts, {
                            autoAlpha: 0,
                            x: () => gsap.utils.random(-sc, sc),
                            y: () => gsap.utils.random(-sc * .5, sc * .5),
                            rotation: () => gsap.utils.random(-20, 20),
                            duration: dur * .7,
                            ease: "power4.out",
                            stagger: stgObj
                        }, 0);tl.from(tgts, {
                            y: -3,
                            duration: dur * .3,
                            ease: "elastic.out(1.5, 0.5)",
                            stagger: stgObj
                        }, dur * .65);tween = tl;
                        break;
                    }
                case "InkBleed":
                    tween = gsap.from(tgts, {
                        autoAlpha: 0,
                        scale: .6,
                        filter: `blur(${clamp(fx.inkBleedAmount,4,40)}px)`,
                        ...base,
                        ease: "circ.out"
                    });
                    break;
                case "ShutterReveal":
                    {
                        const tl = gsap.timeline({
                            delay: del,
                            scrollTrigger
                        });tgts.forEach((t, i) => {
                            tl.fromTo(t, {
                                clipPath: "inset(45% 0 45% 0)",
                                autoAlpha: 1
                            }, {
                                clipPath: "inset(0% 0 0% 0)",
                                autoAlpha: 1,
                                duration: dur,
                                ease: "power3.out"
                            }, i * (stg / Math.max(tgts.length, 1)));
                        });tween = tl;
                        break;
                    }
            }
            if (trigger === "hover" && tween) {
                tween.pause();
                tween.progress(0);
                const enter = () => tween.restart();
                const leave = () => {
                    if (hover.reverseOnLeave) tween.reverse();
                };
                root.addEventListener("mouseenter", enter);
                root.addEventListener("mouseleave", leave);
                root.__hc = () => {
                    root.removeEventListener("mouseenter", enter);
                    root.removeEventListener("mouseleave", leave);
                };
            }
        }, root);
        return () => {
            const r = rootRef.current;
            if (r && r.__hc) {
                r.__hc();
                delete r.__hc;
            }
            splitInstance ? .revert();
            splitInstance = null;
            ctx.revert();
        };
    }, [text, preset, trigger, triggerSettings.elementId, triggerSettings.splitMode, triggerSettings.once, triggerSettings.reducedMotion, triggerSettings.debugMarkers, timing.duration, timing.delay, timing.ease, motion.x, motion.y, motion.blur, motion.opacityFrom, motion.scale, motion.rotate, motion.rotateX, motion.rotateY, motion.perspective, motion.transformOrigin, motion.waveAmplitude, motion.waveDuration, motion.waveRepeats, stagger.amount, stagger.from, scroll.start, scroll.end, scroll.scrub, scroll.scrubAmount, scroll.resetOnLeave, scroll.resetOnLeaveBack, scroll.replayOnEnterBack, hover.reverseOnLeave, scramble.duration, scramble.alphabet, typewriter.charsPerSecond, typewriter.cursorEnabled, typewriter.cursorChar, fx.glitchJitter, fx.glitchSkew, fx.neonFlickerCount, fx.neonFlickerSpeed, fx.useGlow, fx.glowRadius, fx.glowAlpha, fx.spinDegrees, fx.spinLift, fx.liquidSkew, fx.liquidSmearBlur, fx.explodeSpread, fx.explodeRotate, fx.cylinderDepth, fx.elasticPull, fx.gravityDropHeight, fx.sweepDirection, fx.zipperDistance, fx.kineticDistance, fx.kineticBlurAmount, fx.stampScale, fx.perspectiveTiltAngle, fx.springWobbleIntensity, fx.pixelateSteps, fx.spiralRadius, fx.stretchAmount, fx.cascadeDistance, fx.magneticScatter, fx.inkBleedAmount]);
    const rootStyle = {
        display: "flex",
        alignItems: typography.alignY,
        justifyContent: typography.alignX,
        overflow: "visible",
        ...style
    }; // Framer's extended Font control returns a full CSSProperties object
    // (fontFamily, fontWeight, fontStyle, fontSize, lineHeight, letterSpacing,
    //  textAlign) — spread it first, then let explicit overrides win.
    const fontFromControl = (typography ? .font) || {};
    const textStyle = { ...fontFromControl,
        textTransform: typography.textTransform,
        color: typography.useGradient ? "transparent" : typography.color,
        maxWidth: typography.maxWidthEnabled ? typography.maxWidth : undefined,
        whiteSpace: "normal",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        backgroundClip: typography.useGradient ? "text" : undefined,
        WebkitBackgroundClip: typography.useGradient ? "text" : undefined,
        WebkitTextFillColor: typography.useGradient ? "transparent" : undefined,
        backgroundImage: typography.useGradient ? `linear-gradient(${typography.gradientAngle}deg, ${typography.gradientA}, ${typography.gradientB})` : undefined,
        WebkitTextStroke: typography.strokeEnabled ? `${typography.strokeWidth}px ${typography.strokeColor}` : undefined
    };
    return /*#__PURE__*/ _jsx("div", {
        ref: rootRef,
        style: rootStyle,
        children: /*#__PURE__*/ _jsx("div", {
            ref: textRef,
            style: textStyle,
            "aria-label": text,
            children: text
        })
    });
}
GSAPTextEngine.defaultProps = {
    text: "Motion-ready headline",
    preset: "FadeUp",
    triggerSettings: {
        mode: "viewport",
        elementId: "",
        splitMode: "chars",
        once: true,
        reducedMotion: true,
        debugMarkers: false
    },
    typography: { // Font control (extended) covers: family, weight, style, size,
        // lineHeight, letterSpacing, textAlign
        font: {
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: "44px",
            lineHeight: 1.1,
            letterSpacing: "-0.6px",
            textAlign: "left"
        },
        textTransform: "none", // FIX #1 — dark default so the component is visible on a white canvas
        color: "#111827",
        maxWidthEnabled: false,
        maxWidth: 720,
        alignX: "flex-start",
        alignY: "center",
        useGradient: false,
        gradientA: "#111827",
        gradientB: "#6366F1",
        gradientAngle: 90,
        strokeEnabled: false,
        strokeWidth: 1,
        strokeColor: "rgba(0,0,0,0.25)"
    },
    timing: {
        duration: .9,
        delay: 0,
        ease: "power3.out"
    },
    motion: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        blur: 12,
        opacityFrom: 0,
        transformOrigin: "50% 50%",
        perspective: 1200,
        rotateX: 0,
        rotateY: 0,
        waveAmplitude: 14,
        waveDuration: 1.2,
        waveRepeats: 1
    },
    stagger: {
        amount: .5,
        from: "start"
    },
    scroll: {
        start: "top 85%",
        end: "bottom 20%",
        scrub: false,
        scrubAmount: .6,
        resetOnLeave: false,
        resetOnLeaveBack: false,
        replayOnEnterBack: true
    },
    hover: {
        reverseOnLeave: true
    },
    scramble: {
        duration: 1.2,
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    },
    typewriter: {
        charsPerSecond: 28,
        cursorEnabled: false,
        cursorChar: "|"
    },
    fx: {
        glitchJitter: 12,
        glitchSkew: 18,
        neonFlickerCount: 6,
        neonFlickerSpeed: .08,
        useGlow: true,
        glowRadius: 36,
        glowAlpha: .35,
        spinDegrees: 360,
        spinLift: 60,
        liquidSkew: 25,
        liquidSmearBlur: 20,
        explodeSpread: 120,
        explodeRotate: 120,
        cylinderDepth: 50,
        elasticPull: 80,
        gravityDropHeight: 120,
        sweepDirection: "left",
        zipperDistance: 60,
        kineticDistance: 120,
        kineticBlurAmount: 18,
        stampScale: 3,
        perspectiveTiltAngle: 75,
        springWobbleIntensity: 50,
        pixelateSteps: 8,
        spiralRadius: 120,
        stretchAmount: 1.8,
        cascadeDistance: 80,
        magneticScatter: 120,
        inkBleedAmount: 16
    }
}; // ── Property Controls ──────────────────────────────────────────────────────────
const ALL_PRESETS = ["FadeIn", "FadeUp", "FadeDown", "SlideLeft", "SlideRight", "BlurUp", "BlurIn", "ScalePop", "RotateIn", "MaskRevealUp", "MaskRevealDown", "CharsStaggerUp", "WordsStaggerUp", "WaveChars", "Typewriter", "ScrambleReveal", "GlitchSlice", "NeonFlicker", "SpinBounce", "LiquidSkew", "ExplodeIn", "CylinderRoll", "FlipCascade", "ElasticPull", "GravityDrop", "RisingReveal", "SweepClip", "ZipperStagger", "SoftBounce", "KineticBlur", "StampPress", "PerspectiveTilt", "VenetianBlinds", "SpringWobble", "PixelateIn", "SpiralIn", "StretchSnap", "CascadeFall", "MagneticPull", "InkBleed", "ShutterReveal"];
const ALL_TITLES = ["Fade In", "Fade Up", "Fade Down", "Slide Left", "Slide Right", "Blur Up", "Blur In", "Scale Pop", "3D Rotate In", "Mask Reveal Up", "Mask Reveal Down", "Chars Stagger Up", "Words Stagger Up", "Wave Chars", "Typewriter", "Scramble Reveal", "Glitch Slice", "Neon Flicker", "Spin Bounce", "Liquid Skew", "Explode In", "Cylinder Roll", "Flip Cascade", "Elastic Pull", "Gravity Drop", "Rising Reveal", "Sweep Clip", "Zipper Stagger", "Soft Bounce", "Kinetic Blur", "Stamp Press", "Perspective Tilt", "Venetian Blinds", "Spring Wobble", "Pixelate In", "Spiral In", "Stretch Snap", "Cascade Fall", "Magnetic Pull", "Ink Bleed", "Shutter Reveal"];
const is = (p, ...presets) => presets.includes(p.preset); // Presets that expose extra knobs in the "Preset FX" panel
const FX_PRESETS = new Set(["GlitchSlice", "NeonFlicker", "SpinBounce", "LiquidSkew", "ExplodeIn", "CylinderRoll", "ElasticPull", "GravityDrop", "SweepClip", "ZipperStagger", "KineticBlur", "StampPress", "PerspectiveTilt", "SpringWobble", "PixelateIn", "SpiralIn", "StretchSnap", "CascadeFall", "MagneticPull", "InkBleed"]);
addPropertyControls(GSAPTextEngine, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Motion-ready headline",
        displayTextArea: true
    },
    preset: {
        type: ControlType.Enum,
        title: "Preset",
        options: ALL_PRESETS,
        optionTitles: ALL_TITLES,
        defaultValue: "FadeUp"
    },
    triggerSettings: {
        type: ControlType.Object,
        title: "Trigger",
        controls: {
            mode: {
                type: ControlType.Enum,
                title: "Mode",
                description: "*Mount* = on load \xb7 *Viewport* = scroll into view \xb7 *Scroll* = tied to scrollbar \xb7 *Hover* = mouse enter \xb7 *Element* = triggered by another section's ID.",
                options: ["mount", "viewport", "scroll", "hover", "element"],
                optionTitles: ["On Mount", "On Viewport", "Scroll Scrub", "On Hover", "External Element"],
                defaultValue: "viewport"
            },
            elementId: {
                type: ControlType.String,
                title: "Element ID",
                description: "HTML *id* of another section (no # prefix).",
                defaultValue: "",
                placeholder: "hero-section",
                hidden: p => p.triggerSettings ? .mode !== "element"
            },
            splitMode: {
                type: ControlType.Enum,
                title: "Split By",
                description: "Many presets override this automatically.",
                options: ["none", "chars", "words", "lines"],
                optionTitles: ["None", "Characters", "Words", "Lines"],
                defaultValue: "chars",
                hidden: p => is(p, "Typewriter", "ScrambleReveal", "SweepClip")
            },
            once: {
                type: ControlType.Boolean,
                title: "Play Once",
                defaultValue: true,
                enabledTitle: "Yes",
                disabledTitle: "Replay",
                hidden: p => {
                    const m = p.triggerSettings ? .mode;
                    return m === "hover" || m === "mount";
                }
            },
            reducedMotion: {
                type: ControlType.Boolean,
                title: "Reduced Motion",
                description: "Skips animation when OS *Reduce Motion* is on.",
                defaultValue: true,
                enabledTitle: "Respect",
                disabledTitle: "Ignore"
            },
            debugMarkers: {
                type: ControlType.Boolean,
                title: "Debug Markers",
                description: "Turn off before publishing.",
                defaultValue: false,
                enabledTitle: "Show",
                disabledTitle: "Hide",
                hidden: p => p.triggerSettings ? .mode !== "scroll"
            }
        }
    }, // ── Typography ─────────────────────────────────────────────────────────────
    // FIX #2 — use Framer's native extended Font control so users get the
    // familiar type panel (family, weight, style, size, line-height,
    // letter-spacing, alignment) in one place.
    typography: {
        type: ControlType.Object,
        title: "Typography",
        controls: {
            font: {
                type: ControlType.Font,
                title: "Font",
                controls: "extended",
                displayFontSize: true,
                displayTextAlignment: true,
                defaultValue: {
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: "44px",
                    lineHeight: 1.1,
                    letterSpacing: "-0.6px",
                    textAlign: "left"
                },
                defaultFontType: "sans-serif"
            },
            textTransform: {
                type: ControlType.Enum,
                title: "Transform",
                options: ["none", "uppercase", "lowercase", "capitalize"],
                optionTitles: ["None", "Uppercase", "Lowercase", "Capitalize"],
                defaultValue: "none"
            },
            color: {
                type: ControlType.Color,
                title: "Color", // FIX #1 — dark default, visible on a white canvas
                defaultValue: "#111827"
            },
            alignX: {
                type: ControlType.Enum,
                title: "Align X",
                options: ["flex-start", "center", "flex-end"],
                optionTitles: ["Left", "Center", "Right"],
                defaultValue: "flex-start"
            },
            alignY: {
                type: ControlType.Enum,
                title: "Align Y",
                options: ["flex-start", "center", "flex-end"],
                optionTitles: ["Top", "Center", "Bottom"],
                defaultValue: "center"
            },
            maxWidthEnabled: {
                type: ControlType.Boolean,
                title: "Constrain Width",
                defaultValue: false,
                enabledTitle: "On",
                disabledTitle: "Off"
            },
            maxWidth: {
                type: ControlType.Number,
                title: "Max Width",
                min: 120,
                max: 2400,
                step: 1,
                defaultValue: 720,
                unit: "px",
                hidden: p => !p.typography ? .maxWidthEnabled
            },
            useGradient: {
                type: ControlType.Boolean,
                title: "Gradient Fill",
                defaultValue: false,
                enabledTitle: "On",
                disabledTitle: "Off"
            },
            gradientA: {
                type: ControlType.Color,
                title: "From",
                defaultValue: "#111827",
                hidden: p => !p.typography ? .useGradient
            },
            gradientB: {
                type: ControlType.Color,
                title: "To",
                defaultValue: "#6366F1",
                hidden: p => !p.typography ? .useGradient
            },
            gradientAngle: {
                type: ControlType.Number,
                title: "Angle",
                min: 0,
                max: 360,
                step: 1,
                defaultValue: 90,
                unit: "\xb0",
                hidden: p => !p.typography ? .useGradient
            },
            strokeEnabled: {
                type: ControlType.Boolean,
                title: "Text Stroke",
                defaultValue: false,
                enabledTitle: "On",
                disabledTitle: "Off"
            },
            strokeWidth: {
                type: ControlType.Number,
                title: "Stroke Width",
                min: 0,
                max: 8,
                step: .5,
                defaultValue: 1,
                unit: "px",
                hidden: p => !p.typography ? .strokeEnabled
            },
            strokeColor: {
                type: ControlType.Color,
                title: "Stroke Color",
                defaultValue: "rgba(0,0,0,0.25)",
                hidden: p => !p.typography ? .strokeEnabled
            }
        }
    },
    timing: {
        type: ControlType.Object,
        title: "Timing",
        controls: {
            duration: {
                type: ControlType.Number,
                title: "Duration",
                min: .05,
                max: 10,
                step: .05,
                defaultValue: .9,
                unit: "s"
            },
            delay: {
                type: ControlType.Number,
                title: "Delay",
                min: 0,
                max: 10,
                step: .05,
                defaultValue: 0,
                unit: "s"
            },
            ease: {
                type: ControlType.Enum,
                title: "Ease",
                description: "[Visualizer](https://gsap.com/docs/v3/Eases)",
                options: ["power1.out", "power2.out", "power3.out", "power4.out", "expo.out", "back.out(1.7)", "elastic.out(1, 0.5)", "circ.out", "sine.out", "bounce.out", "steps(10)"],
                optionTitles: ["Power 1", "Power 2", "Power 3", "Power 4", "Expo", "Back (overshoot)", "Elastic (spring)", "Circ", "Sine", "Bounce", "Steps"],
                defaultValue: "power3.out"
            }
        }
    },
    motion: {
        type: ControlType.Object,
        title: "Motion",
        controls: {
            opacityFrom: {
                type: ControlType.Number,
                title: "Start Opacity",
                min: 0,
                max: 1,
                step: .01,
                defaultValue: 0
            },
            x: {
                type: ControlType.Number,
                title: "X Offset",
                min: -300,
                max: 300,
                step: 1,
                defaultValue: 0,
                unit: "px"
            },
            y: {
                type: ControlType.Number,
                title: "Y Offset",
                min: -300,
                max: 300,
                step: 1,
                defaultValue: 0,
                unit: "px"
            },
            rotate: {
                type: ControlType.Number,
                title: "Rotate",
                min: -180,
                max: 180,
                step: 1,
                defaultValue: 0,
                unit: "\xb0"
            },
            scale: {
                type: ControlType.Number,
                title: "Scale",
                min: .2,
                max: 2,
                step: .01,
                defaultValue: 1
            },
            blur: {
                type: ControlType.Number,
                title: "Blur",
                min: 0,
                max: 80,
                step: 1,
                defaultValue: 12,
                unit: "px"
            },
            transformOrigin: {
                type: ControlType.String,
                title: "Origin",
                defaultValue: "50% 50%",
                description: "Format: *x y* (e.g. *50% 100%* = bottom center).",
                hidden: p => !is(p, "RotateIn")
            },
            perspective: {
                type: ControlType.Number,
                title: "Perspective",
                min: 200,
                max: 4e3,
                step: 10,
                defaultValue: 1200,
                unit: "px",
                description: "Lower = more dramatic. 800–2000 is typical.",
                hidden: p => !is(p, "RotateIn", "SpinBounce", "CylinderRoll", "FlipCascade", "PerspectiveTilt")
            },
            rotateX: {
                type: ControlType.Number,
                title: "Rotate X",
                min: -180,
                max: 180,
                step: 1,
                defaultValue: 0,
                unit: "\xb0",
                hidden: p => !is(p, "RotateIn")
            },
            rotateY: {
                type: ControlType.Number,
                title: "Rotate Y",
                min: -180,
                max: 180,
                step: 1,
                defaultValue: 0,
                unit: "\xb0",
                hidden: p => !is(p, "RotateIn")
            },
            waveAmplitude: {
                type: ControlType.Number,
                title: "Wave Height",
                min: 1,
                max: 120,
                step: 1,
                defaultValue: 14,
                unit: "px",
                hidden: p => !is(p, "WaveChars")
            },
            waveDuration: {
                type: ControlType.Number,
                title: "Wave Speed",
                min: .1,
                max: 10,
                step: .05,
                defaultValue: 1.2,
                unit: "s",
                hidden: p => !is(p, "WaveChars")
            },
            waveRepeats: {
                type: ControlType.Number,
                title: "Wave Repeats",
                min: 0,
                max: 20,
                step: 1,
                defaultValue: 1,
                description: "0 = infinite.",
                hidden: p => !is(p, "WaveChars")
            }
        },
        hidden: p => is(p, "Typewriter", "ScrambleReveal")
    },
    stagger: {
        type: ControlType.Object,
        title: "Stagger",
        controls: {
            amount: {
                type: ControlType.Number,
                title: "Total Time",
                min: 0,
                max: 3,
                step: .01,
                defaultValue: .5,
                unit: "s"
            },
            from: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["start", "center", "end", "random", "edges"],
                optionTitles: ["Start", "Center", "End", "Random", "Edges"],
                defaultValue: "start"
            }
        },
        hidden: p => is(p, "Typewriter", "ScrambleReveal", "SweepClip")
    },
    scroll: {
        type: ControlType.Object,
        title: "Scroll",
        controls: {
            start: {
                type: ControlType.String,
                title: "Start",
                defaultValue: "top 85%",
                description: "*elementPos viewportPos*"
            },
            end: {
                type: ControlType.String,
                title: "End",
                defaultValue: "bottom 20%",
                hidden: p => p.triggerSettings ? .mode !== "scroll"
            },
            scrub: {
                type: ControlType.Boolean,
                title: "Scrub",
                defaultValue: false,
                enabledTitle: "On",
                disabledTitle: "Off",
                hidden: p => p.triggerSettings ? .mode !== "scroll"
            },
            scrubAmount: {
                type: ControlType.Number,
                title: "Smoothing",
                min: .1,
                max: 5,
                step: .1,
                defaultValue: .6,
                unit: "s",
                hidden: p => p.triggerSettings ? .mode !== "scroll" || !p.scroll ? .scrub
            },
            replayOnEnterBack: {
                type: ControlType.Boolean,
                title: "Replay on Re-enter",
                defaultValue: true,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            resetOnLeave: {
                type: ControlType.Boolean,
                title: "Reset on Leave",
                defaultValue: false,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            resetOnLeaveBack: {
                type: ControlType.Boolean,
                title: "Reset on Leave Back",
                defaultValue: false,
                enabledTitle: "Yes",
                disabledTitle: "No"
            }
        },
        hidden: p => {
            const m = p.triggerSettings ? .mode;
            return m !== "scroll" && m !== "viewport" && m !== "element";
        }
    },
    hover: {
        type: ControlType.Object,
        title: "Hover",
        controls: {
            reverseOnLeave: {
                type: ControlType.Boolean,
                title: "Reverse on Leave",
                defaultValue: true,
                enabledTitle: "Yes",
                disabledTitle: "No"
            }
        },
        hidden: p => p.triggerSettings ? .mode !== "hover"
    }, // ── Preset FX ──────────────────────────────────────────────────────────────
    // FIX #3 — hidden at the top level when the selected preset has no FX knobs,
    // preventing an empty panel from ever being shown.
    fx: {
        type: ControlType.Object,
        title: "Preset FX", // Hide the entire section when the active preset has no FX controls
        hidden: p => !FX_PRESETS.has(p.preset),
        controls: { // ── GlitchSlice ───────────────────────────────────────────────────
            glitchJitter: {
                type: ControlType.Number,
                title: "Jitter",
                min: 1,
                max: 40,
                step: 1,
                defaultValue: 12,
                unit: "px",
                hidden: p => !is(p, "GlitchSlice")
            },
            glitchSkew: {
                type: ControlType.Number,
                title: "Skew",
                min: 1,
                max: 40,
                step: 1,
                defaultValue: 18,
                unit: "\xb0",
                hidden: p => !is(p, "GlitchSlice")
            }, // ── NeonFlicker ───────────────────────────────────────────────────
            neonFlickerCount: {
                type: ControlType.Number,
                title: "Flicker Count",
                min: 2,
                max: 12,
                step: 1,
                defaultValue: 6,
                hidden: p => !is(p, "NeonFlicker")
            },
            neonFlickerSpeed: {
                type: ControlType.Number,
                title: "Flicker Speed",
                min: .03,
                max: .3,
                step: .01,
                defaultValue: .08,
                unit: "s",
                hidden: p => !is(p, "NeonFlicker")
            },
            useGlow: {
                type: ControlType.Boolean,
                title: "Glow",
                defaultValue: true,
                enabledTitle: "On",
                disabledTitle: "Off",
                hidden: p => !is(p, "NeonFlicker")
            },
            glowRadius: {
                type: ControlType.Number,
                title: "Glow Radius",
                min: 0,
                max: 120,
                step: 1,
                defaultValue: 36,
                unit: "px",
                hidden: p => !is(p, "NeonFlicker") || !p.fx ? .useGlow
            },
            glowAlpha: {
                type: ControlType.Number,
                title: "Glow Opacity",
                min: 0,
                max: 1,
                step: .01,
                defaultValue: .35,
                hidden: p => !is(p, "NeonFlicker") || !p.fx ? .useGlow
            }, // ── SpinBounce ────────────────────────────────────────────────────
            spinDegrees: {
                type: ControlType.Number,
                title: "Spin Degrees",
                min: 30,
                max: 1440,
                step: 10,
                defaultValue: 360,
                unit: "\xb0",
                hidden: p => !is(p, "SpinBounce")
            },
            spinLift: {
                type: ControlType.Number,
                title: "Lift",
                min: 10,
                max: 220,
                step: 1,
                defaultValue: 60,
                unit: "px",
                hidden: p => !is(p, "SpinBounce")
            }, // ── LiquidSkew ────────────────────────────────────────────────────
            liquidSkew: {
                type: ControlType.Number,
                title: "Skew",
                min: 5,
                max: 60,
                step: 1,
                defaultValue: 25,
                unit: "\xb0",
                hidden: p => !is(p, "LiquidSkew")
            },
            liquidSmearBlur: {
                type: ControlType.Number,
                title: "Smear Blur",
                min: 2,
                max: 80,
                step: 1,
                defaultValue: 20,
                unit: "px",
                hidden: p => !is(p, "LiquidSkew")
            }, // ── ExplodeIn ─────────────────────────────────────────────────────
            explodeSpread: {
                type: ControlType.Number,
                title: "Spread",
                min: 20,
                max: 240,
                step: 1,
                defaultValue: 120,
                unit: "px",
                hidden: p => !is(p, "ExplodeIn")
            },
            explodeRotate: {
                type: ControlType.Number,
                title: "Max Rotation",
                min: 10,
                max: 360,
                step: 5,
                defaultValue: 120,
                unit: "\xb0",
                hidden: p => !is(p, "ExplodeIn")
            }, // ── CylinderRoll ──────────────────────────────────────────────────
            cylinderDepth: {
                type: ControlType.Number,
                title: "Depth",
                min: 10,
                max: 200,
                step: 5,
                defaultValue: 50,
                unit: "px",
                hidden: p => !is(p, "CylinderRoll")
            }, // ── ElasticPull ───────────────────────────────────────────────────
            elasticPull: {
                type: ControlType.Number,
                title: "Pull Distance",
                min: 20,
                max: 200,
                step: 5,
                defaultValue: 80,
                unit: "px",
                hidden: p => !is(p, "ElasticPull")
            }, // ── GravityDrop ───────────────────────────────────────────────────
            gravityDropHeight: {
                type: ControlType.Number,
                title: "Drop Height",
                min: 30,
                max: 300,
                step: 5,
                defaultValue: 120,
                unit: "px",
                hidden: p => !is(p, "GravityDrop")
            }, // ── SweepClip ─────────────────────────────────────────────────────
            sweepDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["left", "right", "center"],
                optionTitles: ["Left to Right", "Right to Left", "Center Out"],
                defaultValue: "left",
                hidden: p => !is(p, "SweepClip")
            }, // ── ZipperStagger ─────────────────────────────────────────────────
            zipperDistance: {
                type: ControlType.Number,
                title: "Distance",
                min: 10,
                max: 150,
                step: 5,
                defaultValue: 60,
                unit: "px",
                hidden: p => !is(p, "ZipperStagger")
            }, // ── KineticBlur ───────────────────────────────────────────────────
            kineticDistance: {
                type: ControlType.Number,
                title: "Rush Distance",
                min: 30,
                max: 300,
                step: 5,
                defaultValue: 120,
                unit: "px",
                hidden: p => !is(p, "KineticBlur")
            },
            kineticBlurAmount: {
                type: ControlType.Number,
                title: "Motion Blur",
                min: 4,
                max: 50,
                step: 1,
                defaultValue: 18,
                unit: "px",
                hidden: p => !is(p, "KineticBlur")
            }, // ── StampPress ────────────────────────────────────────────────────
            stampScale: {
                type: ControlType.Number,
                title: "Scale",
                min: 1.5,
                max: 6,
                step: .1,
                defaultValue: 3,
                hidden: p => !is(p, "StampPress")
            }, // ── PerspectiveTilt ───────────────────────────────────────────────
            perspectiveTiltAngle: {
                type: ControlType.Number,
                title: "Tilt Angle",
                min: 15,
                max: 120,
                step: 5,
                defaultValue: 75,
                unit: "\xb0",
                hidden: p => !is(p, "PerspectiveTilt")
            }, // ── SpringWobble ──────────────────────────────────────────────────
            springWobbleIntensity: {
                type: ControlType.Number,
                title: "Wobble",
                min: 10,
                max: 120,
                step: 5,
                defaultValue: 50,
                unit: "px",
                hidden: p => !is(p, "SpringWobble")
            }, // ── PixelateIn ────────────────────────────────────────────────────
            pixelateSteps: {
                type: ControlType.Number,
                title: "Steps",
                min: 3,
                max: 20,
                step: 1,
                defaultValue: 8,
                hidden: p => !is(p, "PixelateIn")
            }, // ── SpiralIn ──────────────────────────────────────────────────────
            spiralRadius: {
                type: ControlType.Number,
                title: "Radius",
                min: 30,
                max: 300,
                step: 5,
                defaultValue: 120,
                unit: "px",
                hidden: p => !is(p, "SpiralIn")
            }, // ── StretchSnap ───────────────────────────────────────────────────
            stretchAmount: {
                type: ControlType.Number,
                title: "Stretch",
                min: 1.2,
                max: 3,
                step: .1,
                defaultValue: 1.8,
                hidden: p => !is(p, "StretchSnap")
            }, // ── CascadeFall ───────────────────────────────────────────────────
            cascadeDistance: {
                type: ControlType.Number,
                title: "Fall Distance",
                min: 20,
                max: 200,
                step: 5,
                defaultValue: 80,
                unit: "px",
                hidden: p => !is(p, "CascadeFall")
            }, // ── MagneticPull ──────────────────────────────────────────────────
            magneticScatter: {
                type: ControlType.Number,
                title: "Scatter",
                min: 30,
                max: 250,
                step: 5,
                defaultValue: 120,
                unit: "px",
                hidden: p => !is(p, "MagneticPull")
            }, // ── InkBleed ──────────────────────────────────────────────────────
            inkBleedAmount: {
                type: ControlType.Number,
                title: "Bleed",
                min: 4,
                max: 40,
                step: 1,
                defaultValue: 16,
                unit: "px",
                hidden: p => !is(p, "InkBleed")
            }
        }
    },
    typewriter: {
        type: ControlType.Object,
        title: "Typewriter",
        controls: {
            charsPerSecond: {
                type: ControlType.Number,
                title: "Speed",
                min: 1,
                max: 240,
                step: 1,
                defaultValue: 28
            },
            cursorEnabled: {
                type: ControlType.Boolean,
                title: "Cursor",
                defaultValue: false,
                enabledTitle: "On",
                disabledTitle: "Off"
            },
            cursorChar: {
                type: ControlType.String,
                title: "Cursor Char",
                defaultValue: "|",
                hidden: p => !p.typewriter ? .cursorEnabled
            }
        },
        hidden: p => p.preset !== "Typewriter"
    },
    scramble: {
        type: ControlType.Object,
        title: "Scramble",
        controls: {
            duration: {
                type: ControlType.Number,
                title: "Duration",
                min: .05,
                max: 12,
                step: .05,
                defaultValue: 1.2,
                unit: "s"
            },
            alphabet: {
                type: ControlType.String,
                title: "Characters",
                defaultValue: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            }
        },
        hidden: p => p.preset !== "ScrambleReveal"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "GSAPTextEngine",
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
//# sourceMappingURL=./GSAP_Text_Engine_1.map