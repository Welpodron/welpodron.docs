import { classnamify } from "@/utils/classnamify/classnamify";
import { IconAlertOctagon, IconX } from "@tabler/icons-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type AnimatorStateType = {
  completed: boolean;
  elapsed: number;
  props: Record<string, any>;
};

type AnimatorConfigType = {
  duration: number;
  from: Record<string, any>;
  to: Record<string, any>;
  step: (state: AnimatorStateType) => void;
  before?: () => void;
  after?: () => void;
  easing?: (value: number) => number;
};

type AnimatorPropsType = {
  config: AnimatorConfigType;
};

class Animator {
  timer = 0;

  state: AnimatorStateType = {
    completed: false,
    props: {},
    elapsed: 0,
  };

  elapsed = 0;

  duration = 0;
  from: Record<string, any> = {};
  to: Record<string, any> = {};

  isStopped = false;
  isStarted = false;

  startedAt: number | null = null;
  pausedAt: number = 0;

  step: (state: AnimatorStateType) => void = () => {};
  before?: () => void = () => {};
  after?: () => void = () => {};
  easing = (x: number) =>
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  constructor({ config }: AnimatorPropsType) {
    this.duration = config.duration;

    this.before = config.before;
    this.after = config.after;
    this.step = config.step;

    if (config.easing) {
      this.easing = config.easing;
    }

    Object.keys(config.from).forEach((key) => {
      if (config.to[key] != undefined) {
        this.from[key] = config.from[key];
        this.to[key] = config.to[key];
        this.state.props[key] = config.from[key];
      }
    });
  }

  frame = (progress: number) => {
    Object.keys(this.from).forEach((key) => {
      this.state.props[key] =
        this.from[key] + (this.to[key] - this.from[key]) * progress;
    });

    this.state.elapsed = this.elapsed;

    this.step(this.state);
  };

  animation = (time: number) => {
    if (this.isStopped) {
      return;
    }

    if (this.startedAt === null) {
      this.startedAt = time;
    }

    let progress = (time - this.startedAt) / this.duration;

    this.elapsed = time - this.startedAt;

    if (progress >= 1 || this.elapsed >= this.duration) {
      progress = 1;
    }

    this.frame(this.easing(progress));

    if (progress >= 1) {
      this.stop();
    } else {
      this.timer = requestAnimationFrame(this.animation);
    }
  };

  start = () => {
    this.state.completed = false;
    this.isStarted = true;

    if (this.before) {
      this.before();
    }

    this.timer = requestAnimationFrame(this.animation);
  };

  finish = () => {
    cancelAnimationFrame(this.timer);
    this.state.completed = true;

    this.frame(1);
  };

  stop = () => {
    this.isStopped = true;

    cancelAnimationFrame(this.timer);

    this.elapsed = this.duration;
    this.state.elapsed = this.duration;

    this.state.completed = true;

    if (this.after) {
      this.after();
    }
  };

  pause = () => {
    cancelAnimationFrame(this.timer);
    this.pausedAt = window.performance.now();
  };

  continue = () => {
    if (this.state.completed) {
      return;
    }

    if (this.startedAt !== null) {
      this.startedAt += window.performance.now() - this.pausedAt;
    }

    this.timer = requestAnimationFrame(this.animation);
  };
}

export type NotificationContentPropsType = {
  children: React.ReactNode;
  onClose: () => void;
};

export const NotificationContent = ({
  children,
  onClose,
}: NotificationContentPropsType) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const animatior = useRef<Animator | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);

  const [opacityAnimationFinished, setOpacityAnimationFinished] =
    useState(false);
  const [transformAnimationFinished, setTransformAnimationFinished] =
    useState(false);

  const handleTransitionEnd = useCallback((event: TransitionEvent) => {
    if (event.target !== nodeRef.current) {
      return;
    }

    if (event.propertyName === "transform") {
      setTransformAnimationFinished(true);
    }

    if (event.propertyName === "opacity") {
      setOpacityAnimationFinished(true);
    }
  }, []);

  useEffect(() => {
    setOpacityAnimationFinished(false);
    setTransformAnimationFinished(false);
    nodeRef.current?.addEventListener("transitionend", handleTransitionEnd);
    nodeRef.current?.scrollHeight;
    nodeRef.current?.classList.remove("opacity-0", "translate-y-2");

    if (!animatior.current) {
      animatior.current = new Animator({
        config: {
          duration: 8000,
          from: {
            w: 100,
          },
          to: {
            w: 0,
          },
          easing: (x) => x,
          step: (state) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${state.props.w}%`;
            }
          },
          after: () => {
            isMountedRef.current = false;
            setOpacityAnimationFinished(false);
            setTransformAnimationFinished(false);
            nodeRef.current?.addEventListener(
              "transitionend",
              handleTransitionEnd
            );
            nodeRef.current?.classList.add("opacity-0", "translate-y-2");
          },
        },
      });
    }

    return () => {
      animatior.current?.finish();
      nodeRef.current?.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
    };
  }, [onClose]);

  useEffect(() => {
    if (transformAnimationFinished && opacityAnimationFinished) {
      if (!isMountedRef.current) {
        onClose();
      } else {
        animatior.current?.start();
      }
    }
  }, [opacityAnimationFinished, transformAnimationFinished]);

  const handleMouseEnter = useCallback(() => {
    animatior.current?.pause();
  }, []);

  const handleMouseLeave = useCallback(() => {
    animatior.current?.continue();
  }, []);

  const handleBtnClick = useCallback(() => {
    animatior.current?.stop();
  }, []);

  return (
    <div
      className={
        "relative mt-4 rounded opacity-0 translate-y-2 transition font-medium inline-flex justify-between items-center overflow-hidden bg-red-500 text-white px-2 pt-2 pb-3 text-sm w-full leading-none"
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={nodeRef}
    >
      <span className="truncate ml-1">{children}</span>
      <button
        className="rounded ml-2 p-2 ml-4 bg-white text-red-500"
        type="button"
        onClick={handleBtnClick}
      >
        <IconX />
        <span className="sr-only">Закрыть</span>
      </button>
      <div className="w-full h-1 absolute bottom-0 left-0 bg-slate-900" />
      <div
        ref={progressRef}
        className="w-full h-1 absolute bottom-0 left-0 bg-white"
      />
    </div>
  );
};

NotificationContent.displayName = "Notification.Content";
